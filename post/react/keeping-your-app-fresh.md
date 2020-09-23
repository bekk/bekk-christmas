---
calendar: react
post_year: 2020
post_day: 12
title: Keeping your app fresh
image: https://images.unsplash.com/photo-1511022890239-e52f7d3bec4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >
  Do you receive "could not load chunk n" errors when redeploying your app to
  Netlify etc? Well I have a great tip for you!
description: Learn how to refresh your app whenever you click a link with React Router
links:
  - title: React Router docs
    url: https://reactrouter.com/
authors:
  - Kristofer Giltvedt Selbekk
---
Today's users tend to keep your web site open for ages. No, not because they love using it all the time, but because they opened it in a tab - most likely on their phone - and now it's there forever.

I log all errors in my web apps to [Sentry](https://sentry.io/welcome/), and every time I deploy a new version, I see a ton of these buggers cluttering my logs:

```
ChunkLoadError: Loading chunk 14 failed.
(missing: https://www.some-web.app/static/js/14.2df2391b.chunk.js)
  at None (/oversikt:1:3732)
  at None (/bundles/0f61fb778be65ca983e6e18120fad3b0bfd49226.js:1:533023)
  at N (/bundles/0f61fb778be65ca983e6e18120fad3b0bfd49226.js:1:290176)
  at Pu (/bundles/0f61fb778be65ca983e6e18120fad3b0bfd49226.js:1:404668)
  at Cs (/bundles/0f61fb778be65ca983e6e18120fad3b0bfd49226.js:1:396050)
...
(9 additional frame(s) were not displayed)
```

## The what and why

First - let me explain what a chunk is, and why this happens. 

A chunk is - well - a chunk of JavaScript. They are created whenever you [code-split](https://react.christmas/2019/4/) your application. I typically end up splitting my app up per route, so I get a single chunk per page in my app. Whenever the user navigates to that particular page, the relevant chunk is requested from the server. 

I deploy most of my web apps to [Netlify](https://www.netlify.com/) (like this one), and whenever I deploy a new version, they wipe the old files and upload the new ones (well, they create a new deployment without any of the stuff from the previous deploy). So whenever the user continues using my site after a deployment (often days later), and goes to visit a new route, it can't find the requested chunk!

## The fix

Now, there are several ways to mitigate this problem. You could deploy to an Amazon S3 bucket instead, and keep all old built files forever), you could pre-load all of the resources whenever a user visits the landing page, or you could use a CDN for hosting your stuff, which will cache your files.

I didn't want to do either of those though, because I'm lazy. So I found a great workaround - already built into React Router! 🤯

The `BrowserRouter` component accepts a `forceRefresh` prop, which will turn all of those client-side links into regular ol' `<a />` tags. This will make the app receive a new version of your web app from the server, alleviating all potential issues with stale JavaScript and missing chunks. In addition, the user gets your newly deployed version sooner than they would have otherwise. 

So let's say you want to force your app to be updated at least once every 6 hours. How would you implement something like that? Turns out - it's pretty simple!

First, we create a new wrapper component for the `BrowserRouter` component - we'll call it `AutoRefreshingRouter`:

```tsx
import { BrowserRouter } from 'react-router-dom';

export const AutoRefreshingRouter = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
}
```

Next, we create a state variable `shouldRefresh` and pass it to the `BrowserRouter`'s `forceRefresh` prop.

```tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const AutoRefreshingRouter = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  return (
    <BrowserRouter forceRefresh={shouldRefresh}>
      {children}
    </BrowserRouter>
  );
}
```

Finally, let's change that flag after an hour with a call to React's `useEffect` and a timeout!

```tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const AutoRefreshingRouter = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(
      () => setShouldRefresh(true), 
      1000 * 60 * 60 * 6 // 6 hours in milliseconds
    );
    return () => clearTimeout(id);
  }, []);

  return (
    <BrowserRouter forceRefresh={shouldRefresh}>
      {children}
    </BrowserRouter>
  );
}
```

Here, we ask the browser to wait 6 hours, and then set the `shouldRefresh` flag to true. We make sure to clear the timeout in the clean-up return value function if we ever re-mount the component.

And that's it! Since I deployed this fix, I haven't seen a single bug in production. My users are happier, and I don't get a bad feeling whenever I see Sentry telling me I screwed up.

Hope this helps you in your project as well. Thanks for reading!
