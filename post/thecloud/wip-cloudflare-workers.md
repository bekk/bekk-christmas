---
calendar: thecloud
post_year: 2019
post_day: 18
title: Cloudflare Workers
ingress: >-
  [Cloudflare Workers](https://workers.cloudflare.com/) is a service that let's
  you run serverless functions on [Cloudflare's Edge
  Network](https://www.cloudflare.com/network/) close to the where the user is
  located. Combined with the [V8 engine](https://v8.dev/) this creates a highly
  scalable and fast way to write functions in the cloud.
links:
  - title: Cloudflare Workers
    url: 'https://workers.cloudflare.com/'
authors:
  - Henrik Wingerei
---
## Intro to cloudflare workers
- FaaS = Container (cold start)
- Workers = V8 engine. Runs close to the user. No cold start. CDN

Function as a Service is becoming more and more common, and all major cloud providers have this type of service in their service catalog. AWS has Lambda, Google has Cloud Functions and Azure has Azure Functions. One thing all these services have in common, is that they are built on top of docker. Docker is abstracted away from the user, but the underlying runtime is docker and container technology on all these services.

## Simple example

## Use cases

## Summary

