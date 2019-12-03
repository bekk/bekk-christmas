---
calendar: react
post_year: 2019
post_day: 4
title: 'Oh, the Suspense!'
image: >-
  https://images.unsplash.com/photo-1492681950396-e1052bfa206e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2240&q=80
ingress: >-
  [The American
  dictionary](https://dictionary.cambridge.org/dictionary/english/suspense)
  states that _suspense_ means a feeling of excitement while waiting for
  something uncertain to happen. So, let’s get excited and learn about
  React.Suspense and how this helps us wait for something uncertain!
links:
  - title: Suspense for code splitting
    url: 'https://reactjs.org/docs/code-splitting.html'
authors:
  - Julie Hill Roa
---

React.Suspense is a component that let you suspend, or delay, the component rendering if the components, or soon data, are imported from outside your code. Later this December we may or may not, learn about Suspense for data fetching, but right now we are diving into how React.Suspense is used today with code splitting.  
  
## Code splitting

Code splitting is exactly as it sounds: splitting up your code.  This might be on a route-level, meaning that each sub route in your application is its own part or _chunk_. This is a good place to begin, as it will make your split parts more even. The user experience will also be intact as users are already used to a page transition with a new render. 

You can also split up your code at a component-level. You can try to identify smaller parts of the application which is rarely used or shown to the user. 

<img class="wide-image" src="/assets/codesplitting.png" alt="code splitting illustration, inspiration by https://www.cronj.com"/>

## Optimize all the codes

As your application gets bigger, with code and features, your loading time will increase as well. Especially if you include multiple third-party libraries. The user today, is expecting fast applications with minimum loading time. Some even say that 53% of mobile users abandons sites that loads longer than 3 seconds. This is where code splitting comes to into play. 

When you have divided your application code into chunks, you can reduce the initial loading time of your application dramatically by only loading the chunk necessary for the initial render. When the user navigates in your application the rest of the chunks can be loaded as needed. 

## Code splitting with Suspense

Code splitting is a feature supported by your bundler, like Webpack or Parcel. However, your _code_ facilitates the actual import and use of these chunks. In React 16.6, Suspense for code splitting was released, and it makes the code splitting really easy. 

Suspense handles the loading state and lets you delay the rendering of parts of the application tree. While the chunks are loading suspense shows a fallback component until the chunk is ready to render. This means that you do not have to have a local state checking if a component is loading or not and you do not have to clutter your render function with an if-statement checking this state. Suspense deals with all of this for you!

The actual import of these chunks is done by React.Lazy and dynamic imports. Let’s take a closer look how this is done:

```js
const ChristmasAlbum = React.lazy(() => import('./ChristmasAlbum'))
const OtherChristmasAlbum = React.lazy(() => import('./OtherChristmasAlbum'))


<Suspense fallback={<h1>We are loading...🎅</h1>}>
  <ChristmasAlbum />
  <OtherChristmasAlbum />
</Suspense>
```

The example shows a chunk named `ChristmasAlbum` and a chunk named `OtherChristmasAlbum`.  Instead of a regular import statement we use React.lazy. React.lazy takes a function, that must call a dynamic import, as an argument. This returns a Promise which resolves to a module exporting a React component.

Because `ChristmasAlbum` and `OtherChristmasAlbum` is dynamically imported, we wrap the components in Suspense. Suspense will try to render `ChristmasAlbum` and, of course `OtherChristmasAlbum`. If the chunks is not loaded completely, the Suspense component will render the fallback component until it can render the two child components successfully.

## But, what if it fails?!

As earlier stated, Suspense only handles the loading state as you try to dynamically import a component, not errors that may occur. It is also a known fact that anything that can go wrong, will go wrong... at some point. Therefore, we need a way to handle the errors that may come as we are trying render our chunks. We also want the error handling in the same declarative way, we are used to in React. _In comes error boundaries._

Error boundaries are components with special lifecycle functions like `getDerivedStateFromError()` or `componentDidCatch()`. These functions are there to catch errors in their child component tree, so you can render an error UI and log the specific error. In our example it will look like this:

```js
const ChristmasAlbum = React.lazy(() => import('./ChristmasAlbum'))
const OtherChristmasAlbum = React.lazy(() => import('./OtherChristmasAlbum'))

<ErrorBoundary>
  <Suspense fallback={<h1>We are loading...🎅</h1>}>
    <ChristmasAlbum />
    <OtherChristmasAlbum />
  </Suspense>
</ErrorBoundary>
```
Note that the ErrorBoundary component does not have to be a direct parent. You can place it higher up in the tree if, for instance, the error UI should hide more than the actual component that crashed.

If you want to learn more about error bounderies and how to write them, Kristofer Selbekk made a smashing article about it in last years calendar. [Take a look!]( https://react.christmas/2018/14)

## Suspense in the future
This was a quick intro to React.Suspense and how it is used with code splitting. However, tomorrow we will see what Suspense will become in the future. A hint  – it will not only be used for code splitting, but so much more! We will also take a deep dive into how suspense actually works – so stay tuned!
