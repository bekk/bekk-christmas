---
calendar: react
post_year: 2019
post_day: 8
title: Optimize Your App by Being Lazy
image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55'
ingress: 'What is lazy loading, and why should you do it?'
links:
  - title: Can you feel the Suspense?!
    url: 'https://react.christmas/2019/5'
  - title: Code-splitting
    url: 'https://reactjs.org/docs/code-splitting.html'
authors:
  - Sissel Fladby
---
Or, to put it more accusingly: Why are you making your users wait for your entire app to be loaded, when they are only going to use a tiny portion of it?

**Fact #1:** Aspects of a website cater to different needs in different situations. One single user probably does not need your entire site to be loaded at once.

**Fact #2:** Smaller JavaScript bundles load quicker than large ones. 

**Conclusion:** We should not load more JavaScript than needed at a given time.

Lazy loading is a technique to help you achieve that in your website.
 Cool, huh? So how do we do this?

## How to do it

Let us look at a small example website. We have two tabs on our site: “Home” and “Contact us”. Originally, we have a simple router that does the job for us:

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Home';
import ContactUs from './pages/ContactUs';

const App = () => {
  return (
    <div id="app">
      <Router>
        <Switch>
            <Route path='/contact' component={ContactUs}/>
            <Route path='/' component={Homepage}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
```

When the user enters our website, the JavaScript bundle(s) containing both the ContactUs and Homepage components are loaded at once. When the users goes to a new route, no additional JavaScript is loaded.

However, introducing React.lazy and Suspence, we can choose to only load the relevant JavaScript. The changes are simple:

```
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Homepage = React.lazy(() => import('./pages/Home'));
const BusinessCase = React.lazy(() => import('./pages/BusinessCase'));

const App = () => {
  return (
    <div id="app">
      <Router>
        <Suspense fallback={"...loading"}>
          <Switch>
              <Route path='/business' component={BusinessCase}/>
              <Route path='/' component={Homepage}/>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
```

If we import our components using React.lazy, and then wrap them in a Suspense tag, the components wrapped will only be loaded when needed. In our case, when the user switches their route.

## What is the effect?

On very small projects, the benefits of doing lazy loading are negligible, if any. To test lazy loading in a genuine setting, I tried implementing the same type of logic in a much larger project that I have worked on, where there are many more routes with more content.
 

Before we start code splitting, let us look at our original JavaScript chunks on a single page load.


![JavaScript chunks before introducing lazy loading](https://i.ibb.co/6Ddy71v/Screenshot-from-2019-12-03-21-03-02.png)

In this app, I did the exact same thing as in the example above - wrapped the Router in a Suspense-tag and lazy loaded the components for each route. The project in question uses Create React App and a new version of React, so I did not need to do any extra configuration to get it working. 

After introducing lazy loading we get the following chunks on a single page load.

![JavaScript chunks after introducing lazy loading](https://i.ibb.co/9VypzJS/Screenshot-from-2019-12-03-21-03-34.png)

When loading this application after the introduction of lazy loading, the first thing to note was the JavaScript chunks. As expected, the number of chunks had increased, and the size of each chunk is reduced.

But more importantly: The DOMContentLoaded-metric was on average reduced with about **200ms** with a regular internett speed, and upon throttling the network in Chrome DevTools with a Fast 3G connection the average difference was **4 seconds**. That is a huge gain with very little effort. It should be mentioned that this test was done in a very informal setting, but the difference is still significant.

## When to use and when not to use

Of course, lazy loading also works wonders with components that aren't the target of a Route. A menu hidden behind a dropdown-menu would be a great candidate for lazy loading. The same holds for any component that is hidden until the user performs a certain action.

Not all components are eligible for lazy loading, though. There is a slight amount of overhead on it, so components that would be loaded anyway for all users, or almost all users, should be loaded straight away. The perceived loading time for the user might end up being longer if not!

In addition, it does not look good, and is not a good user experience if many components load and pop up at an unsynchronized pace. Therefore, make sure you think through which components should be lazy loaded, and which should not. 

Still, there are many cases where lazy loading is an obvious benefit that will help optimizing and improve user experience. It is easy, simple, and will help out with performance.
