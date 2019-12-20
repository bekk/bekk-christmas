---
calendar: javascript
post_year: 2019
post_day: 21
title: A short recap on polyfills
ingress: >-
  Maybe you’ve heard of Fetch? The promise-based Web API for making network
  requests in the browser, and a favourite amongst developers. If you paste
  `fetch(‘https://www.google.com’)` into the Chrome DevTools console and run it
  you can take a closer look at how it works. Sadly, you can’t do the same in
  Internet Explorer. It won’t work. That is because Internet Explorer has not
  implemented support for Fetch. Or Promise for that matter.
authors:
  - Fredrik Stenbro
---
As developers of things on the web we want, and are often required by law, to support all major browsers out there. More users often converts to more success. So, of course we want to invite everyone in. The problem arises when our users, many unknowingly I suppose, are using old or specific browsers that do not support the latest and greatest features - which we, as developers, are longing to use. Polyfills to the rescue!

## What is a polyfill?

If the browser that is running your code do not support the features that you want to apply in your modern JavaScript, like `Object.assign()` or `fetch()`, a common practice is to provide the pieces of code that is missing yourself. These pieces of code are called polyfills. It can be as easy as finding the required implementation yourself and adding it to your source code. 

Here is an example of MDNs suggested polyfill for `Number.isInteger()`:

```
Number.isInteger = 
    Number.isInteger || function(value) {              
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;   
    };
```

Just add this to your Javascript, and make sure its declared and on a reachable scope before it is used, and you’re good to go. 

There are also many polyfills that can be found on NPM, like [the popular polyfill for Fetch](https://www.npmjs.com/package/whatwg-fetch) which removes the burden of you having to find the perfect implementation yourself.

But how to know if a feature is supported or not? I would recommend using the [MDN Web Docs](https://developer.mozilla.org/en-US/) from Mozilla Developer Network. In addition to showing browser compatibility, it also contains great documentation and often suggested polyfills. [CanIUse](https://caniuse.com/) is another great alternative, offering a quick and easy way for looking up for compatibility for a lot of different features in both Javascript, CSS and more.

If you code base requires a lot of polyfilling, maybe also some transpiling, adding tools like [Babel.js](https://babeljs.io/) to your build setup enables an easy way of securing that required polyfills are available when your code is running.

Polyfilling is often confused with transpiling. These two techniques solve different problems. While polyfilling adds a piece of missing code, transpiling enables you to write syntax that may be unsupported in certain browsers, like arrow functions and class declarations.

## When can we stop worrying about polyfills?

As long as there are multiple major browsers from different companies doing things their own way, there is no way to guarantee that they are up to speed on the latest standards like ECMAScript and WHATWG.

Nonetheless, the need for polyfilling recent years have mostly been related to unsupported features in  Internet Explorer. This browser is in a continuing decrease of use, but is actually planned to be supported as a part of Windows 10. The good news is that Microsoft plans to release the brand new [Edge Chromium](https://www.microsoftedgeinsider.com/en-gb/), which is based on [Google Chrome's open sourced engine](https://www.chromium.org/), 15th of January next year. So let's hope users adopt this browser over Internet Explorer 11, so the era of error messages like `X doesn't support property or method 'y'` soon comes to an end.
