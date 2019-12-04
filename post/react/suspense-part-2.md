---
calendar: react
post_year: 2019
post_day: 5
title: Can you feel the Suspense?!
image: >-
  https://images.unsplash.com/photo-1566513875272-0e184c92b77c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80
ingress: >-
  Suspense is and will become a game changer when it comes to data fetching. It
  changes the way we structure our code, think about loading states and gives a
  better experience for both the developers and the users' interface.
links:
  - title: Suspense for data fetching
    url: 'https://reactjs.org/docs/concurrent-mode-suspense.html'
  - title: Building Great User Experiences with Concurrent Mode and Suspense
    url: >-
      https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html
authors:
  - Julie Hill Roa
---
Yesterday we learned about how Suspense can be used to support code splitting and lazy loading of components. Today however, we are going to look to the future and see what suspense will become. We will learn more about Suspense for data fetching and what Suspense is really all about: Creating a great loading experience for your app! 

_Disclaimer: The stuff we are going to look at today is not yet out in stable mode and might change over time. As Suspense for data fetching was a year ago is not as it is today. A lot is happening in the React community and I for one is excited to see what it will become!_

# Suspense for data fetching

Suspense lets you delay the rendering of parts of the application tree until a condition is met. This condition can either be that an asset is loaded or, soon, that _data is fetched_. While waiting for the condition to be met, Suspense will render a fallback component instead. This might be a spinner, a loading animation or any other dumb component.

Suspense, as of React 16.6, is only waiting for lazy loaded components or code. The idea of Suspense in the future, is that it does not matter what it is, it can wait for anything – including data. This means that it could also be images or any other thing you fetch asynchronously.

## Why do we need Suspense?

1. Faster loading time: (pågående)
2. Perceived performance -- more controll of what the users see in the loading state (suspenseList?)
3. Flexibility, and developer experience

When we create an application, we strive for fast loading times and a UI the users can interact with as soon as possible. We can often accomplish this in today apps, but can we do even better? 

As we develop components in need of external data, we usually fetch on render. When the component renders it notice that it is lacking data, witch triggers an `componantDidMount()` or an effect. We then fetch the data and while we wait, the component renders something else. When we get the data, we render the component again. If this component has a child also dependant on external the data, the same thing happens to this child. It creates a waterfall of data fetching.

With Suspense, we don’t wait for the data to come back. We start rendering as soon as the fetch request is sent. Let’s see how this might look:

```js
// Not a promise, but something that holds our data by Suspense spesifications
const resource = ChristmasGiftsData();

function ChristmasGifts() {
    return (
        <Suspense fallback={<h1>We are loading...</h1>}>
            <WishLists/>
            <Suspense fallback={<h1>We are loading...</h1>}>
                <GiftTable/>
            </Suspense>                 </Suspense>        );
}

function WishList() {
    // Try to read whish info, although it might not have loaded yet     const wishList =  resource.whishes.read();`
    return (
        <ol>
            {wishList.map(wish => <li>{wish}</li>)}
        </ol>
    )
}

function GiftTable() {
    // Try to read gift info, although they might not have loaded yet  
    const gifts = resource.gifts.read();
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Gift</th>
            </tr>
            <tr>
                {gifts.map(gift => (
                    <th>{gift.name}</th>
                    <th>{gift.item}</th>
                )}
            </tr>
        <table>
    );
};
```

The first thing we notice is the resource. I do will not go into what this is so for all intents and purposes, let’s call it a cache. When read is called it will return the value or, if the value does not exist, it will fetch the data. 

Suspense is wrapped around the // forklar – det faktumet at man fetcher så rendrer så får data kontra waterfall metoden som vi har I dag

What is great about suspense is that when we go down the component tree, we do not stop at the first component dependant on fetching data. Suspense makes it possible to move further down the tree to see if anything else is ready. This means that even though we stopped at WishList to fetch we will still try to render GiftsTable. As GiftTable is also in need of external data we get these to fetch calls in parallel instead for a sequence.
