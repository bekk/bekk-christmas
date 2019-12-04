---
calendar: react
post_year: 2019
post_day: 5
title: Can you feel the Suspense?!
image: >-
  https://images.unsplash.com/photo-1566513875272-0e184c92b77c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80
ingress: >-
  Suspense is and will become a game changer when it comes to data fetching. It
  changes the way we structure our code, think about loading states and gives a
  better experience for both the developers and the users' interface.
links:
  - title: Suspense for data fetching
    url: 'https://reactjs.org/docs/concurrent-mode-suspense.html'
  - title: Building Great User Experiences with Concurrent Mode and Suspense
    url: >-
      https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html
authors:
  - Julie Hill Roa
---
Yesterday we learned about how Suspense can be used to support code splitting and lazy loading of components. Today however, we are going to look to the future and see what suspense will become. We will learn more about Suspense for data fetching and what Suspense is really all about: Creating a great loading experience for your app! 

_Disclaimer: The stuff we are going to look at today is not yet out in stable mode and might change over time. As Suspense for data fetching was a year ago is not as it is today. A lot is happening in the React community and I for one is excited to see what it will become!_

# Suspense for data fetching

Suspense lets you delay the rendering of parts of the application tree until a condition is met. This condition can either be that an asset is loaded or, soon, that _data is fetched_. While waiting for the condition to be met, Suspense will render a fallback component instead. This might be a spinner, a loading animation or any other dumb component.

Suspense, as of React 16.6, is only waiting for lazy loaded components or code. The idea of Suspense in the future, is that it does not matter what it is, it can wait for anything – including data. This means that it could also be images or any other thing you fetch asynchronously.

## Why do we need Suspense?
