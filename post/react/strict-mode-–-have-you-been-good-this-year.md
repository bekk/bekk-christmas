---
calendar: react
post_year: 2019
post_day: 1
title: How to avoid React's "Naughty List"
image: >-
  https://images.unsplash.com/photo-1511881721716-686204776e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80
ingress: >-
  Every year, Santa Claus and his helping elves create a special list for every
  child in the world: the Naughty or Nice list. React has something quite
  similar – Strict Mode.
description: ''
links:
  - title: Strict Mode
    url: 'https://reactjs.org/docs/strict-mode.html'
  - title: How to Enable React Strict Mode
    url: 'https://kentcdodds.com/blog/react-strict-mode'
authors:
  - Markus Rauhut
---
## What is Strict Mode and why should I use it?

Strict Mode is a feature already introduced to React 16.3 in March 2018. Still, chances are you've [never used it before](https://twitter.com/sebmarkbage/status/1177593546087395328). Strict Mode does not render anything visual (similar to `Fragment`), but detects potential problems in your code and gives you helpful warnings. Strict Mode runs in development mode only and doesn't affect your production build. With the introduction of Hooks earlier this year and [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html) just around the corner, Strict Mode is becoming an increasingly important tool for locating bad practices (Concurrent mode probably won't work until you have fixed the warnings thrown in Strict Mode).

### Deprecated code and legacy APIs

Like everything else that is made of code, React changes over time and what was once considered state of the art eventually becomes deprecated and replaced. Such as `findDOMNode` which is deprecated in Strict Mode and possibly will be removed in a future version of React. Other examples are the use of [string refs](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) and the [legacy context API](https://reactjs.org/docs/legacy-context.html) which both have some issues.

### Unsafe lifecycle methods

Since release 16.9, React throws a warning when using any of the lifecycle methods `componentWillMount`, `componentWillReceiveProps` and `componentWillUpdate`. You've hopefully converted these methods into safer alternatives by now (if you didn't, you should at least add an "UNSAFE_" prefix). Strict Mode can help you identify unsafe lifecycle methods in your own code and third-party libraries and also suggests alternative methods.

### Unexpected side effects

In Concurrent Mode, React may trigger the `render` method multiple times before actually committing the changes (e.g. changing the DOM). Therefore, it is important that this method doesn't contain side effects which can lead to memory leaks and invalid state. Strict Mode can' t detect these side effects automatically, but uses a simple yet clever trick to make them easier to spot – the methods `constructor`, `render`, `setState` and `getDerivedStateFromProps` all get double invoked. If this leads to a weird behaviour in your app, you know what to look for.

## How to use Strict Mode?

Fortunately, using Strict Mode is amazingly easy – all you have to do is to wrap whatever you want to use Strict Mode on inside `<React.StrictMode />`. This can be your entire `<App />`:

```javascript 
<React.StrictMode>
  <App>
    <Component1 />
    <Component2 />
  </App>
</React.StrictMode>
```

Or just a single component:

```javascript
<App>
  <React.StrictMode>
    <Component1 />
  </React.StrictMode>
  <Component2 />
</App>
```

This way you can apply Strict Mode gradually in your app without having to correct everything at once.

If you want to see Strict Mode in action, you should check out this CodeSandbox created by [Kent C. Dodds'](https://twitter.com/kentcdodds) (warnings can be found in the console output):

<iframe
     src="https://codesandbox.io/embed/y01q7vmpnz?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React Codesandbox"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
