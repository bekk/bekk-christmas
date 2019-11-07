---
calendar: react
post_year: 2019
post_day: 15
title: Understanding your app with micro animations
image: 'https://i.ibb.co/db7Vf4r/photo-1525199896530-b1d87c75c887.jpg'
ingress: >-
  People like to understand what's happening around them. That is also true when
  using apps on their phones. Let's help them along.
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
