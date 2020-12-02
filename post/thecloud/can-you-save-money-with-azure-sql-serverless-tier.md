---
calendar: thecloud
post_year: 2020
post_day: 3
title: Can you save money with the Azure SQL Serverless tier?
image: https://images.unsplash.com/photo-1557844335-7d77e5cb1a23?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80
ingress: >-
  When using fully-managed Azure SQL databases, there are mainly two different
  cost/resource models to choose between. In my team, we have been running the
  Standard tier, which has a fixed amount of resources provisioned, and thus a
  predictable fixed cost. The alternative is the Serverless tier that scales the
  database on demand, and instead, you pay-per-use.


  One of our important production databases uses a lot of computing power while performing various tasks once every morning, and then smaller sporadic load the rest of the day and night. A good fit for the Serverless tier? Could we achieve the same performance at a reduced cost? Read on, and I will let you in on what I figured out!
links:
  - url: https://docs.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview
    title: "Microsoft: Azure SQL Serverless compute tier"
authors:
  - Christian Young
---
### Standard tier
First, let's talk about the Standard tier. It has a simple method of deciding how much power you need by saying how many [DTU](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) (Data Transfer Units) you want. This divides into eight different intervals from S0(10 DTU) to S12(3000 DTU). Our database is on the S9 (1600 DTU) tier. This means the database has a list price of around 20 000 NOK/month. The power is needed to be able to cope with its many tasks serving as an analytical platform. We need capacity for analytical reporting, operational dependencies, systems running queries, and other stuff. The following picture shows how the Standard tier, alongside its close relatives Basic and Premium can be configured in the Azure portal.

![S9 tier](https://user-images.githubusercontent.com/920028/100767431-0d206700-33fa-11eb-8c18-9a861cd5b099.PNG)

### The flexible vCore tiers

But there is another whole category of tiers that offers much more flexibility, and that is the vCore tiers. They are structured around vCores (virtual cores) as the unit of computing power instead of DTU. Think of vCores as cores in a CPU. Here is where we find the Serverless compute tier inside the category tier General Purpose. The General Purpose tier looked okay for our usage, knowing that Hyperscale or Business Critical would be much more expensive.

![Provisioned vCore](https://user-images.githubusercontent.com/920028/100767340-ef530200-33f9-11eb-8bec-7a543aa40654.PNG)

The main price driver here is the number of vCores you want. But how do you know the equal vCores to your DTU found in the Standard tier? A quick Google search told me that ~`100 DTU = 1 vCore`. Our current tier S9 is 1600 DTU. 16 vCores would be 6000 NOK/month more expensive, so I went with 12 that had around equal price as we pay now to see how it performed. Previously we have been using the one before S9, S6 with 800DTU, but we experienced load problems and had to bump it up, so 12 might be okay.

### Testing vCore amount in the Provisioned tier

First, I tested our normal daily operations that require a lot of power with 12 vCores in the _Provisioned_ tier to see that it was performant enough. I was happy to see that the execution time was equal! My goal was not simply to change to a vCore tier, although it has interesting features that I will not talk further about here. I wanted to specifically test the Serverless tier. Having locked down my vCore count without exceeding my budget, I went on to configure the Serverless tier.

### The cost of the Serverless tier

As shown in the image below, I configured maximum vCores to 12. I knew that would be performant enough for our most heavy operations, and I let the minimum stay on 1.5 vCores to allow maximum scalability. The cost for the Serverless tier is `0.001294 NOK / vCore / second`. This means that the cost calculations at maximum and minimum are as follows:
```
// Maximum (using 12 cores all the time)
0.001294 NOK * 12 (cores) * 60 (seconds) * 60 (minutes) * 24 (hours) * ~30 (days) = 40249 NOK/month

// Minimum (using 1.5 cores all the time)
0.001294 NOK * 1.5 (cores) * 60 (seconds) * 60 (minutes) * 24 (hours) * ~30 (days) = 5031 NOK/month
```
I sure hoped this wasn't running on max most of the time, because that would be twice as expensive as our current solution, and I am here to save money!
![Serverless vCore](https://user-images.githubusercontent.com/920028/100769681-afd9e500-33fc-11eb-8242-060160e6d954.PNG)

### The Autopause feature
One of my concerns was regarding a feature called Autopause, which is enabled by default. Enabling this will put the whole database to sleep when there is no activity after a given amount of time. That means there is more money to save, but there is a catch. I found an [article](https://kohera.be/blog/azure-cloud/should-i-use-serverless-for-all-my-azure-sql-databases/) where I read that the first connection to the database *would fail*. So, I disabled this feature to not cause any unwanted interruptions for systems or other consumers.

### Deploying to production
All our infrastructure is configured in code written as a mix of Powershell and ARM(Azure Resource Manager) templates. I didn't click save when fiddling with the GUI in the Azure Portal. I changed our ARM template to reflect my changes and re-provisioned the database to deploy my change. The configuration looks something like this:

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
Note the property `"autoPauseDelay": -1`. This value disables the feature.

What I was most interested in after deploying was the following
- Is there any performance degradation while scaling to meet the increase in load?
- Would consumers notice anything in terms of response times or performance?
- How much would this actually cost us? Can we save money?

To answer my first question, I did some manual analysis by timing known operations and how long they take after the change compared to before. I found it to be of equal performance, if not actually better.

My second question is a bit tied to the first. I notified all our consumers of what I have changed and made them be extra aware while doing operations. I asked them to give immediate feedback if systems, reports, queries, etc. behaved any differently in terms of performance. I am pleased to say no one complained once!

### Cost analysis of our database

Then to the most important part of my experiment. How much does it cost? To find this out, I had to monitor my "vCore second" usage manually. Not so glamorous other than staring at a graph in the Azure portal several times a day. By knowing how many vCore seconds we had used the first hour, I could multiply that to calculate predictions about how our monthly cost would look if our current load pattern continued. I then continued calculating such forecasts as the hours and days passed on. That way the cost was under control, and I didn't exceed my budget. If the numbers after say, a showed that this is in fact not cost-effective, I would have reverted my change.
 
![seconds2](https://user-images.githubusercontent.com/920028/100775234-490bfa00-3403-11eb-8186-9dc23c68f979.PNG)

This picture shows vCore seconds used over a pretty average week for our database. Notice the spikes in the load that reflects the daily tasks I mentioned previously, as well as the reduced load during the weekend. If all weeks were like this week, our database would cost `0.001294 NOK * 1.55 mil vCore seconds * 4 weeks = 8022 NOK/month`. This is actually not very far from the truth! We have had the Serverless tier running on this database for a little over a month now, and the cost has been *10895 NOK/month*. That is nearly half the price of the S9 1600DTU tier!

Now, that we actually managed to cut the price in half is dependent on a few things. Remember that we did not go 1-1 on the DTU to vCore conversion. We managed with 12 vCores equal to 1200 DTU instead of 16 vCores equal to 1600 DTU. This was also because the previous Standard tier S6 only sport 800 DTU. That caused too much load problems for us, and there is nothing in the middle before S9 with 1600 DTU.

Next, the nature of our load patterns seems to be a very good fit for this kind of elastic and scalable approach. We require a lot of power when we are performing some of our important operations and not so much the rest of the time.

### Is the Serverless tier always cheaper?

I have overheard others seeing a lot of increase in cost by going to the vCore Provisioned or Serverless compute tier. This approach is certainly not the way for all use cases. If you consider moving away from the DTU model, make sure you actually need the features and the increased flexibility of the vCore tiers. Or that your load patterns make a good fit for a serverless approach. DTU might be sufficient and cheaper for your case.

### Conclusion 
On this particular database with its spiky load patterns, we actually managed to cut our cost in half without degrading performance using the Azure SQL Serverless tier. My experience is that the database scales fast when required, and backs down nicely when the load decreases. Having this on-demand resource strategy is all about saving money, and for us it did. Be careful if you attempt to try this out, as vCores and especially Serverless tier vCores are more expensive than, e.g., tiers using DTU. Pay close attention to your vCore second usage after deploying and do forecast calculations when the database has experienced normal load after a few hours or days. Good luck!

_Prices used in this article are public list prices taken from Azure's websites_