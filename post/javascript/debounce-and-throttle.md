---
calendar: javascript
post_year: 2020
post_day: 19
title: Debounce and throttle
ingress: Ever wanted to implement a search as-you-type? What about transforming
  something while the user is scrolling. Just adding an event listener for this
  works, but it is hard on the browser performance and fetching from the server
  on every keypress isn't just unnecessary, it may also be hard on your server.
  This can be solved by two functions, \`debounce\` and \`throttle\`. Let's have
  a look at the difference between the two, and also how we can implement these
  ourselves.
links:
  - title: Lodash implementation of debouce
    url: https://github.com/lodash/lodash/blob/master/debounce.js
authors:
  - Eirik Luka
---
## What is the difference?

Throttle and debounce are two very similar ways to handle function calls to optimise performance. Throttle is normally used when you have a function that is called continuously while the user is interacting with your page, e.g. while scrolling, and debounce is used to call a function when the user has stopped interacting, e.g. when they have stopped typing in an input field.

## Search-as-you-type

Let's say you have an input for searching, but you want to give the user results while typing. Sending a request for every key entered is not only heavy on the server, it is also unnecessary if the user types more letters before the response gets back from the server. We can utilise debounce to instead send the request when the user has paused typing.

```javascript
function debounce(func, wait) {
    let timeout;
    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(func, wait)
    }
}

const onType = debounce(() => {
    // send request
}, 500);

searchField.addEventListener('keydown', onType)
```

If we type a key in the predefined `searchField` a request to the server will be sent after 500 milliseconds, but if the user types another key before that time has elapsed, the request is delayed another 500 ms.

Let's see this in action. Type something into the search input, and if you pause for more than 500 ms a "search" will be triggered. Don't expect any results here though.

<iframe src="https://codesandbox.io/embed/upbeat-cloud-t7dql?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="upbeat-cloud-t7dql"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
