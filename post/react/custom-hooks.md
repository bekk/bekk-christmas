---
calendar: react
post_year: 2019
post_day: 13
title: Home-baked Hooks
ingress: >-
  About a year ago, Sophie Alpert and Dan Abramov presented one of the most
  exciting new features in React: Hooks. Release 16.8 introduced several
  alternatives that can be used directly (e.g. `useState`, `useEffect` and some
  others), but also provided the possibility to create your very own Hooks –
  Custom Hooks.
authors:
  - Nicolai August Hagen
  - Markus Rauhut
---
## Custom Hook basics

Consider the following example, in which the document title of a web page is changed:

```javascript
import React, { useEffect } from 'react';

const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

This is one of the simplest examples of a custom hook. Like all existing Hooks, every Custom Hook should start with "use" to indicate that this is a Hook. Further, as you can see, a Custom Hooks is really just a fancy way of saying *"a function containing other Hooks, and/or some extra logic"*. 

The whole idea behind a custom hook is to hide the implementation of something that we often need in our application - or across applications. In the example above; updating the document title. By "blackboxing" these often used implementations, we can combine our custom hooks in new ways, thereby creating a more loosely coupled application. 

## Popular Custom Hooks

In our client project, we use several custom hooks in our daily work. The most important aspect is that they solve a typical problem in your application. However, people recognize themselves in the same problems across projects, domains and countries. 

Some of the most popular solutions to these common problems can you find below:

- **[react-use](https://github.com/streamich/react-use)** - not a single Hook, but a colletion of many different (contains Hooks for interacting with sensors, UI, state etc.) 

- **[useForm](https://www.npmjs.com/package/react-hook-form)** – Ever struggled with state in form validations? It can really help you manage the state of your forms.

- **[useMedia](https://www.npmjs.com/package/react-use-media)** - a way to yyy

## Repercussions

So, after about one year of using Hooks in general, and Custom Hooks specifically, what do we see as the overall trends? 

- Increases declarative makes our code more declarative

- It makes our application more loosely coupled than before.

- Simplifies state management

- It creates less code.

- It is, perhaps, obsoletes redux as a package, because you may (almost) completely get rid of Redux by just creating a custom hook returning its  `[state, dispatch]`.

