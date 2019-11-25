---
calendar: security
post_year: 2018
post_day: 3
title: Public Wifi
image: >-
  https://images.unsplash.com/photo-1495791153954-705fa8c56eec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c07ca800be2bf63dd3b8df8f4d708069&dpr=1&auto=format&fit=crop&w=2000&q=80&cs=tinysrgb
ingress: >-
  After grabbing your favorite double pumpkin spiced latte with soy milk, you
  get ready to lean back and browse the latest memes. But should you be
  connecting to the coffee shop WiFi? How dangerous can it really be?
links:
  - title: FireSheep (Wikipedia)
    url: 'https://en.wikipedia.org/wiki/Firesheep'
authors:
  - Hans Kristian Henriksen
---
When smart phones where in their infancy, and the only device people owned that used WiFi was a laptop, an open WiFi was difficult to come by. If you were lucky enough to find one, it might quickly become your go-to location for internet access. These days, open WiFi hotspots are everywhere. They seem like a blessing that might save you from going over your data quota, and provide high speed connectivity. Unfortunately (as with everything) there are some security issues with using public WiFi that you should be aware of.

### I see your traffic
When you connect to the same network as someone else, it means that they might be able to see your traffic. Nowadays of course, more and more web traffic uses TLS, making this a lesser concern, but there are still plenty of sites that don't have HTTPS, or defaults to HTTP. Some sites may also handle login over HTTPS, but not secure the session cookies. In 2010, the extension FireSheep made it possible to highjack Facebook HTTP-sessions with a single click, providing you shared a network with the victim.

While this is an issue on any network, the biggest risk emerges when you use a public network that anyone can gain access to. At home or at work, you (hopefully) have some level of trust in the other users, while you have no idea what kind of evil hackers frequent the same coffee shop as you.

### This isn't the WiFi you're looking for
One clever way of gaining access to other peoples information is to set up a WiFi that appears to be a legitimate free WiFi (e.g. `AIRPORT`), and route all the traffic through to the internet. This way, you will think that you have connected to the correct network, while the attacker has the opportunity to execute Man-in-the-middle attacks on you. The only thing an attacker needs for this to be successful is a stronger signal than the legitimate hotspot. They might even emulate the "Terms & Conditions"-page that many coffee shops and airports make you click through to be connected to the web.

### What should you do?
Well, that really depends on how paranoid you are, and how sensitive the information you are handling is. For most people, it is enough to be aware of the issue, and act accordingly. Don't log in to your bank, send your social security number, or discuss business secrets on public WiFi. Feel free to browse the news, and post some memes. You should however think about the fact that many services run in the background on your device. If you have your company email set up on your phone, you might have to think again before using the coffee shop WiFi. One solution that will allow you to still use unsecured WiFi is to connect to the internet through VPN. With a VPN connection, all your traffic is encrypted between your device and the VPN server. This makes it impossible to listen in, even on the HTTP-traffic.

Of course, if you use a commercial VPN provider, you have now placed your trust in their security and integrity, but that is a story for another day. Many people have access to VPN through their workplace. If your work VPN allows you to route all traffic through the VPN, this will be a good option to increase your security.

Finally, if you have to handle sensitive information while away from home and the office, using mobile data is probably one of the better options. As long as you are able to trust your cellular provider, 4G data network encryption should provide you with the security you need.
