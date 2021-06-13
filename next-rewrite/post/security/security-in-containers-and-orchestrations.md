---
calendar: security
post_year: 2018
post_day: 17
title: Security in containers and orchestrations
image: 'https://c1.staticflickr.com/3/2825/10921733615_0345ed11ec_b.jpg'
ingress: >-
  Containers is the currently best way to build software for platform
  independence, and an orchestration service manages them, but how about that
  security?
links:
  - title: >-
      Datacenter Orchestration Security and Insecurity: Assessing Kubernetes,
      Mesos, and Docker at Scale
    url: 'https://youtu.be/lXggHTqznOI'
  - title: >-
      Getting started with containers — A brief introduction for IT
      professionals
    url: 'http://techgenix.com/getting-started-with-containers/'
  - title: Utfordringer med skysetting av Docker-containere
    url: >-
      https://blogg.bekk.no/utfordringer-med-skysetting-av-docker-containere-380196d74511
authors:
  - Didrik Sæther
---
## Containers
In the same way as a shipping container is a standardized unit for transporting goods from one location to another. Software has adapted the same way of thinking. Package software into a standardized unit for simplifying development, shipping and deployment.
This leaves a smaller footprint on the servers that run the applications, but also allows higher server density.

One argument is often that containers are more secure than the alternatives. One of the reasons is that the attack surface is smaller, and allows for hardening of the host. It's less complex to protect an application and its dependencies within a self-contained unit.

### Attacks
There are still pitfalls! Malicious container images are still a problem today, this is identical to the problem Google faces with malicious applications in Google Play.
Another problem is container escapement. This one is scary as it allows for lateral movement, or compromise of a an entire cluster.


## Orchestration services
Orchestration is a way to organize containers for automation. This allows fast scaling and cluster management in order to coordinate running containers across multiple nodes (computers) in a cluster. Docker Swarm and Kubernetes are both open-source, and without a doubt the most used orchestrators today, and have moved from the [SOA](https://en.wikipedia.org/wiki/Service-oriented_architecture) way of doing it to the more modern microservice.
_What? I still don't get it.._ Ok, we can compare an orchestration service to the actual orchestration of music. Where the developer is the composer, the worker nodes are the musicians, the manager node is the conductor.


### Attacks
Keeping with the music theme:
There are many ways and motives for an adversary to interrupt the sweet music played by the orchestra. An attacker could throw rotten tomatoes. He could sit in the audience with a tape recorder and sell the bootleg recording after the show. Or he could be more Machiavellian and infiltrate the orchestra to play the wrong notes on his instrument with intent. The other musicians would abruptly kick him out after this, but if the attacker can impersonate as the conductor, he could wreak havoc in the orchestra, and the musicians would not dare to question his leadership.

The trust given to an orchestration service makes it a target for attackers, as a large portion of applications running in the cloud are containers. See the problem?

The way to protect your orchestration service is to employ strong cryptographic identity for all nodes, and this can be used for providing mutual transport layer security. Fine grained access control can reduce your attack surface. [As we saw last week](https://www.twistlock.com/labs-blog/demystifying-kubernetes-cve-2018-1002105-dead-simple-exploit/) Kubernetes did not have this in place as the bug allows for bypassing the authorization logic.
Enable encrypted traffic between nodes, even though it will cost you a small amount in terms of computation. Remember that we have traded code-complexity for network-complexity, and that the side effect of this is that data on the wire can be read and modified if it is unencrypted.

## Final notes
Should you use containers? Yes!
Should you trust your orchestrator? Propably..
Should you take action to harden the host you run your containers on? Definitely

Photo credit: Containers by [Glyn Lowe](https://www.glynlowe.com), under [CC 2.0](https://creativecommons.org/licenses/by/2.0/)
