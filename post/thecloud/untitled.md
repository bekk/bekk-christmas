---
calendar: thecloud
post_year: 2020
post_day: 21
title: Boundary and remote access based on trusted identity
ingress: I recently switched projects, and if you've ever started at or switched
  jobs to a mid- or large-size enterprise, you probably know the onboarding
  process can be both long and exhausting. Possibly sitting there weeks on end,
  without access to the services you need, and purely feeling like a bother
  because you have to ask one of your colleagues for help the 3027th time this
  week. Welp, I just shudder at the thought of it, and if you do too, I just
  might have the answer to all our *boundary* issues!
links: []
authors:
  - Kenan Mahic
---
## By Whom and What
As the cloud space has gotten bigger, so has the need for tools and products for provisioning, security and run-and-connect tools for cloud-computing infrastructure. So when Hashicorp, one of the leading companies in this commercial area decides to announce two new products(HashiConf 2020) for the first time in 5 years, it's worth taking a peek. One of these products is Waypoint, which in their words is a tool for consistent developer workflow to build, deploy, and release applications across any platform. That might be intriguing for some, but what really peaked my interest was Boundary, a cloud security framework for access control.

Boundary lets you access any system from anywhere based on user identity. Other providers for cloud infrastructure have started taking similar routes for access control, but unlike most of them Boundary is both cloud-agnostic *and* open-source. If that and the gruesome onboarding process I described earlier isn't enough to get you excited as well, I'll try and spark the interest by showing what else it's capable of.


## Traditional Workflow

To understand why Boundary is good news we should probably take a look at a traditional workflow for securely connecting to applications and critical systems first. A depiction of a typical workflow is shown below

| ![Traditional](https://www.datocms-assets.com/2885/1602530950-boundary-blog-3-edited.png?fit=max&fm=png&q=80&w=800)| 
|:--:| 
| *HashiConf2020 Boundary presentation* |

As you can see from the picture you need a VPN to connect to, which then lands you on a SSH Bastion or jump box. From which you need to SSH through a firewall before you finally get to your target machine.

If you honestly do not feel the complexity of that process should be reason enough to find something better, there are several other challenges(besides the complexity) coupled with this process as well. For one, once you've connected through the VPN, you *are* inside the network. This greatly increases the attack surface, and as many in InfoSec will tell you, having a small attack surface is one of the best ways to minimize cyberattack threats. 

Typically to safeguard against this risk you would have to put up a firewall in front of the target hosts, operating on IP and port identities. A pretty fragile setup in dynamic environments like public clouds where IPs are ephemeral. Not only is it fragile, managing internal firewalls is also quite time consuming.

Another issue is the onboarding and offboarding process in regards to VPNs. I used to be part of the IT team for one of my school's student societies, where some of the student societies' services were only accessible from the internal network at school. Setting up these accesses could be quite a hassle, as you need to figure out the routing, access-lists and so on. The accesses were only issued for a limited term, usually expiring when the students were finished at university. So the offboarding process wasn't too hard. However, it is easily imaginable that in enterprises where access is not time-limited, that people can and probably have forgotten to actually remove the privileges from former employees and contractors.

Finally, the user needs to know the credentials of the end target host that they want to access. If the target is a database, then the user needs to know the username and password to that database. This is also a significant concern from a security point of view, because the credentials are exposed to the user. Meaning that is there's any malware on the home pc the credentials might be lost.

Another problem is also the issue of the user having to memorize all their usernames and passwords. Even if the application backend synchronizes logins, like a database or active directory, each user must login individually to the application. There’s a not-insignificant cognitive load on the user to manage all the different usernames and passwords assigned to them to all the different applications in an enterprise


## Boundary Workflow

Now let's take a look at the Boundary workflow. A picture describing it can be seen below.

| ![Boundary](https://www.datocms-assets.com/2885/1602530901-boundary-blog-1-edited.png?fit=max&fm=png&q=80&w=800)| 
|:--:| 
| *HashiConf2020 Boundary presentation* |

Once again the user here needs to access a host or a set of hosts, The user now logs in with a trusted identity such as AWS SSO, Okta, GitHub, or Active Directory. The identity provider would be outside of Boundary, but integrate with it. 

This makes the onboarding and offboarding problems risen earlier pretty easy to handle, since it’s now tied to a trusted identity provider. Once a user is no longer part of the company, you can take them out of whatever identity provider you wish and you’re good to go.

The next step is authorizing who gets to do what. This is achieved by using roles and logical services, making authorization robust in dynamic environments and removing the brittleness associated with static IP addresses.

The third step is that the user selects the application he wants to connect to from a catalog of different hosts and services they have been granted access to by Boundary. The user most importantly does not have access to the entire network because Boundary is brokering the connection, minimizing the attack surface in the process.

Finally, the user will have access to the target host. This can be done dynamically by creating short-lived credentials through Vault or assigning access via a security group. Boundary will then proxy the connection right through to the application, never exposing the credentials to the user. As a consequence the risk of losing a password to hostile actors is also gone. Integration with Vault and identity providers is however not yet available in the 0.1 release, but is on the [roadmap](https://www.boundaryproject.io/docs/roadmap).

A feature not mentioned in the workflow, but that shouldn't be glossed over is the ability to monitor and manage sessions across many applications. Boundary will allow you to view tokens

## In closing...

As much as I've been gushing over Boundary in this post, I wouldn't recommend switching your infrastructure over just yet. Boundary is still in very early development and an official version isn't scheduled until sometime next year. The 0.1 release only supports TCP proxying right now, but higher level protocols like SSH, RDP and HTTP are planned. Boundary currently also has limited integration with other HashiCorp products and public cloud providers. 

While this does sound like a buzzkill, Mitchell Hashimoto has a history of dreaming big and then executing on that dream. It because of that ability I would sincerely urge you keep an eye on Boundary while it matures. 

And if you in the meanwhile want to try it while it matures(or want to contribute), you can find the github repo at: [https://github.com/hashicorp/boundary](https://github.com/hashicorp/boundary) 

With an accompanying guide at: [https://learn.hashicorp.com/boundary](https://learn.hashicorp.com/boundary)