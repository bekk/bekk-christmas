---
calendar: css
post_year: 2019
post_day: 20
title: Blending color codes with mix-blend-modes
image: >-
  https://images.unsplash.com/photo-1487424439918-bc6b5bef0380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2691&q=80
ingress: >-
  This day is going to be all about blending colors, or rather how you can do
  blending in CSS! Those of you that have limited experience playing around with
  colors may wonder what blending is. It’s quite simple, blending is when you
  mix two colors together in order to get a new color - and yes, it’s exactly
  like when you played around with color tubes in kindergarten!
links:
  - title: Documentation for mix-blend-mode in CSS
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode'
  - title: 'W3C specification for different blending effects '
    url: 'ttps://www.w3.org/TR/compositing/#blending'
authors:
  - Joakim Gyllenskepp
---
# How does mix-blend-mode work?
In CSS, blending works similarly, the color of the element with the property mix-blend-mode set will be blended with it’s background color. 
For example, we could put mix-blend-mode on a text-element above an image to have the text color adjusted according to colors of the background, or we could blend two images together to achieve quite a cool effect.

Although, blending in CSS is not quite as straightforward as when you mix two colors on a palette. There are a heap of different ways to blend colors with computers, in CSS’s mix-blend-mode the method of blending is specified by different [blending modes](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode). 
Lets get on with some examples on how it actually looks like in practice! 


# Blending text on top of an image
Blending text with a picture is actually quite easy. All it takes is the code below:

``` CSS
.text {
  mix-blend-mode: [mode];
  color: [base color to blend with background]
  /* Other text properties (placement etc) */
}
```
You can see the effect of this code used together with the blending mode *difference* in the image below! This blending mode calculates the difference between colors being blended, for example if we would blend white (#FFFFFF) and blue (#0000FF) we would get yellow (FFFF00)

<img class="wide-image" src="https://i.ibb.co/JjJ0Vsf/css-christmas-textpic.png" />


# Blending two images with each other
By blending two images together we can also get quite a cool effect. By just playing around a little with different blend modes I ended up with a colored santa above a snowy landscape - quite cool!

``` CSS
.image {
  mix-blend-mode: hard-light;
  /* Other image properties (placement etc) */
}
```

<img class="wide-image" src="https://i.ibb.co/vLhNgvN/css-christmas-picpic.png" />

# How do I know what blends with what?
For me it was quite hard to get my head around how elements blend when they are stacked on top of each other, but it's quite easy really. The background of the element with the mix-blend-mode property set will be blended with the both the element and **all** of its children. So even if you have 10 elements stacked underneath the element with mix-blend-mode they will all blend with the same background.

# What else?
I recommend just playing around with mix-blend-mode a bit, it's quite fun and you can end up with some beautiful effects! It's also possible to have dynamic elements that move around while simultaneously blending, and in modern browsers there is support for blending SVGs as well!
