---
calendar: thecloud
post_year: 2019
post_day: 18
title: Cloudflare Workers
ingress: >-
  [Cloudflare Workers](https://workers.cloudflare.com/) is a service that let's
  you run serverless functions on [Cloudflare's Edge
  Network](https://www.cloudflare.com/network/) close to where the user is
  located. Combined with the [V8 JavaScript engine](https://v8.dev/) this lets
  you write highly scalable functions in the cloud with fast startup and
  response times. This article shows how you can get started using Cloudflare
  Workers, and present some possible use cases.
links:
  - title: Cloudflare Workers
    url: 'https://workers.cloudflare.com/'
  - title: Quick Start
    url: 'https://developers.cloudflare.com/workers/quickstart/'
  - title: Cloudflare Workers Docs
    url: 'https://developers.cloudflare.com/workers/'
authors:
  - Henrik Wingerei
---
## Introduction

Function as a Service (FaaS) is becoming more and more common, and all major cloud providers have their own FaaS offering. AWS has Lambda, Google has Cloud Functions and Azure has Azure Functions. One thing all these services have in common, is that they are built on top of container technology. The underlying container is abstracted away from the user, but the underlying runtime is based on containers on all these services. 

Using containers works quite well, but one issue that often is mentioned when talking about FaaS is cold starts. Cold starts refers to the delay between the execution of a function after someone invokes it. If your function gets triggered often, the underlying container is running and "warm", and will execute your function immediately. But if it's been a long time since your function has been triggered, the underlying container is not running and "cold". The next time your function is triggered, you have to wait for the underlying container to start, and the language runtime has to be the initialised before your function is executed.

Cloudflare Workers takes a different approach to FaaS, and instead of using container technology they use the JavaScript V8 engine as the underlying runtime. This is the same engine used by Chromium and Node.js. Cloudflare Workers makes it possible to run hundreds, or thousands of different functions in their own sandboxed environment on the same underlying V8 engine (called [Isolates](https://developers.cloudflare.com/workers/about/how-it-works/)). When we don't have to wait for a container to start, this leads to very fast startup times, and in practice no cold starts. The functions are also executed close to the user, as they executes on Cloudflare existing Edge network which they use for their [CDN product](https://www.cloudflare.com/cdn/).

## How does this look in practice?

Cloudflare offers a CLI tool called [Wrangler](https://github.com/cloudflare/wrangler) to let you manage your workers. Wrangler can be installed via npm with the command `npm i @cloudflare/wrangler -g`.

To bootstrap a JavaScript project, simply run the following command.

```bash
$ wrangler generate my-project https://github.com/cloudflare/worker-template
```

This command creates a folder including all files from the template passed in as the last argument. In the folder you have one `index.js` file which contains your function code.


```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response('Hello Christmas!', {
    headers: { 'content-type': 'text/plain' },
  })
}
```

A Cloudflare Worker function consists of two main parts. The first part is an event listener which listens to a so called [FetchEvent](https://developers.cloudflare.com/workers/reference/apis/fetch-event/). This event handler will be called everytime there comes a new HTTP request to your worker.

The last part is an event handler that returns a [Response](https://developers.cloudflare.com/workers/reference/apis/response/) object, and is passed as an argument to the event's `respondWith` method. In this example all clients will get a `Hello Christmas!` text in response.

## How to deploy your worker

Wrangler comes with a `preview` command which lets you test your worker by taking your built worker project, and upload it to a unique URL at `cloudflareworkers.com`. This means that you don't test your worker locally, but actually with the workers runtime. If you add a `--watch` flag to your `preview` command, the worker will be updated immediately when you save your function code.

To deploy your function you use the `publish` command. After setting up wrangler with the correct permissions, wrangler will deploy your worker either to a custom domain managed by Cloudflare, or to a `workers` domain. After a few seconds the URL for your brand new worker is printed, and you can invoke your function by navigating to the URL.

```
$ wrangler publish
💁  JavaScript project found. Skipping unnecessary build!
✨  Successfully published your script to https://my-project.<account>.workers.dev
```

## Use cases

The example above is of course a simple hello world example, and you might think what can Cloudflare Workers actually be used for? If you already uses Cloudflare as a CDN, workers could be a good way for redirecting or rewriting the response based on the incoming request. [This example](https://developers.cloudflare.com/workers/templates/pages/conditional_response/) show for instance how a worker could be used to return a response based on the incoming request’s URL, HTTP method, User Agent and other criteria.

But workers could also be used for more standalone functionality, like [hosting a React App](https://developers.cloudflare.com/workers/tutorials/deploy-a-react-app/) or building a [function that generates QR codes](https://developers.cloudflare.com/workers/tutorials/build-a-serverless-function/).

## Summary

Cloudflare Workers is a really interesting alternative in the FaaS market. Especially since it's based on the V8 Engine instead of containers. It's also specially interesting if you already uses Cloudflare as a CDN, and it will be really interesting to see how the service evolves in the next months.

It's also worth mentioning that while Cloudflare recommends using their CLI tool Wrangler, it's supported by Serverless Framework (using the [Serverless Cloudflare Workers plugin](https://github.com/cloudflare/serverless-cloudflare-workers)) and Terraform (using the [Terraform Cloudflare Provider](https://www.terraform.io/docs/providers/cloudflare/guides/version-2-upgrade.html)).
