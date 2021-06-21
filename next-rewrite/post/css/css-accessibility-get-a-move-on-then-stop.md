---
calendar: css
post_year: 2019
post_day: 16
title: 'CSS Accessibility - get a move on, then stop!'
ingress: >-
  Animations can be what sets your website apart, and really makes your users
  happy. It shows that you have gone that extra mile to create something really
  special, often with great care, and oftentimes, depending on the animation,
  with great effort.
authors:
  - Hans-Christian Fjeldberg-Gustavson
---
Unfortunately, some users may not like our animations, and WCAG specifically addresses animations with [Success Criterion 2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html) and [Success Criterion 2.3.1 Three Flashes or Below Threshold](https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html). So, how do we comply?

## Pause, stop and hide your animations

How to pause, stop and hide animations depends on what technique  you are using. 

If you are using [three.js](https://threejs.org) like we do on [bekk.no](https://www.bekk.no), stopping the animation would involve creating one or more flags, and read these flags in the animation function. Changing the flags can easily be done using buttons and JavaScript, and currently that is the only thing missing on our site (PR coming in 2020 guaranteed).

If you are using CSS Animations and Transitions we can actually control animations in a few different ways. The first solution is to simply turn off animation with `animation-name: none;`. The effect is immediate, and not very pretty:

<iframe height="765" style="width: 100%;" scrolling="no" title="tree with decorations and stoppable animations" src="https://codepen.io/hcfjeldberg/embed/QWwKozg?height=765&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hcfjeldberg/pen/QWwKozg'>tree with decorations and stoppable animations</a> by Hans-Christian Fjeldberg-Gustavson
  (<a href='https://codepen.io/hcfjeldberg'>@hcfjeldberg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

A better solution, especially if you expect the users to continue the animation is to use [`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state`). Using this CSS property, the animation will pause at the current state when set to `paused`, and continue its animation when set to `running`:

<iframe height="765" style="width: 100%;" scrolling="no" title="tree with decorations and pausable animations" src="https://codepen.io/hcfjeldberg/embed/eYmdXoj?height=765&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hcfjeldberg/pen/eYmdXoj'>tree with decorations and pausable animations</a> by Hans-Christian Fjeldberg-Gustavson
  (<a href='https://codepen.io/hcfjeldberg'>@hcfjeldberg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

When using SVG animations, the same CSS property can be applied,  but you might have to add the style and control the style within your SVG in stead of in your global CSS.

## Three flashes or below threshold

When creating animations, they should not contain anything that flashes more than three times in any one second period, or otherwise break the [very technical definition of the flash threshold](https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html#general-thresholddef).

Given that your animations adhere to this principle, it is generally considered good practice to stop the animations, either after a given duration using [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration) or a given number of iterations using [`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count).

Tomorrow, let’s take a look at how to automatically detect if we should limit our animations presented to our users.