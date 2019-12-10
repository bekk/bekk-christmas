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

Consider this simple example changing the document title:

```javascript
import React, { useEffect } from 'react';

const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

Like all existing Hooks, every Custom Hook should start with "use" to indicate that this is a Hook. Further, as you can see, a Custom Hooks is really just a fancy way of saying "a function containing other Hooks, and/or some extra logic". The whole idea behind it is to hide the implementation of something that we often need - for example updating the document title. By blackboxing often used implementations, we can combine our custom hooks in awesome new ways, and thereby creating a more loosely coupled application. 

## Popular Custom Hooks
- **[react-use](https://github.com/streamich/react-use)** - not a single Hook, but a colletion of many different (contains Hooks for interacting with sensors, UI, state etc.) 

- **[useForm](https://www.npmjs.com/package/react-hook-form)** – Ever struggled with state in form validations? It can really help you manage the state of your forms.

- **[useMedia](https://www.npmjs.com/package/react-use-media)** - a way to yyy

## Repercussions

So, after about one year of using Hooks in general, and Custom Hooks specifically, what do we see as the overall trends? 

- It makes our application more loosely coupled than before.

- It makes managing state easier.

- It creates less code.

- It is, perhaps, obsoletes redux as a package, because you may (almost) completely get rid of Redux by just creating a custom hook returning its  `[state, dispatch]`.
