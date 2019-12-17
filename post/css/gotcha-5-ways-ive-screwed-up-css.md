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

Speaking of inline elements, I always screw up that inline elements can't have margins. Or well, they can, but depending on the box-model you've applied. Argh, I don't even want to speak about this one. Next!

## CSS custom properties are not variables

When I first met

(inside media queries)

## Source order matters

## Before and after I discovered replaced elements

## Flexible fieldsets

