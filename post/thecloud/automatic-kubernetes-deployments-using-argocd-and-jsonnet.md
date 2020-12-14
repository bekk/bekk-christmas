---
calendar: thecloud
post_year: 2020
post_day: 16
title: Making life simpler using ArgoCD and jsonnet
image: https://images.unsplash.com/photo-1542735950-ff674376d161?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop
ingress: >
  So you have a Kubernetes-cluster and a bunch of applications and you are
  looking for a way to automate deploys, keeping your sanity and avoiding

  manually applying templated YAML using kubectl. Well, look no further, I have an opinionated suggestion for you.
links:
  - title: Why are we templating yaml?
    url: https://leebriggs.co.uk/blog/2019/02/07/why-are-we-templating-yaml.html
  - title: Using Jsonnet does not have to be complex
    url: https://medium.com/@prune998/using-jsonnet-does-not-have-to-be-complex-54b1ad9b21db
  - title: "The State of Kubernetes Configuration Management: An Unsolved Problem"
    url: https://blog.argoproj.io/the-state-of-kubernetes-configuration-management-d8b06c1205
authors:
  - Gustav Karlsson
---
## What is ArgoCD?

[ArgoCD](https://argoproj.github.io/argo-cd/) is a continuous delivery tool for Kubernetes that uses git-repos as the source-of-truth for the desired state of
the cluster (following the [GitOps](https://www.weave.works/technologies/gitops/) philosophy). It runs inside the cluster and continuously monitor the git-repos for changes, rendering them into Kubernetes manifests and applying them to the cluster. So, contrary to the common pipeline approach where changes are pushed in, ArgoCD pulls them. As shown below, it comes with a UI for visualizing resources and their relations, which is particularly handy for newcomers to Kubernetes. (The UI *may* also be used to administer applications, repositories etc, but then you are engaging in ClickOps rather than GitOps).

![The echoserver Application](/assets/screenshot-2020-12-14-at-21.31.29.png)

The central component is the custom resource `Application` which basically is a pointer to a git-repo containing code 
that can be rendered into Kubernetes manifests. You may specify branch or tag, path, whether it should be automatically synced, 
inject parameters etc. See the doc (which is excellent btw) for an example showing all the knobs (https://argoproj.github.io/argo-cd/operator-manual/application.yaml)).

## Deployment orchestration

Applications often consist of multiple components that need to be updated during a deploy, and sometimes these components have an internal ordering that must be honored. I.e. "first do this and then do that". Tools that were not built specifically for deploys are often lacking here. Luckily, ArgoCD solves this elegantly using [resource hooks](https://argoproj.github.io/argo-cd/user-guide/resource_hooks/) and [sync waves](https://argoproj.github.io/argo-cd/user-guide/sync-waves/).

## App-of-apps

Finally, one of the gems of ArgoCD is the application-pattern which is referred to as the App-of-apps (https://argoproj.github.io/argo-cd/operator-manual/cluster-bootstrapping/#app-of-apps-pattern):

An `Application` may point to a git-repo containing code that renders additional `Application` CRs (i.e. points to other git-repos), continuing in as long a chain as you need.

So you can effectively bootstrap your entire stack by seeding argo with a single 
root `Application` that transitively renders all your `Applications` and underlying resources. No clicking required. You can of course also propagate relevant parameters to all applications. 

## Jsonnet

When it comes to selecting a tool/language for describing the Kubernetes-manifests there will be lots of opinions. This is currently mine:

I am a developer and I like to write code. I like to find the right abstractions and create generic, reusable pieces. I have always struggled with templating languages like Jinja2 or Go-templates because they are so limited and always "get in my way". After reading [Using Jsonnet does not have to be complex](https://medium.com/@prune998/using-jsonnet-does-not-have-to-be-complex-54b1ad9b21db) and [Why the f\*\*k are we templating yaml?](https://leebriggs.co.uk/blog/2019/02/07/why-are-we-templating-yaml.html) I tried out jsonnet. I had heard it was a bit complex, but my initial skepticism was blown away after trying it. It felt much more familiar than the awkward templating languages and factoring the code into reusable components was a breeze (see for example [bitnami/kube-libsonnet](https://github.com/bitnami-labs/kube-libsonnet)).

In jsonnet, it is quite easy to build a library like `app.libsonnet` below, allowing you to generate the full stack of Kubernetes objects (deployment, service, netpol, ingress, service monitor, etc) just by declaring the stack's config. Similar to what you would do in a helm values-file, but achieved with code rather than templating.

An example of what such code could look like:

```json
local lib = import 'lib/v2/lib.libsonnet';

# top-level arguments (tlas) can be injected here:
function(name='echo-server', namespace='default', env)
  local vars = lib.loadVars(env);

  (import 'lib/v2/app.libsonnet') {
    # here we are patching the default _config:
    _config+: {
      name: name,
      namespace: namespace,

      imageName: 'hashicorp/http-echo',
      imageTag: vars.tag,
      userPort: 8080,
      replicas: vars.replicas,

      ingress+: {
        path: '/echo/(.*)',
        rewrite: '/$1',
        tlsSecret: 'tls-secret-name',
      },
    },
  }.newAppAsList()
```

If done right, all resources can still be fully patchable. And since the jsonnet code is rendered into JSON which Kubernetes speaks natively, it will similar to YAML still allow you to:

* Validate the generated Kubernetes manifest:
  ```bash
  jsonnet echoserver.jsonnet --tla-str env="test" -J . | kubeval --strict
  ```

* Dry-run against a cluster:
  ```bash
  jsonnet *.jsonnet --tla-str env="opstest" -J . | kubectl apply --dry-run=server -f -
  ```

* Diff against a cluster:
  ```bash
  jsonnet *.jsonnet --tla-str env="opstest" -J . | k diff -f -
  ```

## Putting it together (?)

Using the app-of-apps pattern referred to above, it is possible to seed the ArgoCD-installation with a single Application
 which will transitively render all `Applications` for the system. It might look something like:   

```
argocd-root              # git repo  
  apps/         
    lib/                 # libraries, managed by jsonnet-bundler or via git submodules
    vars/                  
    vars/test.libsonnet  # per-env vars for tracking-branch, autosync, tlas etc 
    apps.jsonnet         # renders all Applications according to vars/<env>.libsonnet, injecting tla for env etc
```

The root-repo will, among others, render the echoserver `Application`, propagating relevant tlas such as `<env>`. *That* repo
will in turn render the app-specific Kubernetes-manifests. It might look something like:

```
argocd-apps                 # git repo
  apps/
    echoserver/
      lib/                  # libraries, managed by jsonnet-bundler or via git submodules
      vars/
      vars/test.libsonnet   # per-env vars for imageTag, replicas and more app-specific stuff  
      config/               # static configuration that goes into configmaps, possibly sealed-secrets
      echoserver.jsonnet
    otherapp/...
    anotherapp/...
```

## Summing up

I have shown two powerful yet simple tools for automating deploys of Kubernetes-based applications, ArgoCD and jsonnet. They 
are both interesting and powerful on their own,