---
calendar: react
post_year: 2019
post_day: 2
title: 'Once rendering, (not) always rendering'
image: >-
  https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80
ingress: >-
  The promise of Concurrent Mode was made at a conference in 2018. This new
  features for React will help rendering issues, allowing to _pause_ the render
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
In most React applications today there are some problems with rendering. If you have triggered some sort of fetching of data or other time consuming task, and you want to go on with your life, that's not always easy. If all the performance on your device is busy rendering ab exceptional big list, it will not be able to give feedback for other (simple) events before it is done. Imagine you have that one friend that only talks and talks, and you never get possibility to say anything. Thats rendering, it blocks.

# The User Experience

The _once rendering, always rendering_ problem is sometimes hard to avoid, because even though your application has nice performance measures the device the user has may not be strong enough to handle it. Factors as network speed and device capabilities may cause your application to stutter, even with throttling and debouncing.

There are some events that you want to happen immediately, for instance hovering over some elements or typing into an input field. If all your performance is busy rendering the list, the hoved effect is not visible before it is done with he previous task. When React begins to render, you can't stop it until it is done. That's why the Concurrent Mode is here to save the date.

# Interruptible Rendering

With Concurrent Mode, the rendering can be interrupted. If the user do trigger another event that is more important, it will pause the rendering and do the desired task, before returning to the origin task. The degree of what is important is determined by a heuristics, to know how high-priority the update is. It will (hopefully) make your application more responsive!

I don't think you should rely on the fact that Concurrent Mode will solve all you performance issues. However, I think it will be a nice helper in the heavy list-rendering React applications out there.

If you are curious about this new feature and you want to try it, our God of Bloggs have written a nice post about it. You guessed right, Kent C. Dodds wrote about \[how to enable Concurrent Mode](<https://kentcdodds.com/blog/how-to-enable-react-concurrent-mode>)
