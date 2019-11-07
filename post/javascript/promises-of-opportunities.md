---
calendar: javascript
post_year: 2018
post_day: 22
title: Promises of opportunities
image: >-
  https://images.unsplash.com/photo-1528789408128-bf8999ce0091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3244&q=80
ingress: Quick tips on all you can do with Promises. Because my tips don't lie!
links:
  - title: Promise | MDN
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  - title: Promises - an introduction
    url: 'https://developers.google.com/web/fundamentals/primers/promises'
authors:
  - Henrik Hermansen
---
For this post I hope you're familiar with how to create a Promise, how to receive its resolved value and how to catch a rejection. But if you thought that was it, I have some other neat features and tricks to show you.

## The I-want-to-do-something-regardless function
So, you're fetching some data, and your view controller has some state to indicate this to your user. But how do you update this state when your fetching is complete, regardless of your Promise being resolved or rejected?
While you could update the state in both a `.then()` and a `.catch()` function, Promises has yet another link in the chain: the `.finally()`.
```js
fetch(someURL)
  .then(response => /* handle your resolved response */)
  .catch(exception => /* handle your rejected value */)
  .finally(() => isLoading = false);
```

## Returning from functions
Did you ever wonder what happens if you return from the functions you chain on to your Promise? You actually get a new Promise, resolved with whatever you return (except for `.finally()`). This means you can actually recover from rejections, or alter your resolved values.
```js
new Promise((resolve, reject) => resolve('All is good')) // Promise {<resolved>: "All is good"}
  .then(value => `${value}, all is well`) // Promise {<resolved>: "All is good, all is well"}
  .then(value => { throw 'Something broke' }) // Promise {<rejected>: "Something broke"}
  .catch(value => `${value}, but I can fix it`) // Promise {<resolved>: "Something broke, but I can fix it"}
  .finally(() => 'What now?') // Returning in finally() just returns a copy: Promise {<resolved>: "Something broke, but I can fix it"}
```

## Synchronous promises
You can instantaneously create a resolved or rejected Promise. It's very easy.
```js
Promise.resolve('All is good') // Promise {<resolved>: "All is good"}
Promise.reject('Something broke') // Promise {<rejected>: "Something broke"}
```

Wait, what? Isn't the whole point of Promises to be async? Not necessarily. Recently I needed to create a Promise which would either be synchronous or asynchronous based on my state, and then I would use that value for some more async stuff. Still confused? Hopefully a code example can help with that.
```js
const promiseOfSomeData = myState
  ? Promise.resolve(myState)
  : new Promise(resolve => {
    fetch(someDataURL).then(response => resolve(response))
  });

promiseOfSomeData.then(data => /* This will either be myState or response, based on the ternary */);
```

## I can Promise you everything
Consider you need to fetch some data, and wait for it all to be fetched, before you do something. Perhaps this is what comes to mind?
```js
fetch(customersURL)
  .then(customers => {
    fetch(productsURL)
      .then(products => {
        // Process this data
      });
  });
```
This is starting to look like the callback hell we were trying to combat with Promises in the first place.
Instead, you can use `.all()`. Some code will hopefully be sufficient to explain it.
```js
Promise.all([fetch(customersURL), fetch(productsURL)])
  .then(([customers, products]) => /* Process that data */)
  .catch(error => /* Do something */);
```
As you can see, `.all()` takes an array of Promises, and resolves with an array of resolved values. You should note that this is fail-fast, which means `.catch()` will run immediately when any of the Promises fails.

## "It's a race!"
said Rowan Atkinson in the 2001 film [Rat Race](https://www.youtube.com/watch?v=XSVzRBiiTxA).
`Promise.race()` isn't too different from that movie, in the sense that whichever Promise comes first will win. However, unlike the characters in the movie, Promises can also reject.

I'm sorry, I'll stop speaking in code, and rather show you with code.. Oh, you know what I mean!
```js
Promise.race([fetch(customersURLmirror1), fetch(customersURLmirror2)])
  .then(customers => /* Do something */)
  .catch(error => /* Do something else */);
```
Initially this sort of looks like `.all()`, but as you can probably tell, this will resolve with just one value. Simply put, `.all()` will resolve or reject with the value/error as soon as any of the Promises in the array resolves or rejects.

## It's Saturday, I want to head out now
Good, because this was all I had for today.

I hope your X-mas looks promising, and that everything will be resolved!
