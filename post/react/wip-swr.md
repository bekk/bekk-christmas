---
calendar: react
post_year: 2020
post_day: 4
title: "[WIP] SWR"
image: https://images.unsplash.com/photo-1488301573961-2c3f346509d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80
ingress: "Every now and then, a library surfaces that change the way you're used
  to thinking. In this case, it is rethinking the data flow in your React app.
  SWR provides a complex data store with a simple interface, helping you write
  simple patterns and less code.  "
links: []
authors:
  - Jon Johansen
---
[SWR](https://swr.vercel.app/) has quickly become one of my favorite tools in my toolbox. The name SWR refers to the caching strategy *stale-while-revalidate*, and in its essence, the library provides just this, a caching strategy. The library is made by [Vercel](https://vercel.com/), the creators of [Next.js](https://nextjs.org/), and has excellent documentation.

SWR has interfaces to easily cache resources from your backend, regardless of which underlying data fetching library you're using. You provide the data fetching, SWR handles the caching, and stores it for you. As one would expect from a caching library. However, SWR delivers a much more useful set of tools to manage the whole process of using remote resources.

## ✨ Getting the data
Fetching data through the SWR is simple. The `useSWR` hook is your Swiss army knife.

```js
const { data, error } = useSWR(URL, fetcher);
``` 
The first argument is the cache *key*, and the second argument is the *fetcher function* used to fetch data. Noteworthy here is that the fetcher function parameters must match the cache key argument.

The `data object is either `undefined` (which happens when initially loading) or data from the cache. `error is `undefined` Unless the fetcher function has thrown an exception or rejected the promise.

A typical fetcher function can look along the lines of this:
```js
const fetcher = (url) => fetch(url).then((res) => res.json());
```

## 🤔 ...where is the *cache* and the *strategy*?
The caching strategy *stale while revalidating* essentially means that the data will be stored in the cache with the *key* as the identifier. As mentioned, the data will be `undefined` the first time the `useSWR` hook is used until it is loaded.

If the same key is used again, the *stale* data will be returned immediately, while the internals of SWR *revalidates* the data in the background. Once revalidation is done and the cache is refreshed, the new data will be reflected in the data object. This way, you can provide stale data _while_ loading new data. 

```js
const { data, error, isValidating } = useSWR(URL, fetcher);
``` 
The `useSWR` hook exposes the revalidation status through the hook, which can be used to show some loading state.

## ☢️ Mutation
Cool, you've got a great way of fetching and caching data. But now, you might want to change some of that data. Perhaps you've sent an update request to the backend resource but don't want the UI to feel slow by waiting for another update of the data from that backend. 

A mutate function is available through the library, and it gives us a few really convenient pieces of functionality. The mutate function signature looks like this:
```js
mutate(key, data?, shouldRevalidate?)
```
The `key` is the cache key, `data` is the changed data object, and `shouldRevalidate` is whether or not to trigger revalidation of the data against the resource after mutating the data.

For an even tidier usage, you can pull out the Swiss army knife again, as the mutate function with a pre-set `key` is given through the `useSWR` hook; all you've got to do is ask!
```js
const { data, error, isValidating, mutate } = useSWR(URL, fetcher);
``` 

Combining these to achieve the initial goal of a fast change while updating a resource, your function would look like this:

```js
const changeUsername = (username) => {
  // Mutate local data
  mutate('/api/user', { ...data, username}, false)
  // Update resource
  await updateUserName(username)
  // Optional: Trigger revalidation to ensure we have correct data
  mutate()
}
```
You may notice that we prevent revalidation in the first mutation. This is because a revalidation would load the data back to its initial state, as the update request might not have gone through yet.

### But what about the other places using the same data?
Mutating the cache will cause the data in all the places using the same cache to be updated automatically! 

## ⛔️ Deduplication
One of my favorite features of the library SWR is the deduplication feature. Deduplication is a long word, which essentially means SWR will prevent multiple uses of the `useSWR` hook with the same key to revalidate the same resource within a configured interval. In simple words: Preventing the same request from being sent multiple times in a short period of time. Instead, a single request will be sent, and the result returned to each of the requestees. 

This will allow you to use the same SWR hook across multiple components without any thought to data-flow. Where previously the resource would have been fetched in a parent component and passed down to the child components, you can now simply ask for the resource, and the resource will be made available. 

Deduplication is, of course, configurable, and you can decide how long the interval should be.

## ♻️ Automatic retries
By default, SWR provides automatic retry of a failed fetches. By default, this comes with a smart backoff mechanism to avoid retrying too often. You can also roll your own retry functions, which is a great place to insert logging or error tracking integrations, or any other custom behavior. 🤷🏻‍♂️ 

## 🏝 Staying fresh is a breeze
Sometimes, we need our data to be up to date, and you've probably already guessed that SWR provides some cool ways of doing this. In fact, there are multiple strategies for keeping your screen filled with the latest and greatest of data. 
- There's revalidation upon **browser-tab focus**, which is pretty self-explanatory. This gives you new data when you actually want it. 
- There's a revalidate upon **reconnection**, which gives clients with unstable and slow connections a break. 
- The more classic: revalidation of data upon set **intervals**. This one is smart, and won't revalidate data that are not rendered on screen, and won't try to revalidate unfocused tabs or when the internet is disconnected *(unless you tell it to)*.

# 🔧 Keeping track of the configurations
As you might have understood by now, the `useSWR` hook comes with a lot of possible configurations. If you want to configure these globally for your react app, you can do so just that by wrapping a part of your app with the `SWRConfig` like so:
```jsx
<SWRConfig value={config}>
  <App/>
</SWRConfig>
```

**Another tip** is to abstract some of the most used caches into custom hooks for easier reuse. If you have a specific configuration for a cache and plan to reuse it, I really recommended doing so.

# 🏎 Ready to take it out for a spin?
The best way of getting to know SWR is to head over to the documentation and get started yourself. There are great examples and a long list of features to get to know. One of the latest exciting features is integration with the new [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html) API from React, which connects component loading with data fetching.

That's it for me, happy holidays! 🎅🎄⛄️