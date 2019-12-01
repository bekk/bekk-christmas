---
calendar: react
post_year: 2019
post_day: 2
title: 'Once rendering, (not) always rendering'
image: >-
  https://images.unsplash.com/photo-1443632826930-7e5bc4aa7fa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  The promise of Concurrent Mode was made at a conference in 2018. The React
  team claim that this famous new feature would help with the issues with
  rendering, allowing to _pause_ the render when the need to do more important
  tasks should occur. Let's take a closer look!
links:
  - title: Introducing Concurrent Mode (Experimental)
    url: 'https://reactjs.org/docs/concurrent-mode-intro.html'
  - title: Building Great User Experiences with Concurrent Mode and Suspense
    url: >-
      https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html
authors:
  - Caroline Odden
---
The concept of Concurrent Mode is not a new revolutionary feature, but for React it creates some nice new opportunities. In most React applications today there are some problems with rendering. If you have triggered some sort of list update or other time consuming task, and you want to go on with your life, that's not always that easy. If your device is busy rendering an exceptional big list, it will not be able to give feedback for other events before it is done. To give it an analogy, imagine you have that one friend that only talks and talks, and you never get possibility to say anything. That's rendering and it blocks even though you have new input!

# The Concept of Concurrent Mode

As I mention in the introduction, the concept of Concurrent Mode is not a _new method_. Think of processors as an example, they got a scheduler which prioritises the most important taks when a resource is available. The same is it for the JavaScript compiler, but instead of a processor, it has **one** thread for user interaction (the UI thread) it has to use wisely. If this thread "freezes" due to work overload, it can't react (pun intended) to new events until it is done. Concurrent Mode want to prevent this by creating several `mini-threads` within the UI main thread, and with its own scheduler it can maintain the responsiveness. 

# The User Experience

The _once rendering, always rendering_ problem is sometimes hard to avoid, because even though your application has nice performance, the device the user has may not be strong enough to handle it. Factors as network speed and device capabilities may cause your application to stutter, even though you have done a nice job with throttling and debouncing.

There are some events that you want to happen immediately, for instance hovering over elements or typing into an input field. If your device is busy rendering the list,  the hover effect is not visible before it is done with the previous task. And the scroll may freeze(!#$%&). When React begins to render, you can't stop it until it is done.  Concurrent Mode will focus on human interactions; simple tasks like hover and scroll should happen instantly, while navigation to new sites and click-events is more acceptable to be more time consuming (they claim research has shown).

## Interruptible Rendering

With Concurrent Mode, the rendering can be interrupted. If the user do trigger another event that is more important, it will pause the rendering and do the desired task, before returning to the origin task to finish the job. The degree of what is important is determined by heuristics, to know how high-priority the update is. It will (hopefully) make your application more responsive!

I don't think you should rely on the fact that Concurrent Mode will solve all you performance issues. However, I think it will be a nice helper in the heavy list-rendering React-applications out there.

## Intentional Loading Sequences

It is a common action when you navigate to a new site on your website, and you simultaneously want to fetch data. But it is a little annoying being redirected to a new page with no content or it is just showing some kind of a loading indicator. So what if React could make you stay on the previous page just a little bit longer so you can skip the _bad_ loading state? By doing this you cover the fact that you don't have all the data you need to show right now, and it doesn't feel like an eternity for the user. When the user has triggered an action which leads to a site transition, React can start creating the new page (in memory) and wait before updating DOM until it is ready. And most importantly; the "old" site is still interactive. This feature is not impossible to create today, but with Concurrent Mode it is already built-in. 

To be able to create the intentional loading sequences, React offers the new `useTransition` hook:

```
const CONFIG = { timeoutMs: 2000 };

const [startTransition, isPending] = useTransition(CONFIG);
```

The `startTransition` value is a function, which could be used on the state we want to intentionally load. `isPending` tells us if the transition is going on! If you put your data fetching inside the startTransition function, it will wait the amount of time you passed as config. This will tell React how long you are willing to wait before showing some output to the user.

Let's take a look at an example where we use the startTransition as a onClick event for a button that should get some asynchronous data when it's pressed:

```
<button
  disabled={ isPending }
  onClick={ () => {
    startTransition(() => {
      fetchHelloWorld('Hello World');
    })
  } }
>
```

# How to Enable it

Concurrent Mode has been released as an opt-in. Our god of bloggs (Kent C. Dodds) has written a post on how to [enable it](https://kentcdodds.com/blog/how-to-enable-react-concurrent-mode). To get the version with Concurrent Mode, you need to install this experimental version of React:

```
npm install react@experimental react-dom@experimental
```

Further on, to enable it you simple need to make som changes in your entry file, and use the `createRoot` from ReactDOM:

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// Before Concurrent Mode:
const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)

// With Concurrent Mode:
const root = ReactDOM.createRoot(rootEl)
root.render(<App />)
```

In addition to be able to use Concurrent Mode, they strongly advise to use `Strict Mode`, which luckily was written about in [yesterday's article](https://react.christmas/2019/1)!

# What Now?

The date for stable release of Concurrent Mode has not yet been announced (as far I know), but keep calm and keep an eye one the [releases](https://github.com/facebook/react/releases) for React. Meanwhile, you can enjoy the experimental version (but perhaps not use it in production just yet!).

One feature that occur hand in hand with Concurrent Mode, which I have not written about, is Suspense, but it will come in a later article!
