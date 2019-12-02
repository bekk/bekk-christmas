---
calendar: react
post_year: 2019
post_day: 4
title: Can you feel the Suspense?!
image: 'https://unsplash.com/photos/kTHJb6pYsrY'
ingress: >-
  Suspense is and will become a game changer when it comes to data fetching. It
  changes the way we structure our code, think about loading states and gives a
  better experience for both the developers and the users' interface.
links:
  - title: Suspense for code splitting
    url: 'https://reactjs.org/docs/code-splitting.html'
  - title: Suspense for data fetching (experimental)
    url: 'https://reactjs.org/docs/concurrent-mode-suspense.html'
authors:
  - Julie Hill Roa
---
Suspense lets you delay the rendering of parts of the application tree until a condition is met. This condition can either be that an asset is loaded or, soon, that data is fetched. While waiting for the condition to be met, Suspense will render a fallback component instead. This might be a spinner, a loading animation or any other dumb component.

## Code splitting

Code splitting is exactly as it sounds: splitting up your code.  This might be on a route-level, meaning that each sub route in your application is its own part or chunk. This is a good place to begin, as it will make your split parts more even. The user experience will also be intact as users are already used to a page transition with a new render. It can also be at a component-level. You can try to identify smaller parts of the application which is rarely used or shown to the user. 



### Optimize all the codes

As your application gets bigger, with code and features, your loading time will increase as well. Especially if you include multiple third-party libraries. The user today, is expecting fast applications with minimum loading time. According to studies on behaviours on the web show that «if a website loads longer than 3 seconds, 53% of mobile users abandon such sites». This is where Suspense and code splitting comes to into play. When you have divided your application code into chunks, you can reduce the initial loading time of your application by only loading the chunk necessary for the initial render. When the user navigates in your application the rest of the chunks can be loaded as needed. 

### Code splitting With Suspense

Code splitting is a feature supported by your bundler, like Webpack or Parcel. However, your code facilitates the actual import and use of these chunks. In React 16.6, Suspense for code splitting was released, and it makes code splitting easy. Suspense handles the loading state of the chunks and let’s your application render a fallback component until the chunk is ready to render. The actual import of these chunks is done by React.Lazy and dynamic imports. Let’s take a closer look how this is done:

```js
const ChristmasAlbum = React.lazy(() => import('./ChristmasAlbum'))
const OtherChristmasAlbum = React.lazy(() => import('./OtherChristmasAlbum'))

<Suspense fallback="<h1>We are loading...🎅</h1>">
  <ChristmasAlbum />
  <OtherChristmasAlbum />
</Suspense>
```

The example shows a chunk named `ChristmasAlbum`. Instead of a regular import statement we use React.lazy. React.lazy takes a function, that must call a dynamic import, as an argument. This returns a Promise which resolves to a module exporting a React component.

Because `ChristmasAlbum` is dynamically imported, we wrap the component in a Suspense component. Suspense will try to render `ChristmasAlbum`. If the chunk is not loaded completely and ready to render, the Suspense component will render the fallback component until it can render ChristmasAlbum successfully.
