---
calendar: javascript
post_year: 2019
post_day: 9
title: A brief look at async-await
image: >-
  https://images.unsplash.com/photo-1506704810770-7e9bbab1094b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80
links:
  - title: MDN async function
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  - title: Async/await Javascript.info
    url: 'https://javascript.info/async-await'
authors:
  - Markus Karlsen
---
In this article, we will look into async-await. Let's start with async functions.

From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

 > The async function declaration defines an asynchronous function, which returns an [AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions.


You can use the async keyword when implementing a function:
```js
async function doSomething() {
 // code
}
```

Or with arrow functions:

```js
const doSomething = async () => {
// code
}
```

All async functions will always return a ```Promise```. However, the ```await``` keyword allows you to wait for a promise to be resolved. Let's begin with a simple example:
```js
const addOne = function(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number + 1);
    }, 1000);
  });
};

const asyncFunction = async function() {
  const result = await addOne(1);
  console.log(result);
};
```
The code ``` await addOne(1)``` will wait until the promise is resolved and return the 2, similar to:

```js
const someFunction = function() {
  addOne(1).then((result) => console.log(result));
};
```

The ```await``` keyword can't be used at top level code, [yet](https://github.com/tc39/proposal-top-level-await), or in functions without ```async```. Together ```async``` and ```await``` provide a great framework to write asynchronous code that is easy to understand. 

### Case
Let's say; you are creating a webpage that allows users to sign documents. However, the documents need to be ready before the user can sign them. The webpage calls an endpoint that returns the current status of the document. Either true or false. If the API doesn't return true within 30 seconds after loading the webpage, the user should be redirected to an error page.

How would you solve this using ```async-await```? The first thing we need is a function that calls the API:

```js
function check() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(get('/resource/check');
    }, 5000);
  });
}

```

This function waits 5 seconds before calling the API. Let's move on to the async function:

```js
async function waitAndCheck() {
  try {
    for (let i = 0; i < 6; i++) {
      const status = await check();
      if (status) {
        // set state to finished
      }
    }
  } catch (error) {
    // set state to failed
  }
  // set state to not done
}

```
By making this function async, we solve the problem. The function ```waitAndCheck``` will only call the ```check``` function 6 times and will not execute longer than 30 seconds. This case could have been solved several ways, for example, we could chain ```check()``` like this:

```js
function chain() {
  check()
    .then(result => {
      if (result) {
         // set state to finished
      }
      check()
        .then(result => {
          if (result) {
              // set state to finished
          }
          check()
            .then(result => {
              if (result) {
                 // set state to finished
              }
              check()
                .then(result => {
                  if (result) {
                    // set state to finished
                  }
                  check()
                    .then(result => {
                      if (result) {
                         // set state to finished
                      }

                      // set state to not done
                    })
                    .catch(error =>  // set state to failed);
                })
                .catch(error =>  // set state to failed);
            })
            .catch(error =>  // set state to failed);
        })
        .catch(error =>  // set state to failed);
    })
    .catch(error =>  // set state to failed);
}
```

That's all! I hope this inspires you to use ```async-await```.
