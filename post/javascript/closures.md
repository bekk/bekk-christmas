---
calendar: javascript
post_year: 2020
post_day: 4
title: Closures
image: https://images.unsplash.com/photo-1415889678233-eb900aeee9e1
ingress: Although I've been a professional developer for over seven years, there
  are still many programming terms I've yet to fully understand. I've heard the
  term "closures" many times, but I never really bothered to dive into the
  meaning of it. Maybe this is because I had a decent idea of what it was about,
  and I knew pretty well how to use it? It's about time I take the leap to
  figure this out, and finally get some closure.
links:
  - url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    title: Closures on MDN
  - title: Closure on wikipedia
    url: https://en.wikipedia.org/wiki/Closure_(computer_programming)
authors:
  - Henrik Hermansen
---
## Simple code

At first, I'd like to kick us off by going straight to some code.

```js
function myFunc() {
  const value = 'Hello world';
  function alertValue() {
    alert(value);
  }
  alertValue();
}

myFunc();
```

To most developers this is pretty straightforward, especially if you've worked a bit with JavaScript. We create a function, inside of which we create a variable `value` and a function `alertValue`. This inner function will run `alert(value)`, and we see this function is run right after it is created. Finally we run `myFunc()`, and we all sort of just know we will now get an alert box with the text "Hello world".

To me, having worked a fair bit with JavaScript, I kind of just take this for granted.

## One step further

Before we start actually explaining closures, I'd like to take the previous code example one step further, to tickle your mind.

```js
function myFunc() {
  const value = 'Hello world';
  function alertValue() {
    alert(value);
  }
  return alertValue;
}

const innerFunc = myFunc();
innerFunc();
```

This time our outer function doesn't run the inner function. Instead, the inner function is returned. Then we store it in a variable `innerFunc`, and only now do we run this function.

So this time we don't run the inner function until _after_ the outer function is done executing. This may raise some questions. Does `value` still exist? Will we get an error or an empty alert, or will we still see the alert box with the text "Hello world"?

In my mind, I just know this still works. But how and why does it work? Supposedly, this is what closures is all about!

## Function scope and lexical environment

To understand closures we must also understand the available scopes in JavaScript and what a lexical environment is.

The scopes that are the easiest to understand are the global and the local scopes. If we take a look at our previous code block, we have defined `myFunc` and `innerFunc` in the global scope. Then we have `value` and `alertValue` which are defined in the local scope of `myFunc`.

But we also have another scope to consider: the outer function's scope, the lexical environment. This means that when we are inside `alertValue` we can also access the lexical environment of our function, which is the local scope of `myFunc`.

To sum it up, the available scopes in a function are:
* Local scope
* Outer function's scope
* Global scope

## Scope chain

Let's stop and think for a minute. If a function's available scope is its local scope _and_ its lexical environment, then what happens when we nest more functions?

```js
function sum(a) {
  return function sum2(b) {
    return function sum3(c) {
      return function sum4(d){
        return a + b + c + d;
      }
    }
  }
}

console.log(sum(1)(2)(3)(4)); // Now what?
```

I just realized I might have given this one away in the topic, but let's break this down.

The scope of `sum` is its local scope, which contains `a` and the returned function `sum2`. The global scope is of course also available, but it always is, so let's not bother with that right now.

The scope of `sum2` is its local scope, which contains `b` and the returned function `sum3`, but also its lexical environment, which is the scope of `sum`. So we can also access `a` and `sum2` from within `sum2`.

The scope of `sum3` is its local scope, which contains `c` and the returned function `sum4`, but also its lexical environment, which is the scope of `sum2`. So we can also access `b` and `sum3`, in addition to the lexical environment of `sum2`, which is the scope of `sum`. So we can also access `a` and `sum2` from within `sum3`.

Phew! I'm not even going to try to explain the scope of `sum4` in such detail. The point is that a function's scope includes its outer function's scope, and this results in a chain of function scopes.

This is also how recursion is possible. Like I said, the scope of `sum2` contains `sum2`, so we are free to call or return `sum2` from within `sum2`.

## Closures

So now we understand what the lexical environment is. Hopefully you also knew already what a function is. So finally, it's time to reveal what a closure really is.

*drumroll*

A closure is a function which is _enclosed_ with references to its lexical environment. In JavaScript, closures are created every time a function is created, at function creation time.

Wait, what? So all this time I thought I've just been making functions, I've actually been making closures? Well, yes!