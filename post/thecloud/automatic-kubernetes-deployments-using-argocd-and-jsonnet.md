---
calendar: thecloud
post_year: 2020
post_day: 16
title: Automatic Kubernetes deployments using ArgoCD and jsonnet
image: https://unsplash.com/photos/KIZghFOEK40
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
## ArgoCD intro 

ArgoCD is a continuous delivery tool for Kubernetes that uses git-repos as the source-of-truth for the desired state of
your cluster. It will continuously monitor the git-repos for changes, render the manifests and apply them to your cluster. 
It comes with a UI for visualizing your resources, something which is very handy, especially if you are new to Kubernetes.

The central component is the custom resource `Application` which basically is a pointer to a git-repo containing code 
that can be rendered into Kubernetes manifests. You may specify branch or tag, path, whether it should be automatically synced, 
inject parameters etc. See the doc for an example showing all the knobs (https://argoproj.github.io/argo-cd/operator-manual/application.yaml)).
Even though it supports rolling back to previously deployed versions, ArgoCD uses no database, it simply stores the necessary state on the 
`Application` CR (i.e. in etcd).

<image of echo-server app?>

## Cluster bootstrapping (app-of-apps)

One of the gems of ArgoCD is the deployment-pattern which is referred to as the App-of-apps (https://argoproj.github.io/argo-cd/operator-manual/cluster-bootstrapping/#app-of-apps-pattern).
An `Application` may point to a git-repo containing code that renders additional `Application` CRs (i.e. points to other git-repos), 
continuing in as long a chain as you need. So you can effectively bootstrap your entire stack by seeding argo with a single 
root-`Application` that transitively renders all your `Applications` and underlying manifests. You can of course also propagate
relevant parameters to all applications. 

<image of app-of-apps, possibly from doc>

## Jsonnet

Now when it comes to selecting a tool/language for describing the Kubernetes-manifests there will be lots of opinions. Here is mine. 
I am a developer and I like to write code. I like to find the right abstractions and create generic reusable pieces. I 
have always struggled with templating languages like Jinja2 or Go-templates because they are so limited and always "get in my way". 
After reading [Using Jsonnet does not have to be complex](https://medium.com/@prune998/using-jsonnet-does-not-have-to-be-complex-54b1ad9b21db) and [Why the f**k are we templating yaml?](https://leebriggs.co.uk/blog/2019/02/07/why-are-we-templating-yaml.html) I tried out 
jsonnet. I had heard jsonnet was a bit complex, but my initial skepticism was blown away after trying it. It feels much more familiar
than awkward templating languages and it is very easy creating libraries of reusable code (see for example [bitnami/kube-libsonnet](https://github.com/bitnami-labs/kube-libsonnet).
    

As hinted about in [Using Jsonnet does not have to be complex](https://medium.com/@prune998/using-jsonnet-does-not-have-to-be-complex-54b1ad9b21db),
 you could quite easily create reusable (and testable) pieces allowing you to generate the full stack of kubernetes objects 
 (deployment, service, netpol, ingress, service monitor, etc) by just declaring its config, similar to what you would to in a helm values-file. 
 An example of what such code could look like:

```jsonnet
local lib = import 'lib/v2/lib.libsonnet';

function(name='echo-server', namespace='default', env)            # top-level arguments (tlas) can be injected here
  local vars = lib.loadVars(env);

  (import 'lib/v2/app.libsonnet') {
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

If done right, all resources can still be fully patchable. And after working a bit with jsonnet, you realize, since it speaks "native Kubernetes",
 it will also let you (should you need to):

* Validate the generated Kubernetes manifest:
    ```bash
    jsonnet echoserver.jsonnet --tla-str env="test" -J . | kubeval --strict --ignore-missing-schemas
    ```
* Dry-run against a cluster:
    ```bash
    jsonnet *.jsonnet --tla-str env="opstest" -J . | kubectl apply --dry-run=server -f -
    ```
* Diff against a cluster:
    ```bash
    jsonnet *.jsonnet --tla-str env="opstest" -J . | k diff -f - | diff-so-fancy
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

The root-repo will, among others, render the echoserver `Application`, propagating relevant tlas such as `<env>`. _That_ repo
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




