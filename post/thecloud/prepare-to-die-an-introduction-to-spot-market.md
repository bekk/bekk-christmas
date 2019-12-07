---
calendar: thecloud
post_year: 2019
post_day: 10
title: Prepare to die - An introduction to Spot Market
image: ''
ingress: >-
  Companies and developers love the cloud. The cloud provides scalability and
  resilience to some of the most critical applications for a company. Due to the
  cloud, companies are no longer required to have large server installations on
  premises. Actually, many companies are able to fully migrate almost all of its
  daily operations into the cloud. So, what are the downsides? Well, according
  [Info
  World](https://www.infoworld.com/article/3336046/why-cloud-computing-suddenly-seems-so-hard-and-expensive.html),
  there are some major concerns regarding cloud, namely costs. There are many
  ways to combat costs, and today I want to introduce you to one of my favourite
  ones, the spot market.
links:
  - title: Introduction to Spot Market by Amazon
    url: >-
      https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-spot-instances-work.html
  - title: Amazon EC2 Spot Instances
    url: 'https://aws.amazon.com/ec2/spot/'
  - title: Playing the AWS ec2 Spot Market - Matthew Powers
    url: 'https://medium.com/@mrpowers/playing-the-aws-ec2-spot-market-74b703454f4f'
authors: []
---
## Why use the Spot Market?
What if I told you that renting these servers could give you a discount of up to 90% compared to a regular on-demand server. Still not convinced? Have a look at the graph below. 
![Spot market price for m1.xlarge in eu-west around Black Friday](/assets/spot-market-black-friday.png "Spot market price for m1.xlarge in eu-west around Black Friday")

The graph shows the pricing around Black Friday 2019. As you can see, if you had hosted a server at Amazon eu-west-1c, you would have paid only 10% of the on-demand price! 
However, there is a catch! Depending on the cloud provider, your provider reserves the right to at any time shutdown and remove your server at a very short notice. 
Let’s dive deeper into the world of spot marketing, why it is good and prepare your application to die!

## What is the Spot Market?
The Spot Market is in short, the unused/spare resources available at a datacenter/zone. Instead of these resources just being left in an idle state, these resources are auctioned away to the highest bidder. 
So, how do we bid, and how does that process work? Well, in order to get an instance you specify the maximum amount you want to buy your resources for. If your max value is lower than the market price, you will have your server. However, should the market price surpass your bid, well, then that server is given to someone else. Pretty simple actually. Its kinda like buying and selling stocks.

All the four major cloud providers have some sort of spot market and they are called: 
* Amazon - EC2 spot instance
* Google - Preemtible VMs
* Microsoft - Low priority VMs
* IBM - Transient virtual servers

Some of the features varies across all the providers, however, the concept remains mostly the same. For a more detailed comparison, have a look at [this article](https://spotinst.com/blog/amazon-ec2-spot-vs-azure-lpvms-vs-google-pvms-vs-ibm-transient-servers/). In this article, we’ll focus on Amazon EC2 spot instances. 

## How do I use the Spot Market?
In order to utilize the Spot Market (safely), there are some steps and takes I want to share. There are definitely more to the Spot Market than I am able write about in this article, but here are some key takeaways.

### 1. Identify states in your app
The first step into getting ready for the Spot market is to identify what parts of your app that holds states. Our goal is to make every interaction with our app as atomic as possible, meaning the app should not have processes that depends upon a previous task. This could be as simple as write cache, background task, a file processing that is handled after a file upload is completed, you name it. I recommend having a look at the [12factorapp](https://12factor.net) for some best practices and suggestions. 

### 2. Take advantage of managed services
Managed services (often) have the advantage of scaling to your demand. Therefore, leaving the responsibility of hosting and scaling the service to the cloud provider could be a good idea. Some of the services to consider having as a managed service are typically:
* Raw storage (Block storage, object storage)
* Database services (SQL, NoSQL, Document Storage, K/V store, Column stores)
* Messaging and related services (Event streams, Message brokers)
* CDN Services
* Notification services (Email, SMS, Websockets, chatbots(?))

The list goes on and on… Some may even use Blockchain as a service. Nonetheless, the main point is to utilize these services and let somebody else manage the scaling where that makes sense for your application. In some cases it might not make sense to use a managed service due to it not fitting your applications needs. 

### 3. Plan the scaling
Finding out how your application should scale is an important step in your journey to the cloud. In most cases, applications should be written in a way that makes them able to scale horizontally (adding more servers). However, if your application or logic makes that impossible, vertical scaling could also be an option. 
If your application receives little to no traffic during specific intervals (i.e nights), then running  many instances might not be a requirement. 

## Summary
With this knowledge you are way underway towards the various spot markets. I would recommend investigating the various features your cloud provider have. Remember the spot market is simply a tool that can be utilized. In many cases, this tool reduces the costs of running your application. In my opinion, if you have an application that works for the Spot Market, then you have a very resilient application that actually will handle an enormous amount of workload.
If you found this interesting, I recommend digging into some of the links below. Good luck with your next cloud project.
