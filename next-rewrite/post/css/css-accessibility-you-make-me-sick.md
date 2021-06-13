---
calendar: css
post_year: 2019
post_day: 17
title: CSS Accessibility - you make me sick!
ingress: >-
  Yesterday, we showed how to empower our users to stop our long running
  animations. But why force our users to manually stop animations, when they are
  screaming at us that they do not want animations!
links:
  - title: Designing Safer Web Animation For Motion Sensitivity
    url: >-
      https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/
  - title: Your Interactive Makes Me Sick
    url: 'https://source.opennews.org/articles/motion-sick/'
  - title: More Resources for Accessible Animations
    url: 'https://alistapart.com/blog/post/more-resources-for-accessible-animations/'
authors:
  - Hans-Christian Fjeldberg-Gustavson
---
In modern operating systems, users can specify that they prefer less animations than normal. In [iOS](http://osxdaily.com/2019/10/18/how-reduce-motion-iphone-ipad/) and [macOS](http://osxdaily.com/2018/12/17/how-reduce-motion-mac-disable-animations/), this is called Reduce Motion. On [Windows](https://support.microsoft.com/en-gb/help/27930/windows-10-make-it-easier-to-focus-on-tasks) you can disable “Show animation in Windows”, and on [Android](https://mcmw.abilitynet.org.uk/how-disable-interface-animations-android-pie) you can “Remove animations”. With this setting in place, modern web browsers supports the experimental media query [`prefers-reduced-motion`](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion). With this knowledge in hand, we can now remove animations for our users who’d rather not see them:

```
@media (prefers-reduced-motion:reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

Great, this kind of work, if your animations and transitions start and stop at the same position. But that happens if your original transition start from outside the viewport? It just stays there forever, never getting the chance too see the light of day, poor thing!

A better solution is to let the animations and transitions finish in no time at all, making sure they at least stop in their final state, hoping the final state is inside the viewport:

```
@media (prefers-reduced-motion:reduce) {
    *, 
    *::before, 
    *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
    }
}
```

## But what about my beautiful animations and transitions?

By utilising the above css rules, we just made something special into something boring, but our users never told us they didn’t want any movement at all, they just told us the preferred less movement. They simply might be using an old device with poor performance and battery life, or they might struggle from a [vestibular disorder](https://vestibular.org/understanding-vestibular-disorder/types-vestibular-disorders), epilepsy or migraine sensitivities. 

If you have ever enabled this setting on one of your devices, animations are not removed, but they change, because not all animations are problematic. You should really read [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) for details about problematic animations, but in short avoid:

1. large areas of motion
2. mismatching direction and speed (parallax effects and scrolljacking)
3. large perceived distance (like the animation on our site…)

In many cases, fading content into view using transitions is a good replacement for moving content, and is for instance widely used in iOS when reduce motion is active:

```
.hidden {
    transform: translateX(-100%);
    transition: transform 500ms;
}

@media (prefers-reduced-motion:reduce) {
    .hidden {
        opacity: 0;
        transition: opacity 500ms;
    }
}
``` 

Thats all for today, I love animations, and hope too see more of this in the future, just be mindful of those who really can’t handle our crazy inventions :)
