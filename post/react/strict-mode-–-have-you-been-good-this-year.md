---
calendar: react
post_year: 2019
post_day: 1
title: How to avoid React's Naughty List
description: ''
links:
  - title: React Strict Mode
    url: 'https://reactjs.org/docs/strict-mode.html'
  - title: How to Enable React Strict Mode
    url: 'https://kentcdodds.com/blog/react-strict-mode'
authors:
  - Markus Rauhut
---
## What is StrictMode and why should i use it?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in interdum sem. In lacinia leo pellentesque lectus malesuada, et volutpat odio egestas. Curabitur nec ipsum eu lectus ultrices ultricies quis in nisi. Nulla sapien diam, imperdiet non eleifend nec, ornare rutrum ex.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in interdum sem. In lacinia leo pellentesque lectus malesuada, et volutpat odio egestas. Curabitur nec ipsum eu lectus ultrices ultricies quis in nisi. Nulla sapien diam, imperdiet non eleifend nec, ornare rutrum ex.
## How to use StrictMode?

Using Strict Mode is amazingly easy: all you have to do is to wrap whatever you want to use Strict Mode on inside `<React.StrictMode />`. This can be your entire `<App />` or just a single component.

```js 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
```

<iframe
     src="https://codesandbox.io/embed/boring-bouman-9s0b0?autoresize=1&expanddevtools=1&fontsize=14&theme=dark&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Strict Mode Example"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

