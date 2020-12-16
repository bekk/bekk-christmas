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

## Enter strict mode

As I'm sure you can understand, the examples above surely allows for some crazy bugs and can even pose a serious security threat.