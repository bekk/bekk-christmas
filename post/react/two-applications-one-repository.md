---
calendar: react
post_year: 2019
post_day: 23
title: 'Two Applications, One Repository'
image: >-
  https://images.unsplash.com/photo-1485841890310-6a055c88698a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: ''
authors:
  - Caroline Odden
---
## The Web and the Native

Currently my colleagues and I are developing the web application and the native application for a Norwegian company named Entur. These applications lets the user plan their journey, buy tickets, create a profile, add payment options, and other functionalities. To be able to create this awesomeness, and as you may have guessed based on this calendar, we are using React for web and for native we are using React Native. 

We have that (dis)advantage that the web and native application mostly contains the same functionality. And as you may have foreseen, this creates two versions of our code based on our choice of technology, with mostly "the same" content. We wanted to have the same business logic, but didn't want it to mess ut the views. So to be able to separate the views from the business logic, but at the same time minimise the duplication of the code. Therefore, we ended up with a monorepo.

## The Monorepo

A monorepo is just a repository containing several projects, and how you structure it will affect the developer experience. 
When developing Feature X for the web, where does it make most sense to put your views that will be 95% identical to the one for native?

### Packages

We structure our code and components in domain packages. We try our best to split up the applications into mostly separate folders. For instance we have created a subfolder for everything regarding the profile page, purchase of tickets in another map, and components that define. By doing it this way we are able to easier compare the components and share the business logic across web and native.

In addition to the domain packages we have a `client-app` and `client-web` folder which is the entry point for the applications.

```
packages
    |_ client-app
        |_ index.js
    |_ client-web
        |_ index.js
    ...
    |_ profile
        |_ index.native.js
        |_ index.web.js
    |_ purchase
        |_ index.native.js
        |_ index.web.js
    ...

```

Actions, reducers, sagas and helper files are typically files we use to share between the applications. They are put in separate files and folders in the domain packages, and since both the web and app components are in short distance of each other, there are no problem accessing it.

```
|_ profile
    |_ index.native.js
    |_ index.web.js
    |_ helper.js
    |_ reducers
    |_ actions
    ...
```

There are both positive and negative sides when working with a monorepo. Personally, I like the domain package structure we are going for. At first look it seems a little bit chaotic, but when you get used to the domain system it is pretty nice! Of course it is a pickle to know when to create a new package, and when to not. In our case the complete application is a journey planner, and it is super hard not to put everything in the `journey` domain package! 😅

When you are done developing a feature for one of the platforms, it is relatively easy to develop it for the other. Because all the heavy logic thinking, developing, and rethinking again has been done. Most of the time it remaining to "port" the views from native to web or vice versa. 


### Setup

<Kent skriv her>

<React Native and node_modules>
<Flow and flow-typed files>
<Rarely good support of frameworks by default>


