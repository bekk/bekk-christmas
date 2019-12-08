---
calendar: security
post_year: 2019
post_day: 9
title: 'Heads-Up, ZAP!'
image: >-
  https://raw.githubusercontent.com/zaproxy/zap-hud/develop/assets/images/ZAP-HUD-Welcome-banner.png
ingress: >-
  The Zed Attack Proxy (ZAP) is one of our go to tools for doing security
  assessments and testing applications. Tia Firing wrote about this last year,
  [check it out](https://security.christmas/2018/10). This year we were excited
  to learn that a new feature called Heads Up Display was introduced in the
  latest version.
links:
  - title: OWASP Zed Attack Proxy Project
    url: 'https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project'
authors:
  - Lars-Erik Wollan
---
When ZAP is set up, the traffic from your browser (or some other client setup to proxy through ZAP) will pass through ZAP. HTTP requests and responses can be intercepted, modified or just inspected. As the tester is clicks through the application, ZAP will log the request and responses.

When doing a black box test, testing an application without too much prior knowledge of inner workings, trying to get an understanding of the various features and API’s used. This can be done by clicking around like a normal user of the application. After some time one can check the requests and responses in ZAP. All this is done through the dedicated graphical user interface. As a side note, ZAP can be run in headless mode, but we will not cover this here.

In the ZAP GUI one can see the requests organized in a tree structure or you can sort by time. If a request looks interesting, one can flip back to the browser, find that piece of functionality and do some more digging. Then flipping back to the ZAP GUI to inspect or maybe replay some requests with some parameter tweaks.

This process of switching back and forth can be a bit confusing. If available a one could use two different displays, where one would be dedicated to a browser and the other display is used to interacting with the application. Although this works fine when multiple displays are available, there is still some context switching, when going back and forth between the different user interfaces.

The ZAP team has come up with a great solution for this, the Heads-Up Display. Like a fighter pilot, required tools and information is available from within the browser. Since ZAP can process requests and responses it actually makes sense that it would be possible to inject widgets, as an overlay to the web pages inside the browser.

![](/assets/zap-hud-welcome.jpeg)

When ZAP is set up, the traffic from your browser (or some other client setup to proxy through ZAP) will pass through ZAP. HTTP requests and responses can be intercepted, modified or just inspected. As the tester is clicks through the application, ZAP will log the request and responses.

When doing a black box test, testing an application without too much prior knowledge of inner workings, trying to get an understanding of the various features and API’s used. This can be done by clicking around like a normal user of the application. After some time one can check the requests and responses in ZAP. All this is done through the dedicated graphical user interface. As a side note, ZAP can be run in headless mode, but we will not cover this here.

In the ZAP GUI one can see the requests organized in a tree structure or you can sort by time. If a request looks interesting, one can flip back to the browser, find that piece of functionality and do some more digging. Then flipping back to the ZAP GUI to inspect or maybe replay some requests with some parameter tweaks.

This process of switching back and forth can be a bit confusing. If available a one could use two different displays, where one would be dedicated to a browser and the other display is used to interacting with the application. Although this works fine when multiple displays are available, there is still some context switching, when going back and forth between the different user interfaces.

The ZAP team has come up with a great solution for this, the Heads-Up Display. Like a fighter pilot, required tools and information is available from within the browser. Since ZAP can process requests and responses it actually makes sense that it would be possible to inject widgets, as an overlay to the web pages inside the browser.

The overlay that ZAP provides has three main areas; to the left there are buttons to add or remove pages from the attack scope. There are also indicators for security issues on the current page. These are grouped by severity, ranging from high, medium, low and finally info. By clicking any of these you can get information about that specific warning, without leaving the application. By right clicking, you can remove unneeded widgets. A nice trick is the light bulb which enables displaying hidden form fields – which can be useful when trying to understand how a given application works.

By clicking the green button, it is possible to intercept requests, in the browser, before it is sent to the server. The requests can even be modified before sending them.

On the right-hand side there are alerts for the site as a whole. The alerts on the left, was for the current page, and the ones on the right are for the whole site. It is also on the right-hand side one can start the various attacks, such as the spider and ajax spider. Running attack on a whole site is quite time and resource consuming, but the HUD has more tricks up its sleeve.

On the lower bottom page, the history and web sockets tab that it familiar from the regular ZAP GUI. By clicking on “History” a list of requests is shown. From here you can target a specific URL or endpoint. After selecting a URL, a request/response editor is shown. Here you can view the request and response. The HUD even allows for replay of the request, even with modifications. If the endpoint seems interesting, it is possible to start an active scan. This requires that the current page is part of the scope. If the “Active Scan” button is disabled, it is probably because the page is not part of the scope.

Finally, on the lower right hand, you can enable or disable the HUD, and reset the configuration to default.

The ZAP HUD is a great way to explore web applications during both development and security assessments. It becomes intuitive to use the various features provided by the overlay directly from the browser. Remember that you need permission before attacking any site.
