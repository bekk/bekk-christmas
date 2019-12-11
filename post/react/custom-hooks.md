---
calendar: react
post_year: 2019
post_day: 13
title: Home-baked Hooks
image: >-
  https://images.unsplash.com/photo-1481233673589-df886804ee96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80
ingress: >-
  About a year ago, Sophie Alpert and Dan Abramov presented one of the most
  exciting new features in React: Hooks. Release 16.8 introduced several
  alternatives that can be used directly (e.g. `useState`, `useEffect` and some
  others), but also provided the possibility to create your very own Hooks –
  Custom Hooks.
links:
  - title: Alpert & Abramov intro-video to Hooks
    url: 'https://www.youtube.com/watch?v=V-QO-KO90iQ'
  - title: Build Your Own Custom Hooks (reactjs docs)
    url: 'https://reactjs.org/docs/hooks-custom.html'
  - title: Do React Hooks Replace Redux?
    url: >-
      https://medium.com/javascript-scene/do-react-hooks-replace-redux-210bab340672
  - title: Thinking In React Hooks
    url: 'https://wattenberger.com/blog/react-hooks'
  - title: How To Migrate From HOCs to Hooks
    url: 'https://blog.logrocket.com/how-to-migrate-from-hocs-to-hooks-d0f7675fd600/'
authors:
  - Nicolai August Hagen
  - Markus Rauhut
---
## Custom Hooks anatomy

Suppose you want to create an app that keeps track of a value even after a page refresh. This can easily be done by taking advantage of the local storage feature in any browser. A Custom Hook for this could look like this:

```javascript
import React, { useEffect } from 'react';

function useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(
    () => window.localStorage.getItem(key) || initialValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
};
```

Like all pre-defined hooks, a Custom Hook's name should start with "use" (this mainly to make them easy to identify). Furthermore, a Custom Hook is really just a fancy way of saying *"a function containing other hooks and/or any additional logic"*. 

If you would like to use the `useDocumentTitle` hook from above, you could do so like this:

```javascript
const dayFromLocalStorage = useLocalStorage("day", 13);

dayFromLocalStorage.value // 13
```

The whole idea behind a Custom Hook is to support the reuse of stateful logic and to abstract away the implementation of something that is frequently reused. This doesn't need to be limited to our own code, but can even be applied across applications (as you can see in the following section). Custom Hooks also 

**Remember:** Custom Hooks don't work in class components

In the example above; updating the document title. By "blackboxing" these often used implementations, we can combine our custom hooks in new ways, thereby creating a more loosely coupled application. 

## Popular Custom Hooks !!!TODO!!!

In our client project, we use several Custom Hooks in our daily work. The most important aspect is that they solve a typical problem in your application. However, people recognize themselves in the same problems across projects, domains and countries. 

Some of the most popular solutions to these common problems can you find below:

- **[useForm](https://www.npmjs.com/package/react-hook-form)** – Ever struggled with state in form validations? It can really help you manage the state of your forms.

- **[react-use](https://github.com/streamich/react-use)** – Not a single Hook, but a colletion of many different (contains Hooks for interacting with sensors, UI, state etc.) 

- **[useHooks.com](https://usehooks.com/)** – This website presents third-party Hooks every once in a while with simple examples


https://overreacted.io/making-setinterval-declarative-with-react-hooks/

https://github.com/rehooks/awesome-react-hooks#packages

Also popular npm packages like *Redux* and *React Router Dom* have recently created their own custom hooks to simplify their use.
