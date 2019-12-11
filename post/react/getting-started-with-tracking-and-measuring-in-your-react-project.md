---
calendar: react
post_year: 2019
post_day: 11
title: Working with Azure Application Insights in your React app
image: >-
  https://images.unsplash.com/photo-1544577250-d7ce0fa229c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80
ingress: >-
  Do you really know how your users are interacting with your application? Have
  they tried out the latest feature you just deployed to production? Examining
  your user’s behaviour and interaction can be tremendously useful - figuring
  out where they incur problems or halt a purchase, where in the onboarding
  process most people fall off, how long time they spend on certain pages, or
  even just where on the site they’re located, are all valuable information for
  the further improvement and development of your website.
links:
  - title: 'Github: Application Insights JavaScript SDK'
    url: 'https://github.com/microsoft/ApplicationInsights-JS'
  - title: 'Github: Application Insights React Plugin'
    url: >-
      https://github.com/microsoft/ApplicationInsights-JS/tree/master/extensions/applicationinsights-react-js
  - title: 'Github: Application Insights Demo'
    url: 'https://github.com/Azure-Samples/application-insights-react-demo'
authors:
  - Sondre Widmark
  - Marie Buøen
---
There are many products and services offered relating to measuring and tracking a user’s behaviour on websites. This article is an introduction to using Azure’s Application Insights in your React project, focusing more on how it’s used than setup and implementation.

For our React project, we’re using Microsoft’s npm packages created for integrating your project tracking in Application Insights. [@microsoft/applicationinsights-web](https://github.com/microsoft/ApplicationInsights-JS) is the Javascript SDK and works well if you’re mostly interested in tracking actions and events. [@microsoft/applicationinsights-react-js](https://github.com/microsoft/ApplicationInsights-JS/tree/master/extensions/applicationinsights-react-js) is a React plugin for the Javascript SDK, which enables instrumenting various react component usage tracking and utilizing higher-order component function. It permits for more calibrated tracking, for instance measuring time from the ComponentDidMount event through the ComponentWillUnmount event. There is a good React demo project by Microsoft available [here](https://github.com/Azure-Samples/application-insights-react-demo), all you need to get started is the instrumentation key from an Application Insights resource in your Azure Portal. If you're just getting started with Application Insights tracking, try running the demo locally and experiment with the different forms of tracking showcased. So what can you do with all of this? Let's get trackin'

The most basic form of tracking is arguably event tracking. For example, say you want to track what users search for on your site

```js
const handleSearch = (searchString) => {     
    // handle search
    appInsights.trackEvent({
        name: 'Search’,
        query: searchString
    });
};
```

Pretty straight forward. Use the `trackEvent()` method by passing an object as argument. Use the `name` key to keep track of the different events in Application Insights and pass along other useful data. With multiple event trackings, this proves useful for observing various stages of a process.

```js
const handleSearch = (searchString) => {    
    appInsights.trackEvent({        
        name: 'Search_start',
        query: searchString
    });
    
    fetch(`santasgifs.com/api/s=${searchString}`)
        .then(response => {
            // handle response
            appInsights.trackEvent({
                name: 'Search_successful',
                query: searchString
            })
        })
        .catch(e => {
            // handle error
            appInsights.trackEvent({
                name: 'Search_failed',
                query: searchString,
                data: e
            })
        });
};
```

Now this is just to showcase a possible use case and could be better placed elsewhere. Here's how that could look in Azure Portal:

![A funnel in Application Insights](/assets/image.png "A funnel in Application Insights")

As with all examples it might be a bit primitive, but it gets the point across. Here we've create a funnel using two events - it lets us track events in sequence, measuring the changes between each step. For instance, in a multi-step onboarding process, this proves very useful for investigating where most users fall off.

Getting back to our event tracking, we also have these tracking methods:

```js
const trackException () => {
    appInsights.trackException({
         error: new Error('Some error'),
         severityLevel: SeverityLevel.Error
     });
};

const trackTrace = () =>  {
    appInsights.trackTrace({
         message: 'Some trace',
         severityLevel: SeverityLevel.Information
    });
}; 
```

Here we’ve also introduced severity level, which can be used to filter tracking in Application Insights to display what requires our immediate attention and what deserves to be logged at all.

Instead of doing all of this manually, you can also automatically track a number of events without explicitly telling it to do so. A convenient feature is auto collecting errors and API methods:

```js
const throwError = () => {
    let foo = {
        field: { bar: 'value' }
    };    

    // This will crash the app and the error will show up in the Azure Portal
    return foo.fielld.bar;
};

const fetchRequest = () => {
    // this will automatically show up in azure portal if you’re autocollecting fetch 
    fetch('https://httpbin.org/status/200');
};
```

Another very useful feature is automatically tracking page views and user navigation behaviour. This lets us follow the users path from start to end, by looking at the visited pages and the navigation route. For instance, a purchase process could look something like this:

![Application Insights page tracking and user flow](/assets/azure-page-tracking.png "Application Insights page tracking and user flow")

Now, these trackings can be made smarter, of course. For more useful tracking, you might want to include more data which is relevant for monitoring page views, events and errors. From there on, it’s easier to look for common denominators on potential improvements and errors. For instance, you can create a helper for tracking events and including all the relevant data:

```js
// helper to retrieve common tracking properties
const getCommonTrackingProperties = () => {
    const currentUrl = window.location.href;
    const userInfo = getUserInfo();
    const userLanguage = getLanguage();
    return {
        currentUrl,
        userInfo,
        userLanguage
    };
}

// tracking method for including predetermined properties
const trackPurchaseEvent = (name, properties) => {
    const commonProps = getCommonTrackingProperties();
    appInsights.trackEvent(
        { name: name },
        {
          ...commonProps,
          ...properties
        }
    );
}
```

Using this approach, you can predetermine desired data for passing along particular types of data to different types of tracking. Additionally, instead of typing the tracking name in manually, it could prove wise to create a file to maintain tracking constant for use across the project.

```js
import { PURCHASE_COMPLETE } from "./trackingConstants";
import { trackPurchaseEvent } from "./trackingHelper";

const handlePurchase = (shoppingCart) => {
    // handle purchase
    trackPurchaseEvent(PURCHASE_COMPLETE, shoppingCart);
};
```

## Templates to get you started

Application Insights has a number of templates available which allows you to explore the metrics from your webapp, without much need for prerequisite knowledge or experience. 

There's still a ton of functionality which isn't mentioned here, but hopefully this article served as a interesting introduction to using Azure Application Insights in your React project and the potential benefits, whether it is a small hobby project or a large client one.
