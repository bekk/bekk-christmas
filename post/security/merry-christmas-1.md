---
calendar: security
post_year: 2020
post_day: 24
title: Merry Christmas!
authors:
  - Robert Larsen
---
The last weeks, we have covered a lot of different topics. We started by giving you a few tips for a more secure application. Before we log out of this years calendar, which we certainly hope that you have enjoyed, we give give you a few more.



1. Sufficient logging and monitoring

Without sufficient logging you know very little about how you are app is doing. You can be under constant attack, without even knowing about it. Pay special attention to login-errors and failed validation of input. These things can be signs of someone trying to attack you. 

Use a centralized logging tool, so you have a chance to aggregate and search through your logs. Trigger alerts when something unusual happens. Log what you need to debug and follow a situation, but not more. To establish a good logging and monitoring regime is difficult. Evolve and learn over time.

2. Take control of your data

Take a step back and consider, is the data I have something I really need. And, needing the data now does not mean that you need to keep it forever. Perform an analysis of what data you have and where it flows. In that way, it may be easier to identify vulnerabilities in where the data flows. Often it is the data you have that makes you an attractive target to attack. The less you know, the less tempting it will be to attack you.

3. Never trust input

Might seem obvious and a bit repetetive, but you should never trust input to your app. Neither from users or other systems. Escape requestdata that you cannot trust. In frontend, use a framework or tool designed to prevent XSS. If you are talking to a relational database, you might use a light-weight ORM-tool with advantage. As we mentioned in 1st of December, know your HTTP-headers and use them correctly. 

4. Don't expose more than you need to

A user does normally not care about that you use version X of webserver Y. So, why not keep that information for yourself? There is no need to expose such information, e.g. in an error message or stack-trace ini tmsfdg

5. Know your platform