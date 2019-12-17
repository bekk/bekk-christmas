---
calendar: thecloud
post_year: 2019
post_day: 18
title: Cloudflare Workers
ingress: >-
  [Cloudflare Workers](https://workers.cloudflare.com/) is a service that let's
  you run serverless functions on [Cloudflare's Edge
  Network](https://www.cloudflare.com/network/) close to the where the user is
  located. Combined with the [V8 engine](https://v8.dev/) this lets you write
  highly scalable functions in the cloud with fast startup and response time.
  This article shows how you can get started using Cloudflare Workers and
  present some possible use cases.
links:
  - title: Cloudflare Workers
    url: 'https://workers.cloudflare.com/'
authors:
  - Henrik Wingerei
---
## Introduction

Function as a Service is becoming more and more common, and all major cloud providers have their own FaaS offering. AWS has Lambda, Google has Cloud Functions and Azure has Azure Functions. One thing all these services have in common, is that they are built on top of container technology. The underlying container is abstracted away from the user, but the underlying runtime is based on containers on all these services. 

Using containers works quite well, but one issue that often is mentioned when talking about FaaS is cold start. Cold start refers to the delay between the execution of a function after someone invokes it. If your function gets triggered often, the underlying container is running and "warm", and will execute your function immediately. But if it's been a long time since your function has been triggered, the underlying container is not running and "cold". The next time your function is triggered, you have to wait for underlying container to start and the language runtime has to be the initialised before your function is executed.

Cloudflare Workers takes a different approach to FaaS and instead of using container technology they use the JavaScript V8 engine as the underlying runtime. This is the same engine used by Chromium and Node.js. Cloudflare Workers makes it possible to run hundreds, or thousands of different functions in their own sandboxed environment on the same underlying V8 engine. And without the need for waiting for a container to start, this leads to very fast startup times, and in practice no cold starts. The functions are also executed close to the user, as they executes using Cloudflare existing Edge network which they use for their [CDN product](https://www.cloudflare.com/cdn/).

## How does this look in practice?

* Simple code example and deployment using wrangler
* Mention that it comes with plugins for serverless framework and terraform

Cloudflare offers a CLI tool called [Wrangler](https://github.com/cloudflare/wrangler) to let you manage your workers. Wrangler can be installed via npm with the command `npm i @cloudflare/wrangler -g`

To bootstrap a JavaScript project, simply run the following command:

```bash
$ wrangler generate my-project https://github.com/cloudflare/worker-template
```

This command creates a folder including all files from the template passed in as the last argument. In the folder you have one `index.js` which contains your function code and the code is shown below.


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

A Cloudflare Worker function consists of two main parts. The first part is an event listener which listens to a so called [FetchEvent](https://developers.cloudflare.com/workers/reference/apis/fetch-event/). This event handler will be called everytime there comes a new http request to your worker.

The last part is an event handler that returns a `Response` object, and is passed as an argument to the event's `respondWith` method. In this example all clients will get a `Hello Christmas!` text in response.

## Deploy

To deploy your function run the following command

```
wrangle <deploy>
```

While Cloudflare recommends using their CLI tool Wrangler, Cloudflare Workers is also support by Serverless Framework (using the [Serverless Cloudflare Workers plugin](https://github.com/cloudflare/serverless-cloudflare-workers) and Terraform (using the [Terraform Cloudflare Provider](https://www.terraform.io/docs/providers/cloudflare/guides/version-2-upgrade.html)

## Use cases

* CDN rewrite
* Slackbot
* SPA

## Summary

* Interesting alternativ in the FaaS market.
* Especially if your're using Cloudflare as a CDN
