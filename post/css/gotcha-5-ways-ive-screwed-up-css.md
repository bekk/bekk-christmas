---
calendar: css
post_year: 2019
post_day: 19
title: Gotcha! 5 ways I've screwed up CSS
image: >-
  https://images.unsplash.com/photo-1544569975-8e155329f348?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80
ingress: >-
  10 years of writing CSS has taught me one important lesson - there's always
  new ways to screw up. Let's look at some of the ways I've failed in the last
  decade.
description: >-
  There are a lot of ways to screw up CSS. Let's look at a few of the ways I
  have made CSS not work.
links:
  - title: Even more gotchas
    url: >-
      https://medium.com/@sargalias/the-top-5-css-gotchas-and-a-few-bonus-d39755c79527
  - title: The language has its own screw-ups too!
    url: 'https://dev.to/3zsforinsomnia/mistakes-in-css-5f3j'
authors:
  - Kristofer Giltvedt Selbekk
---
CSS was what made me fall in love with the web. It's the part of web development that makes everything smooth and pretty, and it's instant feedback loop is just... 🤤. But oh my have I screwed it up royally.

I've written several articles on CSS, done hour long talks and workshops about these darn style sheets, and yet I keep on finding new ways to screw it up. I'm not sure if its the language itself, or if I've never formally learned it. I've always learned by experimenting and learning stuff just-in-time - and now it's coming back to haunt me.

I've screwed up collapsing margins and used `vertical-align: middle` in desperation like the rest of you, but in this article I wanted to share a few of the more... exotic screw-ups I've encountered, or heard about other doing.

Ready? Let's jump in!

## normal, bold... bolder?

I did pretty well in English class when I went to school. One of my specialties was adjectives, and how to grade them. So when I started coding, I assumed that if I wanted that really thick fat bold text, I should grab the `font-weight` that seemed the boldest.

After checking w3schools (I'm sorry, it was the best there was back in 2005 or whenever this was), I discovered the keyword `bolder`. Surely this is the boldest of the bolds, and at least much more bold than the regular bold, right?

**Nope!** Turns out `bolder` and its sibling `lighter` are "relative" font weights. That is - if your font's default font weight is 100, or "light", and you specify `font-weight: bolder`, it will resolve to `font-weight: normal`.

If you want, you can dive into the detailed intricacies of font weights and how they work in [this Quirksmode article](https://www.quirksmode.org/css/text/fontweight.html), but the tl;dr: is to use the numeric font weights (you know, `100`-`900` like a normal person.

## Animating inline elements

This one I learned today, and was probably the one that triggered the idea for this article. I was trying to apply a skew-transform as an animation to a regular text link's hover state, but it wouldn't work.

Here's a simplified version of the code I had:

```css
.text-link {
  color: blue;
}
.text-link:hover {
  animation: linkHover 1s ease-out forwards;
}

@keyframes linkHover {
  to { transform: skewX(15deg); }
}
```

I played around in the dev tools for ages before I finally grasped at my last hope - google. I googled my frustration (like, literally "animating link doesn't work!"), and it turned out I [wasn't the first one](https://stackoverflow.com/questions/20022097/css-animation-not-working-for-a-tag) that had met this particular weird obstacle. 

Turns out, for transforms to work correctly, you need to specify a different display value than `inline`. In my particular case, a `display: inline-block;` sufficed. 

### Inline elements are the wurst 🌭

Speaking of inline elements, I always screw up that inline elements can't have margins. Or well, they can, but only horizontal ones. And then the paddings is on a completely different level of [screwed up](https://codepen.io/selbekk/pen/oNgBgVb?editors=1100). Argh, I don't even want to speak about this one. Next!

## CSS custom properties are not variables

When I first met custom properties in CSS, I was in love. I used them literally everywhere! I threw SCSS out the window, and went full on `--bananas`. I even created a _set of design tokens_ as custom properties - including our breakpoints. And that's when I realized you can't use them as preprocessor variables.

Turns out, there are a few places you can't use CSS custom properties. They're actual properties - which means `not-this-part-but: this-part-right-here !important;`. 

In other words - this isn't a valid usecase for them:

```css
@media (min-width: var(--breakpoint-large)) {
  /* Totally illegal */
}
```

Another use case that's almost totally ruined by this, is putting URLs in there. In other words - this is not allowed:

```css
.dubious-business {
  --image-src: https://placekitten.com/100/100;
  background-image: url(var(--image-src));
}
```
This sucks, because it means we can't pass the `--image-src` via the `style` tag, for instance. However, you CAN put the entire url-thing in there - so _this_ is valid:

```css
.barely-okay {
  --image-src: url(https://placekitten.com/100/100);
  background-image: var(--image-src);
}
```

I realize, in retrospect, that this should be clear when I read the spec, but I didn't learn by reading the spec - I learned by doing! [Blergh](https://stackoverflow.com/questions/40722882/css-native-variables-not-working-in-media-queries/40723269#40723269).

## I hattr attr()

When I first saw `attr()` - a nifty way of pulling HTML attribute values into your pseudo elements - I had such high hopes. I could use it to pull text values into my pseudo elements, and... well, that was it for `attr()`.

You can't use it outside of your pseudo elements (`::before` and `::after`), and even in there, you can only use it with the `content` property. The disappointment was real. Yeah sure, there's some [experimental support](https://developer.mozilla.org/en-US/docs/Web/CSS/attr), but experimental support is just grown up talk for "perhaps Santa will bring it **next** Christmas". Stupid grown ups.

## Source order matters

The first project I worked on as a professional developer had a single CSS file that was a couple thousands lines. There wasn't any real structure, and a typical case of what you might call an "append only" stylesheet. We once tried to split it up into manageable chunks and sew it together, but we soon realized that the order these chunks were ordered in was _incredibly_ important. 

Because in CSS, if two rules have the same specificity (don't even get me started on specificity), the source order decides the winner. The last rule specified overrules the first one. Or was it the other way around? [I forget](https://codepen.io/selbekk/pen/gObgpLo). 

In my mind, the order of the classes applied to the HTML element should decide which one should take it all and win the specificity stand-off. Unfortunately, that's not the case. And I forget about once a week.

## Before and after I discovered replaced elements

Here, the other day, I was minding my own business, when I was trying to style an image to have a gradient overlay show up on top of it on hover. I reached for the ol' `::after` to create the overlay - and to my surprise - it didn't work!

Turns out the `<img />` tag is one of a very special set of what's called "replaced elements", which can't have these fancy properties for some reason. You can read all about it [here](http://ahmed.amayem.com/html-replaced-elements-non-replaced-elements-examples/), but the end result is that `<img />`, `<svg />`, `<iframe />` and a few other important tags just don't have pseudo elements associated with them.

## Non-flexible fieldsets

Fieldsets are nice to have when you want to group a bunch of inputs together. However, if you're trying to apply `display: flex` to it, you're out of luck. You'll find some answers in [this Stack Overflow post](https://stackoverflow.com/questions/28078681/why-cant-fieldset-be-flex-containers), but the sad truth is that it's just not supported. Except in Firefox.

## CSS for life!

I mean, I still love CSS. It's what brings color, layout and sparkles of joy to my day. That doesn't mean I can't hate it at times. It's really good at most stuff, but it does have its quirks. Like good ol' crazy grandma.
