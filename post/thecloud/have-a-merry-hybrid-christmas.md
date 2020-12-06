---
calendar: thecloud
post_year: 2020
post_day: 15
title: Have a merry hybrid Christmas
ingress: 2020 has been, and still is a special year for us because of the
  pandemic dominating most of the news (fake or not). Despite the fact that he
  apparently is
  [immune](https://eu.usatoday.com/story/news/nation/2020/11/20/covid-19-and-christmas-santa-immune-coronavirus-fauci-says/3777871001/),
  it has still been a special year also for Santa Claus. 2020 is the year when
  he begun his journey towards the cloud for his on-northpole infrastructure.
links:
  - title: Santa Claus is immune
    url: https://eu.usatoday.com/story/news/nation/2020/11/20/covid-19-and-christmas-santa-immune-coronavirus-fauci-says/3777871001/
authors:
  - Espen Ekvang
---
## The challenge

With a growing number of people on the planet, every year the number of presents to be made by Santa Claus and his elves are increasing. Consequently Santa Claus needs to improve his efficiency, not just the way he produces content for all the gifts but also the way he and his team maintains, improves and extends the on-northpole infrastructure. An increased number of servers, of course requires more man hours to maintain and assure that everything is working as expected. Moving parts of this to the cloud will help him be prepared for growth and hopefully also free up time from his valuable elves.

Performing a lift-and-shift operation was not possible for several reasons, hence he wanted to make sure all new work was done in the cloud - but still being able to have existing infrastructure on-northpole - making up a hybrid approach.

The on-northpole infrastructure consists of mainly windows servers and he chose the cloud platform to be Micrsoft Azure. In this post we will look into how he established the connection between Azure and on-northpole to assure data from on-northpole would be available seemlessly in the cloud.

## Azure App Service Hybrid Connection

Santa Claus resources are not available on the internet, but the are able to make outbound calls to Azure over port 443 - making them a candidate for exposure through what is called a [Hybrid Connection](https://docs.microsoft.com/en-us/azure/app-service/app-service-hybrid-connections) in Azure. The illustration below is taken from the documentation, as shown in the illustration there are few moving parts and it is quick and easy to set up.

Santa Claus want to expose a new API providing information about his elves. The API will be created in the cloud as a Web App, but some of the data needed for the API is only available from servers on-northpole at the moment. To establish this Santa Claus needs:

* a Web App to expose the new API in the cloud
* an [Azure Relay](https://docs.microsoft.com/en-us/azure/azure-relay/relay-what-is-it) to work as the hybrid connection between on-northpole and the cloud
* to install the Hybrid Connection Manager on the server on-northpole which holds that data needed for the new API

These three parts are illustrated in the figure below taken from the documentation of Azure App Service Hybrid Connection

![](/assets/hybridconn-connectiondiagram.png "How the hybrid connection works")

In order to make this work Santa Claus needed the following:

* A resource group in Azure holding the new Web App and the relay for the Hybrid connection