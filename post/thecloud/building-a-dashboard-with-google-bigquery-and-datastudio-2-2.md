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
Now it’s time to build our to visualise the data we have gathered. Google Data Studio makes you easily build nice-looking reports and live dashboards.



4. Save the queries as views

As we saw in the last post, we had to do some easy querying in BigQuery to get the data sets and tables we needed. For example, we joined the realtime bike availability status table with another table containing the names of the stations. BigQuery lets you save these queries as views, which is a virtual table based on the query results.



In Google Data Studio, 



5. Visualise your data

Google Data Studio is ideal for creating simple, interactive dashboards and reports. You can connect to a bunch of different services, of course including BigQuery, and share them with others.





![Screenshot from Google Data Studio](/assets/datastudio_screen.png)



6. Pros and cons

While this hasn’t been a complete step to step guide, I hope you have gotten a decent overview on how to get started with BigQuery and DataStudio. I really recommend testing out this powerful combination to build reports and dashboards, whether it is for an actual work project or just something convenient and fun for your home. I don’t have much programming experience, but was able to get this dashboard up and running with minimum time and effort.



The combination with DataStudio presents an ideal and low-risk tool for experimenting and playing with your data to uncover new and interesting insights. It does have some limitations, in particular when it comes to more advanced , as well of the lack of flexibility in design elements. But even for those more advanced use cases, it can still be beneficial to develop and test different MVPs using DataStudio before you go on to build a full dashboard from the ground up.



It is also ideal for presenting data otherwise only reachable to, to non-tech savvy users. Data Studio can, for example, automatically send out scheduled reports to stakeholders. 



The power of the Google Cloud Platform and BigQuery gives you the ability to build complex queries on giant datasets, while keeping query time and costs low.



However, keep an eye out for 



Good luck!
