---
calendar: react
post_year: 2020
post_day: 7
title: What and why and how are worklets in Reanimated 2?
description: "Worklets in Reanimated 2: What are they?"
links:
  - title: Reanimated documentation
    url: https://docs.swmansion.com/react-native-reanimated/
  - title: React Native Redash
    url: https://wcandillon.gitbook.io/redash/
authors: []
---
Reanimated has been part of the React Native ecosystem for quite some time. It gives developers the opportunity to run animations on the native thread, making the dream of a constant 60 fps not too distant at all. The downside of Reanimated was it's quite difficult to learn API. But this is all about to change with the soon to be released version 2 of this popular library.

In version to we write JavaScript. But fear not, the brilliant people of at Software Mansion who are developing this as granted us our very our JS-thread to make sure that we won't be affected by potential obstacles our "normal" JS-code are throwing out there. 

Besides us being able to write our animations in JS with a very slick new API, we are also introduced to a few new concepts within the Reanimated sphere. One of these concepts being Worklets.

## Worklets, you say?

Really, a Worklet is a JS function we define in our code that we can run on the UI thread. Defining a Worklet is as easy as using the "worklet" directive, like so:

```
function myWorklet() {
    "worklet"
    // do cool stuff
}
```

Let's pretend for a second that we want to clamp an animation. And we decide that this is a perfect use-case for a worklet. We could make a rather naïve version that work like this:

```
function clamp(min: number, max: number, val: number) {
    "worklet"
    if (val <= min) return min
    else if (val >= max) return max
    else return val
}
```

And to use this in our animation:

```
const clampedAnimationValue = clamp(val, 0, 10)
```

You might not use worklets frequently while writing Reanimated 2 as quite a lot can be achieved within the hooks provided by the library, this is even [stated by Software Mansion themselves](https://docs.swmansion.com/react-native-reanimated/docs/worklets#using-hooks). But there are definitely use-cases for when to use them.

We could take a little peek on [William Candillon's](https://twitter.com/wcandillon) amazing toolbet for Reanimated: [Redash](https://github.com/wcandillon/react-native-redash). Here we'll see a fair few examples of worklets creating to make our day a little easier:

```
export function toDeg(rad: number) {
  "worklet"
  return (rad * 180) / Math.PI
}
```

Just a neat little function to convert radians, which you might be used to work with if you've been using Reanimated 1 previously.

In conclusion worklets are a really neat addition to the Reanimated environment. Long gone is the verbose way of writing our animations and the learning curve to implement awesome animations has never been lower.