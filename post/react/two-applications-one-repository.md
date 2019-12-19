---
calendar: react
post_year: 2019
post_day: 23
title: 'Two Applications, One Repository'
image: >-
  https://images.unsplash.com/photo-1485841890310-6a055c88698a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  When you’re developing similar apps for web and native platforms, it is hard
  to find a project structure that works well. Let us take a look at how our
  team is approaching this challenge for maintaining different view layers, as
  well as a shared business logic code case at the same time.
authors:
  - Caroline Odden
---
## The Web and the Native

Currently out colleagues and us are developing the web application and the native application for a Norwegian company named Entur. These applications lets the user plan their journey, buy tickets, create a profile, add payment options, and other functionalities. To be able to create this awesomeness, and as you may have guessed based on this calendar, we are using React for web and React Native for iOS and Android.

We have that (dis)advantage that the web and native application mostly contains the same functionality. And as you may have foreseen, this creates two versions of our code based on our choice of technology, with mostly the same content (but not a 100%). We wanted to have the same business logic for both of the applications, but didn't want it to mess out the views. We wanted to separate the views from the business logic, but at the same time minimize the duplication of the code. Therefore, we ended up with a monorepo.

## The Monorepo

A monorepo is just a repository containing several projects, and how you structure it will affect the developer experience. 
When developing Feature X for the web, where does it make most sense to put your views that will be 95% identical to the one for native? The answer here is not easy, and it is totally independent of the developer. However, we decided to divide our code into subfolders across web and native.

### Packages

We call the subfolders which covers web and native packages and we separate them by the domain (we feel) they belong to. For instance we have created a subfolder for everything regarding the profile page, and another folder for things that travel suggestions (called journey). By doing it this way we are able to easier compare the components and share the business logic across web and native without too much overhead.
In addition to the domain packages we have a `client-app` and `client-web` folder which is the entry point for the applications.

Here is a rough snippet of our structure:

```
packages
    |_ client-app
        |_ index.js
    |_ client-web
        |_ index.js
    ...
    |_ journey
        |_ index.native.js
        |_ index.web.js
    |_ profile
        |_ index.native.js
        |_ index.web.js
    ...

```

Actions, reducers, sagas and helper files are typically files we use to share between the applications. They are put in separate files and folders in the current domain packages, and since both the web and app components are in short distance of each other, there are no problem accessing it.

```
|_ profile
    |_ index.native.js
    |_ index.web.js
    |_ helper.js
    |_ reducers
    |_ actions
    ...
```

There are both positive and negative sides when working with a monorepo. Personally, we like the domain package structure we are going for. At first look it seems a little bit chaotic, but when you get used to the domain logic it is pretty nice! Of course it is a pickle to know when to create a new package, and when to not, or even delete one. In our case the product we are creating is a journey planner, and it is super hard not to put everything in the `journey` domain package! 😅 And of course, we have the one folder, the `utils`-folder, where all the stuff we don't know where to put is!

When you are done developing a feature for one of the platforms, it is relatively easy to develop it for the other. Because all the work with the heavy logic, developing, and thinking is already done. Most of the time it is remaining to "port" the views from native to web or vice versa. Of course it isn't always as easy to convert one view from native to web, there are some corner cases in the business logic, something with the url chaos (logged in vs. not etc.), and the styling when it comes to vertical vs. horizontal design.


### Setup

<Kent skriv her>

<React Native and node_modules>
<Flow and flow-typed files>
<Rarely good support of frameworks by default>


