---
calendar: css
post_year: 2019
post_day: 21
title: Wrap it up! – Creating a CSS game
ingress: >-
  Santa needs your help. The usually ever so helpful elves have decided to play
  a trick on him, and have made all the gifts run around, resisting to get
  wrapped in the lovely Christmas paper he just spent all day picking out. Can
  you help Santa catch and wrap the gifts?


  <iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas
  game"
  src="https://codepen.io/mfeiring/embed/eYmJNZy?height=265&theme-id=default&default-tab=result"
  frameborder="no" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href='https://codepen.io/mfeiring/pen/eYmJNZy'>CSS Christmas game</a> by Mira Feiring
    (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>
description: ''
links:
  - title: Pure CSS games
    url: 'https://codepen.io/collection/AKkZro'
  - title: 'Una Kravets: Let’s Build a CSS Game | CSSconf EU 2017'
    url: 'https://www.youtube.com/watch?v=WmVH85G59Lk'
  - title: 'CSS: Global Offensive | JavaZone 2019'
    url: 'https://vimeo.com/363513036'
authors:
  - Mira Thoen Feiring
---
Did you catch all the gifts? Well, perhaps it wasn't really the most challenging game. But might I interest you in a short rundown of how the game is build? Read on my dear friend. But beware: This might not look its best on a small devices.

## The setup

To start I've created a pretty basic layout. In contains five checkboxes, with corresponding labels, linked together with the `for` and `id` attributes. I've increased the size of the input fields with the `zoom` property (this doesn't work in Firefox unfortunately). By scrolling down a bit, you should see the success screen.

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game - step 1" src="https://codepen.io/mfeiring/embed/eYmvXWJ?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/eYmvXWJ'>CSS Christmas game - step 1</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## The counter

First up is the counter for how many gifts have been wrapped, starting by removing the static numbers from the HTML. Then moving on to the CSS "magic" – the `counter` property. 

The following snippet will increment the counter `gifts` for each `input` field in the DOM, as well as the counter `gifts-wrapped` for each of them that is checked.

```css
input {
  counter-increment: gifts;
}
    
input:checked {
  counter-increment: gifts gifts-wrapped;
}
```

In order to display these counters, we need to use a pseudo-element and  the `counter()` function, which returns the current value of a counter as a string:

```css
footer:before {
  content: counter(gifts-wrapped) '/' counter(gifts) ' ';
}
```

The counter should now increment for each checkbox that is, well, checked.

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game - step 2" src="https://codepen.io/mfeiring/embed/KKwWYmW?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/KKwWYmW'>CSS Christmas game - step 2</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## The gifts and the wrapping

A game about checking boxes isn't really that enticing, so some styling of them are in order. It isn't really possible to do anything with the standard styling of checkboxes though. So we'll have to do some magic with the `label` elements instead, using an [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to differentiate between them.

```css
label[for="1"]:before {
  content: '🧸';
}

label[for="2"]:before {
  content: '🏀';
}
```

"But couldn't you just add those emojis to the HTML?" you might ask. And the answer is "Yes, yes I could. But then I wouldn't be able to do this!"

```css
input:checked + label:before {
  content: '🎁';
}
```

And voilà! Now checked boxes equal wrapped gifts 🎁

Finally, let's prevent the possible unintended "unwrapping" of presents, as well as (visually) remove the checkboxes:

```css
input:checked + label {
  pointer-events: none;
}

input {
  position: absolute;
  left: -100vw;
}
```

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game - step 3" src="https://codepen.io/mfeiring/embed/YzPZMQM?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/YzPZMQM'>CSS Christmas game - step 3</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## The movement

So far the game is ridiculously easy. So we'll make the toys move around a bit using a CSS animation.

```css
label {
  animation: move 5s infinite linear alternate;
  display: inline-block;
}

@keyframes move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(100vh - 3rem));
  }
}
```

Here, we have an `infinite` animation, in which the `animation-direction` is `alternate`, taking the toys 5 seconds to reach the bottom, and the another 5 seconds to go back up again. The `calc` function is used to prevent the toys from moving beneath the counter, by calculating the height of the viewport (`100vh`) minus the height of the counter container (`3rem`).

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game - step 4.1" src="https://codepen.io/mfeiring/embed/VwYpNQO?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/VwYpNQO'>CSS Christmas game - step 4.1</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

By adding a few more keyframes to the animation, we can make the movement a bit more erratic:

```css
@keyframes move {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(calc(30vh)) translateX(50px);
  }
  40% {
    transform: translateY(calc(80vh - 3rem)) translateX(-150px);
  }
  60% {
    transform: translateY(calc(50vh - 3rem)) translateX(-100px);
  }
  80% {
    transform: translateY(calc(85vh - 3rem)) translateX(100px);
  }
  100% {
    transform: translateY(calc(100vh - 3rem));
  }
}
```

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game - step 4.2" src="https://codepen.io/mfeiring/embed/mdyWgLd?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/mdyWgLd'>CSS Christmas game - step 4.2</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

And being a bit creative with nth-of-type selectors, we can give the toys tome individuality in their movement.

```css
// Selects every other label, starting with the second
label:nth-of-type(even) {
  animation-direction: alternate-reverse;
  animation-duration: 3.5;
  transform: translateY(calc(100vh - 3rem));
}

// Selects every label, except the first two
label:nth-of-type(n + 3) {
  animation-delay: 1s;
}

// Selects only the first 3 labels
label:nth-of-type(-n + 3) {
  animation-duration: 7s;
}
```

Let's also make them stand still when they're caught and wrapped:

```css
input:checked + label {
  animation-play-state: paused;
}
```

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game - step 4.3" src="https://codepen.io/mfeiring/embed/yLyMrjz?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/yLyMrjz'>CSS Christmas game - step 4.3</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## The winning

In CSS, the [general sibling combinator (`~`)](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) allows us to select an element that comes after a given other element (though not necessarily immediately after), that is within the same parent element. In order to show the "Good job!" screen upon completing the game, we need to select element containing this screen, _iff_ it is preceded by five checked input fields, like so:

```css
input:checked
  ~ input:checked
  ~ input:checked
  ~ input:checked
  ~ input:checked
  ~ .you-win {
  top: 0;
  transition: 200ms;
}
```
And to prevent anyone from just scrolling down to this screen, let's prevent scrolling completely:

```css
body {
  overflow: hidden;
}
```

<iframe height="423" style="width: 100%;" scrolling="no" title="CSS Christmas game" src="https://codepen.io/mfeiring/embed/eYmJNZy?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mfeiring/pen/eYmJNZy'>CSS Christmas game</a> by Mira Feiring
  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Wrapping up
And that's it! We've created a game using only CSS and HTML. 

For more inspiration, I'd highly recommend checking out the collection of CSS games that Una Kravets has compiled on Codepen, as well as the talk she held on CSSconf EU in 2017, both linked down below.
