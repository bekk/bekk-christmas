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
## The App and the Web

Currently my colleagues and I are developing the web application and the mobile application for a Norwegian company named Entur. 

For web we are using React and for mobile we are using React Native. 

We have that (dis)advantage that web app and mobile app mostly contains the same functionality.
In stead of having to maintain two separate repositories, we have one repository.

## The Monorepo

How to structure your repo? When developing Feature X, where does it make most sense to put your component that will be 95% identical to the one for app? 

### Packages

We structure our code and components in domain packages. We have managed to split up for applications into mostly separate parts. For instance we have created a subfolder for everything regarding the profile page, everything regarding the purchase of tickets in another map, and so on. By doing it this way we are able to easier understand the 

```
packages
    |_ client-app
        |_ index.js
    |_ client-web
        |_ index.native.js
    ...

    |_ profile
        |_ index.native.js
        |_ index.web.js
    |_ purchase
        |_ index.native.js
        |_ index.web.js
    ...

```


> Duplication is far cheaper than the wrong abstraction.

### Helpers

The web and app components often shares the same logic. Therefore there are no need to 
A dear child has many names. 

### Setup

This is pain.
Patches.
The upgrade du React Native 0.61 took one week.

## The Experience

We experienced sometimes that one of the applications often was favored. 


## The Alternatives?

