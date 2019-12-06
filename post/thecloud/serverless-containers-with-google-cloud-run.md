---
calendar: thecloud
post_year: 2019
post_day: 7
title: Serverless Containers with Google Cloud Run
image: >-
  https://images.unsplash.com/photo-1498596970060-8d11115e3e71?w=1226&h=750&fit=crop&crop=edges
ingress: >-
  Do you want to run stateless container-based applications or microservices,
  but don't need all the features and overhead with configuration and management
  of a full-fledged Kubernetes cluster? Or do you crave the fully managed
  serverless model with _pay-what-you-use_ billing of existing FaaS platforms,
  but find the runtime model and supported languages/versions too limited? Let's
  have a look at [_Google Cloud Run_](https://cloud.google.com/run/) - a fully
  managed serverless platform for running stateless HTTP-driven containers with
  no restrictions on which language/libraries are used. You only pay for the
  resources used during requests. Billed to the nearest 100 milliseconds.
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
Back in april '19 at the _Google Cloud Next_ conference [Cloud Run was released in public beta](https://cloud.google.com/blog/products/serverless/announcing-cloud-run-the-newest-member-of-our-serverless-compute-stack) (along with their hybrid/multi-cloud offering called [Anthos](https://cloud.google.com/anthos/) and the open source [Knative](https://knative.dev/) project which Cloud Run builds upon). A few weeks ago at _Cloud Next_ in London, they [announced Cloud Run as generally available](https://cloud.google.com/blog/products/serverless/knative-based-cloud-run-services-are-ga). Ok, enough with the links! So what is Cloud Run really? 

Cloud Run is a managed compute platform that enables you to run stateless containers accessible via HTTP. It is built from Knative, and you can choose to run your containers on _Fully managed Cloud Run_, or in a [_Google Kubernetes Engine_](https://cloud.google.com/kubernetes-engine/) cluster with Cloud Run for Anthos on GCP or even on-prem with Anthos on VMware.

### Fully managed Cloud Run

Managed Cloud Run is a fully managed environment that lets you run stateless HTTP-driven containers, without worrying about the underlying infrastructure or provisioning VMs or clusters. You focus on writing application code, package a Docker-image with your favourite stack that listens on \`$PORT\`, and Cloud Run makes it easy to deploy and automatic handles scaling in response to the demand on your service. It abstracts away all the details of a typical Kubernetes deployment 🤯

It is as easy as `gcloud run deploy SERVICE-NAME --image gcr.io/PROJECT-ID/IMAGE` if you deploy a pre-built Docker image using the [gcloud CLI](https://cloud.google.com/sdk/docs/). You can choose whether you want a public accessible endpoint, or a private endpoint that is only accessible from another GCP component with the right role/IAM permissions (this makes it optimal for internal microservices or worker processes/asynchronous handling for example by using [Pub/Sub Push subscriptions with delivery to Cloud Run](https://cloud.google.com/run/docs/triggering/pubsub-push)). I'll come back to building images and options for deploy later 🚀 

If you don't have any traffic it scales to zero, and it doesn't cost a thing! Like a lambda/function. But you choose the programming language and webserver without restrictions. You can even use custom and OS binaries if you include them in the Docker image. You only pay for the resources used during a request billed to the nearest 100 ms (for details check out their [Pricing](https://cloud.google.com/run/pricing)). So you don't pay for compute instances idling around in a cluster when you are not handling any traffic. It's true serverless 🏆

The request processing model is almost like the per-request model of lambda/functions, but backed by a container where _you_ supply the web runtime. This model and the "you-pay-only-per-request" come with some constraints. As soon as the request is finished, the container instance does not have any CPU available. Therefore you _can't run any background processes._ I recommend you read about these constraints in the [Container Runtime Contract](https://cloud.google.com/run/docs/reference/container-contract). You also have the cold-start issue found on other lambda/function offerings. The container itself can be reused if you get _close-enough_ subsequent requests, and each container [can handle multiple requests](https://cloud.google.com/run/docs/about-concurrency) (the default and max per container is 80, but this is configurable). 

### Comparing with Kubernetes

Kubernetes is a full-fledged container orchestration platform that offers advanced scalability and configuration flexibility. It gives you complete control over the container orchestration. Everything from from networking, to storage, to how you set up routing and observability. It also supports stateful applications. 

If you don't need all this and the complexity it brings to the table, then _Managed Cloud Run_ is a much simpler serverless approach. If you do need that anyway, or you already have a GKE or Anthos cluster on GCP, you can still use traditional Kubernetes deployment for some services and take advantage of Cloud Run’s ease of use and scalability for other services. If you are interested see this guide on [Cloud Run on Anthos](https://cloud.google.com/run/docs/quickstarts/prebuilt-deploy-gke).

### Comparing with other alternatives

Other cloud providers also has the ability to run Docker containers without provisioning clusters. In some sense you can compare it to [AWS Fargate](https://aws.amazon.com/fargate/) and [Azure Container Instances](https://azure.microsoft.com/en-us/services/container-instances/). But the difference here is that Cloud Run will actually automatically scale to zero, and you only pay for resources during a request. On the other platforms you pay for the whole container while it is running. 

### Deployment

### Scaling and concurrency

### Configuration

### Caveats

Cloud Run suspends the cpu when you are not serving traffic.

No background processes.

No filesystem (actually you have a ephemeral in-mem filesystem that counts toward the memory available to the container).

Startup time.

### Summary

🎉

Splash photo by [asoggetti](https://unsplash.com/@asoggetti?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
