---
calendar: thecloud
post_year: 2020
post_day: 7
title: Can Kubernetes save Microsoft Azure?
image: https://images.unsplash.com/photo-1547058337-e8679fe091dd
ingress: Azure has been growing rapidly in the enterprise in recent years. But
  its app services offering, which is the most important service for developers,
  is still mediocre. Kubernetes is, in my opinion, the only viable alternative
  for running applications in Azure. This blogpost explains how I came to that
  conclusion after roughly 6 years of working with Azure.
description: azure, kubernetes
authors:
  - Nordine Ben Bachir
---
# Azure, the expensive cloud

Users are forced into buying “Premium tier” to enable key functionality such as VPC/VNET integration:

* Need API Management with virtual network connectivity? Must pay premium tier, monthly fee + consumption.
* Need Functions with virtual network connectivity? Must pay premium tier, monthly fee + consumption.
* Need a service bus with virtual network connectivity? Must pay premium tier, monthly fee + consumption.
* Need a WAF with virtual network connectivity? Must pay premium tier, monthly fee + consumption.

I could continue the list with Azure AD, Redis cache, and so on, but you get the idea. This is not how the cloud was supposed to be, this pricing model simply does not scale.

# VPC & Virtual networks

Accessing or running services inside a VPC / Virtual network is incredibly difficult and expensive. There are 3 ways to achieving it and they are all bad:

* [Application Service Environment](https://github.com/uglide/azure-content/blob/master/articles/app-service-web/app-service-web-how-to-create-an-app-service-environment.md) (v2)

  * Slow
  * Limited in terms of functionality
  * Expensive.
* [Private Endpoints & regional VNET integration](https://docs.microsoft.com/en-us/azure/app-service/web-sites-integrate-with-vnet)

  * Complicated to set up and maintain
  * Expensive 
* IP Source Whitelisting

  * Complicated to maintain
  * Not as secure as other solutions
  * [Some resources don’t have static IPs ](https://docs.microsoft.com/en-us/azure/app-service/overview-inbound-outbound-ips)

Consequently, many organizations choose to ignore that exposing databases directly to the internet is not recommended and simply run all their services without any virtual network. Authentication is then the only layer of security protecting those resources.

# Automation & Infrastructure as code 

Many years ago, I worked with the Azure Classic deployment model (sometimes referred to as ASM) where automation was extremely limited. In 2015, I switched completely to Azure Resource Manager (ARM) deployment model with PowerShell and JSON templates. Now, five years later, [infrastructure as code](https://martinfowler.com/bliki/InfrastructureAsCode.html) is still a struggle for Azure, [click-ops](https://www.august.com.au/blog/killing-click-ops-what-it-is-why-its-problematic-and-how-to-avoid-it/) seems to be a standard approach for many organizations. 

The tooling (ARM templates, PowerShell, Azure CLI, and now [Biceps DSL](https://github.com/Azure/bicep)) is just [not good enough](https://itnext.io/azure-arm-templates-are-broken-671f32ea63c5). I recommend everybody to adopt Terraform which has much better readability and modularity. In fact, Microsoft uses terraform to create and share landing zones (i.e. infrastructure blueprints) with customers and partners: <https://github.com/Azure/caf-terraform-landingzones>

# Azure support

There are no words to describe how bad it is. 

# Stability & performance

Things have gotten better with the years, but I’ve still experienced 2 major disruptions of service in 2020 where Microsoft was unable to provide a clear root cause analysis. Here is one of them (App Services):

> *Upon investigation, engineers discovered one of the workers that your site was running on was unable to download the AAD Open ID configuration that is required for the feature to function. When it cannot download this configuration, the component returns 500s, as it has no way to safely authenticate the users. Unfortunately, this specific failure to download the configuration happens very rarely in our platform, and we have been unable to reproduce the issue for further investigation.*

This is not what people expect when they pay for PaaS.

# Kubernetes, hallelujah!

First and foremost, yes, Kubernetes is complex. But, some of the complexity is abstracted away when using a managed Kubernetes service such as AKS (Azure Kubernetes Service).

AKS is fairly new and not the best on the market, but it solves the majority of the problems I’ve talked about in this blog post. AKS is getting full attention from Microsoft while App Services are stagnating. On top of that, Kubernetes benefits from a rich ecosystem supported by a vibrant community and a number of commercial companies. 

**I hope to have convinced you that Kubernetes is the only viable alternative for running applications in Azure.**

# 👋