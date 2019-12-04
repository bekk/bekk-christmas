---
calendar: opensource
post_year: 2019
post_day: 9
title: How can find code to open source?
ingress: ''
links:
  - title: digipost-html-validator GitHub
    url: 'https://github.com/digipost/digipost-html-validator'
authors:
  - Eivind Bergstøl
---
Many organisations rely heavily on OSS today. And the more dependent we as developers are to OSS communities that every day deliver so much value for everyone to reap the benefits from, the more we feel the urge to give back something. But how or what?

Lets focus on "what" which I at least finds the most difficult. Many questions arise: How can we pick code that our present organisation has spent time and money on and just give it out? What is actually interesting for others to se or use?

Where I now work as a consultant, Digipost, we try to find OSS opportunities and we want to open source as much as possible. Digipost is what it says on the tin: Digital mail. And organisations that sends messages in Digipost can also send html-documents. But accepting html-documents and storing it for the rest of the receivers life in a secure fashion is not easy. There are all kinds of security issues. Because of that, Digipost is very strict with regards to structure and content of html-files. 

We use, of course, OSS to deal with this. More specifically [owasp-java-html-sanitizer](https://www.owasp.org/index.php/OWASP_Java_HTML_Sanitizer_Project). This is a sanitizer that accept an PolicyFactory instance. This instanse has all the rules that you specify to the sanitizer. These rules are quite verbose. And communicating these rules to a developer or designer that has no insight into all the quirks is very difficult. 

So we decided that we open source it. And here it is:
[digipost-html-validator](https://github.com/digipost/digipost-html-validator)

Now, everyone can se our validation and sanitation policies!
