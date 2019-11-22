---
calendar: thecloud
post_year: 2019
post_day: 1
title: Private PaaS considered harmful
image: >-
  https://images.unsplash.com/photo-1457528877294-b48235bdaa68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80
ingress: The dire second level consequences of choosing a private PaaS...
links:
  - title: Public cloud - Tech Radar 2017
    url: 'https://radar.bekk.no/tech2017/arkitektur-og-plattform/public-cloud'
  - title: Private PaaS/IaaS - Tech Radar 2017
    url: 'https://radar.bekk.no/tech2017/arkitektur-og-plattform/private-paas-iaas'
  - title: Virtualisering 2.0 - Tech Radar 2016
    url: 'https://radar.bekk.no/tech2016/arkitektur-og-plattform/virtualisering-20'
  - title: Bygg din egen sky - Tech Radar 2018
    url: 'https://radar.bekk.no/tech2018/arkitektur-og-plattform/bygg-din-egen-sky'
  - title: What's wrong with my private cloud...
    url: >-
      https://blog.gardeviance.org/2015/02/whats-wrong-with-my-private-cloud.html
authors:
  - Trond Arve Wasskog
---
For several years our advice has been to adopt managed cloud services from the global cloud vendors. However, many organizations in our market, especially in the public sector, are establishing on-site private PaaS or CaaS platforms, usually based on Kubernetes and OpenShift. Although these platforms are better than the previous generation, we claim that choosing a private PaaS will be a disservice to the organizations themselves. Let me explain.

The disadvantages of the private PaaS are well known… operations, scalability, security, innovation. Additionally, only the most competent and capacity organizations will be able to pull it off.

The above reasons should be sufficient. However, the main reason for warning against the private PaaS is more dire and obscure: For most organizations, the private PaaS will serve as a pretext for not adopting public cloud. Management will be happy, check we are in the cloud. IT Operations, strong power, will be happy as they still av a job (actually they probably have more work to do now as the operate the dying old platform and the sparkling new platform). Even a few developers will be happy, as they get to develop, deploy to and partly operate a new platform. TODO: Leverandørmarkedet...
