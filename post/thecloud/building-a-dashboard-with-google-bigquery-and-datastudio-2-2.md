---
calendar: thecloud
post_year: 2019
post_day: 14
title: Building a dashboard with Google BigQuery and DataStudio (2/2)
ingress: >-
  Dashboards and information screens are becoming increasingly common for
  monitoring and displaying important, relevant information at a glance. This
  blog post is part two of a short series where we look at how I, without much
  programming skills, was able to build such a dashboard in the cloud using
  Google’s BigQuery and DataStudio tools.
authors:
  - Morten Winther Wold
---
In yesterday's post, we looked at how to get our data into BigQuery, and build queries to extract the information we wanted. Now it’s time to build our to visualise the data we have gathered using Google Data Studio.

![](/assets/dashboard.png)

## 4. Save the queries as views

As our real-time bike availability status did not contain the station names, which we would want to display in the dashboard, we had to join two tables. In addition we wanted to calcualate some eucledian distances between map locations and bike stations (yup, that rhymes). BigQuery lets you save these queries as _views_, which is a virtual table based on the query results. These views will then contain all the columns and you can even query to a view itself.

In Google Data Studio, 

## 5. Visualize your data

Google Data Studio is ideal for creating simple, interactive dashboards and reports. You can connect to a bunch of different services, such as - you guessed it - BigQuery, and share them with others.



![Screenshot from Google Data Studio](/assets/datastudio_screen.png)

## Final thoughts

While this hasn’t been a complete step to step guide, I hope you have gotten a decent overview on how to get started with BigQuery and DataStudio. I really recommend testing out this powerful combination to build reports and dashboards, whether it is for an actual work-related project or just something convenient or fun for your own home. I don’t have much programming experience, but was able to get this dashboard up and running with minimum time and effort.

For business insight purposes, these tools presents an efficient, low-risk opportunity for experimenting and playing with your data to uncover new and interesting insights. It is also ideal for taking data otherwise only reachable to  data engineers or scientists, and present it to not so tech-savvy users. Data Studio can, for example, automatically send out scheduled reports.

Data Studio, however, does have some limitations both in design flexibility and data manipulation. But even for those more advanced use cases, it can still be beneficial to develop and test different MVPs using DataStudio before you go on to build a full dashboard from the ground up.

But all in all: the power of the Google Cloud Platform, BigQuery and Data Studio, gives you the ability to build complex queries on giant datasets, and quickly present the results in a simple, visual manner.

Good luck!
