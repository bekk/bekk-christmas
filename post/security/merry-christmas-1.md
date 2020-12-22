---
calendar: security
post_year: 2020
post_day: 24
title: Merry Christmas!
image: https://images.unsplash.com/photo-1482173074468-5b323335debe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80
ingress: In the [first article](https://security.christmas/2020/1) of this
  year's calendar, we gave a few tips to help making your applications a bit
  more secure. Now, as the countdown has come to an end, and we are ready to
  start the Christmas holidays, we want to give you a few more.
authors:
  - Robert Larsen
---
## 1. Logging and monitoring

Sufficient logging and monitoring is essential to gain insight into how your app is doing out there in production. Without it, you may be under attack without even knowing it. In your logs, pay special attention to login-errors and failed validation of input. Repeated errors of this kind may indicate that someone is trying to attack you. 

To be able to aggregate the information and search your logs in a useable way, you should use a centralized logging tool. An alternative is to use the so-called "ELK-stack", i.e. Elastic Search, Logstach and Kibana. You should not need to continuously read your logs manually, to detect suspicious or unexpected situations. You should instead set up some triggers for alerts. If there are many log entries of a certain kind, unusual amount of errors, and so on, an alert should be fired in a channel you have an eye on.

The amount of logging needed, and what information you should log, does not have a definitive answer. As usual, it depends... However, it is important to continuously improve and gradually learn over time. Do not log so much information that you are overwhelmed with data, but, on the other side, you should also have the information necessary to debug and detect abnormal situations. Be careful with sensitive data!

## 2. Take control of your data

Often, the data you have is what makes your application an attractive target to attack. The less you know, the less tempting it will be to attack you. Take a step back and consider, is this data something I really need? And, even if you need it now you probably not need to keep it forever. Do an analysis of what data you actually have, where it is stored, and where it flows. Then, it may be easier to identify vulnerabilities and take qualified decisions.

## 3. Never trust input

This might seem obvious and a bit repetetive, but you should never trust input. Neither from users or external systems. Always escape request-data that you cannot trust. In frontend, use a framework or tool designed to prevent XSS. If you are talking with a relational database, you might wan't to use a light-weight ORM-tool. That will help you prevent SQL-injections. And, as we halve also mentioned [before](https://security.christmas/2020/1), know your HTTP-headers and use them correctly. 

## 4. Don't expose unnecessary information

Your users does normally not care that you use version X of webserver Y. Nor that you have a table-column named Z in your database. So, why not keep that information for yourself? We see lot of examples where such information is exposed in error messages or stack-traces in the browser, thus presented to the users, when something goes wrong. This information does not belong there. The more information you reveal about your platform and application, the more attack vectors you introduce. Instead, keep such information in your logs and serve you users with a more decent and and understandable error-message. 

## 5. Know your platform

Whatever technology or platform you are using to build and run your application, you should invest some time to get to know it. Learn how you configure it in a proper manner, to suit your own needs. Be wary of default configuration, and remove or turn off functionality you do neither need nor use.  

With these words we wish you a happy and secure Christmas celebration. We hope you have enjoyed following our calendar just a much as we enjoyed creating it. From the security practice group at Bekk - Merry Christmas!