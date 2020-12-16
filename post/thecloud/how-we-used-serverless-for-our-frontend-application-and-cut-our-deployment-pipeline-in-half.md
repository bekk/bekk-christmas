---
calendar: thecloud
post_year: 2020
post_day: 17
title: How we used serverless for our frontend application and cut our
  deployment pipeline in half
ingress: ""
authors:
  - Eirik Årseth
---
A while back we needed to host a react app. Sounds simple right? Thats just some static files (html, css and js). It got a bit more complicated when we needed to add a navigation bar, that was shared across the organization. The contents of this nav-bar would change frequently, and we had no way of "subscribing" to these changes. Instead, it needed to be added, or decorated🎄 on top of our frontend app dynamically. ![app sketch](https://github.com/eirarset/bekk-christmas-sketches/blob/main/ServerlessSketch.png?raw=true) Originally, before going serverless, this decoration of our app was handled by a Node.js application that would append the nav-bar to the top of our html, and serve the decorated app.

The app ran in a container, that was deployed to the organizations own IaaS (infrastructure as a service) solution, built on top of kubernetes. Therefore any new deployment of this app was quite elaborate.

The deploy pipeline would then be:

1. Push react app to github
2. CircleCI builds production version of frontend(```npm run build```)
3. CircleCI builds docker image
4. CircleCI pushes docker image to docker hub
5. IaaS solution pulls docker image
6. IaaS solution spins up container(s)

Thats a pretty extensive pipeline for a simple "frontend" application. Time from git push to being "live" would usually be about 3-5 minutes. And if you deploy frequently (like we do), that adds up.

## Going serverless

Dealing with containers and kubernetes is perhaps overly complex for a simple frontend application, such as ours. We therefore decided to go the serverless path:

Instead of having a single app that both decorated, and served the frontend, we would seperate the two: The react app would be deployed to an [AWS S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html), which provides functionality for hosting a static website. A serverless function would handle the decoration.

The serverless function, would then be the app-entrypoint for our users. In order to avoid the decorator function being executed for every request, we put a [cdn](https://en.wikipedia.org/wiki/Content_delivery_network) that would cache the response, in front of the entire solution. The architecture we arrived at looked something like this.

![Serverless app architecture](https://github.com/eirarset/bekk-christmas-sketches/blob/main/Serverless%20sketch%202.png?raw=true)

GCP, AWS and Azure all provide Node.js serverless runtimes. We found [AWS Lambdas](https://aws.amazon.com/lambda/) to be the best alternative, both in regards to performance and pricing. Additionally, they have the nifty service [Lambda@Edge](https://aws.amazon.com/lambda/edge/) which made executing the serverless function at the right time much simpler.

A serverless architecture provides for a much simpler deployment pipeline, at least for our use case 🤷‍. We ended up with three simple steps:

1. Push react app to github
2. Build server builds production version
3. Build server pushes files to AWS S3.

That's a bit nicer than our original 6 steps - and it uses about half the time 🏃‍♀️💨

## Lessons learned

Going serverless was just one of many possible solutions for our use case, but we liked it: It made developer life simple(r). Deploying a serverless function [is super easy](https://thecloud.christmas/2019/1), and lets you focus on writing your buisness logic, and disregard infrastructure. Now add in its infinite scaleability and smooth pipeline, and I'm convinced 🤓