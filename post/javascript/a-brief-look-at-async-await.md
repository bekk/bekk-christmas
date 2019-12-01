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
In this calendar we will look into async-await. Let's start with async functions.

From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

 > The async function declaration defines an asynchronous function, which returns an [AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions.


You can use the async keyword when implementing a function
```js
async function doSomething() {
 // code
}
```

or with arrow functions

```js
const doSomething = async () => {
// code
}
```

All async functions will always return a ```Promise```. This looks awfully like wrapping a normal function around a ```new Promise```. However, the ```await``` keyword allows you to wait for a promise to be resolved, thus forcing the code to be synchronous. Let's begin with a simple example:
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

asyncFunction();
```
The code ``` await addOne(1)``` will wait until the promise is resolve and return the 2, similar to:

```js
const asyncFunction = async function() {
  addOne(1).then((result) => console.log(result));
};
```

By adding the ```async``` keyword in the function declaration, we make the function return a promise and allow us to use the ```await``` keyword in it. The ```await``` keyword cant be used at top level code or in functions without ```async```. Addionally, the ```await``` keyword before a promise makes the code feel and act synchronous. Together ```async``` and ```await``` provide a great framework to write asynchronous code that is easy to understand. 

### Case
Let's say you have a API GET that returns true or false. The user has to wait for this GET to return true. However, we don't want to keep the user waiting longer than 30 seconds, and the API does not allow more than one API call every 5 seconds. If we get a timeout or the API call returns an error, we want to redirect the user to an error page.

How would you solve this using ```async-await```? The first thing we need is a function that calls the API GET:

```js
function check() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(get('/resource/check');
    }, 5000);
  });
}

```

This function waits 5 seconds before calling the API, implementing the requirement about not calling the API more than every 5 seconds. Let's move on to the async function:

```js
async function waitAndCheck() {
  try {
    for (let i = 0; i < 6; i++) {
      const status = await check();
      if (status {
        // set state to finished
      }
    }
  } catch (error) {
    // set state to failed
  }
  // set state to not done
}

```
By making this function async, we solve every requirement. The function ```waitAndCheck``` will only call the ```check``` function 6 times and will not execute longer than 30 seconds. This case could have been solve a number of ways, for example we could chain ```check()``` like this:

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

That's all! Hope this gives you inspiration to use ```async-await```.
