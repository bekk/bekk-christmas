---
calendar: security
post_year: 2018
post_day: 15
title: Security headers
ingress: >-
  How the browser and the webserver can join forces to protect both the user and
  the webserver: Enter security headers!
links:
  - title: OWASP Secure Headers Project
    url: 'https://www.owasp.org/index.php/OWASP_Secure_Headers_Project'
  - title: Security Headers
    url: 'https://securityheaders.com/'
authors:
  - Tia Firing
---
Security headers are HTTP response headers that deal with security related concerns. When a user visits your webpage, these headers tell the browser how to interact with the webserver. There are several HTTP response headers that can be defined as security headers. Some of the most common security headers have already been mentioned in previous articles, like [Content Security Policy](https://security.christmas/2018/14) headers and headers related to [CORS](https://security.christmas/2018/11). Let's have a look at some of the other common security headers. 

### HTTP Strict Transport Security (HSTS)
The HSTS header tells the browser that it should never connect to the specified webpage without using HTTPS. Without this header it may be possible for an attacker to redirect the traffic to an unencrypted connection. This will allow the attacker to listen to the traffic that should have been encrypted, and the attacker may even be able to steal the user's cookies. It is highly recommended to use the HSTS header. 

### X-XSS-Protection
A few days ago we wrote about [XSS](https://security.christmas/2018/13) and how to avoid this attack by escaping all special characters that could be HTML from user input. Most modern browsers also has a built in filter to make themselves less vulnerable for XSS attacks, and you can activate this XSS filter by sending the X-XSS-Protection header. The filter will sanitize the webpage or stop the webpage from being loaded if it suspects an XSS attack. However, this filter is an addition to the XSS protection and should not be relied on as an alternative to escape input and sanitize your output. 

### X-Frame-Options
[Clickjacking](https://www.owasp.org/index.php/Clickjacking) is one of the classic attacks where the user thinks they are clicking on something innocent, like the Like button on Facebook, but where an attacker has placed some transparent iframe on top of this button so that the user actually clicks on that instead. The X-Frame-Options header lets you disable the possibility to load the page in an iframe, or to allow it as an iframe only in the same origin or specific URLs. Today this header is more or less replaced by CSP. 

### HTTP Public Key Pinning Extension (HPKP)
Public key pinning means that the first time a browser visits your webpage, you tell it through the Public-Key-Pins header which TLS certificate it should expect whenever it visits this page in the future. The idea behind this is to prevent attackers from impersonating a legitimate website if the attackers somehow can get hold of a fake certificate or if the certificate authority has been compromised. Unfortunately, pinning the certificate like this can also lock out your users if you lose your private key and have to change the certificate. And if an attacker manages to pin their certificate to your website, then you are really in trouble..! Because of the risks associated with public key pinning, and the fact that very few dare to use it, Chrome is [removing the support](https://www.chromestatus.com/feature/5903385005916160) for this header, and you should not use it anymore. 

### Expect-CT
As public key pinning has proved itself a less than ideal solution to the problem with fake certificates and compromised certificate authorities, a new mechanism for detecting certificate problems is about to enter the field: [The Certificate Transparency Project](https://www.certificate-transparency.org/). This projects provides a publicly available log of all valid certificates. By sending the Expect-CT header you tell the browser to check your certificate against this log. 

### Verifying security headers
There are a lot of headers out there, and it's easy to forget some of them. If your website is publicly available you can check your security headers by using [securityheaders.com](https://securityheaders.com/). This is a free tool created by Scott Helme, and it rates your webpage and provides helpful advice when it comes to security headers. 
