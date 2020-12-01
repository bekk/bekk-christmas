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
    title: "Microsoft: Azure SQL Serverless compute tier"
authors:
  - Christian Young
---
First let's talk about the Standard tier. It has a simple method of deciding how much power you need by saying how many [DTU](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) (Data Transfer Units) you want in eight different intervals from S0(10 DTU) to S12(3000 DTU). Our database is on the S9 (1600 DTU) tier. This means the database has a list price of around 20 000 NOK/month. This is needed to be able to cope with its many tasks serving as an analytical platform as well as have headroom for analytical reporting, operational dependencies, systems running queries and other stuff. The following picture show how the Standard tier along side its close relatives Basic and Premium can be configured in the Azure portal.

![S9 tier](https://user-images.githubusercontent.com/920028/100767431-0d206700-33fa-11eb-8c18-9a861cd5b099.PNG)

But there is another whole category of tiers that offers much more flexibility, and that is the vCore tiers. They are structured around vCores (virtual cores) as the unit of compute power instead of DTU. Think of vCores as cores in a CPU. Here is where we find the Serverless compute tier inside the category tier General Purpose. The General Purpose tier looked okay for our usage knowing that Hyperscale or Business Critical would be much more expensive. 

The main price driver here is the amount of vCores you want. But how do you know the equivalent vCores to your DTU found in the Standard tier? A quick Google search told me that ~`100 DTU = 1 vCore`. Our current tier S9 is 1600 DTU. 16 vCores would be 6000 NOK/month more expensive, so I went with 12 that had around equal price as we pay now to see how it performed. Previously we have been using the one before S9 - S6 with 800DTU, but we experienced load problems and had to bump it up, so 12 might be okay.

![Provisioned vCore](https://user-images.githubusercontent.com/920028/100767340-ef530200-33f9-11eb-8bec-7a543aa40654.PNG)

First I tested our normal daily operations that I know require a lot of power with 12 vCores in the _Provisioned_ tier to se that it was performant enough. I was happy to see that the execution time was equal! The vCore model is more expensive, so I was not plainly after changing to a vCore tier, although that also sometimes has its purpose which I will not delve into here. Having locked down my vCore count without blasting through my budget, I went on the configure the Serverless tier.

![serverless](https://user-images.githubusercontent.com/920028/100769681-afd9e500-33fc-11eb-8242-060160e6d954.PNG)

I configured max vCores to 12, as I knew that would be performant enough for our most heavy operations, and let the minimum stay on 1.5 to allow maximum scalability. The cost for the Serverless tier is `0.001294 NOK / vCore / second`. This means that the cost calculations at maximum and minimum is as follows:
```
Maximum => 0.001294 NOK * 12 (cores) * 60 (seconds) * 60 (minutes) * 24 (hours) * ~30 (days) = 40249 NOK
Minimum => 0.001294 NOK * 1.5 (cores) * 60 (seconds) * 60 (minutes) * 24 (hours) * ~30 (days) = 5031 NOK
```
I sure hoped this wasn't running on max most of the time, because that would be twice as expensive as our current solution and I am really here to save money!

One of my concerns was regarding a feature called Autopause, which is enabled by default. Enabling this will put the whole database to sleep when there is no activity after a given amount of time. That means there is more money to save, but there is a catch. I found an [article](https://kohera.be/blog/azure-cloud/should-i-use-serverless-for-all-my-azure-sql-databases/) where I read that the first connection to the database *would fail*. Therefore I disabled this feature to not cause any unwanted interruptions for systems or other consumers.

All our infrastructure is configured in code written as a mix of Powershell and ARM(Azure Resource Manager) templates, so I didn't click save when fiddling with the GUI in the Azure Portal. I changed our ARM template to reflect my changes and reprovisioned the database. The configuration looks something like this:

```jsonnet
"resources": [
        {
            "type": "Microsoft.Sql/servers/databases",
            "apiVersion": "2020-08-01-preview",
            "name": "[concat(parameters('production_sql_server'), '/my-important-production-database')]",
            "location": "westeurope",
            "sku": {
                "name": "GP_S_Gen5",
                "tier": "GeneralPurpose",
                "family": "Gen5",
                "capacity": 12
            },
            "kind": "v12.0,user,vcore,serverless",
            "properties": {
                "collation": "SQL_Latin1_General_CP1_CI_AS",
                "maxSizeBytes": 268435456000,
                "catalogCollation": "SQL_Latin1_General_CP1_CI_AS",
                "zoneRedundant": false,
                "readScale": "Disabled",
                "autoPauseDelay": -1,
                "storageAccountType": "GRS",
                "minCapacity": 1.5
            }
        },
```

### After deploying
What I was most interested in after deploying was the following
- Is there any performance degrade while scaling to meet increase in load?
- Would consumers notice anything in terms of response times or performance?
- How much would this actually cost us? Can we save money?

To answer my first question I did some manual analysis by timing known operations and how long they take after the change compared to before. I found it to be of equal performance if not actually better.

My second question is a bit tied to the first. I notified all our consumers of what I have changed and made them be extra aware and give immediate feedback if systems, reports, queries etc. behaved any differently in terms of performance. I am pleased to say noone complained once!

Then to the most important part of my experiment. How much does it cost? To find this out I had to manually monitor my "vCore second" usage. Not so glamourous other than staring at a graph in the Azure portal several times a day. By knowing how many vCore seconds we had used the first hour, the first day and so on, I could multiply that to calculate predictions about how our monthly cost would look if our current load pattern continued.
 
![seconds2](https://user-images.githubusercontent.com/920028/100775234-490bfa00-3403-11eb-8186-9dc23c68f979.PNG)

This picture shows vCore seconds used over a pretty average week for our database. Notice the spikes in load that reflects the daily tasks I mentioned previously, as well as the reduced load during the weekend. If all weeks were like this week, our database would cost `0.001294 NOK * 1.55 mil vCore seconds * 4 weeks = 8022 NOK/month`. This is actually not very far from the truth! We have had Serverless tier running on this database for a little over a month now and the cost has been *10895 NOK/month*. That is nearly half the price of the S9 1600DTU tier!

Now, that we actually managed to cut the price in half is dependant on a few things. Remember that we did not go 1-1 on the DTU to vCore conversion. We managed with 12 vCores equivalent to 1200 DTU instead of 16 vCores equivalent to 1600 DTU. This was also because the previous Standard tier S6 only sport 800 DTU, which caused too much load problems for us, and there is nothing inbetween until S9 with 1600 DTU.

Next, the nature of our load patterns seem to be a very good fit for this kind of elastic and scalable approach. We require a lot of power when we are performing some of our important operations and not so much rest of the time.

I have overheard others seeing a lot of increase in cost by going to vCore Provisioned or Serverless compute tier, so this is certainly not the way for all use cases. If you consider moving away from the DTU model, make sure you actually need the features and the increased flexibility of the vCore tiers or that your load patterns make good fit for a serverless approach. DTU might be sufficient and cheaper for your case.

## Conslusion 
On this particlar database with its spikey load patterns, we actually managed to cut our cost in half without degrading performance using Azure SQL Serverless tier. My experience is that the database scales fast when you need it, and backs down nicely when load decreases. Having this on-demand resource strategy is all about saving money, and for us it did, but be careful if you attempt to try this out as vCores, and especially the Serverless tier vCores, are more expensive than e.g. tiers using DTU. Pay close attention to your vCore second usage after deploying and do forecast calculations when the database has experienced normal load after a few hours or days. Good luck!

_Note that all prices in this article are from the public Azure list prices available to everyone._