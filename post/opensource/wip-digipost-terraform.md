---
calendar: opensource
post_year: 2019
post_day: 15
title: Accelerating cloud migration by contributing to Terraform providers
ingress: >-
  How Digipost contributes to open source to speed up their migration to the
  public cloud
links:
  - title: Splitting the Terraform monolith
    url: 'https://thecloud.christmas/2019/11'
  - title: How can you find code to open source?
    url: 'https://opensource.christmas/2019/9'
  - title: Open source @ Digipost
    url: 'https://github.com/digipost'
authors:
  - Even Holthe
---
# Accelerating cloud migration by contributing to Terraform providers

## What is Digipost?
[Digipost](https://digipost.no) is one of two providers of [digital mailboxes](https://www.norge.no/en/about-digital-mailbox), a more secure alternative than regular email. This enables central and local government as well as private companies to send secure letters to Norwegian citizens. As a consultant for [Bekk](https://bekk.no) I currently help Digipost with migrating their systems to a public cloud – Microsoft Azure.

When migrating to the cloud, there are several known patterns one can use. The simplest is perhaps doing a _lift and shift_, where VMs and data are copied and the infrastructure is replicated as much as possible (using only IaaS). Even though this approach has benefits such as reduced migration time, we have not chosen this path. At Digipost, we wanted to take advantage of what the cloud providers have to offer in terms of managed services and new approaches to running infrastructure. That meant that we had to adapt our applications to take advantage of new technologies available in Azure, such as Blob Storage and Key Vault and make the application behave well under Kubernetes. This effort requires broad support in the API surface available to us in Terraform providers.
## Terraform for Infrastructure as code (IaC)

At our current infrastructure/hosting partner, we use Terraform to manage our resources. This tool has served us well and we wanted to use it with Azure, for *everything* related to infrastructure. Luckily for us, two Terraform providers exists to help us out: [`azuread`](https://github.com/terraform-providers/terraform-provider-azuread) (Azure Active Directory (AAD)) and [`azurerm`](https://github.com/terraform-providers/terraform-provider-azurerm) (everything else).

As we began testing out these providers, we soon came across some limitations and pains. These limitations were roadblocks for our migration process. We needed to figure out what to do about these issues. The first option is to do nothing, hoping that the issues will fix themselves. The second option is to do some local hacks from Terraform with shell scripts, the Azure CLI or PowerShell. Both of these options are valid in some contexts, but for our most pressing issues we decided that the best option is to directly contribute to the relevant providers. This helps us avoid fragile hacks, spaghetti code, save time and hopefully help other Terraform users on Azure.

The following pain points related to Azure AD were fixed upstream:

- The first thing we stumbled upon was a limitation with the [password length restricted to max 16 chars](https://github.com/terraform-providers/terraform-provider-azuread/pull/81). This was not acceptable security-wise for us and a quick fix after Microsoft added API support.

- For avoiding single users with wide permissions, we helped contribute support for creating group memberships and mass-assignment of users to groups, together with [`@tiwood`](https://github.com/tiwood): [#63](https://github.com/terraform-providers/terraform-provider-azuread/pull/63), [#100](https://github.com/terraform-providers/terraform-provider-azuread/pull/100)

- For licensing/legal reasons, we added a simple extra [`usage_location` field for AAD users](https://github.com/terraform-providers/terraform-provider-azuread/pull/141)

Having these issues sorted out we got our IAM in order. The next step was to address some of the limitations we stumbled upon in the `azurerm` provider:

- Enable [auto-growing of disk storage](https://github.com/terraform-providers/terraform-provider-azurerm/pull/4220) for Azure-managed PostgreSQL

- Some of our partners required that we come from a whitelisted IP (or range), so we needed support for outbound IPs when using an Azure standard Load Balancer. We started an implementation in [#4400](https://github.com/terraform-providers/terraform-provider-azurerm/pull/4400) (which was closed for technical reasons) and we eagerly await the merging of [#4472](https://github.com/terraform-providers/terraform-provider-azurerm/pull/4472)

In addition to these pull requests, we've opened some issues in both of these providers and in other repositories related to our migration effort.
## Summary

With the help of the community and two very helpful maintainers ([@katbyte](https://github.com/katbyte), [@tombuildsstuff](https://github.com/tombuildsstuff)) we feel welcome as contributors to the Azure Terraform providers. Our contributions at Digipost help us migrate faster to Azure and helps the community in the process.
