---
calendar: thecloud
post_year: 2020
post_day: 8
title: Uffizzi App Platform
image: https://images.unsplash.com/photo-1466278313810-9aca9abea861
ingress: Uffizzi is a new cloud platform that helps developers deploy and host
  applications with zero cloud infrastructure knowledge. Uffizzi is similar to
  Heroku in many ways, but it is built on top of GKE, which means that it has a
  very solid and scalable foundation. This blog post is a quick guide to
  deploying applications to Uffizzi.
description: uffizzi, docker, containers, Heroku
authors:
  - Nordine Ben Bachir
---
# Getting started

Uffizzi proposes different paid plans for hosting, but I'm using the free environment for this demo. It provides:

* 0.5Gb of memory
* Custom Domain
* Free SSL
* Unlimited Build Minutes
* Continuous Deployment

The source code is on [Github](https://github.com/nordineb/Uffizzi-demo) and the application is live <https://uffizzi.bekkops.com/>

# CI/CD pipeline

Uffizzi can set up and deploy an application directly from Github. There is no need for a Dockerfile either, Uffizzi is using Heroku buildpacks to detect the appropriate stack to build the application and the container:

<img src="https://github.com/nordineb/Uffizzi-demo/blob/main/images/buildpacks.png?raw=true" alt="build-log" width="600"/>

Uffizzi watches our Github repository and automatically builds and deploys changes immediatly. It worked very well for my simple application, but there is little debugging possibilities. Alternatively, Uffizzy can monitor a Dockerhub account and automatically deploy new images. 

# Custom Domain

Uffizzi is one of the few platforms that offer custom domains + SSL as a part of its free offering. It's always annoying to have to use Cloudflare or AWS Cloudfront on top of a website just to solve that problems. 

# Conclusion

Overall, Uffizzi provides a great experience for those who just want to run a web application without handling all the cloud infrastructure around.The free environment is fully functional and even provides custom domains with SSL. Give it a try if you are looking for a zero ops platform for your application.

# 👋