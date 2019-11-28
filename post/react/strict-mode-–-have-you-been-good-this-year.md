---
calendar: react
post_year: 2019
post_day: 1
title: How to avoid React's "Naughty List"
ingress: >-
  Every year, Santa Claus and his helping elves create a special list for every
  child in the world: the "Naughty or Nice" list. React has something very
  similar – StrictMode.
description: ''
links:
  - title: React StrictMode
    url: 'https://reactjs.org/docs/strict-mode.html'
  - title: How to Enable React Strict Mode
    url: 'https://kentcdodds.com/blog/react-strict-mode'
authors:
  - Markus Rauhut
---
## What is StrictMode and why should i use it?

StrictMode is a feature which was introduced to React 16.3 already in march 2018. Still, chances are you've never used it before. StrictMode does not render anything visual (similar to `Fragment`), but detects potential problems in your code and gives you helpful warnings.

StrictMode helps you with:
1) Identifying unsafe lifecycles
2) Warning about legacy string ref API usage
3) Warning about deprecated `findDOMNode` usage
4) Detecting unexpected side effects
5) Detecting legacy context API


## How to use StrictMode?

Using StrictMode is amazingly easy: all you have to do is to wrap whatever you want to use StrictMode on inside `<React.StrictMode />`. This can be your entire `<App />`:

```js 
<React.StrictMode>
  <App>
    <Component 1 />
    <Component 2 />
  </App>
</React.StrictMode>
```

Or just a single component:

```js 
<App>
  <React.StrictMode>
    <Component 1 />
  </React.StrictMode>
  <Component 2 />
</App>
```

<iframe
     src="https://codesandbox.io/embed/y01q7vmpnz?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React Codesandbox"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
