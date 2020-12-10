---
calendar: thecloud
post_year: 2020
post_day: 11
title: Kubernetes Operators 101
image: https://i.imgur.com/PRCyBqa.jpg
ingress: Kubernetes has become the _de facto_ container orchestrator since it's
  initial release in 2014. It is a great tool for managing diverse workloads in
  clusters of machines, possibly spanning multiple availability zones. As the
  usage grows, new requirements for how to deploy and operate specialized
  software emerges. The Operator pattern is one of the more prominent responses
  to these new requirements.
description: Kubernetes has become the de facto container orchestrator since
  it's initial release in 2014. As the usage grows, new requirements for how to
  deploy and operate specialized software emerges. Read on to learn more about
  one of the most popular patterns!
links:
  - title: Kubernetes Patterns (eBook)
    url: https://www.redhat.com/cms/managed-files/cm-oreilly-kubernetes-patterns-ebook-f19824-201910-en.pdf
  - title: Awesome Operators
    url: https://github.com/operator-framework/awesome-operators
authors:
  - Even Holthe
---
The Operator pattern is best described in the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/):

> The Operator pattern aims to capture the key aim of a human operator who is managing a service or set of services. Human operators who look after specific applications and services have deep knowledge of how the system ought to behave, how to deploy it, and how to react if there are problems.
>
> People who run workloads on Kubernetes often like to use automation to take care of repeatable tasks. The Operator pattern captures how you can write code to automate a task beyond what Kubernetes itself provides.

**TL;DR** Operators automate operation of applications and services with human know-how.

## How does an Operator work?

An Operator consists at a minimum of one Custom Resource Definition (`CRD`) and a Controller. The `CRD` describes the various configuration options for this kind of resource. Given a custom resource for a `PostgresDatabase`, one might find options for specifying custom `StorageClass`es, resource allocation, backup schedule/destinations, authentication methods, etc.

Given an instance (`CR`) of `PostgresDatabase`, it's now the job of the controller to ensure that the desired state is reconciled with the cluster. In this example one can assume that the controller will create a `StatefulSet` for running the database itself, along with needed configuration in a `ConfigMap`, certificates for mutual TLS in a `Secret`. Backup can be done by either mounting and writing to a volume defined in the `CR` or injecting a sidecar for sending backups to another location.

Patching, reboots and failovers can be specified in the `CR` and taken care of by the controller, using methods recommended by experienced DBA's. The fact that complex operational knowledge can be encoded into the controller is a key enabler for many organizations that would like to run complex software, but not necessarily invest countless hours into learning the nitty-gritty details on how to operate it.

Like any other software there will be bugs and abstractions will leak. There's no silver bullet.

## How do I create my own Operator?

As with the rest of the Kubernetes community, multiple solutions exists.

* For a declarative experience, check out [KUDU](https://kudo.dev/)
* If you'd like a more official way to do it, see [kubebuilder](https://github.com/kubernetes-sigs/kubebuilder)
* The most popular option seems to be [Operator SDK](https://github.com/operator-framework/operator-sdk)

As with most cloud native software, Go seems to be the lingua franca. There is nothing stopping you from writing an Operator in Java, C#, Python or any other language that can communicate with the Kubernetes APIs.

## Examples of known Operators

The community has produced a lot of Operators for about everything one can imagine. These are some popular examples:

* [Argo CD](https://github.com/argoproj/argo-cd) – a  declarative, GitOps continuous delivery tool for Kubernetes.
* [cert-manager](https://github.com/jetstack/cert-manager) – automatically provisions TLS certificates via the ACME protocol. Can be used with certificate issuers such as [Let's Encrypt](https://letsencrypt.org/), [Buypass](https://www.buypass.no/ssl/resources/acme-free-ssl) and [ZeroSSL](https://zerossl.com/documentation/acme/).
* [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) – often used in combination with [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) for a batteries included monitoring suite
* [KubeDB](https://kubedb.com/) – a real-life implementation of the `PostgresDatabase` example, plus support for MySQL/MariaDB/MongoDB/Redis/Memcached and more

<small>Header image: RIA Novosti archive, image #305015 / Alexey Danichev / CC-BY-SA 3.0</small>