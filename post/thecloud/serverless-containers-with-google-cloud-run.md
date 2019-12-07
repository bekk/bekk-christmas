---
calendar: thecloud
post_year: 2019
post_day: 7
title: Serverless Containers with Google Cloud Run
image: 'https://i.ibb.co/Qcz73tm/google-cloud-run-christmas-post.jpg'
ingress: >-
  Do you want to run stateless container-based applications or microservices,
  but don't need all the features and management of a full-fledged Kubernetes
  cluster? Or do you crave the serverless model with _only-pay-what-you-use_
  billing of other FaaS platforms, but find the runtime model and supported
  languages/versions too limited? Let's have a look at [_Google Cloud
  Run_](https://cloud.google.com/run/) - a fully managed serverless platform for
  running stateless HTTP-driven containers. And where you only pay for resources
  used during requests.
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
Back in april '19 at the _Google Cloud Next_ conference [Cloud Run was released in public beta](https://cloud.google.com/blog/products/serverless/announcing-cloud-run-the-newest-member-of-our-serverless-compute-stack). Then a few weeks ago at _Cloud Next_ in London, they [announced Cloud Run as generally available](https://cloud.google.com/blog/products/serverless/knative-based-cloud-run-services-are-ga). Enough with the links already! So what is Cloud Run? It's is a managed compute platform that enables you to run stateless containers accessible via HTTP. It is very simple to deploy and run a containerized application.

It is built upon the open source [Knative](https://knative.dev/) project, and you can choose to run your containers on _Fully Managed Cloud Run_, or in a _Google Kubernetes Engine_ cluster with Cloud Run for [Anthos](https://cloud.google.com/anthos/) on GCP or other places with Anthos on VMware (Anthos is Google's new hybrid/multi-cloud platform). I'll focus on the fully managed version here.

## Fully Managed Cloud Run

Cloud Run lets you run stateless HTTP-driven containers, without worrying about the underlying infrastructure. You can focus on writing application code, package a Docker-image with your favourite web stack that listens on `$PORT`, and Cloud Run makes it easy to deploy and automatic handles scaling of your service. It abstracts away all the details of a typical Kubernetes deployment 🤯

It is as easy as `gcloud run deploy SERVICE-NAME --image gcr.io/PROJECT-ID/IMAGE` if you deploy a pre-built Docker image using the [gcloud CLI](https://cloud.google.com/sdk/docs/). You can choose whether you want a public endpoint, or a private endpoint that is only accessible from other GCP components with the right role/IAM permissions. This makes it suitable for both public APIs or internal microservices/worker processes/asynchronous handling. For example by using [Pub/Sub Push subscriptions with delivery to Cloud Run](https://cloud.google.com/run/docs/triggering/pubsub-push). I'll come back to building images and options for deploy later 🚀 

If you don't have any traffic it scales to zero, and it doesn't cost a thing! Like a lambda/function. But you choose the programming language and webserver without restrictions. You can even use custom and OS binaries if you include them in the Docker image. You only pay for the resources used during a request, rounded up to the nearest 100 ms (for details check out [Pricing](https://cloud.google.com/run/pricing)). You don't pay for compute instances idling around in a cluster when you are not handling much or any traffic 🎉

The request processing model is almost like the per-request model of lambda/functions, but backed by a container where _you_ supply the runtime. This model and the "you-pay-only-per-request" come with some constraints. As soon as the request is finished, the CPU to the container instance is throttled (ie. not available). Therefore you _can't run any background processes._ I recommend you read about these constraints in the [Container Runtime Contract](https://cloud.google.com/run/docs/reference/container-contract). Cold-starts can be an issue like other lambda/function offerings, but this can be limited because the container itself can be reused if you get _close-enough_ subsequent requests. In addition each container [can handle multiple requests](https://cloud.google.com/run/docs/about-concurrency) (the default and max concurrency per container is 80, but this is configurable down to 1) ⚡️

## Compared to Kubernetes

Kubernetes is a full-fledged container orchestration platform that offers advanced scalability and configuration flexibility. It gives you complete control over the container orchestration. Everything from networking, to storage, to how you set up routing and observability. It also supports stateful applications. 

If you don't need all this and the complexity it brings to the table, then _Managed Cloud Run_ is a much simpler serverless approach. If you do need it anyway, or you already have a GKE or Anthos cluster on GCP, you can still use traditional Kubernetes deployment for some services and take advantage of Cloud Run’s ease of use and scalability for other services. If you are interested see this guide on [Cloud Run on Anthos](https://cloud.google.com/run/docs/quickstarts/prebuilt-deploy-gke).

## Compared to other cloud providers

Other cloud providers also has the ability to run Docker containers without provisioning clusters. In some sense you can compare it to [AWS Fargate](https://aws.amazon.com/fargate/) and [Azure Container Instances](https://azure.microsoft.com/en-us/services/container-instances/). But the difference here is that Cloud Run will actually automatically scale to zero, and you only pay for resources _during a request_. On the other platforms you pay for the whole container while it is running.

Comparing Cloud Run to different FaaS platforms like Lambda and Cloud Functions, I have described some advantages regarding freedom of choice. But this also comes with more responsibility! You own a bigger piece of the stack, and have to update your Docker images and web serving runtime from time to time. This is handled for you on e.g. Lambda. 

## Developing Cloud Native apps for Cloud Run

Cloud Run seems to be a perfect match for developing and running Cloud Native applications that follow [The Twelve-Factor App](https://12factor.net/) principles. Apps where dependencies are explicitly managed and packaged in a Docker image. You have the build, deploy, and run stages. Very little dev/prod parity (you can build and run the same Docker-container locally and in Cloud Run). Stateless processes that binds to `$PORT`, config can be stored in the environment, it only has an ephemeral filesystem (state must be persisted in backing stores), a horizontal scaling model and logs are treated as event streams and sent to [Stackdriver Logging](https://cloud.google.com/logging/).   

All you need is a Dockerfile and an application that starts an HTTP server on the supplied `$PORT`. Actually you don't even need a Dockerfile if you are building an app for the JVM and use Google's [Jib tool](https://github.com/GoogleContainerTools/jib) (see more on Jib in our [java.christmas episode 3](https://java.christmas/2019/3)). Here is an example of a [Spring Boot application with Kotlin deployed to Cloud Run](https://codelabs.developers.google.com/codelabs/cloud-kotlin-jib-cloud-run/) with all the stages involved.

## Build and deployment

You have several options for build and deploy. You can use the Cloud Console/UI, the `gcloud` CLI and [automatic deploy from Git](https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build). The [documentation](https://cloud.google.com/run/docs/building/containers) is so good and concise that I won't flesh it out here, but merely give a small example. 

**Build using Cloud Build CLI in your sources folder** 

`gcloud builds submit --tag gcr.io/[PROJECT-ID]/[IMAGE]`

**Deploy using CLI**: 

`gcloud run deploy SERVICE-NAME --image gcr.io/PROJECT-ID/IMAGE`

You can set which region to deploy in with `--region` and many other config flags as described below.

## Configuration

You can specify a load of config flags when deploying or _updating_ a revision of your service. See full details [here](https://cloud.google.com/sdk/gcloud/reference/run/deploy). These configuration values can also be done directly in the Cloud Console/UI. Here are some examples. 

To update the [allocated memory](https://cloud.google.com/run/docs/configuring/memory-limits) for an instance use `gcloud run services update SERVICE-NAME --memory SIZE`. 

You can change the [concurrency](https://cloud.google.com/run/docs/configuring/concurrency) (how many requests are dispatched in parallel per container) and the [`max number of instances`](https://cloud.google.com/run/docs/configuring/max-instances) with `--concurrency=[NUMBER]` and `--max-instances=[NUMBER]` respectively. This is very useful if you for example use Cloud Run as a consumer for a Pub/Sub Push subscription, where these values can tweak how fast you can process messages. 

If you wan't to store environment-specific configuration like URLs to other services, you can set environment variables with the `deploy` or `update` command (or better, maybe use a runtime config server like [Consul](https://www.consul.io/) or [Cloud Config API](https://cloud.google.com/deployment-manager/runtime-configurator/reference/rest/)). Example: `--set-env-vars=[KEY=VALUE,…]`. If you need to store secrets, you should be [careful with env variables](https://diogomonica.com/2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/). Actually the Cloud Run UI shows them in plain text! You could use [Berglas](https://github.com/GoogleCloudPlatform/berglas) or [Vault](https://www.vaultproject.io/) (with the setup and management it brings if you don't use it already).

## Summary

Ok, this already got way longer than anticipated 😇 tl;dr: Cloud Run is pretty awesome for lightweight serverless applications where you only pay for what you use and can scale to zero! It's pretty darn easy to get started, but it has a lot of features I don't even mentioned. Like [Custom Domains](https://cloud.google.com/run/docs/mapping-custom-domains), [Authentication](https://cloud.google.com/run/docs/authenticating/overview), [Monitoring/Health](https://cloud.google.com/run/docs/monitoring) and [Logging](https://cloud.google.com/run/docs/logging).

Go `gcloud builds submit` and `gcloud run deploy` something 🚀  

\---

Splash photo by [asoggetti](https://unsplash.com/@asoggetti?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
