---
calendar: thecloud
post_year: 2020
post_day: 23
title: Sharing infrastructure as code with linked Azure Resource Manager templates
ingress: This blog post will not focus on how or even why you should write your
  infrastructure as code. Rather, it will focus on how you, a curious developer
  working with Azure Resource Manager (ARM), can modularize your infrastructure
  code and share it with others through linked ARM templates. I will also show
  you the basic parts of a self-made "repository" of templates which makes using
  shared templates a breeze.
authors:
  - Kristian Johannessen
---
If you by any chance don't know what ARM templates are and you're still reading, here is a really short introduction: An [ARM-template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/) is essentially a JSON-object that describes your resources in Azure. It can take parameters as input and return certain values as outputs. There also exists various constructs for doing some simple conditional logic, loops, string manipulations, and more. Resources are created or updated using the template in a `deployment` that you submit to the [Azure Resource Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview), Azure's deployment and management service. A simple template may look like this:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0",
  "parameters": {
    "name": {
       "type": "string"
    }
  },
  "variables": {
    "myVariable": "[concat('Hello', parameters('name'))]"
  },
  "resources": [
    // one or more resource-objects goes here
  ],
  "outputs": {
    "hello": {
       "type": "string",
       "value": "[variables('myVariable')]"
    }
  }
}
```

The beauty of ARM templates is that any template can be used as a part of another larger template. When you do this, you are _linking_ a template into another – thus the name _linked templates_. To use another template as a linked template, you specify a resource of type `deployment`:

```json
{
  "resources": [
    {
      "type": "Microsoft.Resources/deployments",
      "name": "nameOfTheLinkedTemplateDeployment",
      "apiVersion": "2017-05-10",
      "properties": {
        "mode": "Incremental",
        "templateLink": {
          "uri": "URL to the actual template file"
        },
        "parameters": {
          "storageAccountNameBase": {
            "value": "inputToTheLinkedTemplate"
          }
        }
      }
    }    
  ]
}
```

A deployment resource must have a unique name in the context of the template, as it is used as an identifier when referencing it. You may also pass parameters to the deployment. This particular template takes a single required parameter, `storageAccountNameBase`, and it is therefore specified in the `parameters` section of the deployment's `properties`. Additionally, since a linked template is a resource like any other, you can use all the same constructs as with other resource types (conditions, loops, and so on). 

Templates can define values to output as a result of the deployment. This comes in handy when composing larger templates using several, smaller linked templates. To reference outputs from a deployment, you need to `reference` it, and the simplest way of doing this is through its name: 

```json
{
  "outputs": {
    "storageAccountName": {
       "type": "string",
       "value": "[reference('nameOfTheLinkedTemplateDeployment').outputs.someOutput.value]"
    }
  }
}
```

Now you know the basics on how to break apart your monolithic ARM-templates into modularized components. But one question remains: How to share your linked templates with the world? Well, the keyword is in the name: _"Linked"_ templates. Each resource of type `deployment` has a crucial property that you may have noticed already:

```json
{
  "templateLink": {
    "uri": "URL to the actual template file"
  },
}
```

If the `templateLink` has the value of an URL that can be reached through the internet, the Resource Manager will download and execute the template at deploy-time. How you make your templates available though, is entirely up to you. There is no help from the framework, not even when it comes to versioning. ARM-templates do have a `contentVersion`-property, but it is more informational than anything else. But, since I've got your attention, I will share one way to make your own "registry" with versioned templates available for anyone who wants to use them. It's nothing like NPM, but it gets the job done!

First of all, you need some form of storage. This is an Azure blog post, so we will use a [Storage Account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) for this purpose. You can create one using the Azure CLI like this (or use an ARM template 😉):

```
# create a resource group for your "registry"
az group create -n MyTemplatesRegistryRG -l westeurope
# create storage account
az storage account create -n mytemplateregistry -g MyTemplatesRegistryRG
```

Now you have somewhere to upload templates. From this point, it is up to you how fancy you like to handle versioning and such. I've made a "monorepo" with this folder structure:

```
src
  - web
    - certificate
      - template.json
      - README.md
    - domainWithSSL
      - template.json
      - README.md
  - keyvault
    - vault
      -template.json
      - README.md
    - secrets
      -template.json
      - README.md
  - and so on...
```

Then, I publish each new version of a template to a Blob Container. For simplicity, I've opted to use a single Container named "feed" to store templates, and I handle versioning using paths like this: `/keyvault/vault/1.0.0/template.json`.

```powershell
param(
  [Parameter(Mandatory = $true)]
  [string]$templatePath,
)
# read current version from template
$version = (Get-Content $templatePath | ConvertFrom-Json).contentVersion
# get file information
$file = Get-Item $templatePath
$srcFolder = "src"
# build the versioned path for the template for the current version. Result: keyvault/vault/1.0.0/template.json
$blobName = $file.FullName.Substring($file.FullName.IndexOf($srcFolder) + $srcFolder.Length + 1).Replace($file.Name, "$version\$($file.Name)")
# upload to blob using azure cli or powershell or whatever you like :)
```

The `version` is read from the template's `contentVersion`-property, and the path is constructed using the structure of the `src`-folder. I've omitted the publish action itself, because from here, your methods may vary. I would recommend using a single container, and make it readable with public anonymous access (don't keep secrets in your templates!):

```
az storage container set-permission --account-name mytemplateregistry --name feed --public-access blob
```

Having the templates anonymously available makes consuming them a lot easier as you can hard code the full URL in the consuming templates like this:

```json
{
  "templateLink": {
    "uri": "https://mytemplateregistry.blob.core.windows.net/feed/keyvault/vault/1.0.0/template.json"
  },
}
```

With your "registry" in place, there should be nothing preventing you from breaking apart your brittle and monolithic ARM templates. Isolate reusable parts into standardized templates where you control behavior through parameters. If you do this, you will experience that the bar for setting up new projects is drastically lowered. Maintaining existing ones also becomes a lot easier, and, as a final bonus, you can now write code that deploys and verifies your infrastructure components - "unit tests" for your infrastructure code!