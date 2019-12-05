---
calendar: thecloud
post_year: 2019
post_day: 8
title: WIP Modular and Serverless API with ZEIT Now
image: >-
  https://images.unsplash.com/photo-1492355040260-cd982083603e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80
ingress: >-
  By now, you have probably heard about serverless applications. You know, the
  applications where you focus on the code and let some third-party cloud
  provider manage the infrastructure and deployment process. With serverless
  functions offered by these cloud providers, it is suprisingly easy to create
  modular and serverless APIs that can easily be deployed with one command.
  Let's dig into how.
links:
  - title: Now Serverless Functions Docs
    url: 'https://zeit.co/docs/v2/serverless-functions/introduction/'
  - title: Introduction to ZEIT Now
    url: 'https://zeit.co/docs/v2/introduction/'
  - title: More ZEIT Now guides
    url: 'https://zeit.co/guides'
authors:
  - Vebjørn Isaksen
---
ZEIT Now is a cloud platform that allows you to [deploy static sites](https://zeit.co/docs/v2/introduction/#creating-a-project-and-deploying) from the commando line with the single command `now`. With [Now 2.0](https://zeit.co/blog/now-2), the platform also offers deployment and execution of serverless functions. These functions works by providing respones to HTTP requests and can be written in Go, Python or JavaScript.

In this article, we will explore how Santa Claus can use serverless functions to  create a simple 🎁-list API for all his elves to use.

## Setting up the project
Before we start, we need to prepare some stuff.

* Sign up at [https://zeit.co/signup]().
* Install `now-cli` with `npm i -g now` (or with Yarn if you prefer).
* Login with `now login`.
* Initilize the folder structure with `mkdir gift-lists && cd gift-lists`.
* Next, initlize the project with `npm init` to create a `package.json`.

## Constructing the API
Ok, we are now ready to create Santa's simple gift lists API. First, we create a new directory named `api` at the project's root. Any file, as long as the extention is supported, we put in this folder will be automatically executed when your application visits the route `/api/file-name`. This works since filesystem routing is used by default, but it's also possible to define your own [routes](https://zeit.co/docs/configuration/#routes). If you want a file to live inside the `api` folder, but not be served as a serverless function, you can simply prefix the filename with underscore, like `_utils.js`. If you prefix a folder with underscore, *none* of the files inside it will be executed by Now.

Let's make the directory with `mkdir api && cd api`, create the first endpoint with `touch gift-lists.js` and write these lines of code:

```javascript
module.exports = (req, res) => {
  const giftLists = [
    { name: "Albert", "gift-list": ["Lego", "Candy"] },
    { name: "Christine", "gift-list": ["Dracco Heads", "Hot Wheels"] }
  ];
  res.json({ giftLists });
};
```

This serverless function will run whenever the `/api/gift-lists` endpoint is visited. The two objects, `req` and `res`, are passed to each serveless function and can look like standard HTTP request and response objects. However, they include some additional [helper functions](https://zeit.co/docs/v2/serverless-functions/supported-languages#node.js-request-and-response-objects) provided by Now, including the `res.json(obj)` used above to send a JSON object.

We can also create a dynamic route to retrieve a gift list by a persons name. If we wrap the filename in square brackets, Now will pass the value in the route to the function. So let's create a `[name].js` file in the directory `/api/gift-lists`. Inside this file, write this simple function:

```javascript
module.exports = (req, res) => {
  const {
    query: { name }
  } = req;

  const giftLists = [
    { name: "Albert", "gift-list": ["Lego", "Candy"] },
    { name: "Christine", "gift-list": ["Dracco Heads", "Hot Wheels"] }
  ];
  
  res.json({
    giftList: giftLists.find(x => x.name.toLowerCase() === name)
  });
};
```

So in order to retrieve Albert's gift list, we simply go to the route `/api/gift-lists/albert`. Neat, right?

## So, how do I deploy this?
Well, I promised you that the API could be deployed with one single command. And that's totally true, just stay in your project's root and run the command `now` in the terminal. Now will spin up a server and provide free automatic SSL with zero configuration. After some seconds, you will receive a live URL like this `https://gift-lists.username.now.sh/` and Santa's API is ready to go.

Made some changes or added more endpoints? Just run `now` again and the URL point to the latest changes.

## What about local development?
Also one command, in your project's root, run `now dev` to get a local environment.

## Let's sum it up
This article only scratch the surface of what's possible with Now and there is still a lot to learn. I recommed you to explore the cloud platform from simple deployments to serverless functions. The workflow is truly amazing.

See the related link below to learn more, perfect Sunday readings.

Happy holidays🎅
