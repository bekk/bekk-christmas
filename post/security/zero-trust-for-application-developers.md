---
calendar: security
post_year: 2020
post_day: 7
title: Zero Trust for application developers
image: https://unsplash.com/photos/-KWTvrNiYOE/download?force=true&w=1920
ingress: >
  Zero Trust is a security model where each component has its own perimeter.
  This is different from a traditional security model where all components
  inside of a given perimeter is regarded as safe or trusted. It was introduced
  as a reaction to the traditional network security model as a measure against
  lateral movement after a breach.
links:
  - url: https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/ch01.htm
    title: Zero Trust Networks by Evan Gilman, Doug Barth
  - url: https://www.paloaltonetworks.com/cyberpedia/what-is-a-zero-trust-architecture
    title: What is a Zero Trust Architecture (Palo Alto Networks)
authors:
  - Stian Liknes
---

Zero Trust is a security model where each component has its own perimeter. This is different from a traditional security model where all components inside of a given perimeter are regarded as safe or trusted. It was introduced as a reaction to the traditional network security model as a measure against lateral movement after a breach.

In [Zero Trust Networks by Evan Gilman, Doug Barth](https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/ch01.html), a Zero Trust network is defined as a network built on five fundamental assertions:

1. The network is always assumed to be hostile
2. External and internal threats exist on the network at all times
3. Network locality is not sufficient for deciding trust in a network
4. Every device, user, and network flow is authenticated and authorized
5. Policies must be dynamic and calculated from as many sources of data as possible

The core of Zero Trust is to "never trust, always verify", closely related to the principle of least privilege, stating that any user, program, or process should have the bare minimum privileges necessary to perform its tasks. In order to make sure that an application works well in a Zero Trust environment, we need to minimize the risk of lateral movement by isolating potential data breaches as much as possible. In the context of application development, these five assertions can be summarized into the following guidelines:

1. Treat all hosts as if they are Internet-facing (assertions 1-3)
2. Delegate authentication and authorization to a supporting system (assertions 4-5)

Given that all hosts are regarded as Internet-facing, we need to ensure that all communication channels are secure, even if they were at some point regarded as internal. This means that we should encrypt all internal and external network traffic that we don't want to expose, including (but not limited to) traffic between applications and databases. This will make it difficult for an attacker to snoop traffic, even if he or she has gained access to an internal network.

By delegating authentication and authorization to a supporting system (control plane), it is possible to enable centralized access auditing and policy enforcement based on selected criteria. This means that we don't need to create complex logic to verify devices and users in each application as it will be handled by the control plane. In a more practical sense, we should opt for federated identity combined with standardized authorization protocols like [OAuth 2.0](https://oauth.net/2/). In modern web applications, it may be worth looking into [JWT](https://jwt.io/) to represent claims securely.

Regardless of which authorization method you choose, make sure that each client that is granted access will be given its own account. Never share credentials between services or users. One account per client makes it possible to remove access if one client is compromised, and makes it possible to trace traffic back to a single source when investigating an incident, or analyzing traffic in general.

> There are no Zero Trust products. There are products that work well in Zero Trust environments and those that don't. 
> — [Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/what-is-a-zero-trust-architecture)

That should cover the basics. If you would like to dive deeper into the subject, I highly recommend [Zero Trust Networks by Evan Gilman, Doug Barth](https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/ch01.html).