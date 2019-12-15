---
calendar: react
post_year: 2019
post_day: 21
title: 'React Context: a short explanaition and some hot tips'
image: '![pineaple out of context](https://ibb.co/n74C32d)'
ingress: "React Context is a way to share a global state to all components in your application. \r\n\nSay for instance you have a logged in user or some other property that determines how a lot of the components in your app should behave. for instance you might want to have season theme for you application. with themes for easter and christmas,\r\n\nInstead of sending the season theme through the whole component tree"
links:
  - title: Official Docs
    url: 'https://reactjs.org/docs/context.html'
  - title: Kent C. Dodds guide to using Context efficiently
    url: 'https://kentcdodds.com/blog/how-to-use-react-context-effectively/'
authors:
  - Bendik Ibenholt
---
Use  React.createContext to create the context



initiate the context with the value

The context will be available in all child components without sending it explicitly down the component tree

useContext hook to consume the context



A protip is to create a custom hook which provides the value, but in addition provides some extra functionality like error handling
