---
calendar: security
post_year: 2020
post_day: 24
title: Merry Christmas!
ingress: In the [first article](https://security.christmas/2020/1) of this
  year's calendar, we gave a few tips to help making your applications a bit
  more secure. Now, as the countdown has come to an end and we are ready to
  start the Christmas holidays, we want to give you a few more.
authors:
  - Robert Larsen
---
## 1. Sufficient logging and monitoring

Without sufficient logging you know very little about how you are app is doing. You can be under constant attack, without even knowing about it. Pay special attention to login-errors and failed validation of input. These things can be signs of someone trying to attack you. 

Use a centralized logging tool, so you have a chance to aggregate and search through your logs. Trigger alerts when something unusual happens. Log what you need to debug and follow a situation, but not more. To establish a good logging and monitoring regime is difficult. Evolve and learn over time.

## 2. Take control of your data

Take a step back and consider, is the data I have something I really need. And, needing the data now does not mean that you need to keep it forever. Perform an analysis of what data you have and where it flows. In that way, it may be easier to identify vulnerabilities in where the data flows. Often it is the data you have that makes you an attractive target to attack. The less you know, the less tempting it will be to attack you.

## 3. Never trust input

Might seem obvious and a bit repetetive, but you should never trust input to your app. Neither from users or other systems. Escape requestdata that you cannot trust. In frontend, use a framework or tool designed to prevent XSS. If you are talking to a relational database, you might use a light-weight ORM-tool with advantage. As we mentioned in 1st of December, know your HTTP-headers and use them correctly. 

## 4. Don't expose more than you need to

A user does normally not care about that you use version X of webserver Y. Or that you have a table-column named Z in your database. So, why not keep that information for yourself? We see lot of examples where such information is exposed in error messages or stack-traces when something goes wrong.

## 5. Know your platform



We hope you have enjoyed the calendar just a much as we enjoyed creating it. From the security practice group at Bekk - Merry Christmas!