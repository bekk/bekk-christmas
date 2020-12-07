---
calendar: thecloud
post_year: 2020
post_day: 8
title: Uffizzi App Platform
ingress: Uffizzi is a new cloud platform that helps developers deploy and host
  applications with zero cloud infrastructure knowledge. Uffizzi is similar to
  Heroku in many ways, but it is built on top of GKE which means that it has a
  very solid and scalable foundation. This blog post is a quick guide to
  deploying applications to Uffizzi.
description: uffizzi, docker, containers, Heroku
authors:
  - Nordine Ben Bachir
---

<img src="https://github.com/nordineb/Uffizzi-demo/blob/main/images/cloud-env.png?raw=true" alt="build-log" width="600"/>

For this [demo](https://github.com/nordineb/Uffizzi-demo), I'm using the free enviroment from Uffizzi:
* 0.5Gb
* Custom Domain
* Free SSL
* Unlimited Build Minutes
* Continuous Deployment

The web application is live at [https://uffizzi.bekkops.com](https://uffizzi.bekkops.com)

# CI/CD pipeline

Uffizzi can set up and deploy an application directly from Github, no need for building the docker container and pushing to Dockerhub. It looks like Uffizzi is using Heroku Buildpacks:

<img src="https://github.com/nordineb/Uffizzi-demo/blob/main/images/buildpacks.png?raw=true" alt="build-log" width="600"/>

Uffizzi watchs our connected Github repository and automatically builds and deploys changes. 

# Custom Domain

# Conclusion

Overall, Uffizzi provides a great experience for those who just want to run a web application without handling all the cloud infrastructure around. The free environment is fully functional and even provides custom domains with SSL. 👏