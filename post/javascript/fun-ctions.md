---
calendar: javascript
post_year: 2018
post_day: 13
title: Fun(ctions)
image: >-
  https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  Meet the beautiful first class citizen of JavaScript. The function. And all
  it's declarations.
links:
  - title: Scopes and Closures
    url: >-
      https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md
  - title: Functions
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
  - title: ' IIFE''s'
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/IIFE'
authors:
  - Nicolai August Hagen
---

## The function

One can write books about the JavaScript function. I'm sure that people have, too.

But let's rather make this really short. In opposition to other popular languages, like Java, functions in JavaScript are considered first class citizens of the language. This means that you can pass them around as arguments, make functions that in turn return new functions, and essentially use them as any other value in the language. For instance, functions may be a property on JavaScript objects (then named methods).

The fact that functions really are first class citizens in JavaScript, also make the language highly flexible. For example, you can create _closures_ with functions in JavaScript:

```
function counter() {
	let count = 0;

	function increment() {
      return ++count;
	}

	return increment;
}

const coolClosureCounter = counter();

coolClosureCounter(); // 1
coolClosureCounter(); // 2

```

## The 7 ways of the function
One of the things that new JavaScripters find confusing after a while is the function declaration. At MDN we find [the definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) of a JavaScript function to be defined as:

> A JavaScript function is defined with the function keyword, followed by a name, followed by parentheses ```()```.

But after a while of being acquainted with JavaScript, the statement holds only so far. I present to you, the 7 different ways of declaring a JavaScript function _in 2018_.

**The function declaration/definition/statement**

```javascript
function foo(){
  console.log("Fun with Functions!")
}
```

The first we learn, I guess. Nothing fancy here. Looks similar to other languages.

**The function expression**

```javascript
const myFunction = function() {
    console.log("Fun with Functions!")
}
```

Beware. If you try to reference a function expression before calling it, your code will fail:

```
foo(); // Uncaught ReferenceError: foo is not defined

const foo = function() {
    console.log("Hei!");
}
```

**The arrow function expression**

```javascript
() => console.log("Fun with Functions!")
```

After ES2015 (named ES6 back in the days), we also got the handy and quite petite _arrow function expression_. This syntax works especially well when chaining the built-in map/filter/reduce. Kinda like below:

```javascript
const names = ['Eirik', 'Nicolai', 'Henrik', 'Jan', 'Paal Kristian', 'Kristine', 'Espen'];
names
  .filter(name => name.length > 5)
  .map(name => name.toLowerCase()) // ["nicolai", "henrik", "paal kristian", "kristine"]
```

However, beware the following before you consider using arrow functions:

- You do not have the special _arguments_ object inside the function body.
- You cannot say `new (() => {})`.
- [They do not have their own `this`, `arguments`, `super`, or `new.target`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).

**The function constructor**

Well. This is awkward. This one is not the simplest nor intuitive. And guess what, it's not recommended by MDN. However, if you know of a usage, we would love to hear about it!

```javascript
const myStrangeFunc = new Function("a", "console.log(a + ' with Functions')");
myStrangeFunc("Fun"); // logs --> "Fun with Functions"
```

The function body is created as a String?! Fun with functions, man. It never ends 🤓

**The others...**

...are called (pun intended):

- The generator function expression.
- The generator function declaration.
- The GeneratorFunction constructor.

Generator functions will not be subject to this post. [More about this here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).


## IIFE's and the anonymous function

Functions are pretty cool. And as everything that's cool, they can also be anonymous. In JavaScript, we also allow for unnamed functions. Did you know that you also can invoke them immediately? Say hello to the Immediately Invoked Function Expression (IIFE):

```javascript
(function () {
    CODE
})();
```
