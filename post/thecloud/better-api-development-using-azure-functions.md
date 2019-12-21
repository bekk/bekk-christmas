---
calendar: thecloud
post_year: 2019
post_day: 22
title: Better API development using Azure Functions
ingress: >-
  The Cloud has changed the way we work. From enabling truly global scale
  through faster and repeatable deployments, to a whole new DevEx for working
  with back-end services.
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

Software is part engineering, part craftmanship and part fashion. The pendulum of API formaility moves back and forth as we developers learn and unlearn the lessons of our forebears. From the XML WSDL definitions from the days of yore, to the free flowing JSON of REST based systems, back to the specific protobuf definitions of GRPC, or the always backwards compatible schemas and types of GraphQL.

APIs are an important part of almost any modern software system and in apps, they are the contract of communication between the backend and the user facing parts.

This communication is not only for the benefits of machines, but is the understanding of the domain shared between the developers of the different parts of the system. And this understanding evolves over time. How do we iterate and foster creative and responsible cooperation between frontend and backend while keeping the system running at all times, even before the system is ready for launch?

Enter proxies!

We can use [AWS Lambda](https://aws.amazon.com/lambda/), [Google Cloud Functions](https://cloud.google.com/functions/) or [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) to mock our API surface from the start of the project, backfilling with actual services as they are completed. These APIs makes the shared understanding of the domain explicit and they can be continously iterated upon as more knowledge is gained. The frontend guys and gals can start with any part of the app and the backend people can do the same. Thus enabling them to learn quicker and together maintain their shared understandig as running code.

Heres how you create a mock service using Azure Functions in TODO easy steps:

