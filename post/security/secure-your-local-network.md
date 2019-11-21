---
calendar: security
post_year: 2018
post_day: 23
title: Secure your local network
image: 'https://www.grc.com/x/ne.dll?bh0bkyd2'
ingress: >-
  It is soon Christmas, and you might get new shiny gadgets under your Christmas
  tree. Now it is important to install these new shiny gadgets securely.
authors:
  - Stian Fredrikstad
---
Under your Christmas tree, you can find a new router, gaming console, smart lights or even a new smart fridge.
These are all devices that can pose as a threat against your network security.

### Entrance to the kingdom

First of all, the router. 
Either if you get a new router or you already have one, you should make sure it is secure.
Most routers have a web interface, and if you are not familiar with it, you should consult your user manual to find it.
The router will prompt you for a username and password, and if your username and password is the default username and password from the user manual, this is the first thing you should change.

When you are logged in, you should go to the firmware section, and look for updates.
As we wrote about [yesterday](https://security.christmas/2018/22), it is important to update your software and dependencies when vulnerabilities are known, and the router is no exception.

Now you have an updated router, and the next to check is that the external web interface is turned off.
This web interface should never be permanently open to the public.
Vulnerabilities have been found in routers which can bypass the login page, and if such an vulnerability is found in your router, it will not impact you directly if your web interface is only available inside the network.

At last, Gibson Research Corporation have created a site called [ShieldsUP!](https://www.grc.com/x/ne.dll?bh0bkyd2), where you can scan your network from the outside.
This site can check for exposed ports, and especially if UPnP is exposed.
As you may know, UPnP is used to automatically open ports if a device inside the network need it, but some routers have an vulnerability where the protocol can be initiated from the internet.
This can open your network for attacks, and it is a wildly known vulnerability that attackers scan for.

### Vulnerable gadgets

It is very possible that one of the presents under your Christmas tree is an internet connected gadget.
Likely wrapped in beautiful paper, like a trojan horse(!)

New internet connected gadgets are introduced all the time, and the security in these devices are not always that good.
In addition, not all devices have automatic updates, which can be a liability after a while.

One vulnerable device in your network can be enough to compromise everything. 
This is why some people put devices they do not trust in a separate network.
If your router supports multiple networks, or you have a spare router, you should think about installing your new shiny internet connected light bulbs in another network than the computer where you log in to your bank.

It may sound like tin foil hat mentality, but as the world of internet connected devices have evolved, we need to take our precautions.
If you do not separate your networks, you should be very careful and think about what you invite into your home.

You may give the keys to your internet connected door lock, to a trojan internet connected teddy bear!
 
