---
calendar: thecloud
post_year: 2020
post_day: 13
title: Take Argo CD for a spin with K3s and k3d
image: https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80
ingress: The container paradigm is upon us, and some love hacking and writing
  code for Kubernetes - while others struggle, finding maintaining or releasing
  for it difficult. How do you even test a Kubernetes deployment on your own
  computer anyway? In this post we will have a look at how the stripped-down
  Kubernetes variant K3s can be used to take the new hot container continuous
  delivery tool Argo CD for a spin on your own laptop or personal server -
  without much of the complexity Kubernetes requires.
links:
  - url: https://blog.alexellis.io/test-drive-k3s-on-raspberry-pi/
    title: Will it cluster? k3s on your Raspberry Pi
  - title: How Rancher Labs’ K3s Makes It Easy to Run Kubernetes at the Edge
    url: https://thenewstack.io/how-rancher-labs-k3s-makes-it-easy-to-run-kubernetes-at-the-edge/
  - url: https://blog.zeerorg.site/post/k3d-kubernetes-dev-env
    title: k3d - A fast kubernetes dev environment
authors:
  - Andreas Mosti
---
### Kubernetes: oh so wonderfull, but oh so complex

Ah, Kubernetes. In the fast-paced realm of cloud computing, it seams a long time ago that Kubernetes, or K8s for short, came winning out of [the container orchestrator wars](https://www.seldon.io/hacker-noon-how-did-kubernetes-win-the-container-orchestration-war/). With the amount of hype it's had and it's seeming omnipresent, it's hard to belive that it's just been 3 years since K8s came out on top as the preferred container orchestrator, leaving other products like Docker Swarm and Mesosphere in it's wake.

The container paradigm hasn't been just smooth sailing. Many adopters have struggled with all the loose parts, [and K8s has suffered lots of critique for it's complexity](https://www.ben-morris.com/do-you-really-need-kubernetes/). Lots of this criticism can be dedicated to projects too small to be using it in the first place, surfing on the hype of "all the big players using K8s so we should too", but there is certainly a case to be made for the effort and knowledge going in to managing a cluster. On top of that, doing local development has been a bit clunky, and for some teams, managing clusters for things like CI can be expensive.

Thankfully, there is a solution for those who want to leverage the strengths of deploying applications and services declaratively with Kubernetes, but without big parts of the complexity: K3s. That's right, it's K8s - 5 = K3s.

### K3s and k3d

[K3s is developed by Rancher Labs](https://k3s.io/) and is a Kubernetes flavor built to bring the power of Kubernetes to the edge, IoT devices, local development or for usage in situations where, quote, 

> "Situations where a PhD in K8s clusterology is infeasible".

What does this mean? In practice, K3s is a "full" Kubernetes-compatible system with a single binary under 40Mb in size. Lots of [deprecated or optional parts of K8s has been removed](https://thenewstack.io/how-rancher-labs-k3s-makes-it-easy-to-run-kubernetes-at-the-edge/) to shrink it down, but the biggest differences is the replacement of etcd, the distributed key-value database, in favor of the versatile SQLite database, a favorite among many developers for mobile and embedded solutions. For high availability clusters, SQLite can [optionally be swapped for another database, like MySql or PostgreSQL](https://rancher.com/docs/k3s/latest/en/installation/datastore/).

Since K3s is designed to be simple and easy to install, it can also be run via Docker (fancy that, a container orchestrator tool that run in a container itself!). This project is, logically enough, called [k3d](https://k3d.io/). k3d makes it quite simple to create single- and multi-node K3s clusters locally, on a VM, as a part of CI systems, etc.

To summarize, K3s and K3d removes a lot of the friction and complexity associated with running Kubernetes, making it a good choice for local Kubernetes development, edge computing devices or your local server. Sounds exiting? Let's use K3s via k3d to deploy apps with another hot product: The container continuous delivery tool [Argo CD](https://argoproj.github.io/argo-cd/).

### Continuous Delivery with Argo CD

Argo CD is a [GitOps tool](https://www.gitops.tech/) that has a simple, but powerful objective: To declaratively deploy applications to Kubernetes by reading the application's Kubernetes-resources from version control, like a Git repository. Every commit to the repository is threated as a change that will be executed by Argo CD against the Kubernetes cluster, manually or automatic. In this way the entire deployment regime is controlled by files in version control, which substantiates an explicit release process. As an example, if a new version of the application is to be released, an update to the image tag is written to the resource files and checked in. Argo CD syncs with the repository and rolls out the new version.

Since Argo CD itself runs on Kubernetes, it's quite easy to setup and works perfectly to deploy applications on K3s.

### Setup Time

To test Argo CD with K3s on macOS, the easiest way is to run a single-node cluster via Docker and k3d. First, install \`k3d\` with [Homebrew](https://brew.sh/index_nb):

```
$ brew install k3d
```

With the `k3d` command, in place, set up a single-node cluster called `laptop`:

```sh
$ k3d cluster create laptop  INFO[0000] Created network 'k3d-laptop'  INFO[0000] Created volume 'k3d-laptop-images'  INFO[0001] Creating node 'k3d-laptop-server-0'  INFO[0009] Creating LoadBalancer 'k3d-laptop-serverlb'  INFO[0011] Pulling image 'docker.io/rancher/k3d-proxy:v3.3.0'  INFO[0015] Cluster 'laptop' created successfully!  INFO[0015] You can now use it like this:  kubectl cluster-info
```

A quick `docker ps` shows two containers, `k3s` itself and a proxy. That's all we need.

```
$ docker ps
  CONTAINER ID        IMAGE                      COMMAND                  CREATED             STATUS              PORTS                             NAMES
  c65025f1dec2        rancher/k3d-proxy:v3.3.0   "/bin/sh -c nginx-pr…"   58 minutes ago      Up 58 minutes       80/tcp, 0.0.0.0:54028->6443/tcp   k3d-laptop-serverlb
  0c06b6322162        rancher/k3s:latest         "/bin/k3s server --t…"   58 minutes ago      Up 58 minutes                                         k3d-laptop-server-0
```

Next up, use the `k3d` command to add the new cluster to the local `kubeconfig` so we can interact with it:

```sh
$ k3d kubeconfig merge laptop --switch-context
  /Users/andreasmosti/.k3d/kubeconfig-laptop.yaml
```

Now using `kubctl` to check available nodes should list information about the available K3s installation.

```sh
$ kubectl get nodes
  NAME                  STATUS   ROLES    AGE   VERSION
  k3d-laptop-server-0   Ready    master   61m   v1.17.9+k3s1
```

Now, to begin the installation of Argo CD, create a namespace for it:

```sh
$ kubectl create namespace argocd
  namespace/argocd created
```

The rest of the installation is a simple `kubctl apply` from the Argo CD installation manifest. A lot of Kubernetes resources will be set up, so this might take some time.

```sh
$ kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
  customresourcedefinition.apiextensions.k8s.io/applications.argoproj.io created
  customresourcedefinition.apiextensions.k8s.io/appprojects.argoproj.io created
  serviceaccount/argocd-application-controller created
  serviceaccount/argocd-dex-server created
  serviceaccount/argocd-server created
  role.rbac.authorization.k8s.io/argocd-application-controller created
  role.rbac.authorization.k8s.io/argocd-dex-server created
  role.rbac.authorization.k8s.io/argocd-server created
  clusterrole.rbac.authorization.k8s.io/argocd-application-controller created
  clusterrole.rbac.authorization.k8s.io/argocd-server created
  rolebinding.rbac.authorization.k8s.io/argocd-application-controller created
  rolebinding.rbac.authorization.k8s.io/argocd-dex-server created
  rolebinding.rbac.authorization.k8s.io/argocd-server created
  clusterrolebinding.rbac.authorization.k8s.io/argocd-application-controller created
  clusterrolebinding.rbac.authorization.k8s.io/argocd-server created
  configmap/argocd-cm created
  configmap/argocd-gpg-keys-cm created
  configmap/argocd-rbac-cm created
  configmap/argocd-ssh-known-hosts-cm created
  configmap/argocd-tls-certs-cm created
  secret/argocd-secret created
  service/argocd-dex-server created
  service/argocd-metrics created
  service/argocd-redis created
  service/argocd-repo-server created
  service/argocd-server-metrics created
  service/argocd-server created
  deployment.apps/argocd-application-controller created
  deployment.apps/argocd-dex-server created
  deployment.apps/argocd-redis created
  deployment.apps/argocd-repo-server created
  deployment.apps/argocd-server created
```

After a minute or two depending on the speed of your machine, all Argo pods should be in place.

```sh
$ kubectl get pods -n argocd
  NAME                                            READY   STATUS    RESTARTS   AGE
  argocd-redis-7447669cc9-lglch                   1/1     Running   0          3m8s
  argocd-dex-server-74984b7fc7-xndlw              1/1     Running   0          3m8s
  argocd-application-controller-7fb5744d5-rdr5q   1/1     Running   0          3m8s
  argocd-repo-server-9fc5dc567-gqs9r              1/1     Running   0          3m8s
  argocd-server-6ff574cd94-s6sjr                  1/1     Running   0          3m8s
```

To access the Argo CD UI, create a port-forwarding object and attach it to the Argo CD service (We want this port forward hanging, so use a dedicated terminal window).

```sh
$ kubectl port-forward svc/argocd-server -n argocd 8080:443
  Forwarding from 127.0.0.1:8080 -> 8080
  Forwarding from [::1]:8080 -> 8080
```

Navigate a browser to `https://localhost:8080` to find the Argo CD login screen.

To login, use username `admin`. The first-time password is the name of the Argo CD Api Server pod, funny enough. That can be fetched like this:

```sh
$ kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2
  argocd-server-6ff574cd94-s6sjr
```

With the password in hand, Argo CD will let you in.

From here, hook up a new Application with the following details:

| Key              | Value                                           |
| ---------------- | ----------------------------------------------- |
| Application name | `guestbook`                                     |
| Project          | `default`                                       |
| Sync Policy      | `Automatic`                                     |
| Repository URL   | <https://github.com/andmos/argocd-example-apps> |
| TARGET REVISION  | `HEAD`                                          |
| PATH             | `guestbook`                                     |
| Cluster URL      | `https://kubernetes.default.svc`                |
| Namespace        | `argocd`                                        |

And hit create. This will start the deployment of a simple guestbook application with a service, endpoint and a deployment containing a single replica set. Everything is synced by Argo CD from the given Github repository. When everything is created, Argo CD will show a all-green, all synced up map of all Kubernetes objects.

![argo-cd-deployment](https://i.ibb.co/5cgq6yX/Screenshot-2020-12-01-at-19-34-53.png)

To access the deployed guestbook, set up a new port forward for the guestbook-service:

```sh
$ kubectl port-forward svc/guestbook-ui -n argocd 8081:80
  Forwarding from 127.0.0.1:8081 -> 80
  Forwarding from [::1]:8081 -> 80
```

Hit up `http://localhost:8081` to see it.

![example-guestbook-app](https://i.ibb.co/cTtbJ39/Screenshot-2020-12-01-at-19-28-49.png)

And thats it! We now have a glorified guestbook application deployed from Argo CD to Kubernetes, running as K3s via k3d on a local machine. Hopefully this spars some ideas on how to use K3s / k3d, Argo CD or hopefully both.

### Cleaning up

To clean up the machine and delete all content from the k3d cluster, use the `delete` command:

```sh
$ k3d cluster delete laptop
  INFO[0000] Deleting cluster 'laptop'
  INFO[0000] Deleted k3d-laptop-serverlb
  INFO[0000] Deleted k3d-laptop-server-0
  INFO[0000] Deleting cluster network 'b9967e7834830b2f6c5573fc92b3f2f7cc8655fa4f08e7dec01330eb310aa026'
  INFO[0000] Deleting image volume 'k3d-laptop-images'
  INFO[0000] Removing cluster details from default kubeconfig...
  INFO[0000] Removing standalone kubeconfig file (if there is one)...
  INFO[0000] Successfully deleted cluster laptop!
```

### Post Script

When writing this article I went in total flux over whether to write "k3s", or "K3s" with a capital K. To find out, I reached out to the main author on Twitter, Darren Shepherd and asked him. The answer was quite amusing, I recommend reading the following Twitter-thread!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;d like to know too. I always wanted it to be lowercase but when people edit my writing they make it upper case, especially when starting a sentence. So I really have no clue. <a href="https://twitter.com/GuerillaNerd?ref_src=twsrc%5Etfw">@GuerillaNerd</a> do you know?</p>&mdash; Darren Shepherd (@ibuildthecloud) <a href="https://twitter.com/ibuildthecloud/status/1336302197462638599?ref_src=twsrc%5Etfw">December 8, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Ah, and one more thing: For more, in-depth use of Argo CD, watch out for the 16th.