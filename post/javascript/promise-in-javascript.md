---
calendar: javascript
post_year: 2019
post_day: 8
title: Promise in Javascript
image: 'https://images.unsplash.com/photo-1531417666976-ed2bdbeb043b'
ingress: |+

authors:
  - Markus Karlsen
---
In this article we will look into promises in Javascript. The concept of a real life promise is simple, as may also be the case when we first start using Promises. However, as we gain more experience with Javascript, it becomes important to really understand promises.

When working with promises today we usually focus on the handling, and a promise is often linked with asynchronous operations like API calls, DB operations or IO calls. There are two important parts of a promise we need to understand: Creating and handling. Lets start by looking into the creation of a promise:

```js
new Promise( function(resolve, reject) { ... } );
```
When creating a promise we pass a function that takes two paremeters, which are in turn two functions. When a promise is complete, either resolve or reject is called, each representing two key parts of a promise. The success of a promise, depending on the point of view, is often associated with resolve, and the faulting state is often associated with reject.

### Resolve and Reject

Lets have a look at a real life example, and consider a scenario where a friend has made us a promise:

```js
const friendKeepsHisWord = true;
const friendsPromise = new Promise(function(resolve, reject) {
  if (friendKeepsHisWord) {
    resolve("My friend keeps his word");
  } else {
    reject("My friend is a liar");
  }
});

console.log(friendsPromise);

```
In this case the promise would be resolved right away to 'My friend keeps his word'. Simple right?

```
Promise {<resolved>: "My friend keeps his word"}
         __proto__: Promise
         [[PromiseStatus]]: "resolved"
         [[PromiseValue]]: "My friend keeps his word"
```

Additionally, a promise can have two other states. The pending state for this promise would look like this:

```
Promise {<pending>}
         __proto__: Promise
         [[PromiseStatus]]: "pending"
         [[PromiseValue]]: undefined
```

While the rejected state would look like this:

```
Promise {<rejected>: "My friend is a liar"}
         __proto__: Promise
         [[PromiseStatus]]: "rejected"
         [[PromiseValue]]: "My friend is a liar"
```

### Prototypes

After a promise has been resolved or rejected, we often want to update something. This is where the prototype methods come in.
One or two of the prototype methods will almost always execute depending on the implementation. When a promise is in the pending state, three of these prototype methods are really handy:

#### [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

Let's add a ```setTimeout()``` to our code to use ```then()```:

```js
const friendKeepsHisWord = true;
const friendsPromise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    if (friendKeepsHisWord) {
      resolve("My friend keeps his word");
    } else {
      resolve("My friend is a liar");
    }
  }, 1000);
});

friendsPromise.then(message => console.log(message));
```
#### [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

If the promise is rejected with an error:

```js
const friendKeepsHisWord = false;
const friendsPromise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    if (friendKeepsHisWord) {
      resolve("My friend keeps his word");
    } else {
      reject(new Error("My friend is an Alien!!!!"));
    }
  }, 1000);
});

friendsPromise.catch(error => console.log(error.message));
```

#### [Promise.prototype.finally()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

If ```.finally()``` is implemented, it will call whenever a ```Promise``` is settled, regardless if the promise is rejected or fulfilled. Lets use it by adding a ```waitingOnFriend```:

```js
const friendKeepsHisWord = Math.floor(Math.random() * 5) !== 1 ? true : false;
let waitingOnFriend = true;
const friendsPromise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    if (friendKeepsHisWord) {
      resolve("My friend keeps his word");
    } else {
      reject("My friend is a liar");
    }
  }, 1000);
});

friendsPromise
  .then(message => console.log(message))
  .catch(error => console.log(error))
  .finally(() => {
    waitingOnFriend = false;
  });
```
This image shows the flow of ```.catch() ``` and ```.then() ```:

![Image showing the flow of then and catch](https://mdn.mozillademos.org/files/15911/promises.png)

Here we see that ```.catch() ``` and ```.then() ``` also return a ```Promise```, meaning they can be chained. 

### Rule of thumb when using Promises
- Use ```Promise``` when handling asynchronous code
- Always implement ```.then()``` and ```.catch()```
- Remember that you can have multiple handlers of a promise
- If you want code executing in both ```.then()``` and ```.catch()```, use ```.finally()```
- Check out [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) and [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) if you need to handle multiple Promises.
