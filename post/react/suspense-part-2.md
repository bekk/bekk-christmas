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

## Faster loading time

When we create an application, we strive for fast loading times and a UI the users can interact with as soon as possible. We can often accomplish this in today apps, but can we do even better? 

As we develop components in need of external data, we usually fetch on render. When the component renders it notice that it is lacking data, witch triggers an `componantDidMount()` or an effect. We then fetch the data and while we wait, we render a spinner. When we get the data, we render the component again. This again will trigger the child’s loading state and _we get a new spinner_. It creates a waterfall of data fetching.

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
    const wishList =  resource.whishes.read();`
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

React goes down the component tree. When React tries to render WishList, which is wrapped in a suspense component, WishList will suspend as the data is not yet fetched. React then skips WishList and try to render other components in the tree until there is nothing left to try. In our example, this means that the request for WishList data and the request for GiftTable data will go in parallel instead for a sequence. As our components are suspended React will find the closest suspense component above it in the tree and show the fallback component as it waits for the data. 

## Percieved performance

Your application can load as fast as it wants, but if the users experience many intermediate loading states and UI parts jumping around on the page as more components are rendered your application will seem slower than it is. This is perceived performance. 

As mentioned, with the waterfall method of data fetching we often see today, we can trigger multiple different loaders all over our page. When one spinner is replaced with actual content another one might be displayed. Our content to replace these spinners can also be shown to the user seemingly at random depending on the long the request takes to respond. The user might get content on the lower part of the page before the content on the top, and if we haven’t allocated fixed spaces for this content to show, an element the user has started to interact with can suddenly move further down the page. This is a perfect situation for Suspense to save the day!

If you use Suspense to handle your loading state while you fetch you can minimize the number of spinners. As a suspended component renders the fallback component of the nearest Suspense component, and suspense does not have to be an immediate parent, you can place suspense further up in the tree, wrapping multiple components that in the user’s mind fits together. The users will then hopefully see fewer loaders and a more holistic loading state.

### SuspenseList
Another way to control how your user perceive your loading state is by using SuspenseList.Let’s look at an example again:
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
In this example, we have no control over the order these components is displayed to the user. It might be that WishList is displayed first or it can be GiftTable. One way of insuring that GiftTable is not displayed before WishList is to wrap them in the same suspense component. However, this means that you must wait for both the request for WishList and GiftTable to display them. What we do instead is to add SuspenseList.
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
SuspenseList controls the order the closes suspense components appear in, independent of the order of the fetch responses. The property revealOrder either make the children appear in the same order as the children by setting the property to forward. It can also make all the children be displayed at once or in the opposite order as the children by setting the revealOrder  to backwards. 

With the tail property set to collapsed you can also tell suspense to only show one fallback component at the time instead of both in this example. 

## Flexibility and developer experience

felxibilty: break up and destructure the code, loadingstates are not in the component, you can easily add or remove a suspense componant.
