---
calendar: thecloud
post_year: 2020
post_day: 3
title: Can you save money with Azure SQL Serverless tier?
image: https://images.unsplash.com/photo-1557844335-7d77e5cb1a23?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80
ingress: When using fully-managed Azure SQL databases there are several choices
  on how to provision resources in terms of computing power and storage. In my
  team we have been running the Standard tier which have a fixed amount of
  resources provisioned, and thus a predictable fixed cost as well. My team has
  a database running in production that uses a lot of computing power while
  performing various tasks once every morning, and then only smaller
  sporadically load the rest of the day and night. The thought was that this
  would be a candidate for the Serverless tier which automatically scales the
  database on demand and then you only pay per use. Could we achieve the same
  performance at reduced cost?
authors:
  - Christian Young
---
Test