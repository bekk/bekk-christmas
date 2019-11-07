---
calendar: react
post_year: 2019
post_day: 15
title: Understanding your app with micro animations
image: 'https://i.ibb.co/db7Vf4r/photo-1525199896530-b1d87c75c887.jpg'
ingress: >-
  People like to understand what's happening around them. That is also true when
  using apps on their phones. Let's help them along.
links:
  - title: LayoutAnimation
    body: API specification for LayoutAnimation in the official docs.
    url: 'https://facebook.github.io/react-native/docs/layoutanimation'
authors:
  - Hannes Waller
---
A lot of apps has lists. Lists are great. They can display information in a vertical or horisontal way. But they can also be hard to understand sometimes. In this case we'll take a look at living lists. Lists that can be altered. 

Lets say my hypothetical kid, Ove, has written a wish list for christmas. Ove is a good boy, but he has a hard time deciding what he wants. So when compiling his list he's constantly removing items off said list. 

Being the developer dad that I apparently am I made him an app with React Native. This might look a little something like this:

[Ove's app](https://i.ibb.co/znRvN5G/ove.png)

The problem here lies when Ove clicks an item, it disappears. Thanks to the colouring we might understand what just happened. But before we blink the item has vanished. Ove is crying, he didn't understand.

This is where React Native's lovely `LayoutAnimation` API comes in handy. With just a few lines of code we can help him out.

Lets say our code to remove an item from the wish list looks like this:

```
function removeFromWishList(itemId) {
    setItems(items.filter(item => item.id !== itemId))
}
```

Our problem is that the item vanishes. To remedy this we really just need two lines of code. Firstly, we need to import `LayoutAnimation` from React Native.
``` import { ..., LayoutAnimation } from 'react-native'`

To actually use it all we need to do is adding a configuration for when we remove an item. So by extending the above code block to

```
function removeFromWishList(itemId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    setItems(items.filter(item => item.id !== itemId))
}
```
We tell React Native that we want to animate whatever happens when it renders the next view.

The result being:

![Ove removing stuff](https://i.ibb.co/BHJstvs/ezgif-com-video-to-gif.gif)

This is a lot better. And there's quite a few more things we could do. The above example is a preset. You can supply `LayoutAnimation` with a configuration object for what happens when creating, updating or deleting objects. We can also define how the animation should look with different curves.

Read more about that (here)[https://facebook.github.io/react-native/docs/layoutanimation]
