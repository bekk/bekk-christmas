---
calendar: javascript
post_year: 2020
post_day: 2
title: The Three Ways of Fetching
image: https://images.unsplash.com/photo-1480819031369-4710cf00b8d7
ingress: "I'm part of a group that holds introductory courses on web development
  for students and new employees in Bekk. In the course we say that there are
  three ways to retrieve data in JavaScript: **callbacks, promises and async /
  await**, but only the latter is explained. Let's see how each of them works!"
description: "An introduction to three different ways of fetching data in
  JavaScript: callbacks, promises and async / await."
links:
  - url: https://javascript.christmas/2019/8
    title: The Promise of Christmas
  - url: https://javascript.christmas/2019/9
    title: A brief look at async-await
  - url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    title: Fetch API
  - url: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
    title: Asynchronous JavaScript
authors:
  - Ida Marie Vestgøte Bosch
---
In the spirit of Christmas, we'll use a suiting analogy. Let's say Santa requests that an elf fetches a gift for a child on his list. He does not know when the elf will be back, but when it does he wants to put the gift into his bag of toys. This is 2020, after all, so of course he uses JavaScript to complete the task.

Our elf in this analogy will be represented by the magical url `https://santas-gift-storage.northpole/gifts/nameOfChild`, which returns a gift for a given child. We also have access to the global array `bagOfToys`, which is to be filled up with Christmas presents before Santa is on his way.

```javascript
const bagOfToys = [];
```

## Callbacks

The first way to fetch data utilises that we can pass a reference to a function `A` as an argument to another function `B`, which then is going to call `A` at some point. Here, `A` is called the _callback_-function, while `B` is the _higher order_-function. This is a very common pattern in JavaScript, so it's likely you've seen it before – in event handlers, timeouts or even in the map, filter and reduce list-functions.

There are multiple ways to fetch data, but we're going to look at the classic, well-used API [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). If you're not familiar with it, don't worry – the details aren't too important. We're interested in the way we use our callback, and I'll explain it below.

First, we define our main function `fetchChristmasGift` to fetch a Christmas gift for a child. We need the name of the child to fetch the correct gift, so we'll take that as a parameter. Then, we create a new request:

```javascript
const fetchChristmasGift = (name) => {
    const request = new XMLHttpRequest();
    const url = `https://santas-gift-storage.northpole/gifts/${name}`;

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            // Callback time!
        }
    }

    request.open('GET', url);
    request.send();
}
```

The event `onreadystatechange` is triggered when the state of the request changes. We assign a function to this event, which will be called when it occurs. We check if the state has changed to `4 = DONE`, and if it has we want to do something: we want to call a callback function!

So let's create a callback function, to decide what happens when we have fetched our gift. Our instructions were to add it to Santa's bag of gifts, so we'll do that. While we're at it, let's include a check to see if we actually got the gift:

```javascript
const callbackFunction = (request) => {
    if (request.status == 200) {
        const gift = request.response;
        bagOfToys.push(gift);
    } else {
        console.log("Oops! No gift for this child");
    }
}
```

Let's call this function in our code above:

```javascript
const fetchChristmasGift = (name) => {
    const request = new XMLHttpRequest();
    const url = `https://santas-gift-storage.northpole/gifts/${name}`;

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            callbackFunction(request);
        }
    }

    request.open('GET', url);
    request.send();
}
```

And that's it. We used a callback to do something with our data after we successfully fetched it.

But callbacks can easily get messy. There is a reason why there is something called _callback hell_ :fire: (just Google it and see), and why this is not the preferred way of doing things. Let's move on to a new type of object that has another take on the matter.

## Promises

The second way to fetch data uses [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to handle asynchronous calls. Promises are objects that make asynchronity a bit more tidy. For this purpose we use a function called `fetch()` from the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). Unlike the previous method, the responses are wrapped in Promises, so you don't have to explicitly handle all the nitty-gritty details anymore!

We start by defining the function `getGiftForChild()` which takes a child's name as input and fetches the gift from our URL using `fetch()`. This function will return a response in the form of a `Promise`.

```javascript
const getGiftForChild = (name) => fetch(`https://santas-gift-storage.northpole/gifts/${name}`);
```

Then, we can use the Promise prototype methods `then()` and `catch()` to do something when the Promise either resolves :white_check_mark: or is rejected :x:. Let's define the function `fetchChristmasGift()` like before, and call `getGiftForChild()` to fetch our gift:

```javascript
const fetchChristmasGift = (name) => {
    const promise = getGiftForChild(name);
    promise
        .then(gift => bagOfToys.push(gift))
        .catch(error => console.log("Oops! No gift for this child"));
}
```

In fact, this is also a way of using callbacks. We define what is to happen when we get a response, passing in a function to both `then()` and `catch()`. With Promises it's just being handled in a smoother way than our first example. But can it get _even_ better? Keep on reading!

## Async / Await

The third way to fetch data builds on Promises, but is generally a more elegant way of handling them that looks a lot more like synchronous programming. Assume we still have our function `getGiftForChild()` which returns a Promise:

```javascript
const getGiftForChild = (name) => fetch(`https://santas-gift-storage.northpole/gifts/${name}`);
```

This request can either fetch a gift successfully, or fail trying. Instead of using `then()` and `catch()` to handle these two cases, we can define an asynchronous function.

Here, we make use of the two magical keywords `async` and `await`, to explicitly wait for the Promise to resolve before we move on, and say that we do so.

In our analogy, it would look something like this:

```javascript
const fetchChristmasGift = async (name) => {
    const gift = await getGiftForChild(name);
    bagOfToys.push(gift);
}
```

To be sure, we can wrap it in a `try / catch` block to handle if the Promise is rejected:

```javascript
const fetchChristmasGift = async (name) => {
    try {
        const gift = await getGiftForChild(name);
        bagOfToys.push(gift);
    }
    catch {
        console.log("Oops! No gift for this child");
    }
}
```

We'll wait until we've retrieved a gift successfully, and then we'll add it to the bag :gift:

We have to declare `fetchChristmasGift()` asynchronous with `async`, since we're using `await` within. That way, we'll know that something is being awaited where we call our async function `fetchChristmasGift()`. We can decide if we want to await that function as well, or go on with our business as usual in parallel. After all, the North Pole is a busy place.

And that's about it! I hope you learned something new about fetching data from this quick introduction, whether you're new to JavaScript or a veteran who has long since forgotten why you write code the way you're used to. Hopefully, Santa read this too and was able to find your gift in time for Christmas Eve :christmas_tree:
