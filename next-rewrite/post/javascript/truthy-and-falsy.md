---
calendar: javascript
post_year: 2018
post_day: 4
title: Truthy and falsy
ingress: What is the truth?
links:
  - title: MDN documentation of Truthy
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/Truthy'
  - title: MDN documentation of Falsy
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/Falsy'
authors:
  - Jan Amundsen
---
```
const value = new Boolean(false);
if (value) {
  // code
}
```

If we consider the code snippet above, what does the condition evaluate to?
It might, or might not surprise you that the condition evaluate to true. But why?

Everybody that know JavaScript is familiar with the concept of true and false, the primitive boolean values.
Truthy and falsy are used to evaluate a condition on values other than the primitive boolean values. This help us evaluate conditions without first performing an explicit type convertion on a value to a primitive boolean type. In other words, we can write:

```
const user = { name: "Jan Karlsen" }
if (user.name) {
  // code
}
```

instead of:

```
if (user.name !== null && user.name !== undefined && user.name !== "") {
  // code
}
```

What values are truthy and what values are falsy?
The easiest way for me to remember, is that all values are truthy, unless defined as falsy. The falsy values are as follows: `false`, `0`, `""`, `null`, `undefined`, and `NaN`.

So, the reason the condition in the first code snippet evaluated to true, is that the value used is a Boolean object, and a object is truthy in JavaScript. Even an empty object `{}` is truthy, as we can see from the list of falsy values above.

All the expressions below will evaluate to true:

```
if (true)
if ({})
if (-1)
if ("example")
if ([])
if (() => {})
```
