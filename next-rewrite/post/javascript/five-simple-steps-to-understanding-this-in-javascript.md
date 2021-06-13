---
calendar: javascript
post_year: 2018
post_day: 17
title: Five simple steps to understanding *this* in JavaScript
image: >-
  https://images.unsplash.com/photo-1458040937381-49c067dfd49a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  There are books with entire chapters dedicated to this topic, but this article
  will give you the crash course you might actually remember.
authors:
  - Erik Wendel
---

There's some things about how JavaScript works that you simply need to know as a web developer. I would say the inner workings of what we call function context and the `this` operator definitely is one of them.

There's a plethora of explanation attempts to be found, some great, some less great, but this one has mainly one goal: to be short and to the point.

## Bring on the short and pointy

All functions are being called in what we call a *context*, which is basically just what the value of `this` is inside the function. Whenever I talk about *function context* (scary tech term), I'm basically talking about the value of `this` (what you want to learn).

This article consists of five parts: one main, baseline rule for what `this` points to and four exceptions to that rule. With these five, we'll be able to always deduce what `this` will be!

1. The baseline rule
2. Method calls
3. Constructor functions
4. Arrow functions
5. Setting context explicitly

### The Baseline Rule

This serves as a rule of thumb, always to apply unless one of the exceptions is present.

**The value of `this` is always the global browser object `window`.**

```js
console.log(this) // Window {…}
```

This is rarely useful, and is the root of oh so many bugs.

Even if you at some point have the context point to something other than `window`, once you create a new function, you're back to `window`:

```js
function() {
    // some context-changing magic here
    console.log(this) // some object X

    function () {
        console.log(this) // Window {…}
    }
}
```

### Exception 1: Method Calls

When calling a function that lives on a JavaScript object, we call that function a _method_. Calling such a method is a _method call_.


```js
someFunction() // function call
Math.random() // a method call
```

Whenver calling a method, the value of `this` within the method being called will be set to the object on which the method exists.

```js
person.getAge() // this will be person
Math.random() // this will be Math
```

This is why Java- or OO-like patterns will work in JavaScript as long as you call functions intended to be used as methods directly on the object.

```
function Person(age) {
    this.age = age
}

Person.prototype.getAge() {
    return this.age
}

const joe = new Person(32)
joe.getAge() // 32
```

Simply put – if there's a `.` in your function call expression, the function context will be whatever is in front of the `.`.

Saving a reference to a method and calling it without the `.` won't retain the context.

```js
const getAge = joe.getAge

getAge() // undefined, because window.age is undefined.
```


### Exception 2: Constructor Functions

In the previous section, we used the `new` operator to create a `Person` object. How does that work? 🤔

Here's the thing: there's nothing special with our `Person` function. It's not a special constructor function – it's just a function like any other. It becomes a constructor function only when we call it with `new`.


Here's what happens when you call a function with `new`:

1. A new, empty object is created
2. The function context will point to that object
3. That object will be returned from the function, no matter what (and if) you return from the function

Therefore, it's evident that the value of `this ` changes by using the `new` operator.

### Exception 3: Arrow Functions

Arrow functions are quite simple in this regard. They just.. don't have their own context. They inherit whatever the value of `this` was in their parent scope.

```js
const normalFunction = () => console.log(this)

function arrowFunction() {
    console.log(this)
}

function() {
    // lets say our context here points to some object X
    
    normalFunction() // Window {…}
    
    arrowFunction() // X
}
```

This is quite often a desireable property of arrow functions, relieving you the issue of ensuring the context is right inside your function.

### Exception 4: Setting context explicitly

Of course, JavaScript provides a way for us to set the context ourselves.

Instead of calling a function normally, we can use the `call` function that every function has:

```js
myFunction.call() 
```

The first argument to call will be the function context, while all other arguments are passed to the function being called.

```js
function logContext() {
    console.log(this)
}

logContext() // Window {…}

logContext.call() // Window {…}

logContect.call(12) // 12
```

While `call` will call the function immediately with your specified context, we could also create a copy of a function that we can call later using `bind`:

```js
const newFunctionWithBoundCountext = logContext.bind(new Person(32))

newFunctionWithBoundCountext() // { age: 32 }
```

These context-binding functions are used extensively in JavaScript, especially in various frameworks to guarantee that important functions that get passed around are called with the correct contexts.

#### That's it!

More thorough explanations are a dime a dozen on web development sites. But, just' by remembering just these five simple rules, you'll be able to understand how it works without needing a thick JavaScript book by your side at all times.

Happy coding!
