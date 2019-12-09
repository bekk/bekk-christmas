---
calendar: thecloud
post_year: 2019
post_day: 12
title: Host a website in Azure with a custom domain + SSL for free
image: >-
  https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
ingress: >-
  Have you ever wanted to host a low traffic website in Azure, but required
  features like SSL and a custom domain? Were you disappointed when you found
  out that these features are only supported in the B1 App Service Plan for a
  whooping 50$ a month? With some simple changes and a Content Delivery Network
  (CDN) you can have it all for FREE! 
authors:
  - Mats Mortensen
---
The easiest way to host a website in Azure is to use an Azure Web App backed by an App Service Plan. However, the free F1 App Service Plan is pretty basic. It’s shared infrastructure giving you 1 GB memory and 60 minutes a day of compute time. It has no support for custom domains, but provides SSL on the default *.azurewebsites.net address.

What if you want to add a custom domain to your free Azure website and still want to have SSL support? Can it be provided for free in Azure without using third party services? The simplest solution is to upgrade the App Service Plan, but that won’t be free. 

What we want to achieve:
- Free website hosting
- SSL support
- Custom domain support
- Use only Azure services

## Static website + Content Delivery Network
A common way to solve this problem for web applications where you have a separate backend and frontend, is to host the frontend as a static website and combine it with a Content Delivery Network (CDN) that can provide SSL on a custom domain. Netlify, GitHub Pages and Amazon Web Services (AWS) all have solutions to this problem and can provide this functionality for free. AWS has had this capability for years by combining the Amazon CloudFront CDN with Amazon S3 storage which can host a static website. 

Basically it works like this:
![End-user - CDN - website communication](https://i.ibb.co/B2qbZ63/cdn.png)

The CDN manages the certificate that is used to encrypt the connection to the end-user with a custom domain and the connection between the CDN and the website is encrypted with the SSL certificate supplied by the website (if any). 
Turns out this is now also possible in Azure. In late 2018 Azure announced support for hosting static websites in storage accounts. You can enable “Static website” on a storage account and get a special $web storage container where you can put static website content (HTML/CSS/Javascript and images) and have them served to the user as if it was a web server. The cool thing about this is that storage accounts supports custom domains for free.

When you enable the static website feature on a storage account the website will get an endpoint like:
```
https://<storageaccountname>.z13.web.core.windows.net
```

## Azure CDN
There are many CDN providers that can provide free SSL on a custom domain, but with a pure Azure solution only the Azure CDN will do. The main benefit of using an Azure service is that the provisioning and configuration can easily be scripted using Azure Powershell or ARM-templates.

To try it out you first have to create an Azure CDN profile in the Azure Portal and choose a pricing tier which supports custom domains. I chose the “Premium Verizon” tier just because it is the only tier that supports redirecting http => https using custom page rules. The CDN cost for a static website, which is typically just a few MB, is basically zero. Continue by adding a CDN endpoint inside the CDN profile that maps your CDN endpoint to your site: 

```
<sitename>.azureedge.net →  https://<storageaccountname>.z13.web.core.windows.net
```

As long as http is allowed on the storage account you should after a short while be able to access the site using the *.azureedge.net address. To add a custom domain to the CDN you first need to login to your domain host and add a CNAME mapping to your CDN endpoint like this:

```
www.mysite.com → <sitename>.azureedge.net
```

After the CNAME has been added and the DNS has propagated which in my case was pretty quick, Azure will allow you to add the custom domain to your CDN endpoint. When the custom domain is added, the last step is to enable SSL on the custom hostname which is just a flip of a switch. Just click the hostname and choose to enable custom domain HTTPS. 


Azure will then generate a certificate for your domain that is valid for a year and will be automatically renewed. Enabling SSL can take quite a bit of time so expect to wait a day or two.
 
End-users will then be able to use the custom domain to access your website through the Azure CDN. But what about the backend? The storage account will only serve static assets so you still can’t have a custom domain for your backend. As long as you only need a SPA the backend api can be either a regular Azure website using the free tier or an Azure Function using consumption plan (which is partially free). The backend api will use the regular *.azurewebsites.net address which supports SSL and does not need to be served from the CDN. The end-users will not see the backend url since the api is only used by the javascript in the frontend. You only have to make sure to update the CORS settings for your backend api to accept requests from the custom domain.
 
## Wrapup
Using a combination of Azure CDN and an Azure Storage Account as your frontend and an Azure WebSite (or Azure Function) as your backend you can have a virtually free website on Azure that supports SSL encryption and a custom domain. You only need to pay for the storage and network traffic to the storage account, but that likely amounts to pennies a month. The whole infrastructure setup can also relatively easily be automated using ARM-templates.
 
The only major drawbacks are that the Azure Website free tier backend is limited to 60 CPU minutes a day and that the web app resources on the free tier are shared with other Azure customers. The site won’t support a lot of simultaneous visitors, but for a low traffic website that probably won’t be a problem. You can always pay to scale up the App Service Plan when needed. 
