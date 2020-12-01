---
calendar: react
post_year: 2020
post_day: 4
title: "[WIP] SWR"
authors:
  - Jon Johansen
---
SWR has quickly become one of my favorite tools in my toolbox. The name SWR refers to the caching strategy Stale while revalidate, and in its essence, the library provides just this, a caching strategy. The library is signed by Vercel, the creators of Next.js, and has excellent documentation.

SWR has interfaces to easily cache resources from your backend, regardless of which underlying data fetching library you're using. You provide the data fetching, SWR handles the caching. As one would expect from a caching library. However, SWR delivers a much more useful set of tools to manage the whole process of using remote resources.

## Data, loading and error
Fetching data through the SWR is simple. The `useSWR` hook is your swiss army knife.

```js
const { data, error } = useSWR(URL, fetcher);
``` 
The first argument is the cache *key*, and the second argument is the *fetcher function* used to fetch data. Noteworthy here is that the fetcher function parameters must match the cache key argument.

The data object is either `undefined` (which happens when initially loading) or data from the cache. Error is `undefined` unless the fetcher function has thrown an exception or rejected the promise.

## But where is the cache and the strategy?
The caching strategy *stale while revalidating* essentially means that the data will be stored in the cache with the *key* as the identifier. As mentioned, the data will be `undefined` the first time the `useSWR` hook is used until it is loaded.

If the same key is used again, the *stale* data will be returned immediately, while the internals of SWR *revalidates* the data in the background. Once revalidation is done and the cache is refreshed, the new data will be reflected in the data object. This way, you can provide stale data _while_ loading new data. 

```js
const { data, error, isValidating } = useSWR(URL, fetcher);
``` 
The `useSWR` hook exposes the revalidation status through the hook, which can be used to show some loading state.

## Deduplication
One of my favorite features of the library SWR is the deduplication feature. Deduplication is a long word, which essentially means SWR will prevent multiple uses of the `useSWR` hook with the same key to revalidate the same resource within a configured interval. Instead, a single request will be sent, and the result returned to each of the requestèes.

This will allow you to use the same SWR hook across multiple components without any thought to data-flow. Where previously the resource would have been fetched in a parent component and passed down to the child components, you can now simply ask for the resource, and the resource will be made available. 

Deduplication is, of course, configurable, and you can decide how long the interval should be.
