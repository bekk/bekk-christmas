---
calendar: thecloud
post_year: 2019
post_day: 2
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
For several years our advice has been to adopt managed cloud services from the global cloud vendors. However, many organizations in our market, especially in the public sector, are establishing on-premise private PaaS or CaaS platforms, usually based on Kubernetes or OpenShift. Although these platforms are superior compared to the previous generation of platforms, we claim that this approach is probably a disservice to the organizations. Let us explain.

The disadvantages of the private PaaS are well known. Infrastructure is acquired and operated in-house, not leveraging the cost and utilization factor benefits of the public cloud. In-house operations are not able to match the availability, scalability, security, robustness, observability etc. of public cloud platforms. Additionally, they cannot match either the breadth of services or the innovation pace in the cloud. These disadvantages alone should be more than sufficient to not go down the PaaS route.

However, the main reason for warning against the private PaaS is more dire and obscure: _For most organizations, the private PaaS will serve as a pretext for not adopting public cloud_. Management will be happy, “✔ _we are in the cloud_”. The IT Operations department, a heavy stakeholder in this discussion, will be happy; they move into the center of the organization (and they have even more work to do now to operate the old platform and the sparkling new platform). Even a few developers will be happy, as they get to develop, deploy to and operate a new platform while playing with new technology.

Looking into the crystal ball for the next few years, we see too many of these organizations still stuck on their private PaaS. The final nail in the coffin is that establishing a PaaS demands a lot of brain power, and the best people will be allocated to this task. However, only a few organizations will have the capacity to succeed in this endeavor; the rest will end up with a half-baked, inconsistent platform. Meanwhile, little attention is used on moving to managed services in the public cloud.

Choosing a private PaaS is your decision. It does not have to be this way.
