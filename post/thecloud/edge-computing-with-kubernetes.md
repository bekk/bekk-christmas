---
calendar: thecloud
post_year: 2020
post_day: 12
title: Edge Computing with Kubernetes
image: https://images.unsplash.com/photo-1470645792662-dd18394f8c97
ingress: I first heard about using Kubernetes for Internet of Things (IoT) and
  edge computing less than a year ago. I was pretty new to Kubernetes, and
  didn't know a lot about IoT. So it seemed like a big pile of buzzwords. And
  even if it seems like a lot of buzzwords to you, you should still consider
  Kubernetes when deciding how to manage your IoT and edge applications. In this
  article I will discuss some of the features and frameworks that are especially
  important when running Kubernetes on the edge.
description: kubernetes internetofthings iot edge edgecomputing
links:
  - title: "Intro + Deep Dive: Kubernetes IoT Edge WG - Steven Wong, Cindy Xing,
      Dejan Bosanac, & Kilton Hopkins"
    url: https://www.youtube.com/watch?v=5UgOjvK1IN8
  - title: IoT Edge WG Edge Security Challenges Whitepaper
    url: https://github.com/kubernetes/community/tree/master/wg-iot-edge/whitepapers/edge-security-challenges
authors:
  - Ole Kristian Pedersen
---
First of all, let's clear up some misconceptions. At least my misconceptions from before I got into IoT. I had the idea that edge computing and IoT were the same. It turns out they're not.

IoT is all about connecting physical devices that senses and interacts with their environment to the cloud. Edge computing is bringing computing resources closer to the end users (and IoT devices) that connect. Edge computing doesn't have to involve physical devices, but can merely be a server located closer to the end users. For instance, Content Delivery Networks brings storage of content closer to end users to save bandwidth and reduce latency.

Another misconception I had, was that Kubernetes needed too much resources to run on smaller devices. But, I can actually run Kubernetes on the Raspberry Pi that sits on my shelf collecting dust. [k3s](https://k3s.io/) makes it possible to run Kubernetes on everything from small devices to powerful VMs with your favorite cloud provider. How? It's opinionated, removed a lot of cruft you don't need and is packaged as a single binary that is less than 40MB. k3s is a certified Kubernetes distribution designed for production usage.

We'll look at three concrete use cases, and look at different features of Kubernetes that might be useful.

When I first heard about using Kubernetes for Internet of Things (IoT) and edge computing applications, I couldn't imagine how that would work. It was just a big pile of buzzwords. It turns out that Kubernetes has some advantages that it can bring to the edge computing table, and might be worth considering when deciding how to manage your IoT and edge applications. In this article I will try to showcase some of the features and frameworks that must be considered when running Kubernetes on the edge.

# Industrial IoT

Industrial IoT deployments can have millions of IoT devices. The devices usually doesn't have a lot of resources, and can't act as nodes in a Kubernetes cluster. They send the collected data to IoT gateways (also known as hubs or bridges), that often can.

IoT gateways can be nodes in a cluster, running k3s or a lightweight [KubeEdge](https://kubeedge.io/) agent. Either in your main cluster, or in a local cluster on the edge. The latter is especially useful if network connectivity at the edge location is poor.

Kubernetes provides pod [priority](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/) and [quality of service](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/) classes that should be used to ensure the critical workloads can't be pre-empted by another workload consuming too much resources. Using these features ensure that workloads aren't killed willy-nilly, but according to some set priority.

# Edge applications

Applications requiring low latency or a lot of bandwidth are typical candidates for edge deployments. Online streaming services, communication applications, or gaming servers are some examples that benefit from edge deployments, reducing latency and network contention.

Priority and quality of service features help schedule important workloads in this use case too. For instance, video calls must have higher priority than chat messages. Also, [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) and the more experimental [traffic shaping plugin](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/#support-traffic-shaping) can between them control both how a pod is allowed to communicate with others and how much bandwidth it's allowed to consume.

# Mixed and hybrid clusters

Sometimes parts of you applications can't run in a public cloud, due to compliance or special hardware requirements. Or, maybe you have some nodes in you publicv cloud with powerful GPUs? Kubernetes can be configured to run applications on [specific nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/), or on nodes that have [GPU resources](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) available.

# There's no silver bullet

Using Kubernetes on the edge provides almost all your favorite features you're using in your centralized cloud. You can manage deployments using GitOps, have your favorite observability stack and use the same policies. However, Kubernetes can't solve scaling issues if the underlying platform on the edge doesn't support it. Furthermore, if (when!) you have to manage the hardware and operating systems your edge applications run on, you have a lot of security threats that Kubernetes can't handle alone.

If you're interested in using Kubernetes for edge deployments check out [this talk](https://www.youtube.com/watch?v=5UgOjvK1IN8) from the [Kubernetes IoT Edge Working Group](https://github.com/kubernetes/community/tree/master/wg-iot-edge). The working group has also published a whitepaper that discusses the [edge security challenges](https://github.com/kubernetes/community/tree/master/wg-iot-edge/whitepapers/edge-security-challenges).