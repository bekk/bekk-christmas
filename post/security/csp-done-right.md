---
calendar: security
post_year: 2019
post_day: 4
title: CSP - done right
ingress: >-
  Okey, so you want to secure your app with a CSP-policy. Great! But where to
  start and what to do if some parts of your app is out of your control?
links:
  - title: Content Security Policy
    url: 'https://developers.google.com/web/fundamentals/security/csp'
  - title: CSP Evaluator
    url: 'https://csp-evaluator.withgoogle.com'
  - title: Content Security Policy Level 3
    url: 'https://www.w3.org/TR/CSP3/'
authors:
  - Johan Andre Lundar
---
Start your CSP-policy with a default-src 'none' and see what breaks. Then add the different sections one by one to make your application work again. Adding i.e. script-src 'self' instead of having the default-src 'self' makes you conscious about what resources your application are actually using and if they are really needed. Oh, so you rely on some JavaScript snippets here and there? But do you really know that they are doing? What about moving that Google Analytics tracking snippet into a separate JS-file and actually initiate the tracking yourself!

I know, in many real world scenarios it is easier said than done to actually have a really strict CSP-policy. But it is not impossible! Sometimes we are forced to allow for some inline CSS and maybe inline JavaScript because of frameworks or platforms that are out of our reach or control. One example is if you rely on a CMS or other platform with a user interface. The publishing platform may rely on inline JavaScript to provide a certain interface for the editors. One solution to this scenario is to have different CSP-policies based on different parts of the solution. You can have a strict policy for all public clients (external users), but allow for some special rules if you are a logged in editor for example. Let not this be an excuse though! If you have a more relaxed policy on some parts you should have other measures to ensure that the risks of this being exploited will be as small as possible.

Also be aware that it is not possible to allow for 'unsafe-inline' for a specific external resource only. If you allow 'unsafe-inline' it actually covers all resources that are allowed for that specific part of the CSP. You have to ask yourself, do I really need this piece of code or this plugin that forces me to open up my app to be more vulnerable to attacks? My experience is that if you as a developer try to adhere to a strict policy (not using inline JS for example) it will make you think more about your code and make it more secure.

Happy CSP!
