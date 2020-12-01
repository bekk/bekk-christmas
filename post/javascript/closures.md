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

To most developers this is pretty straightforward, especially if you've worked a bit with JavaScript. We create a function, inside of which we create a variable `value` and a function `alertValue`. This inner function will run `alert(value)`, and we see this function is ran right after it is created. Finally we run `myFunc()`, and we all sort of just know we will now get an alert box with the text "Hello world".

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

## Lexical scoping

