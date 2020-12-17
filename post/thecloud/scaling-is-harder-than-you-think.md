---
calendar: thecloud
post_year: 2020
post_day: 20
title: Scaling is harder than you think
ingress: >-
  *“Why aren’t they running in the cloud?”* - everytime a service goes down
  under heavy traffic this is a common response. Some developers seem to think
  that as long as you are running in the cloud, you are home free. Everything in
  the cloud can scale to infinity.


  This is of course not the case.


  It is easier to make an application that can scale to infinity in the cloud, but it is not necessarily easy.
---
## Architectures

![How scalable IaaS, CaaS, PaaS and FaaS is. ](/assets/screenshot-2020-12-17-at-15.05.13.png)

**IaaS (Infrastructure As A Service)** is hard to scale automatically. Most cloud services have some mechanics available to set up auto scaling of IaaS, but it requires a lot of work in order to set it up correctly. As it is impossible for the cloud service to know what kind of software that is running on the machines, nothing can be done automatically.

**CaaS (Container As A Service)** has many of the same problems that IaaS has. The difference is that containers are often smaller and contain less services than the IaaS containers, and the tooling around scaling is easier to use.

**PaaS (Platform As A Service)** is per definition easy to scale. All you deploy is a software package that the cloud services chooses how to deploy. As long as the cloud service support some kind of auto scaling you should be good to go.

**FaaS (Functions As A Service)** has scaling built into the architecture. No FaaS functions should have any state, and hence there should be no problem having unlimited instances of them.

## Scaling your application

Regardless of which type of cloud you choose, it’s quite easy to scale stateless applications. Usually you just need more instances of them and a load balancer in front. 
The real problem is connected to your application’s side effects. These side effects include for instance databases and search engines where you pay for capacity (i.e. memory limit and cpu limit), not usage. When the price model is connected to capacity, you will have a problem from day one. When you need more capacity, it isn’t possible to quickly increase it.
In my current project we are running on Heroku with PostgreSQL-databases. In order to increase the capacity of the database, we have to take down the application so we don’t miss any commits to the database. This is not feasible in an environment where you have to be available all the time, regardless of the current load of the system.

### How to solve this problem
Given that you have dependencies that do not easily scale, how do you handle it?  It depends on several factors. First of all, is the problem related to writing og reading? How realtime does your data need to be? How complex is the integration and how much business logic resides in the integrated service?

### Rewrite dependencies
You may choose to rewrite those dependencies, for instance migrate from a sql-database to a column-oriented database. However, there are many problems with this approach. First of all, you might not have a team that knows any other databases, so you will have to recruit new people. Your application might also depend on the structure and functionality of the sql-database that other databases do not support very well. To perform such a huge task just to satisfy non-functional requirements, without getting any business value from it, might not go down well with the people paying the bills.

### Add some asynchronicity
You might consider adding a scalable persistent queue of some sort between the application and the database. Doing this enables you to have full control over how much load you are putting on the database. However this will only scale the writes, and you will get a delay before what you have written to the queue is available for reading from the database.

If reading from the integration is where you have scaling problems, you might choose to propagate changes written to the database to other datasources, like a search engine, file storage or other databases. Some databases have built in support for Master/Slave architectures that makes this quite easy to do. As with using a queue for writing, this approach will also make the data available at the slaves some seconds later than when you wrote it. However, if you need realtime data in some parts of your application you can read from the master database.

### Rent a huge database server
This might be the best short time solution. It might feel expensive, but compared to the development cost in the previous solutions it is nothing. Make sure to rent a server that will handle as much traffic as you think you will have in the year. Of course, it you suddenly have a spike in traffic that you didn’t foresee, you will go down.

### Queuing your customers
One solution I haven’t discussed is simply to have a limit on how much traffic you can handle. Ticket vendors and stores having black friday sales have this active. If the amount of traffic is too much, the customers will be put in a queue. Let just pray that they’ll stick around long enough to do what they came to your site to do

### Scaling vs development speed vs complexity vs cost
There are several things you can do in order to handle scaling of your application and services. However they all come with a cost. The man hours required to write the scaling, the effect this scaling has on your development speed and the increased complexity of your application.
If your time to market is drastically increased after you have implemented advanced unlimited scaling, you might not need the scaling after all.

In summary, consider scaling requirements vs development speed vs complexity vs cost of implementing before you do anything drastically.

