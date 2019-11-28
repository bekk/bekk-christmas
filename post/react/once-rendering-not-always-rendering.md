---
calendar: react
post_year: 2019
post_day: 2
title: 'Once rendering, (not) always rendering'
image: >-
  https://images.unsplash.com/photo-1443632826930-7e5bc4aa7fa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  The promise of Concurrent Mode was made at a conference in 2018. They claim
  that this famous new feature for React would help rendering issues, allowing
  to _pause_ the render when the need to do more important tasks should occur.
  Let's take a closer look!
links:
  - title: Introducing Concurrent Mode (Experimental)
    url: 'https://reactjs.org/docs/concurrent-mode-intro.html'
  - title: Building Great User Experiences with Concurrent Mode and Suspense
    url: >-
      https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html
authors:
  - Caroline Odden
---
The concept of Concurrent Mode is not a new revolutionary feature, but for React it creates some nice new opportunities. In most React applications today there are some problems with rendering. If you have triggered some sort of list update or other time consuming task, and you want to go on with your life, that's not always that easy. If all the performance on your device is busy rendering an exceptional big list, it will not be able to give feedback for other events before it is done. To give it an analogy, imagine you have that one friend that only talks and talks, and you never get possibility to say anything. That's rendering and it blocks even though you have new input!

# The User Experience

The _once rendering, always rendering_ problem is sometimes hard to avoid, because even though your application has nice performance the device the user has may not be strong enough to handle it. Factors as network speed and device capabilities may cause your application to stutter, even though you have done a nice job with throttling and debouncing.

There are some events that you want to happen immediately, for instance hovering over some elements or typing into an input field. If your device is busy rendering the list, the hover effect is not visible before it is done with he previous task. When React begins to render, you can't stop it until it is done. That's why the Concurrent Mode (they say) will come to save the day. The new feature will focus on human interactions; simple input like hover and simple tasks should happen instantly, while navigation to new sites and click-events is more acceptable to be more time consuming.

# Interruptible Rendering

With Concurrent Mode, the rendering can be interrupted. If the user do trigger another event that is more important, it will pause the rendering and do the desired task, before returning to the origin task to finish the job. The degree of what is important is determined by a heuristics, to know how high-priority the update is. It will (hopefully) make your application more responsive!

I don't think you should rely on the fact that Concurrent Mode will solve all you performance issues. However, I think it will be a nice helper in the heavy list-rendering React-applications out there.

If you are curious about this new feature and you want to try it, our God of Bloggs have written a nice post about it. You guessed right, Kent C. Dodds wrote about [how to enable Concurrent Mode](https://kentcdodds.com/blog/how-to-enable-react-concurrent-mode).

# When will it come?!

Fun-fact, the new Facebook website which is in development uses Concurrent Mode! This is to verify and test that Concurrent Mode is really needed and is stable enough to release.
