---
calendar: javascript
post_year: 2020
post_day: 18
title: Strict mode
image: https://images.unsplash.com/photo-1523672557977-2c106afb2278
ingress: 'After years of disagreements about the long awaited next version of
  ECMAScript, on December 3, 2009, the 5th edition was finally released. A full
  10 years after the previous version. With it came a lot of security
  improvements, one of which is known as "strict mode". '
links:
  - title: Strict mode on MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
  - title: Transitioning to strict mode
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode
  - title: Can I use strict mode?
    url: https://caniuse.com/use-strict
authors:
  - Henrik Hermansen
---
## Motivation

JavaScript is a strange language. Its history is complex, and it has come to accept some confusing code. In fact, so confusing it might actually be a bug you'd expect the compiler to let you know about.

Perhaps you accidentally mistyped a variable?

```js
var userAge = 30;
usreAge = userInput.age;
saveUserAge(userAge);
```

Surely the compiler will let you know you're assigning to an undeclared variable? Nope!
You just got yourself a brand new variable called `usreAge`.

Perhaps you're unaware of reserved keywords?

```js
var undefined = userInput.name;
saveUserName(undefined);
```

Surely the compiler will let you know you're assigning to a reserved keyword? Nope!
You've just saved the user's name as `undefined`.

Perhaps you mistyped a function parameter name?

```js
function sum(a, a, c) {
  return a+a+c;
}
```

Surely the compiler will let you know you have duplicate parameter names? Nope!
The first parameter you pass your function will be ignored.

Perhaps you mistook a primitive type for an object?

```js
var myVar = someInput; // someInput = 14
myVar.name = 'John';
```

Surely the compiler will let you know you can't create properties on a primitive type? Nope! This does nothing and fails silently.

## Introducing strict mode

As I'm sure you can understand, the examples above allows for some crazy bugs and can even pose a serious security threat. To deal with this ECMAScript 5 introduces strict mode, a subset with some different semantics and more thorough error-checking. If you try to run any of the code examples above in strict mode it will result in some kind of error being thrown by the compiler. Because this is a "new" feature, not all browsers support this, but [most modern browser do](https://caniuse.com/use-strict). Browsers not supporting strict mode will run strict mode code as if it was normal code.

Strict mode makes three general changes to normal JavaScript semantics. Shamelessly copied from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode):
1. Eliminates some JavaScript silent errors by changing them to throw errors.
2. Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
3. Prohibits some syntax likely to be defined in future versions of ECMAScript.

## How to activate strict mode

In order to be backwards compatible, and not cause any problems in older browsers, strict mode is not enabled by a statement, but by a literal expression. This literal expression will simply be ignored by older browsers, is it doesn't really do anything. To activate strict mode, just add the magic words `'use strict';` (or `"use strict";`) at the top of your code.

Strict mode can be activated for _entire scripts_ or for _individual functions_. Also, JavaScript modules, introduced in ECMAScript 2015, are automatically in strict mode. The expression must be at the beginning of the script or function, before any other code.

```js
// Strict mode for entire script
'use strict';
var hooray = 'This script is running in strict mode';
```

```js
// Strict mode for functions
var ohOh = 'This script is not running in strict mode';
function strict() {
  'use strict';
  var hooray = 'This function is running in strict mode';
  function nested() {
    var ohYeah = 'Nested functions will also run in strict mode';
  }
}
```

```js
// Strict mode in ES 2015 modules
function strict() {
  var hooray = 'This functions is strict by default because this is a module';
}
export default strict;
```

## Preparing for the future

In addition to adding security and preventing bugs, strict mode also adds a couple of other restrictions to help you write future-proof code.

### Reserved keywords

This first restriction is pretty simple. A short list of identifiers (which weren't keywords yet at the time) become reserved keywords. These keywords are `implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, and `yield`. In strict mode, these keywords are not allowed as variables or arguments.

### Block level functions

This second restriction is a bit more complicated. Neither ECMAScript 3 nor ECMAScript 5 has block level functions as part of their specifications. Functions were only supposed to be at the top level of a script or of a function. However, many browsers implemented support for block level functions, but with incompatible semantics between them.

Strict mode in ES 5 prohibits such functions and causes a syntax error. Great! But then came ES 2015 which actually introduces block level functions in the specification. So then all is well in ES 2015? Nope, because [Annex B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers) introduces some additional ECMAScript features for web browsers causing [some confusion to remain](https://stackoverflow.com/a/31461615) about block level functions when not running in strict mode.

## Transitioning to strict mode

Hopefully most of the code you write in 2020 is already strict mode compatible. But in case it's not, or you need to tend to some old code, you might need a bit of help to adjust your codebase. That's fine, but it's getting late now, and I need to publish this blog post before midnight, so I really need to wrap this up. Fortunately for you, MDN has [a great article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode) on the subject. Have fun!