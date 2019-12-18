---
calendar: security
post_year: 2019
post_day: 19
title: 'OWASP, but there is more'
ingress: >-
  The Open Web Application Security Project, or OWASP, is mostly know for it's
  Top Ten Project which covers the most critical web application security risks.
  They als maintain one of most popular free security tool, the OWASP Zed Attack
  Proxy. But there is more, so much more. In this post we cover some of our
  favorite tools by the OWASP project and how we use them.
links:
  - title: Serverless Top 10 Project
    url: 'https://github.com/OWASP/Serverless-Top-10-Project'
  - title: The Cloud Christmas
    url: 'https://thecloud.christmas'
  - title: OWASP Juice Shop
    url: 'https://www2.owasp.org/www-project-juice-shop/'
authors:
  - Lars-Erik Wollan
---
# OWASP Serverless Top 10

Many developers are aware of the OWASP Top 10 and the [OWASP Mobile Top 10](https://security.christmas/2019/7/), but there is another top 10 list, which really deserves some attention. The OWASP Serverless Top 10 was released in late October 2018 and addresses the same issues as identified by the OWASP Top 10. As the name implies, the focus here is serverless.

![](/assets/serverless-vs-serverless-security.png "serverless vs serverless security")

Going serverless seems to be trending in many of the projects we involved in, and while serverless addresses many of the pains of deployment, scalability and availability (insert your favourite -bility here),is security solved once and for all? Tal Melamed of Protego Labs pointed out an interesting trend, by comparing Google searches on serverless (blue) vs serverless security (not blue).

The serverless top 10 project wants to address this by giving examples on how to prevent the various attacks. We expect to have many interesting cases in near future on how to secure applications and services deployed in the cloud.

## OWASP Juice Shop
This year we’ve had so much hosting Capture The Flag (CTF) events, for both employees and students. At the core of this was the OWASP Juice Shop, the world’s most modern insecure web application., has a configuration where participants can find security vulnerabilities in a safe environment. There are challenges which cover all of the OWASP Top Ten and then some. They are also ranked according to difficulty. The easiest can be solved in a flash, while others may take some research and googling. By adding the competitiveness of a CTF, you will have a great opportunity to show off your hacker skills, as well as learning a thing or two about web application security. We are all about sharing and learning, for this CTF is a perfect arena.

Another great feature of the Juice Shop is using it as a workbench for testing out new penetration test tools or specific features of such tools. We have used the Juice shop as a victim when running various attacks using ZAP or other tools. Being able to learn new tricks with penetration test tools in a controlled environment will make you more efficient when doing security assessments or doing research on your own applications.

# OWASP Security Shepherd
If you want to get into security and application security, then you could have a look at OWASP Security Shepherd. This project’s goal is to let users understand about various concepts of security risks. It can be used as a learning platform, in a classroom environment or for self-study. The different lessons are presented in the web application (actually multiple applications) with one or more challenges to solve for the topic. The focus of the project is to educate and make the use understand and learn how to avoid making the same mistakes in their own code.

By setting up Security Shepherd in a classroom the admin can create users, track individual progress to give extra guidance, if needed. There is also a built-in score board.
