---
calendar: security
post_year: 2020
post_day: 1
title: Welcome to the Security Christmas Calendar!
ingress: We are really excited to present this year's calendar. We hope that you
  will enjoy reading it as much as we enjoyed writing it. Security as a topic is
  hotter than ever. While we count down the days until Christmas Eve you will be
  given new, original security content each day. We hope that you will enjoy the
  countdown together with us!
authors:
  - Stian Liknes
---
We start by presenting a list of a few tips you as a developer can use to help your applications stay as secure as possible. This is not new, ground-breaking stuff, and hopefully you are familiar with much of it already. But, we hope that they can serve as a reminder for you, and that you can spend some time checking them out in the light of your own projects!

1. Get to know OWASP Top 10
   OWASP Top 10 is a list of the most critical security risks for web applications. The last OWASP Top 10 came out in 2017, and OWASP is currently working on a 2020 edition. We encourage you to check out the OWASP Top 10 project website at <https://owasp.org/www-project-top-ten/>, and take a look at your own projects and see how these risks are being addressed. 
2. Be creative
   The one that knows most about how your application is supposed to be used is you, the developer. An attacker will have a different mindset. He or she will try to use your app in illogical ways, and in ways he or she thinks you haven't thought about. While you develop and test your applications, try to be a bit creative. Send unexpected input, navigate in illogical ways, and try to provoke errors. Chances are that you will discover a vulnerability or two.

   Trying to hack your own applications is a fun exercise. A handy tool is the OWASP Zed Attack Proxy (ZAP), which is a free, open source tool. Check out [zaproxy.org](zaproxy.org). You can also check out our post about Zap from last year, at <https://security.christmas/2019/9>
3. Automated dependency checking
   We tend to have lots of dependencies in our applications. These dependencies can of course contain vulnerabilities, which thankfully might be discovered and patched in newer versions. However, if we don't continuously bump to the newest versions we get no advantage of those patches, and our applications are still as vulnerable as before. 

   If we let bumping dependencies be a manual task, it is easy to postpone it. A good idea is to let an automated tool, that either warns you, or tries to fix it, if there is something wrong, continuously monitor your dependencies. There are several tools available, e.g. Github Security, Snyk or OWASP Dependency-check. Without revealing too much, there is a chance we will give you a more thorough introduction to one of these tools in the coming days.

   If you have an automated tool in place, there is important to also have a regime to monitor and take action when the dependency checker tries to tell you something. You should also keep an eye on dead dependencies - dependencies that no longer are being patched. They most likely contain vulnerabilities, and you should look for something else to pull in instead.
4. Know your HTTP-headers
   The HTTP-protocol comes with a set of headers that can help mitigate attacks and security vulnerabilities. Used correctly, they can enhance the security considerably. The following five headers might be 

   * Content-Security-Policy
     It protects you form XSS attacks. It prevents the browser from loading content from other sources than the ones you have specified. 
   * Strict-Transport-Security
     Enforces the browser to use TLS, e.g. ensures that the communication takes place over a secure transport channel like HTTPS.
   * X-Content-Type-Options
     Stops the browser from trying to sniff the content type from MIME, and forces it to deal with the declared content-type only. `nosniff` is the only useful value here.
   * X-frame-options=SAMEORIGIN
     Tells the browser whether you allow that your site is to be framed or not. By setting it to `SAMEORIGIN`, it will be allowed to frame your site at the same origin only.
   * Referrer-Policy=no-referrer
     Controls how much information the browser includes when navigating from one document to another.

   You can check the HTTP-headers on your own site at <https://securityheaders.io> , a project by Scott Helme.  It will generate a report based on the findings on your site, and give you recommendations and guidelines on how to fix any problems.

   Logging an monitoring
5. Know you data
6. Never trust input
7. Expose as little as possible
8. Know your platform
9. security.txt