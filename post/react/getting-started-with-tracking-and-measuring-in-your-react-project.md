---
calendar: react
post_year: 2019
post_day: 11
title: Getting started with tracking and measuring in your react project
ingress: >-
  Do you really know how your users are using your application? Have they tried
  out the latest feature you just deployed to production? Examining your user’s
  behaviour and interaction can be tremendously useful - figuring out where they
  incur problems or halt a purchase, where in the onboarding process most people
  fall of, how long they time they spend on certain pages, and even just where
  they’re located are all valuable information for the further improvement and
  development of your website. 
authors:
  - Sondre Widmark
  - Marie Buøen
---
There are many products and services offered in related to measuring or tracking your user’s behaviour on your website. This article is an introduction to using Azure’s Application Insights in your React project, focusing more on how it’s used than than setup and implementation.

For our React project, we’re using Microsoft’s npm packages created for integrating your project tracking in Application Insights. @microsoft/applicationinsights-web is the Javascript SDK and works well if you’re mostly interested in tracking actions and events. @microsoft/applicationinsights-react-js is a React plugin for the Javascript SDK, enabling you to instrument various react component usage tracking and utilizing a higher-order component function. It permits more granular tracking, for example measuring time from the ComponentDidMount event through the ComponentWillUnmount event. There is a good demo project available here (https://github.com/Azure-Samples/application-insights-react-demo), all you need to get started is the instrumentation key from the Application Insights resource on your Azure Portal. Using the demo above, we can get started tracking.

The most basic form of tracking is arguably event tracking. For example tracking what users search for on your site.

```
const handleSearch = (searchString) => {
    // handle search
    appInsights.trackEvent({
        name: 'Search’,
        query: searchString
    });
};
```

That’s as easy as it gets. Use the trackEvent() method by passing an object as argument. Use the ‘name’ key to keep track of the different events in Application Insights and pass along other useful data. With multiple event trackings this proves useful for following various stages of the process.

`const handleSearch = (searchString) => {
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
            });
        .catch(e => {
            appInsights.trackEvent({ 
                name: Search_failed’,
                query: searchString,
                data: e
        });
};`

``

Now this is just to showcase a possible use case and might be better placed  elsewhere. Complimenting trackEvent(), there’s also these tracking methods:

`const trackException () => {
        appInsights.trackException({ error: new Error('Some error'), severityLevel: SeverityLevel.Error });
};`

`const trackTrace = () =>  {
    appInsights.trackTrace({ message: 'Some trace', severityLevel: SeverityLevel.Information });
};`

Here we’ve also introduced severity level, which can be used to filter tracking in Application Insights to display what needs our immediate attention.

By using the React plugin for the Application Insights Javascript SDK, you can also automatically track a number of events without explicitly telling it to do so. A very useful feature is automatically tracking page views and user navigation route. Another very convenient feature is auto collecting errors and communication.

`const throwError = () => {
    let foo = {
        field: { bar: 'value' }
    };`

`// This will crash the app and the error will show up in the Azure Portal
return foo.fielld.bar;`

`}`

`const fetchRequest = () => {
    // this will automatically show up in azure portal if you’re autocollecting fetch 
        fetch('https://httpbin.org/status/200');
}`

Now, these trackings can be made smarter, of course. For useful tracking, you might want to include more data which is relevant for monitoring events and errors. From there on, it’s easier to look for common denominators on errors. For example, you can create your own method for tracking, including all your relevant data

```
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
```

```
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
​
```

https://www.npmjs.com/package/@microsoft/applicationinsights-web

Application insights has a lot of prerequisites which allows you to explore the metrics from your webapp, pretty straight forward. For more advanced metrics, note: for visualisation it works okay for the most basic stuff. It is possible to get an indication for how many search fails and how many who succeed. The events you have implemented in you react app will appear in the dropdown. This is the easiest way. However 

This was a very small example, but there is really not that much configuration needed. You get a lot of metrics automatically. It is easy to add a new tracking event whenever you get an idea or and hypotheses you want to check out.
