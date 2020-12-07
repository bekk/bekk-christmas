---
calendar: thecloud
post_year: 2020
post_day: 8
title: Uffizzi App Platform
ingress: Uffizzi is a new cloud platform that helps developers deploy and host
  applications with no cloud infrastructure knowlege. Uffuzzi is similar to
  Heroku in many ways, but it is built on top of GKE which means that it has a
  very solid and scalable foundation. Let's deploy a simple python web
  application to Uffuzzi.
authors:
  - Nordine Ben Bachir
---
For this demo, I'm using the free enviroment from Uffizzi which provides:

* 0.5Gb
* Custom Domain
* Free SSL
* Unlimited Build Minutes
* Continuous Deployment
* Never Sleeps

Source code is available here: <https://github.com/nordineb/Uffizzi-demo>

Uffizzi is able to detect the create the Docker container for you

# Conclusion

Overall, Uffizzi provides a great experience for those who just want to run a web application without handling all the cloud infrastructure around. The free environment is fully functional and even provides custom domains with SSL.