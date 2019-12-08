---
calendar: security
post_year: 2019
post_day: 9
title: Heads Up ZAP!
image: >-
  https://raw.githubusercontent.com/zaproxy/zap-hud/develop/assets/images/ZAP-HUD-Welcome-banner.png
ingress: >-
  The Zed Attack Proxy (ZAP) is one of our go to tools for doing security
  assessments and testing applications. Tia Firing wrote about this last year,
  [check it out](https://security.christmas/2018/10). This year we were excited
  to learn that a new feature called Heads Up Display was introduced in the
  latest version.
authors:
  - Lars-Erik Wollan
---
When ZAP is set up, the traffic from your browser (or some other client setup to proxy through ZAP) will pass through ZAP. HTTP requests and responses can be intercepted, modified or just inspected. As the tester is clicks through the application, ZAP will log the request and responses.

When doing a black box test, testing an application without too much prior knowledge of inner workings, trying to get an understanding of the various features and API’s used. This can be done by clicking around like a normal user of the application. After some time one can check the requests and responses in ZAP. All this is done through the dedicated graphical user interface. As a side note, ZAP can be run in headless mode, but we will not cover this here.

In the ZAP GUI one can see the requests organized in a tree structure or you can sort by time. If a request looks interesting, one can flip back to the browser, find that piece of functionality and do some more digging. Then flipping back to the ZAP GUI to inspect or maybe replay some requests with some parameter tweaks.

This process of switching back and forth can be a bit confusing. If available a one could use two different displays, where one would be dedicated to a browser and the other display is used to interacting with the application. Although this works fine when multiple displays are available, there is still some context switching, when going back and forth between the different user interfaces.

The ZAP team has come up with a great solution for this, the Heads-Up Display. Like a fighter pilot, required tools and information is available from within the browser. Since ZAP can process requests and responses it actually makes sense that it would be possible to inject widgets, as an overlay to the web pages inside the browser.

By inserting Java Script in the response ZAP enables the tester most of the functionality in the main ZAP GUI, directly from the browser. We especially like that history tab is available which allows resending request directly from the browser. During a security assessment, starting attack from within the application is a great feature, which makes ZAP feel like an natural extension to the browser.

Setting up the ZAP HUD is just as easy as setting up ZAP for normal proxy. It gives users of ZAP a better user experience.
