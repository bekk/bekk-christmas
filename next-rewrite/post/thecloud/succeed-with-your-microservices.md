---
calendar: thecloud
post_year: 2020
post_day: 22
title: Succeed with your microservices
ingress: There are many ways of structuring or designing your microservices. My
  thoughts on the matter are that there is no right way. However, there are some
  tips that I have experienced that I think are worth sharing, and that might
  fit your project as well.
description: "Here are five tips that I think you should consider before
  starting your journey onto microservices. "
links:
  - url: https://thecloud.christmas/2020/18
    title: From code to cloud using .net 5, Docker, Github Actions and Azure App
      Services
  - title: 12-Factor App
    url: https://12factor.net
  - title: Cloud Native Computing Foundation
    url: https://www.cncf.io/
authors:
  - Anders Refsdal Olsen
---
## 1. Decompose the business problem.
The very first task I do when starting to design for microservices is to understand the business problem. Often, looking at what type of data we need to persist could give you a comprehensive understanding of the topic. 

Let's have a look at an example. Your boss assigns you the task of building an e-commerce website (your boss must hate you if he or she ever gives you a job like that.). Nonetheless, we could start by looking at how we could structure/divide our microservices.
Product Service - Will be responsible for holding all products.
Inventory Service - Will be responsible for maintaining the inventory status for a product.
Orders Service - Holds all the orders and their status.
Shipping Service - Holds the shipping status and is responsible for shipping management. 
Payment Service - Holds all the payment/invoices statuses.
Reviews Service - Holds the reviews from users regarding products.
User Service - Holds all the user-related data, i.e., logins, passwords.
With this approach, it becomes clear where all the data is supposed to be stored. For a new (or old) team member, it should be clear where they should implement a new feature. If a new feature doesn't clearly fit under any of those services, it might be a clear indication that it should probably have a microservice of its own. 

I would also empathize that the current structure isn't necessarily the right solution one year from now, or even a couple of months. The project may change over time, but having smaller services, the transition from creating or removing an entire service, becomes far less the more sparse your services are. 

## 2. Each microservice should be independent of each other.
There are probably many that say this, but I think it is important to empathize that microservices are what they are, namely MICROservices. They should not serve the application independently, yet they should handle their respective area or purpose alone, even if all other microservices are down. 

To achieve this, it is essential that the building, deployment, and hosting of the microservice should not require any other services. By that, I mean that it is ok, for instance, to have an aggregated logging service that consolidates the logging from each service. I encourage that you have some system to handle [logging like described in the 12-factor app](https://12factor.net/logs).  However, there should not be any code in each microservice that enables this behavior. 

Centralization is your enemy when dealing with microservices. You should at all cost avoid any "Common Packages" that each microservice depend on to function. They are a big anti-pattern. Don't be afraid to duplicate code to mitigate this. 

## 3. Datastores should never be shared between microservices.
A microservice is, in many ways, a sealed system. It has some entry points that abstract away the data storage and logic inside of it. Therefore, it should have some clearly defined API's for accessing and manipulating the data inside the service. Another service should never be allowed to access the same database directly. However, a microservice could consist of many separate processes that use the same datastore, for instance, a web api and a cron job. In those cases, I think that there are many does and don't. My takeaway from this is that if you manipulate data from two different parts of the microservice in the same way, then any side effects should be dispatched the same way. 

When it comes to sharing data between microservices, there are many ways to share data and keep it updated. The easiest right out of the gate might be to use a managed solution like Azure Service Bus. However, there are other open-source solutions like, for instance, Rabbit MQ that might be an as good or even better solution for you. 

## 4. Communication between each microservice.
In the perfect microservice environment, there is no synchronous communication with any other microservice. Instead, each microservice uses an event stream or bus to dispatch events whenever an action has taken place. Notice the past tense there. Ideally, we should never perform any synchronous communication with another microservice. If you can't find any other way, then the correct way might be to duplicate the data and store it within the context of both microservices. 

Sometimes, it isn't to avoid having synchronous communication between two microservices. In those cases, I think you should restrict yourself to only doing as little as possible. Most likely, there may be another solution to your problem, but you should also know that in the real world, there is nothing as a perfect system. 

## 5. Use containers
When it comes to building, deploying, and operating/hosting a microservice or an application. I can't think of anything simpler and more versatile than a container. It doesn't matter what container technology you use; there are many out there, some of being Docker and LXD. The idea that you build it once and run it anywhere is a dream come true to me. 

There might be a steep learning curve to containers, but you don't need to know everything to get started. I think that just getting started is pretty straightforward and you should be able to expand from that idea to whatever floats your boat. In a previous post, [I showed how you could use Docker with Github Actions and Dockerhub](https://thecloud.christmas/2020/18).

Another advantage of using containers is that you most likely will be using the ["Build, Release, Run"](https://12factor.net/build-release-run) principle of the 12-factor app by default. Meaning, you have an immutable build that is configurable through environment variables. Thus, combined with multiple environments, like testing, staging, and production, will ensure that you have the same codebase in all places. 

## Bonus - Cloud Native
The [Cloud Native Computing Foundation](https://www.cncf.io/) is a foundation that, in short, works towards helping organizations and individuals creating modern, scalable, and robust applications. I think to say that their work is good is an understatement. They provide tools, guides, and certifications in many relevant topics. 
I would suggest that you get to know this foundation and at least have a look at the project they deem "Graduated projects". I think you will know what to do next after that.
