---
calendar: thecloud
post_year: 2020
post_day: 3
title: Can you save money with the Azure SQL Serverless tier?
image: https://images.unsplash.com/photo-1557844335-7d77e5cb1a23?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80
ingress: >-
  When using fully-managed Azure SQL databases there are mainly two different
  cost/resource models to choose between. In my team we have been running the
  Standard tier which have a fixed amount of resources provisioned, and thus a
  predictable fixed cost. The alternative is the Serverless tier that scales the
  database on demand and instead you pay per use.


  One of our important production databases uses a lot of computing power while performing various tasks once every morning, and then smaller sporadical load the rest of the day and night. A good fit for the Serverless tier? Could we achieve the same performance at reduced cost? Read on and I will let you in on what I figured out!
links:
  - url: https://docs.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview
    title: Serverless compute tier
authors:
  - Christian Young
---
First let's talk about the Standard tier. It has a simple method of deciding how much power you need by saying how many [DTU](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) (Data Transfer Units) you want in eight different intervals from S0(10 DTU) to S12(3000 DTU). Our database, which actually works as both an analytical platform as well as having operational dependencies to different systems, is on the S9 (1600 DTU) tier. This means the database has a list price of around 20 000 NOK/month. This is needed to be able to cope with its many tasks as well as have headroom for reporting, systems running queries and other stuff.

![S9 tier](https://user-images.githubusercontent.com/920028/100767431-0d206700-33fa-11eb-8c18-9a861cd5b099.PNG)

Moving on to the Serverless tier which is found under the much more configurable vCore based tier categories. The General Purpose category looked okay for our usage knowing that Hyperscale or Business Critical would be much more expensive. The main price driver here is the amount of vCores you want. But how do you know the equivalent vCores to your DTU found in the Standard tier? A quick Google search yielded that `100 DTU = 1 vCore`. Our current tier S9 is 1600 DTU. 16 vCores would be 6000 NOK/month more expensive, so I went with 12 to see how it performed.

![Provisioned vCore](https://user-images.githubusercontent.com/920028/100767340-ef530200-33f9-11eb-8bec-7a543aa40654.PNG)

First I tested our normal operations with 12 vCores in the _Provisioned_ tier to se that it was performant enough, and it was. The vCore model is more expensive, so I was not after just changing to vCores although that also sometimes has its purpose which I will not dwelve into here. I was after the Serverless tier.

![serverless](https://user-images.githubusercontent.com/920028/100769681-afd9e500-33fc-11eb-8242-060160e6d954.PNG)

I configured max vCores to 12, as I knew that would be performant enough for our most heavy operations, and let the minimum stay on 1.5. The cost for the Serverless tier is `0.001294 NOK / vCore / second`. This means that if we are running at maximum cores the price would be `0.001294 NOK * 12 (cores) * 60 (seconds) * 60 (minutes) * 24 (hours) * ~30 (days) = 40249 NOK`, and the minimum would be ` 0.001294 NOK * 1.5 (cores) * 60 (seconds) * 60 (minutes) * 24 (hours) * ~30 (days) = 5031 NOK`. I sure hoped this wasn't running on max most of the time!

One of my concerns was regarding a feature called Autopause. Enabling this will put the whole database to sleep when there is no activity after a given amount of time. I found an [article](https://kohera.be/blog/azure-cloud/should-i-use-serverless-for-all-my-azure-sql-databases/) where I read that the first connection to the database *would fail*. Therefore I disabled this feature to not cause any unwanted interruptions for systems or other consumers.

 