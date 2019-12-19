---
calendar: javascript
post_year: 2019
post_day: 21
title: A few words about polyfills
ingress: >-
  Maybe you’ve heard of Fetch? The promise-based Web API for making network
  requests in Javascript, and a favourite amongst developers for doing HTTP
  requests for external resources. If you paste
  `fetch(‘https://www.google.com’)` into the Chrome DevTools console and run it
  you can take a closer look at how it works. Sadly, you can’t do the same in
  Internet Explorer. It won’t work. That is because Internet Explorer has not
  implemented support for Fetch. Or Promise for that matter.


  As developers of things on the web we want, and are often required by law, to
  support all major browsers out there. The more users you have on your web site
  often converts to more success, regardless. So, of course we want to invite
  everyone in. The problem arises when our users, many unknowingly I suppose,
  are using old or specific browsers that do not support the latest and greatest
  features in JavaScript - which we, as developers, are longing to use.
---
## What is polyfills?

If the browser that is running your code do not support the features that you want to apply in your modern JavaScript, like `Object.assign()` or `String.trimStart()`, a common practice is to provide the pieces of code that is missing yourself. These pieces of code are called polyfills. Polyfilling can be as easy as finding the required implementation of the functionality yourself and adding it to your JavaScript, as shown in this basic example taken from MDNs suggested polyfill for Number.isInteger: 

```
Number.isInteger =    Number.isInteger || function(value) {        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;    };
```

Just add this to your Javascript file, and make sure its declared and on a reachable scope before it is used, and you’re good to go. There are also many polyfills that can be found on npm, like [this popular implementation of Fetch](https://www.npmjs.com/package/whatwg-fetch) which removes the burden of you having to find the perfect implementation yourself. 

But how to know if a feature is unsupported? I would recommend using the [MDN Web Docs](https://developer.mozilla.org/en-US/) from Mozilla Developer Network. In addition to showing browser compatibility, it also contains great documentation, which release of a standard specification it belongs to, and often suggested polyfills. [CanIUse](https://caniuse.com/) is another great alternative, offering a quick and easy way for looking up for compatibility for a lot of different features in both Javascript and CSS.

If you code base requires a lot of polyfilling, maybe also some transpiling, adding tools like Babel.js to your build setup enables a more easy way of securing that required polyfills are available when your code is running. Or, if you are using Typescript, for example, it ships with easy configuration for supporting desired browsers.

Polyfilling is often confused with transpiling. These two techniques solve different problems. While polyfilling adds a piece of missing code, transpiling enables you to write syntax that may be unsupported in certain browsers, like arrow functions and class declarations.

## When can we stop worrying about polyfills?

As long as there are multiple major browsers from different companies doing things their own way, there is no way to guarantee that they are up to speed on the latest ECMAScript or Web API specifications. 

Nonetheless, most needs for polyfilling the recent years have been related to unsupported features in either Internet Explorer or Microsoft Edge. With a continuing decrease in people using Internet Explorer and Edge Chromium being released 15th of January next year, the future actually looks pretty bright. This, in combination with languages and tools dealing with required polyfills, ....
