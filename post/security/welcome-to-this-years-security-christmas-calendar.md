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
  - Robert Larsen
---
We start by presenting a list of a few reminders and tips to you as a developer, to help ensure that your applications stay as secure as possible. This is not new, ground-breaking stuff, and hopefully you are familiar with much of it already. But, we hope that they can serve as a reminder for you, and that you can spend some time checking them out in the light of your own projects!

1. OWASP Top 10
   OWASP Top 10 is a list of the most critical security risks for web applications. The last OWASP Top 10 came out in 2017, and OWASP is currently working on a 2020 edition. We encourage you to check out the OWASP Top 10 project website at <https://owasp.org/www-project-top-ten/>, and take a look at your own projects and see how these risks are being addressed. 
2. Be creative
   The one that knows most about how your application is supposed to be used is you, the developer. An attacker will have different mindset, and try to use your app in illogical ways, and in ways he or she thinks you haven't thought about. While you develop and test your applications, try to be a bit creative. Send unexpected input, navigate in illogical ways and try to provoke errors. Chances are that you will discover a vulnerability or two.

   To try to hack your own applications is fun exercise. I handy tool for suck pen-testing is OWASP Zed Attack Proxy (ZAP), which is a free, open source tool. Check out [zaproxy.org](zaproxy.org)
3. Dependency checker
   We tend to have a lot of dependencies in our applications. These dependencies can of course contain vulnerabilities, which thankfully might be discovered and patched in newer versions. However, if we don't bump to the latest available versions we get no advantage of those patches, and our applications are still as vulnerable as before. If we let bumping dependencies be a manual task, it's easy to postpone it.

   It is a good idea to let an automated tool continuously monitor your dependencies. There are several tools available, e.g. Github Dependabot, Snyk or OWASP Dependency-check. Without revealing too much, there is a chance we will give you more thorough introduction to one of these tools in the coming days.

   If you have an automated tool in place, there is important to also have a regime to monitor and take action when the dependency checker try to tell you something. You should also keep an eye on dead dependencies - dependencies that no longer are being patched. They most likely contain vulnerabilities, and you should look for something else to pull in.
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

You can check your own HTTP-headers on your own site at <https://securityheaders.io> , a project by Scott Helme. 

5. Logging an monitoring
6. Know you data
7. Never trust input
8. Expose as little as possible
9. Know your platform
10. security.txt