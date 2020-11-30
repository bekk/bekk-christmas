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
authors:
  - Christian Young
---
First let's talk about the Standard tier. It has a simple method of deciding how much power you need by saying how many [DTU](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) (Data Transfer Units) you want in eight different intervals from S0(10 DTU) to S12(3000 DTU). Our database, which actually works as both an analytical platform as well as having operational dependencies to different systems, is on the S9 tier. This means the database has a list price of around 20 000 NOK/month. This is needed to be able to cope with its many tasks as well as have headroom for reporting, systems running queries and other stuff.

