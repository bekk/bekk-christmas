---
calendar: thecloud
post_year: 2020
post_day: 21
title: Boundary and remote access based on trusted identity
ingress: I recently switched projects, and if you've ever started at or switched
  jobs to a mid- or large-size enterprise, you probably know the onboarding
  process can be both long and exhausting. Possibly sitting there weeks on end,
  without access to the services you need, and feeling like a bother because you
  have to ask one of your colleagues for help the 3027th time this week. Welp, I
  just shudder at the thought of it, and if you do too, I just might have the
  answer to all our *boundary* issues!
links: []
authors:
  - Kenan Mahic
---
## By Whom and What
As the cloud space has gotten bigger, so has the need for tools and products for provisioning, security and run-and-connect tools for cloud-computing infrastructure. So when Hashicorp, one of the leading companies in this commercial area decides to announce two new products(HashiConf 2020) for the first time in 5 years, it's worth taking a peek. One of these products is Waypoint, which in their words is a tool for consistent developer workflow to build, deploy, and release applications across any platform. That might be intriguing for some, but what really peaked my interest was Boundary, a cloud security framework for access control.

Boundary lets you access any system from anywhere based on user identity. Other providers for cloud infrastructure have started taking similar routes for access control, but unlike most of them Boundary is both cloud-agnostic *and* open-source. If that and the gruesome onboarding process I pictured earlier was not enough to get you excited, let's take a deeper look.


## Traditional Workflow

To understand why this is good news we should probably take a look at a traditional workflow for securely connecting to applications and critical systems first. A typical traditional workflow can summarized as:

1. A VPN that you need to use to connect. 

2. After having connected to the VPN you often land on SSH bastion host or a jump box 

3. Then from the jump box you in many cases need to SSH through a firewall. 

4. At last, after all this hassle, you're finally at the machine you want to access. 

| ![Traditional](https://www.datocms-assets.com/2885/1602530950-boundary-blog-3-edited.png?fit=max&fm=png&q=80&w=800)| 
|:--:| 
| *HashiConf2020 Boundary presentation* |

If you honestly do not feel the complexity of that process should be reason enough for transitioning, there are several other challenges(besides the complexity) coupled with this process as well. For one, once you've connected through the VPN, you *are* inside the network. This greatly increases the attack surface, and as many in InfoSec will tell you, having a small attack surface is one of the best ways to minimize cyberattack threats. 

Typically to safeguard against this risk you would have to put up a firewall in front of the target hosts, operating on IP and port identities. A pretty fragile setup in dynamic environments like public clouds where IPs are ephemeral. Not only is it fragile, managing internal firewalls is also quite time consuming.

Another issue is the onboarding and offboarding process in regards to VPNs. I used to be part of the IT team for one of my school's student societies, where some of the student societies' services were only accessible from the internal network at school. Setting up these accesses could be quite a struggle, as you need to figure out the routing, access-lists and so on. The accesses were only issued for a limited term, usually expiring when the students were finished at university. However, it is easily imaginably that in enterprises where access is not time-limited, that nobody remembers to actually remove the privileges from employees and contractors.

Finally, the user needs to know the credentials of the end target host that they want to access. If this target is a database, then the user needs to have a username and password to the database. That’s also a concern from a security point of view because the credentials are exposed to the user. 

There is also the issue of the user having to memorize all their usernames and passwords. Even if the application backend synchronizes logins, like a database or active directory, each user must login individually to the application. There’s a not-insignificant cognitive load for the user to manage all the different usernames and passwords assigned to them in an enterprise to get into all the different applications they need to do their job.


## HashiCorp Boundary’s Structure and Hierarchy
Now let's take a look at the Boundary workflow. A picture describing it can be seen below.

| ![Boundary](https://www.datocms-assets.com/2885/1602530901-boundary-blog-1-edited.png?fit=max&fm=png&q=80&w=800)| 
|:--:| 
| *HashiConf2020 Boundary presentation* |

1. Once again the user here needs to access a host or a set of hosts, The user now logs in with a trusted identity such as AWS SSO, Okta, GitHub, or Active Directory. This is outside of Boundary. The identity provider would integrate with Boundary. From an onboarding and offboarding perspective it’s pretty easy since it’s tied to a trusted identity provider. Once a user is no longer part of the company, you can take them out of whatever identity provider you wish and you’re good to go.

2. The next step is authorizing who gets to do what. This is achieved by using roles and logical services, making authorization robust in dynamic environments removing the brittleness associated with static IP addresses

3. The third step is that the user has a catalog to select different applications and hosts that they have access to. The user most importantly does not have access to the entire network because Boundary is brokering the connection.

4. Finally, the user will have access to the target host but the application credentials themselves are not exposed to the user. This can be done dynamically by creating short-lived credentials through Vault and passing them to the user. Taking this even further, a user would end up directly on the target host without having any credentials seen at all. Integration with Vault and identity providers is not yet available in this 0.1 release but is on the [roadmap](https://www.boundaryproject.io/docs/roadmap).

## Key points
