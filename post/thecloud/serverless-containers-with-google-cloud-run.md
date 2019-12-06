---
calendar: thecloud
post_year: 2019
post_day: 7
title: Serverless Containers with Google Cloud Run
image: ''
ingress: >-
  Do you want to run stateless container-based applications or
  [microservices](https://martinfowler.com/articles/microservices.html), but
  don't need the bells and whistles or the overhead with configuration and
  management of a full-fledged Kubernetes cluster? Are you intrigued by the
  fully managed [serverless](https://martinfowler.com/articles/serverless.html)
  model with _pay-what-you-use_ billing of existing
  [FaaS](https://en.wikipedia.org/wiki/Function_as_a_service) platforms, but
  find the supported languages or libraries too limited? Then have a look at
  [_Google Cloud Run_](https://cloud.google.com/run/) - a fully managed
  serverless platform for running stateless HTTP-driven containers. You bring
  the container and runtime, and Cloud Run handles all the underlying
  infrastructure, configuration and scaling. You only pay for what you use.
  Billed to the nearest 100 milliseconds.
links:
  - title: Cloud Run product overview
    url: 'https://cloud.google.com/run'
  - title: Cloud Run goes GA announcement post
    url: >-
      https://cloud.google.com/blog/products/serverless/knative-based-cloud-run-services-are-ga
  - title: Choosing between Kubernetes Engine and Cloud Run (or both)
    url: >-
      https://cloud.google.com/blog/products/containers-kubernetes/when-to-use-google-kubernetes-engine-vs-cloud-run-for-containers
  - title: GCP Podcast episode on Cloud Run
    url: 'https://gcppodcast.com/post/episode-203-cloud-run-gke-with-donna-malayeri/'
authors:
  - Mikkel Dan-Rognlie
---
Back in april at the _Google Cloud Next_ conference [Cloud Run was released in public beta](https://cloud.google.com/blog/products/serverless/announcing-cloud-run-the-newest-member-of-our-serverless-compute-stack) (along with their hybrid-cloud offering called [Anthos](https://cloud.google.com/anthos/) and the open source [Knative](https://knative.dev/) project which Cloud Run builds upon). A few weeks ago at Cloud Next in London, they [announced Cloud Run as generally available](https://cloud.google.com/blog/products/serverless/knative-based-cloud-run-services-are-ga). Ok, enough with all the links! So what is Cloud Run really? 

Cloud Run is a fully managed environment that lets you run stateless HTTP-driven containers, without worrying about the underlying infrastructure. It's almost like functions, but where _you_ supply a Docker-container with your application or service/API. You choose the programming language and web runtime. You can even use OS binaries or custom binaries if you supply them in you container. You only pay for the resources used during a request. In this way you don't have to set up or manage any infrastructure such as Kubernetes or [GKE](https://cloud.google.com/kubernetes-engine/), and you don't pay for compute instances idling around when you are not handling any traffic.

### Comparing with Kubernetes

Kubernetes is a container orchestration platform that offers advanced scalability and configuration flexibility. It gives you complete control over every aspect of container orchestration, from networking, to storage, to how you set up observability — in addition to supporting stateful application use cases. If you don't need all this, then Cloud Run is a much simpler serverless approach. 

### Comparing with other alternatives
- Azure Container instances
- AWS Fargate

### The benefits of fully managed Cloud Run

### Deployment

### Scaling and concurrency

### Configuration

### Caveats

### Summary

🎉

Splash photo by [asoggetti](https://unsplash.com/@asoggetti?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
