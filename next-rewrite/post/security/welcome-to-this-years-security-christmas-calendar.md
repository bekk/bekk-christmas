---
calendar: security
post_year: 2020
post_day: 1
title: Welcome to the Security Christmas Calendar!
image: https://images.unsplash.com/photo-1512389098783-66b81f86e199?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1988&q=80
ingress: We are really excited to present this year's calendar, and hope that
  you will enjoy reading it as much as we enjoyed writing it. Security as a
  topic is hotter than ever. While we count down the days until Christmas Eve
  you will be given new, original security content each day. Enjoy the countdown
  together with us!
description: security, christmas, calendar, owasp, zap, dependency, http,
  headers, security.txt
authors:
  - Robert Larsen
---
We start by presenting a list of a few tips you as a developer can use to help your applications stay as secure as possible. This is not new, ground-breaking stuff, and hopefully you are familiar with much of it already. But, we hope that it can serve as a reminder for you, and that you can spend some time checking it out in the light of your own projects!

## 1. Get to know the current OWASP Top 10

   OWASP Top 10 is a list of the most critical security risks for web applications. The last OWASP Top 10 came out in 2017, and OWASP is currently working on a 2020 edition. We encourage you to check out the OWASP Top 10 project website at <https://owasp.org/www-project-top-ten/>, and take a look at your own projects and see how these risks are being addressed.

## 2. Be creative

   The one that knows most about how your application is supposed to be used is you, the developer. An attacker will have a different mindset. He or she will try to use your app in illogical ways, and in ways you might not have thought about. While you develop and test your applications, try to be a bit creative. Send unexpected input, navigate in illogical ways, and try to provoke errors. Chances are that you will discover a vulnerability or two.

   Trying to hack your own applications is a fun exercise. A handy tool is the OWASP Zed Attack Proxy (ZAP), which is a free, open source tool. Check out <https://zaproxy.org>. You can also check out our post about Zap from last year, at <https://security.christmas/2019/9>

## 3. Automated dependency checking

   We tend to have lots of dependencies in our applications. These dependencies can of course contain vulnerabilities, which thankfully might be discovered and patched in newer versions. However, if we don't continuously bump to the newest versions we get no advantage of those patches, and our applications are still as vulnerable as before. 

   If we let bumping dependencies be a manual task, it is easy to postpone it. A good idea is to let an automated tool continuously monitor your dependencies, and either warn you or try to fix it, if there is something wrong. There are several tools available, e.g. [Github Security](https://github.com/features/security), [Snyk](https://snyk.io) and [OWASP Dependency-check](https://owasp.org/www-project-dependency-check). Without revealing too much, there is a chance we will give you a more thorough introduction to one of these tools in the coming days.

   If you have an automated tool in place, there is important to also have a regime to monitor and take action when the dependency checker tries to tell you something. You should also keep an eye on dead dependencies - dependencies that no longer are being patched. They most likely contain vulnerabilities, and you should look for something else to pull in instead.

## 4. Know your HTTP-headers

   The HTTP-protocol comes with a set of headers that can help mitigate attacks and security vulnerabilities. Used correctly, they can enhance the security considerably. The following five headers are interesting to check out.

 * ### Content-Security-Policy

  Protects you from XSS attacks. It prevents the browser from loading content from other sources than the ones you have specified.

* ### Strict-Transport-Security

  Enforces the browser to use TLS, e.g. ensures that the communication takes place over a secure transport channel like HTTPS.
* ### X-Content-Type-Options

  Stops the browser from trying to sniff the content type from MIME, and forces it to deal with the declared content-type only. `nosniff` is the only useful value here.
* ### X-Frame-Options

  Tells the browser whether you allow your site to be framed or not. By setting it to `SAMEORIGIN`, it will be allowed to frame your site at the same origin only.
* ### Referrer-Policy

  Controls how much information the browser includes when navigating from one document to another. By setting it to `no-referrer`, the browser will never send the referrer-header with requests that are made from your site. The Referrer-Policy can also be set in the Content-Security-Policy.

   You can check the HTTP-headers on your own site at <https://securityheaders.io> , a project by Scott Helme.  It will generate a report based on the findings on your site, and give you recommendations and guidelines on how to fix any problems.

## 5. Create a security.txt

   If somebody finds a security vulnerability in your application, you probably would like to know about it so you can fix it. To make that happen, it is crucial that you let people know how to contact you. There are many examples that communication between someone finding a vulnerability and the organization or person behind the vulnerable site or app, can be cumbersome.

   To make things easier, there is a proposed standard, security.txt, for how to easily get in touch about security issues. It is currently a RFC-draft submitted for review at IETF. The proposal is to put a file named security.txt under the path `/.well-known/security.txt`. It should at least contain information about how to get in touch, but comes with some other fields as well. You can read more at the project website <https://securitytxt.org>, and the RFC-draft at <https://tools.ietf.org/html/draft-foudil-securitytxt-10>.

   Even though the RFC is still a draft, it has been adopted widely by major websites like Facebook, Dropbox and Github. So, you should do it too, and create a security.txt if you don't already have one. It builds trust and sends a signal that you take security seriously. 

How to create more secure applications is of course not limited to this short list, and we have more to come. Stay tuned! Also remember to visit our other calendars.