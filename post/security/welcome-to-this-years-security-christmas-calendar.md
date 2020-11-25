---
calendar: security
post_year: 2020
post_day: 1
title: Welcome to this year's Security Christmas Calendar!
ingress: >-
  We are really excited to present this year's calendar. We hope that you will
  enjoy reading it as much as we enjoyed writing it.Security as a topic is
  hotter than ever. While we count down the days until Christmas Eve you will be
  given new, original security content each day. We hope that you will learn
  something,

  get excited about something, get reminded about something, and of course enjoy the countdown together with us.
authors:
  - Robert Larsen
---
We start by presenting a list of a few reminders to you as a developer, to help ensure that your applications stay as secure as possible. The tips in the list are not, new ground-breaking stuff, 
and hopefully you are familiar with many of them already. But, we hope that they can serve as a reminder for you, and that you can spend some time checking them out in the light of your own projects!

1. Get to know OWASP Top 10
   OWASP Top 10 is a list of the most critical security risks for web applications. The last OWASP Top 10 came out in 2017, and OWASP is currently working on a 2020 edition. It is good habit to
   every now and then take a look at your own projects and see how these risks are beeing adressed. Check out the OWASP Top 10 project website, https://owasp.org/www-project-top-ten/
2. Be creative
   The one that knows most about how your application is supposed to be used is you, the developer. While you develop and test it, you will most probably An attacker will have different mindset, and try to use it illogically and in ways that you
   might not have thought about. 
   Send unexpected input
   Navigate in illogical ways
   Try to prowoke errors
   It might be an interesting excercise to try to hack your own applications. I handy tool for suck pen-testing is OWASP Zed Attack Proxy (ZAP), which is a free, open source tool. Visit zaproxy.org for more information.
3. Dependency checker
   We tend to have a lot of dependencies in our applications. These dependencies can of course contain vulnerabilities, which thankfully might be discovered and patched in newer versions. 
   However, if we don't bump to the latest available versions we get no advtage of those patches, and our applications are still as vulnerable as before. If we let bumping dependencies be a manual
   task Continously monitor your dependencies. Can either warn you, or try to fix it automatically.
   Establish a regime to monitor and take action when the dependency checker try to tell you something.
   Many alternatives, Github Dependabot, Snyk, OWASP Dependency-check.
   Monitor dead dependencies - dependencies that does no longer is beeing patched. Most probably they contain vulnerabilities, and you should look for something else.
4. Know your HTTP-headers
   The HTTP-protocol comes with a set headers that can help mitigate attacks and security vulnerabilities. 

* Content-Security-Policy
  It protects you form XSS attacks. It prevents the browser from loading content from other sources than the ones you have specified. 
* Strict-Transport-Security (HSTS)
  Enforces the browser to use HTTPS only.
* X-Content-Type-Options=nosniff
  Stops the browser from trying to sniff the content type from MIME, and forces it to deal with the declared content-type only.
* X-frame-options=SAMEORIGIN
  Tells the browser whether you allow that your site is to be framed or not.
* Referrer-Policy=no-referrer
  Controls how much information the browser includes when navigation from one document to another.

You can check your own HTTP-headers on your own site on securityheaders.io, a project by Scott Helme. 

5.