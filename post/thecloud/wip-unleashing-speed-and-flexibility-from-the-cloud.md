---
calendar: thecloud
post_year: 2019
post_day: 6
title: Unleashing speed and flexibility from the cloud
image: >-
  https://images.unsplash.com/photo-1463680942456-e4230dbeaec7?w=1226&h=400&fit=crop&crop=entropy
ingress: >-
  Feature toggling, or feature flags, is a fairly well known concept in the
  world of modern system development. It provides the foundation for separating
  _launching_ a feature from the physical _deployment_ of code, enabling things
  like A/B testing, piloting and a faster development process. With a few
  clicks, you can get going with a streamlined feature toggling setup in no time
  using hosted cloud services.
links:
  - title: Getting started with feature flags
    url: >-
      https://medium.com/@tmaslen/getting-started-with-feature-flags-fc3e617260fe
  - title: Feature Toggles Give You Superpowers
    url: >-
      https://medium.com/jettech/feature-toggles-give-you-superpowers-78fdeb7ab5e8
  - title: Unleash
    url: 'https://github.com/Unleash/unleash'
authors:
  - Torstein Gjengedal
---
```java
if (doTheNewStuff == true) {
  doTheNewStuff();
} else {
  doTheOldstuff();
}
```

Simple as it is, this technique essentially opens the door for having code that is unused, or even still a work in progress as part of the production code. In many cases, this is an essential tool to avoid long living feature branches and go for trunk-based development - a key part of succeeding in continuous delivery. If that’s not enough, adding some smartness to the toggle evaluation helps with things like A/B testing, pilot testing / canary releases and gradual rollouts.

A dead simple toggle may be implemented as 

```java
if (false) {
  doTheNewStuff();
} else {
  doTheOldstuff();
}
```

This will hide the new stuff until ready for launch, but it will require a (really, really small) commit, build and deploy to do so. And it does not allow for configuring different setup in different environments, i.e. running the new stuff in a test environment and not in production – at least not in the same version of the code base.

```java
if (theNewStuffIsSwitchedOn()) {
  doTheNewStuff();
} else {
  doTheOldstuff();
}
```

This minor adjustment gives the magic touch. Now, we have the flexibility to evaluate the toggle in any way we see fit, by changing the implementation of the evaluation function. The toggle may be simply bound to some config setting, i.e. for turning _on_ for test but _off_ for prod - a frequently used, and in many cases sufficient, approach. But the function may also be true for specific users, a certain percent of users or whatnot.

However, implementing rules like these at every point of evaluation in every app may quickly turn into a mess of many toggles with lots of duplicated, or slightly different, implementations – as well as being boring and cumbersome. When reaching that point, it may be time to look out for help. There are quite a few libraries or services ready to use. The organisation where I work have been using [Unleash](https://github.com/Unleash/unleash) for the last year and a half, where it has rapidly become a core tool for many dev teams – so I’ll use that as an example.

Unleash allows you to define your toggles in a dedicated, central system, using a nice and simple web UI. You define your toggle with the name of your choice, and assigns it one or more evaluation strategies. These strategies define _how_ the toggle should be evaluated, and any parameters it needs for doing so. Unleash comes with a set of pre-defined strategies, like 

* The simple, but handy _default_ strategy – either on or off
* _userWithId_ - on for specific users, configured with user ids for the users in question.
* _gradualRolloutUserId_ - on for a specific percentage of users (based on hashing the user id)
* _gradualRolloutSessionId_ – as above, but based on a session cookie (handy for systems without login)

In addition to the built-in strategies, you can easily define your own, like turning on for certain environments (i.e. test), for people at a certain location or any other criteria that you’re able to evaluate. Finally, a toggle can use a combination of strategies, like _“on for a certain percentage of users, plus always on for user a and b”._

There is an [online demo](https://unleash.herokuapp.com/) of unleash available if you want to check it out.
![The unleash admin gui](https://ibb.co/CBwXQw0)

Unleash provides client libraries for various languages, to use in your app’s code. This is where the actual evaluation of the toggles will take place, according to the defined strategies. The built-in strategies comes with the library, but in many cases you’ll have to pass some contextual information for it to work (i.e. the id of the logged in user for the _userWithId_ strategy.) For your custom strategies, you’ll have to provide the entire evaluation implementation. At the point of evaluation, your code will be quite simple, like 

```java
if (unleash.isEnabled(“theNewStuff”) {
  doTheNewStuff();
} else {
  doTheOldstuff();
}
```

Communication between the client (your app) and the unleash server is asynchronous, meaning that the toggles have minimal effect on performance (unless the evaluation itself is slow), and that your app will still work if you lose connection to the unleash server. The client library caches the toggle strategies and settings. Evaluating a toggle that is not defined yet, will be false.

The client also reports metrics back to the unleash admin app, where you can see the number of times a certain toggle have been evaluated true or false within the last hour, and which apps that use each toggle.

Wrapping up, feature toggling is first and foremost an enabler for getting code into production fast, avoiding long lasting feature branches and increasing speed. Additionally, it provides lots of flexibility of how to launch and test new features, being it in the dedicated test environment  or in production itself.

If you’re ready to take the step into the modern world of flexible feature toggling, Unleash is available as a hosted service at [unleash-hosted.com](unleash-hosted.com). However, you can host it yourself for free if you’d like. Or, you might want to check out other hosted services in the feature toggle space, like [LaunchDarkly](https://launchdarkly.com/),  [FeatureFlow](https://www.featureflow.io/) or [Feature Ops](https://www.featureops.com/).

Now, go and enable the speed toggle for your team :)
