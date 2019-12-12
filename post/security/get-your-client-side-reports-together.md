---
calendar: security
post_year: 2019
post_day: 13
title: Get your client side reports together!
ingress: >-
  Reporting API. That sounds really cool! Or really boring you say? This is one
  of the W3C-drafts that may not have gotten the attention it deserves so let's
  take a look!
links:
  - title: Reporting API Editor’s Draft - W3C
    url: 'https://w3c.github.io/reporting/'
  - title: Scott Helme - Crash Burn Report (NDC Oslo 2019)
    url: 'https://www.youtube.com/watch?v=O2tZ5vmDtQs'
  - title: Google developer docs
    url: 'https://developers.google.com/web/updates/2018/09/reportingapi'
authors:
  - Johan Andre Lundar
---
Logging and monitoring our back-end have been pretty standardised and have been a standard part of any application for a long time. As long as things are well on the server then all must be good for the clients (the users of our web app). Right? Okey, that is a bit simplified and silly to say in this day and age where front-end development have matured immensely and a lot of good frameworks exists to handle complex user interfaces. But what happens if something goes wrong at the client? We can of course try to handle front-end errors and send them to the server within our own code, but that may only be efficient to catch errors in our own code. What if we use a deprecated API that will break our application soon? Or something is making our app require access to browser features that should not be necessary? Or maybe the user does not reach our site at all? Enter the Reporting API!

The Reporting API defines a standard way of handling issues that arise at the client side. It defines a generic reporting framework that use HTTP headers that can be sent to the client that describes how it should act when something goes wrong. If you have used Content Security Policy (CSP) you may already know about something similar. CSP had a Report-Uri property for sending violations of the policy to an address (for logging purposes). That property is now deprecated and replaced by the Report-To property of the Reporting API. Other standards, such as Network Error Logging (NEL) also provides a Report-To property so now you probably get the idea. Via the Reporting API you can now get reports from all these different types of standards in a uniform way.

To utilise the Reporting API you can send a header which includes a definition of the reporting setup of your application:

```javascript
Report-To: { "group": "endpoint-1",
"max_age": 10886400,
"endpoints": [
{ "url": "https://example.com/reports", "priority": 1 },
{ "url": "https://backup.com/reports", "priority": 2 }
] }
```

Note that this header defines a group (“endpoint-1”) which later can be used to specify which standards that should report to what group. I other words, you can have multiple groups that can contain multiple endpoints. You can then refer to the Reporting API groups when using CSP, NEL or other standards (note that the actual policy of the CSP has been omitted for the sake of brevity):

```
Content-Security-Policy: {"report_to": “endpoint-1”, "max_age": 2592000}
NEL: {"report_to": “endpoint-1”, "max_age": 2592000}
```

By doing this, the browser will send reports about violations of the Content Security Policy and problems caught by Network Error Logging to the “endpoint-1” group. The Report-To header will be cached by the browser according to the “max_age” property. Our sample Report-To definition also defines two URLs with different priority. This is used by the browser to send report to the second URL if the first one does not respond. In addition to that, endpoints can also be assigned weights to distribute load, with each endpoint receiving a specified fraction of reporting traffic. This can be useful if your application has a lot of traffic.

As the Reporting API header is cached it allows the browser to send reports even if the client has lost communication with the server. If you combine this with the NEL-standard you can actually get the browser to report things like DNS misconfigurations or other network related errors that means the clients does not reach you application at all!

Other types of reports (in addition to CSP and NEL) include these:

Deprecation: a browser API or feature has been used which is expected to stop working in a future update of the browser 

Intervention: indicate that a browser has decided not to honor a request made by the application (e.g. for security, performance or user annoyance reasons) 

Crash: the user was unable to continue using the page because the browser crashed. For security reasons, no details of the crash are communicated except for a unique identifier and optionally the reason for the crash (such as Out Of Memory) 

Feature-Policy: code running on the client violated the rules that defines what browser features and APIs are allowed (this is currently in development) 

 As you can see the Reporting API can be used to report a lot of interesting data from the front-end of your application. All in a standardised way that does not require any specific front end frameworks or libraries at all. We have just covered the basics so head over to the links below if you want to know more. As of now, Chrome is the only major browser that support the Reporting-API (https://caniuse.com/#search=report-to), but hopefully others will follow soon.

Happy reporting!
