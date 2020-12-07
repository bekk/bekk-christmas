---
calendar: thecloud
post_year: 2020
post_day: 15
title: Have a merry hybrid Christmas
image: https://images.unsplash.com/photo-1544277879-42659615e478?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1956&q=80
ingress: This year is a special year because of the pandemic dominating most of
  the news (fake or not). Despite the fact that he apparently is
  [immune](https://eu.usatoday.com/story/news/nation/2020/11/20/covid-19-and-christmas-santa-immune-coronavirus-fauci-says/3777871001/),
  it is still a special year for Santa Claus. This year he began his journey
  towards the cloud for his on-northpole infrastructure.
links: []
authors:
  - Espen Ekvang
---
## The challenge

With a growing number of people on the planet, every year the number of presents to be made by Santa Claus and his elves are increasing. As a consquence Santa Claus needs to improve his efficiency, not just the way he produces content for all the gifts, but also the way he and his team maintains, improves and extends the on-northpole infrastructure. An increased number of servers, of course requires more man-hours to maintain and assure everything is working as expected. Moving parts of the infrastructure to the cloud will help him to be prepared for growth and hopefully also free up time from his valuable elves.

Performing a lift-and-shift operation was not possible for several reasons, hence he wanted to make sure all new work was done in the cloud - but still being able to have existing infrastructure on-northpole - resulting in a hybrid approach.

The on-northpole infrastructure consists of mainly windows servers and he chose the cloud platform to be Micrsoft Azure. In this post we will look into how he established the connection between Azure and on-northpole to assure data from on-northpole would be available seamlessly in the cloud.

## Azure App Service Hybrid Connection

Santa Claus's resources are not available on the internet, but they are able to make outbound calls to Azure over port 443 - thus qualifying them as candidates for exposure through what is called a [Hybrid Connection](https://docs.microsoft.com/en-us/azure/app-service/app-service-hybrid-connections) in Azure. As shown in the illustration below, taken from the documentation, there are few moving parts and it is quick and easy to set up.

Santa Claus want to expose a new API providing information about his elves. The API will be created in the cloud as a Web App, but some of the data needed for the API is only available from servers on-northpole at the moment. To establish this Santa Claus needs:

* a Web App to expose the new API in the cloud
* an [Azure Relay](https://docs.microsoft.com/en-us/azure/azure-relay/relay-what-is-it) to work as the hybrid connection between on-northpole and the cloud
* to install the [Hybrid Connection Manager](https://docs.microsoft.com/en-us/azure/app-service/app-service-hybrid-connections#hybrid-connection-manager) on the server on-northpole which holds that data needed for the new API

![How the hybrid connection works](/assets/hybridconn-connectiondiagram.png "How the hybrid connection works")

## Provisioning the infrastructure

Santa Claus is no fan of click-ops, which basically is the process of having manual routines for setting up and maintaining infrastructure. Therefor he chose [Terraform](https://terraform.io) as his infrastructure-as-code tool for provisioning the infrastructure needed for the hybrid connection to be established.

### The Web App

The Web App is a simple API and can be hosted in a PaaS in Azure. In order to provision a app service using Terraform this is what is required:

```jsonc
resource "azurerm_app_service" "app_hybrid_christmas" {
  name                      = var.app_name
  location                  = var.location
  resource_group_name       = azurerm_resource_group.rg_hybrid_christmas.name
  app_service_plan_id       = var.service_plan_id  

  app_settings              = {    
    ASPNETCORE_ENVIRONMENT  = "Staging"    
  }

  identity {
    type                    = "SystemAssigned"
  }
  
  tags                      = {
    source                  = var.source_tag
  }
}
```

### The Relay

In order to send messages through to on-northpole Santa Claus needs a relay to forward these messages, or requests as they will appear to the user:

```jsonc
resource "azurerm_relay_namespace" "sb_northpole" {
  name                = var.relay_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg_hybrid_christmas.name

  sku_name            = "Standard"

  tags                = {
    source            = var.source_tag
  }
}
```

The relay is the service bus namespace which can have one or more connections to a host on-northpole in this case. One connection is bound to a combination of host and port number. Below the connection from the relay to the service on-northpole is defined in Terraform.

```jsonc
resource "azurerm_relay_hybrid_connection" "hcn_northpole" {
  name                          = "hcn-northpole"
  resource_group_name           = azurerm_resource_group.rg_hybrid_christmas.name
  relay_namespace_name          = azurerm_relay_namespace.sb_northpole.name
  requires_client_authorization = true
  user_metadata                 = "{'key':'endpoint','value':'${var.northpole_hostname}:${var.northpole_hostport}'}"
}
```

An observant eye will see that the tag *user_metadata* contains a key-value-paired JSON holding the host and port number combination on-northpole. This is needed to make the connection valid once established in Azure.

### Connecting the Web App and the Relay

The last step to be done is to create a hybrid connection between the Web App and the Relay. According to the documentation this can be done using the following Terraform:

```jsonc
resource "azurerm_app_service_hybrid_connection" "hcn_app_connection" {
  app_service_name    = azurerm_app_service.app_hybrid_christmas.name
  resource_group_name = azurerm_resource_group.rg_hybrid_christmas.name
  relay_id            = azurerm_relay_hybrid_connection.hcn_northpole.id
  hostname            = var.northpole_hostname
  port                = var.northpole_hostport  
}
```

Running this completes successfully and everything seems to work as intended. Now the infrastructure is established with the Web App talking to the Relay which is configured to talk to on-northpole. 

Navigating into Azure and to the newly created Web App, select *Networking* in the side menu followed by *Configure your hybrid connection endpoints* Santa Claus sees the following status for the connection he just made from the Web App to the Relay.

![Not connected](/assets/notconnected.png "Not connected")

It basically says it is *Not Connected* and he needs to perform the last step in the hybrid connection configuration.

## The last (and manual) step

Finally, to make the outbound connection to Azure, Santa Claus had to download the [Hybrid Connection Manager](https://docs.microsoft.com/en-us/azure/app-service/app-service-hybrid-connections#hybrid-connection-manager) onto the server that was to be connected to Azure. Running the Hybrid Connection Manager on this server he discovered that something went wrong in the provisioning. The hybrid connection manager reports "No endpoint configured"

![No endpoint configured](/assets/notconfigured.png "No endpoint configured")

With this error it is not possible to connect to Azure, and after some research it turned out that this is a [known issue](https://github.com/terraform-providers/terraform-provider-azurerm/issues/9245) with the Terraform azurerm provider. Until it is fixed, the connection from the Web App to the Relay cannot be done using Terraform and must manually be done using <https://portal.azure.com> on the Web App itself.

![Manually adding a hybrid connection from the web app](/assets/newconnection.png "Manually adding a hybrid connection from the web app")

Manually adding the hybrid connection from the Web App towards the Relay solves the endpoint configuration failure, consequently allowing the Hybrid Connection Manager to establish the connection towards Azure.

## Conclusion

Using Azure Hybrid Connections and Terraform Santa Claus and his team is able to start utilizing the cloud without having to perform a large lift-and-shift operation. The Hybrid Connection is quick and easy to setup, but unfortunately requires a couple of manual steps which results in some click-ops that Santa Claus would like to be without. Despite the manual steps, they manage to expose data from on-northpole and they have successfully started their cloud journey - whether the hybrid connection will remain as part of their infrastructure or not we'll have to see next Christmas. Santa motivates his developers for the cloud journey by promising them to appear twice on the nice-list as long as they contribute to move more of the infrastructure off-northpole and into the cloud.

The complete Terraform for this can be found in the repository [here](https://github.com/espenekvang/hybrid-christmas).