---
calendar: thecloud
post_year: 2019
post_day: 22
title: Better API development using Azure Functions
image: >-
  https://images.unsplash.com/photo-1459695452562-46cc57bef5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
ingress: >-
  The Cloud has changed the way we work. From enabling truly global scale
  through faster and repeatable deployments to a whole new DevEx 

  for working with back-end services.
links:
  - title: Azure Functions
    url: 'https://azure.microsoft.com/en-us/services/functions/'
  - title: Cloud Functions
    url: 'https://cloud.google.com/functions/'
  - title: AWS Lambda
    url: 'https://aws.amazon.com/lambda/'
authors:
  - Runar Ovesen Hjerpbakk
---
Case-in-point; the humble API:

> An application programming interface (API) is an interface or communication protocol between different parts of a computer program intended to simplify the implementation and maintenance of software.

Software is part engineering, part craftsmanship and part fashion. The pendulum of API formality moves back and forth as we developers learn and unlearn the lessons of our forebears. From the XML WSDL definitions from the days of yore to the free-flowing JSON of REST-based systems, back to the specific protobuf definitions of GRPC, or the always backward-compatible schemas and types of GraphQL.

APIs are an important part of almost any modern software system and in apps, they are the contract of communication between the backend and the user-facing parts.

This communication is not only for the benefits of machines but is the understanding of the domain shared between the developers of the different parts of the system. And this understanding evolves over time. How do we iterate and foster creative and responsible cooperation between frontend and backend while keeping the system running at all times, even before the system is ready for launch?

Enter cloud functions and proxies!

[AWS Lambda](https://aws.amazon.com/lambda/), [Google Cloud Functions](https://cloud.google.com/functions/) or [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) are all excellent choices for cloud functions. That is, event-driven serverless compute platforms where you pay for what you use.

![Cloud Functions](https://hjerpbakk.com/img/bekk-christmas/how-it-works.svg)

Perfect for a variety of tasks, but also useful for mocking our API surface from the start of the project, backfilling with actual services, serverless or otherwise, as they are completed. These APIs make the shared understanding of the domain explicit and they can be continuously iterated upon as more and more knowledge is gained throughout the project. The frontend guys and gals can start with any part of the app and the backend people can do the same. Thus enabling them to learn quicker and together maintain their shared understanding as running code, not in definition files or documentation.

In the example below we use Azure Functions to first create a proxy with only mock data, then use a real backend service to proxy a finished service.

Create a new Function App using the [Azure Portal](https://portal.azure.com):

![Create a new Functions app](https://hjerpbakk.com/img/bekk-christmas/1-create-a-new-function-app.png)

Configure your new Function App:

![Configure the new Functions app](https://hjerpbakk.com/img/bekk-christmas/2-configuration.png)

Function apps can be actual running code, using `Functions` in the screenshot below, but we'll use `Proxies` to create a new proxy:

![New proxy](https://hjerpbakk.com/img/bekk-christmas/3-new-proxy.png)

In proxies, we can just return data for the given endpoint and HTTP-method. In the example below, Christmas has not yet arrived and this is the simplest service known to man:

![Simple mock data](https://hjerpbakk.com/img/bekk-christmas/4-simple-mock-data.png)

The data need not be so trivial and the API surface will most likely be less anemic in a real example, but this is literally all that is needed to mock whatever HTTP-based service you want using Azure Functions. 2 minutes, and you have a service up and running!

Accessing the `https://is-it-christmas.azurewebsites.net/ChristmasEve` endpoint will yield the sad truth regarding Christmas.

![Proxied endpoint](https://hjerpbakk.com/img/bekk-christmas/6-proxied-endpoint.png)

Any other endpoint will reach the actional function and just show the standard template:

![Template](https://hjerpbakk.com/img/bekk-christmas/5-regular-endpoint.png)

Now, to use an existing service and the function as an actual proxy, just use a `Backend URL`, for instance, a popular [holiday API](https://holidayapi.com/docs):

![Proxy](https://hjerpbakk.com/img/bekk-christmas/7-proxy.png)

Visiting the endpoint returns the data from the proxied service:

![Proxied results](https://hjerpbakk.com/img/bekk-christmas/8-results.png)

This post has just scratched the surface of what's possible using functions to speed up API development. Don't be afraid to use the cloud _just_ to speed up your development iterations. Even if your production environment is still stuck on-prem and Christmas is still a couple of days away, the real key to effective and efficient software development is _learning_.
