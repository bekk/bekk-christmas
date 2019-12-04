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
Yesterday we looked at how Suspense can be used to support code splitting and lazy loading of components. Today however, we are going to look to the future and see what suspense will become. We will learn more about Suspense for data fetching and what Suspense is really all about: Creating a great loading experience for your app! 

_Disclaimer: The stuff we are going to look at today is not yet out in stable mode and might change over time. Suspense for data fetching a year ago is not as it is today. A lot is happening in the React community and I for one is excited to see what it will become!_

# Suspense for data fetching

Suspense lets you delay the rendering of parts of the application tree until a condition is met. This condition can either be that an asset is loaded or, soon, that _data is fetched_. While waiting for the condition to be met, Suspense will render a fallback component instead. This might be a spinner, a loading animation or any other dumb component.

Suspense, as of React 16.6, is only waiting for lazy loaded components or code. The idea of Suspense in the future, is that it does not matter what it is, it can wait for anything – including data. This means that it could also be images or any other thing you fetch asynchronously.

## Faster loading time

When we create an application, we strive for fast loading times and a UI the users can interact with as soon as possible. We can accomplish this in apps today, but can we do even better? 

As we develop components in need of external data, we usually fetch on render. When the component renders it notice that it is lacking data, witch triggers an `componantDidMount()` or an effect. We then fetch the data and while we wait, we render a spinner. When we get the data, we render the component again. This render will trigger the child’s loading state and _we get a new spinner_. It creates a waterfall of data fetching.

With Suspense, we don’t wait for the data to come back. We start rendering as soon as the fetch request is sent. Let’s see how this might look:

```js
// Not a promise, but something that holds our data by Suspense spesifications
const resource = ChristmasGiftsData();

function ChristmasGifts() {
    return (
        <Suspense fallback={<h1>We are loading...🎅</h1>}>
            <WishLists/>
            <Suspense fallback={<h1>We are loading...🎅</h1>}>
                <GiftTable/>
            </Suspense>
        </Suspense>
    );
}

function WishList() {
    // Try to read whish info, although it might not have loaded yet
    const wishList =  resource.whishes.read();
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

The first thing we notice is the resource. I will not go into what this is so for all intents and purposes, let’s call it a cache. When read() is called it will return the data or, if the data does not exist, it will fetch the data.

React goes down the tree to render components. When React tries to render WishList, which is wrapped in a suspense component, WishList will suspend as the data is not yet fetched. React then skips WishList and try to render other components in the tree until there is nothing left to try. In our example, this means that the requests for WishList data and GiftTable data will go in parallel instead of a sequence as it would have done without Suspense. As our components are suspended React will find the closest suspense component above it in the tree and show the fallback as it waits for the data. 

## Percieved performance

Your application might load as fast as it possibly can, but if the users experience a bunch of intermediate loading states and UI parts jumping around on the page as more content appears, your application will seem slower than it is. This is perceived performance. 

As mentioned, with the waterfall method of data fetching we often see today, we can trigger multiple different loaders all over our page. When one spinner is replaced with actual content another one might be displayed. Our components to replace these spinners can also be shown to the users seemingly at random depending on the response time. The user might get content on the lower part of the page before the content on the top. If we haven’t allocated fixed spaces for this content to appear in, an element the user has started interacting with can suddenly move down the page. This is a perfect situation for Suspense to save the day!

If you use Suspense to handle your loading state while you fetch you can minimize the number of spinners. As a suspended component will look for the nearest Suspense above it in the tree for the fall back to render, you can place suspense farther up, wrapping multiple components that, in the user’s mind, fits together. The users will then hopefully see fewer loaders and a more holistic loading state.

### SuspenseList

Another way to control how your user perceive your loading state is by using SuspenseList. Let’s look at an example again:

```js
function ChristmasGifts({ resource }) {
  return (
    <>
      <Suspense fallback={<h1>We are loading...🎅</h1>}>
        <WishList resource={resource} />
      </Suspense>
      <Suspense fallback={<h1>We are loading...🎅</h1>}>
        <GiftTable resource={resource} />
      </Suspense>
    </>
  );
}
```

In this example, we have no control over the order these components are displayed to the user. It might be that WishList is displayed first or it can be GiftTable. One way of insuring that GiftTable is not displayed before WishList is to wrap them in the same suspense component. However, this means that you must wait for the data response of both WhisList and GiftTable to display them. What we do instead is to add SuspenseList.

```js
function ChristmasGifts({ resource }) {
  return (
    <SuspenseList 
      revealOrder="forwards"
      tail=”collapsed”
    >
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <WishList resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <GiftTable resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}
```

SuspenseList controls the order the closes suspense components appear in, independent of the order of the fetch responses. The property revealOrder either make the children appear in the same order as in the tree by setting the property to "forwards". It can also make all the children be displayed at once or in the opposite order as the children by setting the revealOrder to "together" og "backwards" respectively. 

With the tail property set to collapsed you can also tell suspense to only show one fallback component at the time instead of both in this example. 

## useTransition

As Caroline Odden mentions in the article about Concurrent Mode we can also wait a given time before we show anything to the user with `useTransition()`. This is especially helpful in a page transition where we want the loading state to be at seamlessly as possible. Read more about useTransitions in [Stop… Render Time!](https://react.christmas/2019/2)

## Developer experience

Suspense has the added perk of not only enabling us to make great user experiences, but also great developer experiences. 

The fact that we can remove the loading states from the component itself or having it be in a parent for that specific component gives us more readable code and less boiler plate. This also means that you can easily add more control over a component or less by adding a suspense parent or putting it further up the tree. It is so flexible and it gives developers more time to focus on how our users experiences our loading states.

## Not enough

Even though this was a long article, it was quite a superficial walkthrough of Suspense for data fetching. I recommend spending more time learning about Suspense. Why don’t watch [the keynote from React conf 2019](https://www.youtube.com/watch?v=uXEEL9mrkAQ&list=PLPxbbTqCLbGHPxZpw4xj_Wwg8-fdNxJRh&index=2) on your way to work or read the material posted by the React team.
