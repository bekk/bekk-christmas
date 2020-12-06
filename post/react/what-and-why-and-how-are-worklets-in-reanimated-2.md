---
calendar: react
post_year: 2020
post_day: 7
title: What and why and how are worklets in Reanimated 2?
image: https://images.unsplash.com/photo-1576545535503-2b80d4b6d925?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80
ingress: A brief introduction to Reanimated 2's worklet directive and how it can
  help us animate our apps.
description: "Worklets in Reanimated 2: What are they?"
links:
  - title: Reanimated documentation
    url: https://docs.swmansion.com/react-native-reanimated/
  - title: React Native Redash
    url: https://wcandillon.gitbook.io/redash/
authors:
  - Hannes Waller
---
Reanimated has been part of the React Native ecosystem for quite some time. Popular libraries like React Navigation depend on it. What it does is it gives developers the opportunity to write and run animations on the UI-thread, making the dream of a constant 60 fps not too distant at all. The downside of Reanimated was it's quite difficult to learn API. A simple calculation like 10 + 8 * 4 would be written as `add(10, multiply(8, 4))` , and to be frank that is a fairly straight forward example. But this is all about to change with version 2 of Reanimated, currently in its first release candidate.

In the new version we write JavaScript. But fear not, the brilliant people of at Software Mansion who are developing this has granted us our very our JS-thread to make sure that we won't be affected by potential obstacles our "normal" JS-code might be throwing out there. 

Besides us being able to write our animations in JS and a very slick new API, we are also introduced to a few new concepts within the Reanimated sphere. One of these concepts being *worklets*.

## Worklets, you say?

Really, a worklet is a JS function we define in our code that that gets compiled at runtime to be executed on its own JS-thread, far and away from React Natives one. Defining a worklet is as easy as using the "worklet" directive when writing a function, like so:

```
function myWorklet() {
    "worklet"
    // do cool stuff
}
```

Let us pretend for a second that we have an animation that we want to clamp. And we decide that this is a perfect use-case for a worklet. We could make a rather naïve version that work like this:

```
function clamp(min: number, max: number, val: number) {
    "worklet"
    if (val <= min) return min
    else if (val >= max) return max
    else return val
}
```

And to use this in our animation we write:

```
const clampedAnimationValue = clamp(val, 0, 10)
```

You might not use worklets frequently while writing Reanimated 2, as quite a lot can be achieved within the hooks provided by the library itself, this is even [stated](https://docs.swmansion.com/react-native-reanimated/docs/worklets#using-hooks) by Software Mansion themselves. But there are definitely use-cases for when to use them and I've found myself to write a fair few of them to help out when developing an app.

Now have a little peek into [William Candillon's](https://twitter.com/wcandillon) amazing toolbelt for Reanimated: [Redash](https://github.com/wcandillon/react-native-redash), which by the way I can't recommend enough. Here we'll see a fair few examples of worklets to make our day a little easier:

```
export function toDeg(rad: number) {
  "worklet"
  return (rad * 180) / Math.PI
}
```

This is just a neat little function to convert radians, which you might be used to work with if you've previously been using Reanimated 1, into degrees. And again, the upside here is that we do write JS as we usually do, but it runs on a separate thread.

Or we can take a look at a slightly more advanced example:

```
export const interpolateColor = (
  value: number,
  inputRange: number[],
  rawOutputRange: string[],
  colorSpace: ColorSpace = ColorSpace.RGB
) => {
  "worklet";
  const outputRange = rawOutputRange.map((c) =>
    typeof c === "number" ? c : processColor(c)
  );
  if (colorSpace === ColorSpace.HSV) {
    return interpolateColorsHSV(value, inputRange, outputRange);
  }
  const result = interpolateColorsRGB(value, inputRange, outputRange);
  return result;
};
```

Here we can interpolate colours.  I'm not going to go through the entire thing, but [you can](https://github.com/wcandillon/react-native-redash/blob/master/src/Colors.ts) if you want to. But three things worth noting are the  `processColor`, `interpolateColorsHSV` and `interpolateColorsRGB` functions, as these are in fact also worklets. Meaning that worklets can depend on each other and share information between one another.

In conclusion, worklets are neat little helper functions to assist you while animating in Reanimated 2 without having to worry about it being ran on the JS-thread. They're a very nice addition to the Reanimated environment. 

Finally, with Reanimated 2, the verbose way of writing animations is long gone and the learning curve to implement awesome interactions has never been lower.