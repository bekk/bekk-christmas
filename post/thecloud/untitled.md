---
calendar: thecloud
post_year: 2020
post_day: 21
title: Boundary and remote access based on trusted identity
ingress: If you've ever started at or switched jobs to a mid- or large-size
  enterprise, you probably know the onboarding process can be both long and
  exhausting. Possibly sitting there weeks on end, without access to the
  services you need, and feeling like a bother because you have to ask one of
  your colleagues for help the 3027th time that week. I shudder at the thought
  of it, and if you do to I just might have the answer to all our *boundary*
  issues!
links: []
authors:
  - Kenan Mahic
---
## Traditional Workflow for Human to Machine Access
Let’s take a look at the traditional workflow for secure access to machines. If you are an operator using your computer from home and you want to access your corporate network for example or a data center; below is your workflow:
1. You probably have a VPN that you need to use to connect
2. From there you typically land on an SSH bastion host or a jump box
3. Then from the jump box, you SSH through a firewall
4. Finally, you get to the machine you want to access. This target machine could be anything. It could be a Linux server or a Windows server or a network device such as a switch or a router.

## Traditional Workflow Challenges
There are a number of issues with this workflow.

1. The onboarding and offboarding processes are not straightforward when it comes to VPN concentrators. I used to work as a network engineer getting VPN access requests quite often. These requests were for employees, third-party vendors, or contractors. It’s a complicated request as you need to figure out the routing, access-lists, and so on. Many times when an employee or contractor leaves, nobody remembers to submit a request to remove access from these individuals. If an offboarding request is submitted, it’s pretty complicated to remove the user.
2. There is a need to maintain the SSH jump boxes. Moreover, your user now has network access. Once they’ve authenticated through the VPN, they’re inside your network. This increases the attack surface.
3. Now we need to put a firewall in front of the target hosts to only allow access from the jump box. This firewall operates based on IP and port identities. This is pretty brittle in a dynamic environment such as a public cloud where IPs are ephemeral.
4. Finally, the user needs to know the credentials of the end target host that they want to access. If this target is a database, then the user needs to have a username and password to the database. That’s also a concern from a security point of view because the credentials are exposed to the user.



| ![Traditional](https://www.datocms-assets.com/2885/1602530950-boundary-blog-3-edited.png?fit=max&fm=png&q=80&w=800)| 
|:--:| 
| *HashiConf2020 Boundary presentation* |

## HashiCorp Boundary’s Structure and Hierarchy
Now let’s see what the boundary workflow looks like. Below is a diagram of the HashiCorp Boundary workflow.


| ![Boundary](https://www.datocms-assets.com/2885/1602530901-boundary-blog-1-edited.png?fit=max&fm=png&q=80&w=800)| 
|:--:| 
| *HashiConf2020 Boundary presentation* |

1. Once again the user here needs to access a host or a set of hosts, The user now logs in with a trusted identity such as Okta, GitHub, or Active Directory. This is outside of Boundary. The identity provider would integrate with Boundary. From an onboarding and offboarding perspective it’s pretty easy since it’s tied to a trusted identity provider. Once a user is no longer part of the company, you can take them out of Okta and you’re good to go.
2. The next step is authorizing who gets to do what. This is achieved by using roles and logical services making authorization robust in dynamic environments.
3. The third step is that the user has a catalog to select different applications and hosts that they have access to. The user most importantly does not have access to the entire network because Boundary is brokering the connection.
4. Finally, the user will have access to the target host but the application credentials themselves are not exposed to the user. This can be done dynamically by creating short-lived credentials through Vault and passing them to the user. Taking this even further, a user would end up directly on the target host without having any credentials seen at all. Integration with Vault and identity providers is not yet available in this 0.1 release but is on the roadmap.

## HashiCorp Boundary’s Architecture for a Production Deployment

Below is an image showing the general structure within Boundary.

* At the top level is a Global.
* An Organization is a child of Global.
* Within an Organization, there are auth methods, users, groups, and projects.
* Within each project, you define roles, targets, and host catalogs.
* Inside a host catalog are host sets.
* Inside of host sets live the end target hosts.

You can create host sets that contain application infrastructure such as App Host Set 1 shown below. You can also create host sets based on function such as the database host set also shown in the image below. This way, database admins can have access to all databases in the organization.

## Roadmap
