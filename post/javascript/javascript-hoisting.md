---
calendar: javascript
post_year: 2019
post_day: 16
title: JavaScript Hoisting
image: >-
  https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  **If you are new to JavaScript, chances are that you might find it a bit
  confusing at times. This is with good reason as JavaScript is a language of
  many quirks packed with odd behaviors and inconsistency. Let's make JavaScript
  a bit less confusing by tackling one of the more overlooked quirk of
  JavaScript known as Hoisting.**
links:
  - title: MDN Hoisting
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting'
  - title: 'Hoisting in Modern JavaScript — let, const, and var'
    url: >-
      https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda
authors:
  - Tien Quoc Tran
---
### What is Hoisting

Hoisting is something that happens during the compilation stage of the JavaScript code. Just before the code is executed the compiler scans for all variable and function declarations and allocates them in the memory. As a result, when the code is executed all variable and function declarations will be accessible at the beginning of its current scope regardless of when it was declared in the source code. This creates an illusion that make it seems like the source code has changed and that all the variable and function declarations has been moved to the top of their current scope. 

### Var

Let’s take a look at an example of how variables declared using `var` are hoisted. Consider the following code, what do you think the output will be? 

```javascript
console.log(movie);
var movie = “Bølgen”; 
```

If you guessed `undefined` you’re absolutely right. But why did we get this result? As previously mentioned, during the compilation stage the variable declaration is added to the memory, but this is only true for the variable declaration and not the actual value assignment. The compiler will only process the declaration and then automatically initialize it to `undefined`. The assignment of the actual value is not changed and still happens where it was declared. If we were to illustrate this using code it would look something like this: 

```javascript
var movie;                  // Initialized to undefined
console.log(movie);
movie = “Bølgen”;           // Assign the value
```

### Let and const

Let’s build upon the previous example. If we substitute `var` with `let`, what do you think the output will be? 

```javascript
console.log(movie);
let movie = “Bølgen”; 
```

If you guessed `ReferenceError` you’re right again! While `let` and `const` gets hoisted just like `var` there is a small difference in how they are initialized. Instead of being initialized to `undefined` like in the case of `var`, `let` and `const` remains uninitialized and does not get assigned a value before the declaration. The space between where the variable is created and assigned a value is often referred to as the `Temporal Dead Zone`. If we try to access the variable inside this space, we will get a `ReferenceError`. 

```javascript
let movie;                  // Not automatically assigned a value
console.log(movie);         // Temporal Dead Zone
movie = “Bølgen”;           // Assign the value
```

### Functions

Like a regular variable declarations functions are also hoisted. During the compilation stage the function declaration is read and allocated in the memory. This makes it possible to access the function before it is declared in the source code.  

```javascript
printMyFavoriteMovie();             // Prints out "Bølgen"
function printMyFavoriteMovie() {
    console.log("Bølgen");
} 
```

When using function expression, we can expect the same behavior as hoisted variables. In the example below, we try to store a function inside a `var`. As we know by now, when `var` are hoisted they get initialized to `undefined`. If we try to access the function before it is declared, we will get `TypeError: printMyFavoriteMovie is not a function` because it is `undefined` and not a function.

```javascript
printMyFavoriteMovie();             // TypeError: printMyFavoriteMovie is not a function

var printMyFavoriteMovie = function printMovie() {
    console.log("Bølgen");
} 
```

### Pitfalls to look out for

* Always make variable and function declarations at the top to avoid confusion.
* Use `let` and `const` instead of `var` to avoid running into unexpected errors.
