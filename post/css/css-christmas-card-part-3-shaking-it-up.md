---
calendar: css
post_year: 2019
post_day: 14
title: 'CSS Christmas card - Part 3: Shaking it up'
image: >-
  https://images.unsplash.com/photo-1532411644617-ea8077306595?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80
authors:
  - Dag Frode Solberg
---
The next morning, Dag showed Halldis what he had done so far. After she had stopped laughing, she agreed it was pretty great. "Why don't you add some animations to it?" she asked. "Animations?" Dag asked. "You know, maybe some movement to the tree?".

Looking up the documentation, Dag quickly figured out how to make the tree move.

```css
/*
* CSS animation properties
* Listed with default or example values
*/

/*
* duration, can be specified in seconds, or milliseconds
*/
animation-duration: 3s;

/*
* Name of the @keyframes describing the animation's keyframes
*/
animation-name: slidein;

/*
* How many times should the animation be repeated
*/
animation-iteration-count: 1;

/*
* animation time function
* predefined functions: ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end
*/
Animation-timing-function: ease;

/*
* Keyframes
* Keyframes can be defined at % of the animation duration
* To and From can be used instead of 0% and 100%
*
*/
@keyframes slidein {
    0% {
       background-color: red;
    }
    100% {
       background-color: blue;
    }
}
```

[MDN web docs - CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

Dag took the existing code and altered it so that the tree background moves 200px every 20seconds. And in the same time period have the tree move from the lower right to taller than normal in the middle, to give the feeling of wind.

```css
#three{
  position:absolute;
  left:50px;
  top:100px;
  width:400px;
  height:700px;
  background-image: linear-gradient(5deg, #1a9900 25%, #00ab17 25%, #00ab17 50%, #1a9900 50%, #1a9900 75%, #00ab17 75%, #00ab17 100%);
background-size: 49.44px 68.05px;
  clip-path: polygon(50% 0%, 80% 30%, 70% 30%, 90% 50%, 80% 50%, 100% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 20% 50%, 10% 50%, 30% 30%, 20% 30%);
   -webkit-clip-path: polygon(50% 0%, 80% 30%, 70% 30%, 90% 50%, 80% 50%, 100% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 20% 50%, 10% 50%, 30% 30%, 20% 30%);
  animation: three 20s infinite;
}

@keyframes three {
    0% {
       background-position: 0px 0px;
   clip-path: polygon(58% 1%, 88% 31%, 78% 31%, 98% 51%, 88% 51%, 102% 71%, 60% 71%, 60% 81%, 40% 81%, 40% 71%, 0% 71%, 22% 51%, 12% 51%, 32% 31%, 22% 31%);
   -webkit-clip-path: polygon(58% 0%, 88% 30%, 78% 30%, 98% 50%, 88% 50%, 102% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 22% 50%, 12% 50%, 32% 30%, 22% 30%);
    }
  50%{
   clip-path: polygon(42% -1%, 72% 29%, 62% 29%, 82% 49%, 72% 49%, 92% 69%, 60% 69%, 60% 79%, 40% 79%, 40% 69%, 0% 69%, 12% 49%, 2% 49%, 22% 29%, 12% 29%);
   -webkit-clip-path: polygon(42% 0%, 72% 30%, 62% 30%, 82% 50%, 72% 50%, 92% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 12% 50%, 2% 50%, 22% 30%, 12% 30%);
  }
    100% {
     clip-path: polygon(58% 1%, 88% 31%, 78% 31%, 98% 51%, 88% 51%, 102% 71%, 60% 71%, 60% 81%, 40% 81%, 40% 71%, 0% 71%, 22% 51%, 12% 51%, 32% 31%, 22% 31%);
   -webkit-clip-path: polygon(58% 0%, 88% 30%, 78% 30%, 98% 50%, 88% 50%, 102% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 22% 50%, 12% 50%, 32% 30%, 22% 30%);
       background-position: 0px 200px;
    }
}

```

<iframe height="765" style="width: 100%;" scrolling="no" title="three with decorations with stripes with safari support and animation" src="https://codepen.io/dagfs/embed/QWwEobG?height=765&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/QWwEobG'>three with decorations with stripes with safari support and animation</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The card looked a bit strange, with only the tree moving, so he added animations to the pictures and the star as well.

<iframe height="846" style="width: 100%;" scrolling="no" title="three with decorations with stripes with safari support and animation 2.0" src="https://codepen.io/dagfs/embed/VwYjRPJ?height=846&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/VwYjRPJ'>three with decorations with stripes with safari support and animation 2.0</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Looking at the card, he was pleased. But he felt that the card had lost some of the attention on him and his team members. He figured he should add some animation to their images, as well.

This project had gotten him to explore new features he had not often used before, and he found it exciting. Looking up different ways of manipulating images with CSS, he found the `filter` function. "That might work. But what filter should I use?". He ended up try saturation, as Christmas has a lot of green and red, and with saturation, you can make things more green and red, therefore more Christmassy!

Playing around with for a few minutes, he ended up with

<iframe height="820" style="width: 100%;" scrolling="no" title="three with decorations with stripes with safari support and animation 3.0" src="https://codepen.io/dagfs/embed/QWwEoOM?height=820&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/QWwEoOM'>three with decorations with stripes with safari support and animation 3.0</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

```css
@keyframes globes {
    0% {
   filter:hue-rotate(-90deg);
   transform: translate(30px, 0px);
    }
  50%{
   filter:hue-rotate(90deg);
   transform: translate(-30px, -10px);
  }
    100% {
   filter:hue-rotate(-90deg);
   transform: translate(30px, 0px);
    }
}
```


Based on [MDN web docs - filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
```css
/*
* filters include
* blur
* brightness
* contrast
* drop-shadow
* greyscale
* hue-rotate
* invert
* opacity
* saturate
* sepia
* custom filters from svg
*/
filter: blur(5px);
```

Satisfied with the result, Dag opened his email client and sent the card to the wrong email list, to himself, then finally to the correct email list.

<iframe height="766" style="width: 100%;" scrolling="no" title="three with decorations with stripes with safari support and animation 3.0" src="https://codepen.io/dagfs/embed/QWwEoOM?height=766&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/QWwEoOM'>three with decorations with stripes with safari support and animation 3.0</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
