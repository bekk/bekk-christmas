---
calendar: javascript
post_year: 2019
post_day: 15
title: Feature toggling as a service – ❤️at first sight
ingress: >-
  I used to think that feature switches were clunky if-statements in my code
  that would require re-compilation or at least restart of my app. Launch Darkly
  proved me totally wrong, swinging me from cynical scepticism to deep love!
authors:
  - Thomas Svensen
---
Feature toggling as a service is best explained by a live demo. This 60 second sample from our enterprise app shows how we can instantly enable/disable a feature. And it shows how we can also do that for a specific user of our app!

<video controls>
  <source src="https://github.com/thomassvensen/host-a-video/blob/master/2019-12-14_20-09-31.mp4?raw=true" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Targeting and logging

Although not shown in the video, Launch Darkly obviously also allows you to target groups of users based on whatever criteria you have available. It's also backed by great audit logging and statistics, so you can see how feature configuration has changed over time and what values have been served to the users over time.

## Getting started

Launch Darkly has [a nice SDK](https://docs.launchdarkly.com/docs/js-sdk-reference), allowing you to integrate with all popular programming language, including packages for both general JavaScript and [React](https://docs.launchdarkly.com/docs/react-sdk-reference) apps. There are also 3rd party libraries like [Flopflip](https://github.com/tdeekens/flopflip), which smoothly mirrors the flag states to your Redux store. This is what we do, and it makes it really easy to debug issues related to feature flags, e.g. using time-travel.

## Show me the code

In your React app, you just add this snippet around your code:

``` javascript
      <ConfigureFlopFlip
        adapter={launchDarklyAdapter}
        adapterArgs={{
          clientSideId: config.launchDarklyClientId,
          flags: featureFlags,
          user: launchDarklyUser
        }}>
        <Routes />
      </ConfigureFlopFlip>
```

and then for the specific component that you want to toggle:

``` javascript
    <ToggleFeature flag="portal-external-show-map-card">
      <MapCard />
    </ToggleFeature> 
```

With plain Javascript you initialise like this:

``` javascript
  var user = {
    "key": "aa0ceb"
  };
  var ldclient = LDClient.initialize('YOUR_CLIENT_SIDE_ID', user);
```
and can access the value like this:

``` javascript
  ldclient.on('ready', function() {
    var showFeature = ldclient.variation("YOUR_FEATURE_KEY", false);
    if (showFeature) {
     	...
    } else {
      ...
    }
  });
```

## Is that all?

You can of course do more complex logic based on your feature-switches too, e.g. have a fallback component which is rendered in the case the feature is `OFF`. Finally, I should mention that feature flags can also be string values. This opens up for multi-variation scenarios and we have "misused" this as a low-effort solution for showing localised warning messages whenever we have system issues.

Launch Darkly also provides a rich, modern API which allows you to build your own tooling if you prefer. That can include e.g. automated monitoring of toggles that need to be archived: when adding toggles is this easy, you quickly end up with a lot of them.

## Empowering the stakeholders

The ultimate proof that Launch Darkly adds real value to our development and deployment process, is what has started to happen recently. Our (non-technical) product owner is not only in charge of deciding when new features should be enabled, he is actually doing it himself, without even asking us. The first time it happened, I was baffled, but it is really how things should be — empower people to take the decision that are important to them.
