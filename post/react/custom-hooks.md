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
  others), but also provided the possibility to create your very own hooks –
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

Suppose you want to create an app that keeps track of a value even after a page refresh. This can easily be done by taking advantage of [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) in a browser. A Custom Hook for this may look like the following:

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

Like all the pre-defined hooks in the `react` package, a Custom Hook's name should always start with the phrase "use", making them distinguishable from other concepts in our website. *Custom Hook* sounds hardcore, but luckily for us, it is really just a fancy way of saying *"a function containing other hooks and/or some additional logic"* (and remember: Hooks don't work in class components).

If you would like to use the `useLocalStorage` hook from above, you could easily do so like this:

```javascript
const dayFromLocalStorage = useLocalStorage("day", 13);

dayFromLocalStorage.value;         // day: 13

dayFromLocalStorage.setValue(24);  // day: 24

```

The whole idea behind a Custom Hook is to support the reuse of stateful logic and to abstract away the implementation of something frequently used in your application.

## Popular Custom Hooks

At our client project, we use several Custom Hooks in our daily work. The most important aspect of using them is that they solve a typical problem in the application. These abstractions make sense for us in our daily work. However, there are some patterns that may be recognised even across projects, domains and countries. This is where popular Custom Hook packages come into play. Luckily for us, many have already started to develop comprehensive abstractions and black boxes for us. Let's take a look at the most popular:

- **[useForm](https://www.npmjs.com/package/react-hook-form)** – Ever struggled with state in form validations? It can really help you manage the state of your forms.

- **[react-use](https://github.com/streamich/react-use)** – Not a single hook, but a collection of many different (contains hooks for interacting with sensors, UI, state etc.) 

- **[useHooks.com](https://usehooks.com/)** – This website presents third-party Hooks every once in a while with simple but detailed examples.

Still, it is a joyful task to create your own Custom Hooks. For example, have a look at [how you can make setInterval declarative with Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/), or check out [what people already have done in other awesome react hook packages](https://github.com/rehooks/awesome-react-hooks#packages). 

And remember, by creating your very own Custom Hooks, you will automatically be just as cool and good looking as the *Redux* and *React Router Dom* npm packages, who have just recently created their own Custom Hooks to simplify their usage. Ho Ho Hoooooooks! 👊🎄
