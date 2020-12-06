---
calendar: thecloud
post_year: 2020
post_day: 7
title: Can Kubernetes save Microsoft Azure?
ingress: Azure has been growing rapidly in the enterprise in recent years. But
  its App services offering, which is the most important service for developers,
  is still mediocre. Kubernetes is, in my opinion, the only viable alternative
  for running applications in Azure. This blogpost explains how I came to that
  conclusion after roughly 6 years of working with Azure.
description: azure, kubernetes
authors: []
---
# Automation & Infrastructure as code 

Many years ago, I worked with the Azure Classic deployment model (sometimes referred to as ASM) where automation was extremely limited. In 2015, I switched completely to Azure Resource Manager (ARM) deployment model with PowerShell and JSON templates. Now, five years later, [infrastructure as code](https://martinfowler.com/bliki/InfrastructureAsCode.html) is still a struggle for Azure, [click-ops](https://www.august.com.au/blog/killing-click-ops-what-it-is-why-its-problematic-and-how-to-avoid-it/) is still the standard approach for many organizations. 


The tooling (ARM templates, PowerShell, Azure CLI, and now Biceps DSL) is just not good enough. I recommend everybody to adopt Terraform which has much better readability and modularity. In fact, Microsoft uses terraform to create and share landingzones (i.e. infrastructure blueprints) with customers and partners: <https://github.com/Azure/caf-terraform-landingzones>