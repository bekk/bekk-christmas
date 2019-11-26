---
calendar: react
post_year: 2019
post_day: 2
title: 'Once rendering, (not) always rendering'
image: 'https://unsplash.com/photos/AMQEB4-uG9k'
ingress: >-
  The promise of Concurrent Mode was made at a conference in 2018. This new
  features for React will help rendering issues, allowing to "pause" the render
  when the need to do more important tasks occur. Let's take a closer look!
links:
  - title: Introducing Concurrent Mode (Experimental)
    url: 'https://reactjs.org/docs/concurrent-mode-intro.html'
  - title: Building Great User Experiences with Concurrent Mode and Suspense
    url: >-
      https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html
authors:
  - Caroline Odden
---
In most React applications today there are some problems with rendering. If you have triggered some sort of fetching of data or other time consuming task, and you want to go on with your life, that's not always easy. If all the performance on your device is busy rendering a exceptional big list, it will not be able to give feedback for other (simple) events before it is done. Imagine you have that one friend that only talks and talks, and you never get possibility to say anything. Thats rendering, it blocks.

# The User Experience

The "once rendering, always rendering" problem is hard to avoid, because even though your application has nice performance measures, the device the user has may not be strong enough to handle it regardless. Factors as network speed and device capabilities may cause your application to stutter, even with throttling and debouncing.

There are some events that you want to happen immediately, for instance hovering over some elements or typing into an input field. If all your performance is busy rendering the list, the hoved effect is not visible before it is done with he previous task. When React begins to render, you can't stop it until it is done. That's why the Concurrent Mode is here to save the date.

# Interruptible Rendering
