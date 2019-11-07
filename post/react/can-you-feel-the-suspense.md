---
calendar: react
post_year: 2019
post_day: 20
title: Can you feel the Suspense?!
ingress: >-
  Suspense is and will become a game changer when it comes to data fetching. It
  changes the way we structure our code, think about loading states and gives a
  better experience for both the developers and UX. 
links:
  - title: Suspense for code splitting
    url: 'https://reactjs.org/docs/code-splitting.html'
  - title: Suspense for data fetching (experimental)
    url: 'https://reactjs.org/docs/concurrent-mode-suspense.html'
authors:
  - Julie Hill Roa
---
Suspense lets you delay the rendering of parts of the application tree until a condition is met. This condition can either be that an asset is loaded or data is fetched. While waiting for the condition to be met, Suspense will render a fallback component instead. This might be a spinner, a loading animation or any other dumb component.  

## Code splitting

In React 16.6, Suspense for code splitting was released. Code splitting is exactly as it sounds: splitting up your code. When you have divided your code into smaller chunks, you can reduce the initial loading time of your application by just loading the chunk that is necessary for the initial render. When the user navigates in your application the rest of the chunks can be loaded as needed. To do this, we use React.Suspense, React.lazy and dynamic imports.

Lets take a closer look: 

```js
const ChristmasAlbum = React.lazy(() => import('./ChristmasAlbum'))
const OtherChristmasAlbum = React.lazy(() => import('./OtherChristmasAlbum'))

<Suspense fallback="<h1>We are loading...🎅</h1>">
  <ChristmasAlbum />
  <OtherChristmasAlbum />
</Suspense>
```

Here we have a chunk named ```ChristmasAlbum```. Instead of a regular import statement we use React.lazy. React.lazy takes a function, that must call a dynamic import, as an argument. This returns a Promise which resolves to a module exporting a React component. 

As ```ChristmasAlbum``` is dynamically imported, we wrap the component in Suspense. Suspense will try to render ```ChristmasAlbum```. If the chunk is not ready and loaded completely, the Suspense component will render the fallback component until it can render ```ChristmasAlbum``` successfully.

## Waiting in Suspense

