---
calendar: react
post_year: 2019
post_day: 11
title: Working with Azure Application Insights in your React app
image: 'https://unsplash.com/photos/5uTm0Z-HH7M'
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
There are many products and services offered relating to measuring and tracking a user’s behaviour on websites. This article is an introduction to using Azure’s Application Insights in your React project, focusing more on how it’s used than than setup and implementation.

For our React project, we’re using Microsoft’s npm packages created for integrating your project tracking in Application Insights. [@microsoft/applicationinsights-web](https://github.com/microsoft/ApplicationInsights-JS) is the Javascript SDK and works well if you’re mostly interested in tracking actions and events. [@microsoft/applicationinsights-react-js](https://github.com/microsoft/ApplicationInsights-JS/tree/master/extensions/applicationinsights-react-js) is a React plugin for the Javascript SDK, which enables instrumenting various react component usage tracking and utilizing higher-order component function. It permits for more calibrated tracking, for instance measuring time from the ComponentDidMount event through the ComponentWillUnmount event. There is a good React demo project by Microsoft available [here](https://github.com/Azure-Samples/application-insights-react-demo), all you need to get started is the instrumentation key from an Application Insights resource in your Azure Portal. If you're just getting started with Application Insights tracking, try running the demo locally and experiment with the different forms of tracking showcased. So what can you do with all of this? Let's get trackin'

The most basic form of tracking is arguably event tracking. For example, say you want to track what users search for on your site

```javascript
const handleSearch = (searchString) => {     
    // handle search
    appInsights.trackEvent({
        name: 'Search’,
        query: searchString
    });
};
```

Seems prett straight forward. Use the trackEvent() method by passing an object as argument. Use the ‘name’ key to keep track of the different events in Application Insights and pass along other useful data. With multiple event trackings, this proves useful for observing various stages of a process.

```javascript
const handleSearch = (searchString) => {    
    appInsights.trackEvent({        
        name: Search_start’,
        query: searchString
    });
    
    fetch(santasgifs.com/api/s=${searchString})
        .then(response => {
            // handle response
            appInsights.trackEvent({
                name: Search_successful’,
                query: searchString
            })
        })
        .catch(e => {
            appInsights.trackEvent({
                name: Search_failed’,
                query: searchString,
                data: e
            })
        });
};
```

Now this is just to showcase a possible use case and might be better placed elsewhere. Here's how that could look in Azure Portal:

![A funnel in Application Insights](/assets/image.png "A funnel in Application Insights")

Primitive and gets the point across. Here we've create a funnel using two events - it let's us and track events in sequence, measuring the changes between each step. For instance, in a multi-step onboarding process, this proves very useful for investigating where most users fall off.

Getting back to our event tracking, there’s also these tracking methods:

```javascript
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

Here we’ve also introduced severity level, which can be used to filter tracking in Application Insights to display what needs our immediate attention.

Instead of doing all of this manually, you can also automatically track a number of events without explicitly telling it to do so. A convenient feature is auto collecting errors and communication:

```javascript
const throwError = () => {
    let foo = {
        field: { bar: 'value' }
    };    

    // This will crash the app and the error will show up in the Azure Portal
    return foo.fielld.bar;};

const fetchRequest = () => {
    // this will automatically show up in azure portal if you’re autocollecting fetch 
    fetch('https://httpbin.org/status/200');
};
```

Another very useful feature is automatically tracking page views and user navigation behaviour. This lets us follow the users path from start to end, by looking at the visited pages and the navigation route. For instance, a purchase process could look something like this:

![Application Insights page tracking and user flow](/assets/azure-page-tracking.png "Application Insights page tracking and user flow")

Now, these trackings can be made smarter, of course. For more useful tracking, you might want to include more data which is relevant for monitoring page views, events and errors. From there on, it’s easier to look for common denominators on potential improvements and errors. For example, you can create your own method for tracking, including all your relevant data:

```javascript
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

// middleman for appending your properties
const trackEvent = (name, properties) => {
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

Using this new method, you can add all of desired data for passing data along to certain types of tracking. Instead of typing the tracking name in manually, it could prove wise to create a file with tracking constant for use across the project.

Application Insights has a number of templates available which allows you to explore the metrics from your webapp, without much prerequisite knowledge or experience. There's still a ton of functionality which isn't mentioned here, but hopefully this article served as a interesting introduction to using Azure Application Insights in your React project, whether it is a small hobby project or a large customer one :-)
