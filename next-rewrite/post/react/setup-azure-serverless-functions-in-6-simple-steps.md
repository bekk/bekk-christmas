---
calendar: react
post_year: 2019
post_day: 19
title: Setup Azure Serverless Functions in 6 Simple Steps
image: >-
  https://images.unsplash.com/photo-1488433341267-2cf917b899f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2275&q=80
ingress: >-
  React is no fun without some data to display or APIs to connect to. Let's dive
  in to how you can set up some serverless functions for all those times you
  wished you had a backend.
links:
  - title: William @ Scotch
    url: 'https://scotch.io/@chuloo'
  - title: William @ Twitter
    url: 'https://twitter.com/iChuloo'
authors:
  - William Imoh
---
This is some sort of memoir for myself on how to spin up a serverless function in simple steps. I use serverless functions for numerous reasons and the 2 most frequent ones are to store API keys for 3rd party services and to connect to a data store when building out web applications.

React apps are no different when using serverless functions. Many times, building a single page app requires user authentication, pulling data from a store, creating and storing data as well as handling some business logic. While it would be a lot more expensive to setup traditional server infrastructure, to handle these on-demand requirements, it would be great to utilize a system that provides a means to deploy the required services, abstract server management and focus more on building a rich user experience.

Serverless functions in React applications simply help you achieve that efficiently. 

Azure functions is a powerful serverless compute service that lets you run event-triggered code. The major reason I decided to try it out is the ability to choose different kinds of functions templates. Also, I live in VS Code, and the Azure extension makes startup and deployment seamless.

In this super short post, I’ll spin up and deploy an Azure serverless function in six straight-to-the-point cut-the-crap steps. This serverless function can be consumed in a React application either on component mount or triggered by an event.

> Note: [Azure functions v3](https://azure.microsoft.com/en-us/updates/announcing-go-live-release-for-azure-functions-v3/) now supports Node v12+. 

The 6 steps to spin up and deploy a function in VS Code are:

- Install the functions extension
- Install Azure core tools
- Create a Microsoft account and sign in
- Create a new functions project
- Debug and run function locally
- Create a deployable function app with a storage account and resource location.
- [**Bonus Step**] Drink nice ground coffee


## Install the functions extension

Download VS Code and install the functions extension by searching for “Azure Marketplace” using the extensions marketplace in the left menu. Reload your editor once done. This adds the extension to the left menu bar of your editor. 


## Install Azure core tools

The Azure core tools field a rich experience for developing, deploying and debugging Azure applications. Install v3 using homebrew in your mac terminal with:

```sh
brew tap azure/functions
brew install azure-functions-core-tools@3
```

## Create a Microsoft Account and Sign in

In VS Code, click on the Azure functions extension and click the “Sign in to Azure” option, this redirects you to your browser. [Create a free account on Azure](https://azure.microsoft.com/en-us/free/?WT.mc_id=scotchio-blog-chnwamba), this automatically signs you in on VS Code too.

## Create a New Functions Project

In the Azure extension, click the little brown folder to the left to create a new project. Select a template from the listed, I choose the HTTP trigger for a simple function. next, provide a function name (any name) and choose an authorization level (Anonymous). This creates a new base function in seconds. Look in the project folder to see the generated files.

## Debug and Run Functions Locally

Click the debug side menu on VS Code (looks like a bug) and hit the play button to run the newly created serverless function on a local development server. Alternatively, you can use this command in your terminal:

```sh
func start
```

Open the provided URL in your browser, for me it’s:

[http://localhost:7071/api/HttpTriggerTest](http://localhost:7071/api/HttpTriggerTest)


## Deploy the Function App

To deploy the function to Azure cloud, click the blue upward pointing arrow in the Azure extensions top left menu. Select a function app in Azure or create a new one. If creating a new one, enter a unique name for the app, select a runtime (Node.js 10.x) and select a resource location (West Jupiter’s belly if you find, lol). Select the closest location to you.

Voila! This deploys your serverless function/API whose endpoints can be used in apps anywhere, as specified in the function definition. A resource group and storage account are also created. You can find mine here: https://chulootest2.azurewebsites.net/api/HttpTriggerTest


## Using a Function in a React application

Like making a HTTP request to a remote server and receiving data, in a React application, a HTTP request can be made to deployed function which returns the defined response. Here’s a sample API request using the deployed function in a useEffect hook.

```js
import React, {useEffect} from "react";
    
const url = "https://chulootest2.azurewebsites.net/api/HttpTriggerTest"
const App = () => {
  useEffect(()=>{
    let fetchData = async () => {
      let response = await fetch(url);
      console.log(response);
    }
    fetchData();
  }, [])
    
  return (
    <div>Do something with the data!</div>
  );
};

export default App
```

This performs a GET request on the function and logs it to console.

This is a simple illustration of how powerful is the destructured architecture serverless functions provide, combined with the inherent component architecture of React, when crafting rich and robust user experiences.

Subsequently, I’ll write follow up posts using serverless functions for real-world cases and even larger projects. You'll find those on Scotch.

Let me know if you have any issues or questions with this, and I hope you remember the 6 steps all the time. Happy Holidays!

