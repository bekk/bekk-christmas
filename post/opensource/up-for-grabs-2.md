---
calendar: opensource
post_year: 2019
post_day: 9
title: How can you find code to open source?
ingress: >-
  Let's focus on "what", which I at least find the most difficult. Many
  questions arise: How can we pick code that our present organisation has spent
  time and money on and just give it out? What is actually interesting for
  others to see or use?
links:
  - title: digipost-html-validator GitHub
    url: 'https://github.com/digipost/digipost-html-validator'
authors:
  - Eivind Bergstøl
---

Where I now work as a consultant, Digipost, we try to find OSS opportunities and we want to open source as much as possible. Digipost is what it says on the tin: Digital mail. And organisations that send messages in Digipost can also send HTML documents. But accepting HTML documents and storing them for the rest of the receivers life in a secure fashion is not easy. There are all kinds of security issues. Because of that, Digipost is very strict with regards to structure and content of HTML files.

We use, of course, OSS to deal with this. More specifically [owasp-java-html-sanitizer](https://www.owasp.org/index.php/OWASP_Java_HTML_Sanitizer_Project). This is a sanitizer that accept a PolicyFactory instance. This instance has all the rules that you specify to the sanitizer. These rules are quite verbose. And communicating these rules to a developer or designer that has no insight into all the quirks is very difficult. 

So we decided to open source it. And here it is:
[digipost-html-validator](https://github.com/digipost/digipost-html-validator)

Now everyone can see our validation and sanitation policies! 

There are several good aspects of this kind of sharing:
* Everyone can check the rules
* Everyone can execute the code with the HTML they create
* We can plug this into our client library and validate and sanitate pre-encrypted messages (and so we did).
* Better separation of concern in our code as well

You don't need to open source your whole code base. Just find a piece of code that has a clear purpose and does not contain your precious business logic or secrets. And do it.
