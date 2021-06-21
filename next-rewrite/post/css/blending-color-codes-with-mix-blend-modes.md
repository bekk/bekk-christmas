---
calendar: css
post_year: 2019
post_day: 20
title: Blending color codes with mix-blend-modes
image: >-
  https://images.unsplash.com/photo-1487424439918-bc6b5bef0380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2691&q=80
ingress: >-
  This day is going to be all about blending colors, or rather how you can do
  blending in CSS with mix-blend-mode! Those of you that have limited experience
  playing around with colors may wonder what blending is. It’s quite simple,
  blending is when you mix two colors together in order to get a new color - and
  yes, it’s exactly like when you played around with color tubes in
  kindergarten!
links:
  - title: Documentation for mix-blend-mode in CSS
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode'
  - title: 'W3C specification for different blending effects '
    url: 'ttps://www.w3.org/TR/compositing/#blending'
authors:
  - Joakim Gyllenskepp
---
# How does mix-blend-mode work?
Just like when you mix real colors on a palette, computers can do different computations on two color codes to find a new color! Some of you may have played around with this kind of blending in photo editing software where you can apply different effects on photos. CSS supports blending as well with the mix-blend-mode property, which allows us to blend the colors of different elements! 

The color of the element with mix-blend-mode set will be blended with it’s background color. For example, we could put mix-blend-mode on a text-element over an image to have the text color adjust according to the color of the background, or we could blend two images together to achieve quite a cool effect.

However, blending with a computer is not quite as straightforward as when you mix two colors on a palette. There are a heap of different ways to blend colors with computers, which in CSS can be specified with different [blending modes](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode), but more on that later! 
Lets get on with some examples on how it actually looks like in practice! 


# Blending text on top of an image
Blending text with a picture is actually quite easy. All it takes is to add the mix-blend-mode property to the element that you want to blend with the background (in this case the text):

``` CSS
.text {
  mix-blend-mode: [mode];
  color: [base color of the text that will blend with background]
  /* Other text properties (placement etc) */
}
```
You can see the effect of this code used together with the blending mode *difference* in the image below! This blending mode calculates the difference between the colors being blended, for example if we would blend white (#FFFFFF) and blue (#0000FF) we would get yellow (#FFFF00)

<img class="wide-image" src="https://i.ibb.co/JjJ0Vsf/css-christmas-textpic.png" />


# Blending two images with each other
You can also blend images with each other to get quite a cool effect. By just playing around a little with different blend modes I ended up with a red santa above some snowy landscape - quite nice!

``` CSS

.background {
  background-color: black;
}

.image {
  mix-blend-mode: hard-light;
  /* Other image properties (placement etc) */
}
```

In this case there is a black background, then a `div` containing two `img`'s, first the snowy landscape and then the santa. The order of the elements does matter, in this case the snowy landscape is first blended with the black background, and the resulting image is then blended with the red santa!

<img class="wide-image" src="https://i.ibb.co/vLhNgvN/css-christmas-picpic.png" />

# What else?
I recommend just playing around with mix-blend-mode a bit, it's quite fun and you can end up with some beautiful effects! It's also possible to have dynamic elements that move around while simultaneously blending, and in modern browsers there is support for blending SVGs as well. 

### Happy blending!