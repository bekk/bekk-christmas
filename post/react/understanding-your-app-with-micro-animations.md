---
calendar: react
post_year: 2019
post_day: 15
title: Micro animations to the rescue
image: 'https://i.ibb.co/db7Vf4r/photo-1525199896530-b1d87c75c887.jpg'
ingress: >-
  People like to understand what's happening around them, whether it's in real
  life or in an app on their phone. Let us have a little peak into how we can
  help users of our React Native app.
links:
  - title: LayoutAnimation
    url: 'https://facebook.github.io/react-native/docs/layoutanimation'
authors:
  - Hannes Waller
---
A lot of apps have lists. Lists are great. They can display information in a vertical or horizontal way. But they can also be hard to understand sometimes. In this case we'll take a look at living lists where you can remove items off of it. 

Let's say my hypothetical kid, Ove, has written a wish list for Christmas. Ove is a good kid, but he has a hard time deciding what he wants. So, when compiling his list, he's constantly discarding items off said list. 
Being the developer dad that I apparently am, I made him an app. This might look a little something like this:

![Ove's app](https://i.ibb.co/K2XGhv4/ove.png)

The problem here lies when Ove taps an item, it disappears. Thanks to the colouring we might understand what just happened. But before we blink the item has vanished. Ove is crying, he didn't understand.
This is where React Native's lovely `LayoutAnimation` API comes in handy. With just a few lines of code we can help him out.

Our code to remove an item from the wish list might look like this:

```js
function removeFromWishList(itemId) {
    setItems(items.filter(item => item.id !== itemId))
}
```

Our problem is that the item vanishes in an instant. To remedy this, we really just need two lines of code. Firstly, we need to import LayoutAnimation itself by using the standard `import { LayoutAnimation } from 'react-native'`
To actually use it, all we need to do is adding a configuration for when we remove an item. So, by extending the above code block to

```js
function removeFromWishList(itemId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    setItems(items.filter(item => item.id !== itemId))
}
```

We tell React Native that we want to animate whatever happens on the next render.

The result being:

![Ove removing stuff](https://i.ibb.co/MyHNsKN/ezgif-com-video-to-gif.gif)

It really is that easy. Personally, I find this a lot clearer. And there's quite a few more things we could do. The above example is just a preset. If you want to have more control, you can supply `LayoutAnimation` with a configuration object for what happens when creating, updating or deleting objects. We can also define how the animation should look with different curves.

Read more about that [here](https://facebook.github.io/react-native/docs/layoutanimation)

