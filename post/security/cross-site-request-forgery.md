---
calendar: security
post_year: 2018
post_day: 4
title: Cross Site Request Forgery
ingress: >-
  Have you ever wondered how someone could steal money from your bank account
  while you browse certain sites, or post as you on Facebook? That is called
  Cross Site Request Forgery (CSRF), and we will try to explain what it is, and
  how you protect your website and users against it.
links:
  - title: CSRF OWASP
    url: 'https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)'
  - title: Same Origin Policy
    url: 'https://www.w3.org/Security/wiki/Same_Origin_Policy'
authors:
  - Stian Fredrikstad
---
Web applications today have a lot of functionality. 
E.g. a banking website can transfer money, manage your portfolio and much more. 
What if an attacker could do this on your behalf while you browse the internet? Let us present Cross Site Request Forgery, popularly shortened CSRF or XSRF.

Let us say you are a customer of bank.com. If you want to transfer money to another account, you go to https://www.bank.com and log in. The bank will likely do a request similar to this when you press the transfer button:

```
POST /transfer_money
to_account=98765432109
amount=1000
```

The bank will then transfer 1000 from your account, to the account given in `to_account`.

But what if you visit a malicious website while you are logged in? If that website tries to send the same request, changing the parameter `to_account` to the account of the attacker. 
The browser will send the request without complaining, and it will even supply your session cookie, which identifies you as a user. 
When the server in the bank receive the request, it will transfer the money to attacker, because it does not distinguish a request sent from https://www.bank.com and the malicious website. This is called Cross Site Request Forgery.

Although the case is a simple example, attacks similar to this has actually happened.

### How do you protect your users against this attack?

The main goal of protecting your users against this attack, is to distinguish a legitimate request and a malicious request. 
To accomplish this, the server needs to check the validity of something that the malicious website can not steal or generate. 
The most widely used technique, is to generate a token and use it in all requests from the website. The server can then check the validity of the token on the server. 
Due to the same origin policy that all normal browsers obey, a malicious website can not read the content of another domain and extract the value of the token.

It is important that this token is generated uniquely for each session, which can be accomplished in multiple ways. 
The server can generate a random token and store it in the session, which make it easy for the server to check its validity when it receives a request. 
Another technique which eliminate the state on the server, is to generate the token from something that identifies the user, together with a secret key on the server. 
This does not need to be stored in the session, because it can always be regenerated on the server and checked against the value in the request. 
Most modern frameworks has one of these, or a similar technique built in, and it is highly recommended to use it.

These techniques will protect your users against CSRF, but it is only designed to protect against requests which potentially changes the state of the server. 
Which means that it will not protect against a malicious website doing `GET` requests on the users behalf. This is intentionally, because a `GET` request should never change the state on the server, and thus will not need the protection against CSRF. 
Another consideration, is that if you put the token in a `GET` request, websites you link to can potentially get the token from the referrer header.


Hopefully you have gotten a little introduction to CSRF by reading this post, and if you want to know more, we suggest that you read more at [OWASP CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29). We hope to see you back tomorrow.
