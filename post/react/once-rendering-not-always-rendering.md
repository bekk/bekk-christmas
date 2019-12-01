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

# The Concept of Concurrent Mode

As I mention in the introduction of this article, the concept of Concurrent Mode is not a _new feature_. Think of processors as an example, they got a scheduler prioritising the most important taks when some resources is available. The same is it for React, but instead of a processor, React has one thread it has to use wisely.

# The User Experience

The _once rendering, always rendering_ problem is sometimes hard to avoid, because even though your application has nice performance the device the user has may not be strong enough to handle it. Factors as network speed and device capabilities may cause your application to stutter, even though you have done a nice job with throttling and debouncing.

There are some events that you want to happen immediately, for instance hovering over some elements or typing into an input field. If your device is busy rendering the list, the hover effect is not visible before it is done with he previous task. When React begins to render, you can't stop it until it is done. That's why the Concurrent Mode (they say) will come to save the day. The new feature will focus on human interactions; simple input like hover and simple tasks should happen instantly, while navigation to new sites and click-events is more acceptable to be more time consuming.

## Interruptible Rendering

With Concurrent Mode, the rendering can be interrupted. If the user do trigger another event that is more important, it will pause the rendering and do the desired task, before returning to the origin task to finish the job. The degree of what is important is determined by a heuristics, to know how high-priority the update is. It will (hopefully) make your application more responsive!

I don't think you should rely on the fact that Concurrent Mode will solve all you performance issues. However, I think it will be a nice helper in the heavy list-rendering React-applications out there.

## Intentional Loading Sequences

It is a common action when you navigate to a new site on your website, and simultaneously fetch data. But it is a little annoying being redirected to a new page which with no content or just show some kind of a loading indicator. So what if React could make you stay on the previous page just a little bit longer so you can skip the _bad_ loading state? By doing this you cover the fact that you have to gather some data to show, and it doesn't feel like an eternity for the user. When the user has triggered an action which leads to a site transition, React can start creating the new page (in memory) and wait before updating DOM. And most importantly; the "old" site is still interactive. This feature is not impossible to create to day, but with Concurrent Mode it is built in. 

# How to Enable It

Concurrent Mode has been release as an opt-in in React version 16.8. Our god of bloggs (Kent C. Dodds) has written a post on how to [enable it](https://kentcdodds.com/blog/how-to-enable-react-concurrent-mode).

To get the experimental version, you need to install the experimental version of React:

```
npm install react@experimental react-dom@experimental
```

Further on, to enable it you simple need to make som changes in your entry file, and use the \`createRoot\` from ReactDOM:

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// Before Concurrent Mode:
const rootEl = document.getElementById('root')ReactDOM.render(<App />, rootEl)

// With Concurrent Mode:
const root = ReactDOM.createRoot(rootEl)
root.render(<App />)
```

In addition to be able to use Concurrent Mode, the strongly advise to use \`Strict Mode\`, which luckily was written about in the [article from yesterday](https://react.christmas/2019/1)!

# What Now?

One common feature that occur hand in hand with Concurrent Mode but I have not written about is Suspense, but this will come in another article!

The stable release of Concurrent Mode has not yet been announced (as I know), but keep calm and keep an eye one the releases. Meanwhile, you can enjoy the experimental version, and perhaps not use it in production.
