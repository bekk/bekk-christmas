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

Currently my colleagues and I are developing the web application and the native application for a Norwegian company named Entur. These applications lets the user plan their journey, buy tickets, create a profile, add payment options, and other functionalities. To be able to create this awesomeness, and as you may have guessed, we use React for web and for native we are using React Native. 

We have that (dis)advantage that the web app and mobile app mostly contains the same functionality. And as you may have foreseen, this creates two versions of our code. So, in stead of having to maintain two separate repositories, we ended up using one repository (monorepo).

## The Monorepo

A monorepo is just a repository containing several projects. 

How to structure your repo? When developing Feature X, where does it make most sense to put your component that will be 95% identical to the one for app? 

You may be familiar with the differences between React and React Native, instead of:

```
<div>
    Bekk.christmas!!!
</div>
```

you have:

```
<View>
    <Text>
        Bekk.christmas!!!
    </Text>
</View
```

### Packages

We structure our code and components in domain packages. We have managed to split up for applications into mostly separate parts. For instance we have created a subfolder for everything regarding the profile page, everything regarding the purchase of tickets in another map, and so on. By doing it this way we are able to easier compare the components and 

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

> Duplication is far cheaper than the wrong abstraction.

The web and app components often shares the same logic. Therefore there are no need to implement the same pure javascript functions over again. Small helper functions are divided in separate files, and since both the web and app components is in the same folder, no problem accessing it. A dear file has many names, for instance utils, commons, but we call the files for `helper.js`.

```
|_ profile
    |_ index.native.js
    |_ index.web.js
    |_ helper.js
```

### Setup

React Native and node_modules
Flow and flow-typed files
Rarely good support of frameworks by default 


## The Experience

The dilemma we experience is to develop 

We experienced sometimes that one of the applications often was favored. By having more knowledge about the app, the easier it was to continue working on it and get even better known with all the systems and components. 

Another aspect of 

