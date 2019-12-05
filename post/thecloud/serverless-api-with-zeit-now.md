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
Ok, we are now ready to create Santa's simple gift lists API. First, we create a new directory named `api` at the project's root. Any file, as long as the extention is supported, we put in this folder will be automatically executed when your application visits the route `/api/file-name`. This works since filesystem routing is used by default, but it's also possible to define your own [routes](https://zeit.co/docs/configuration/#routes).

So let's add `gift-lists.js` in the `api` directory and write these lines of code:

```javascript
module.exports = (req, res) => {
  const giftLists = [
    { id: "001", "gift-list": ["Lego", "Candy"] },
    { id: "002", "gift-list": ["Dracco Heads", "Hot Wheels"] }
  ];
  res.json({ giftLists });
};
```

This serverless function will run whenever the `/api/gift-lists` endpoint is visited. The two objects, `req` and `res`, are passed to each Node.js Serveless Function and can look like standard HTTP request and response objects. However, they include some additional [helper functions](https://zeit.co/docs/v2/serverless-functions/supported-languages#node.js-request-and-response-objects) provided by Now, including the `res.json(obj)` used above to send a JSON object.
