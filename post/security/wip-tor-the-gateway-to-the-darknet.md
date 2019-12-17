---
calendar: security
post_year: 2019
post_day: 18
title: 'Tor, the gateway to the darknet?'
ingress: >-
  Does the US government sponsor the development of the darknet? What is The
  Onion Router project and why should you be anonymous on the internet?
links:
  - title: Tor Project
    url: 'https://www.torproject.org'
authors:
  - Lars-Erik Wollan
---
Today most users of the internet have, to some degree, understood that their activities are indeed traceable and there is probably someone that can see what you did, when you did it, even if your iPhone has private browsing enabled. Others do not, and could not care less. “I have nothing to hide”

When, what we know of today as the net, was developed, when we have a sneaking suspicion that the inventors were more than happy that it actually worked, than they were worried about security and privacy. Imagine the sheer joy that sending packets over TCP actually worked in the late seventies. Using simple, but neatly designed, protocols, they were able to route packets across the world. Security was not high on their agenda.

Today however, we use the internet for far more than anyone of the original researcher could have foreseen. We use it for just about anything, from doing business, reading news, communicating and let’s not forget, watch cat videos on social media. The global nature of the internet gives just about anyone, anywhere in the world, the freedom to publish content, from palm of their hand.

The fair share of the internet is happy post their selfies and send the mandatory “happy birthday” greeting on Facebook. There are areas and situations where the consequence of posting news, for example about an oppressive regime or leaking documents which proves misconduct by authorities can be dangerous or even illegal. Fake news and false leaked documents are a rising problem, but we must not under estimate the effect organizations such as WikiLeaks and individuals like Chelsea Manning have had on our understanding of the world we live in. Before the prevalence of the internet, leakers had to find journalists, and a newspaper, that were willing to publish their information. Publishing information in the internet should in theory be easy, but many major platforms have limitations on what content they will let their users publish. The operators of these networks can also be ordered by law enforcement to give out information about the source of the content.

Sometimes you need the option to be anonymous. The Onion Router, known as TOR, is a network where the traffic is routed via a number of special TOR nodes to conceal where the traffic originates. Each time the traffic bounces through the nodes, is encrypted, like layers in an onion. In the onion network the traffic cannot, easily, be eavesdropped. When the traffic leaves the onion network, through an exit node, is will be routed like normal internet packets. The overhead with encrypting and bouncing via the onion nodes reduce the throughput of the onion network, so that using TOR for everyday browsing is not a pleasant experience.

Many of the ideas behind the onion router was developed by employees of the United States Naval Research Laboratory in the late 80-ties. The American government continued to sponsor the development via different organizations. However, in 2004, the source code was transferred to the Electronic Frontiers Foundation, which did much the fiscal sponsorship of the TOR project. Today the development is funded by a wide range of companies and organizations and releases are made available for users and researchers.

Today TOR is probably associated with more shady activities by criminals, hacktivists and services as the now defunct Silk Road. But not even TOR is a guarantee that someone can intercept your messaging or avoid you being tracked on the net. Evidence provided by Edward Snowden has shown that nation agencies such as the FBI has attacked use of the TOR network.

Maybe you do not need to be anonymous on the internet, maybe the technology can be abused and maybe it is not 100% secure, but it is good to know that we have bright minds working on solutions for these problems. If you want to play around with onion routing and have a spare Raspberry Pi laying around, you can transform it to a TOR network router. Check out this [link](https://twit.tv/shows/know-how/episodes/301?autostart=false).

Happy privacy.
