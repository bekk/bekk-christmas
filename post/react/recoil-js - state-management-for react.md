---
calendar: react
post_year: 2020
post_day: 10
title: Recoil.js - State management for React 🔥
image: https://images.unsplash.com/photo-1496816877232-460195b16fb8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1554&q=80
ingress: ""
description: ""
links:
  - url: https://youtu.be/_ISAA_Jt9kI
    title: Dave McCabe`s presentation of Recoil
authors: []
---
### What is Recoil ?

[Recoil.js](https://recoiljs.org/) is a new state management library for [React](https://www.google.com/search?q=reactjs&rlz=1C5CHFA_enNO890NO890&oq=reactjs&aqs=chrome..69i57j0l4j69i60l3.1252j0j7&sourceid=chrome&ie=UTF-8) — offering a React-ish API and a simple and powerful way of dealing with global, asynchronous and derived state 🔥

Recoil aims to solve some specific challenges when working with modern React apps like *flexible shared state*, *derived state* and *global observation*. And like React, the original Recoil team works at Facebook. 

If you have worked with React it should seem familiar. Just take a look at this example. First we use React with `useState()` to increment a number:

```js
// React and setState

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};
```

Now, making our state global is pretty straightforward using Recoil. All we need to do (almost 😇) is to replace `useState` with `useRecoilState`.

```js
//React and Recoil

const Counter = () => {
  const [count, setCount] = useRecoilState(myGlobalCounterState); ⬅

  return (
    <>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};
```

That's pretty cool! Not convinced? Keep on reading... 😄



### Using Recoil - Examples

The examples below are taken from a simple demo application called FoodTalk. The app lets you sort, filter and search for recipes. Take a look at the [demo](https://emilmork.github.io/recoil-foodtalk-demo/) or the source code on [github](https://github.com/emilmork/recoil-foodtalk-demo).

![](/assets/screen-shot-2020-12-08-at-8.40.35-pm.png)

Its a simple app, but it uses Recoil to solve some known challenges pretty well.


##### Atoms

An atom is simply a piece of state. It's like using react's `useState()`, except that any component can subscribe to it. By updating the atom value, all subscribed components will be re-rendered. In our recipe application we use atoms to store different types of state, like a search input:

```js
// store.js
import { atom } from "recoil";

export const searchState = atom({
  key: "searchStateKey",
  default: "",
});
```

To read and write to this atom we use `useRecoilState`.

```js
import { useRecoilState } from "recoil";
import { searchState } from './store';

export default () => {
  const [search, setSearch] = useRecoilState(searchState);

  return (
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
};
```

##### Selectors

Our application need to handle a combination of state (derived state), and that's when we use a selector. In our recipe application we use a selector to return a filtered list of our recipes. Selectors are also memoized, making sure our performance is maintained.

```js
import { selector } from "recoil";

export const filteredRecipesState = selector({
    key: "filteredRecipes",
    get: async ({ get }) => {
      const recipes = await fetchRecipes(); // async

      const searchValue = get(searchState); // sync

      return recipes
          .filter(r => r.name.indexOf(searchValue) >= 0);
    },
  });
```


We can use the same `useRecoilValue()` on selectors as we do on atoms.
The cool thing here is that if our search state changes, our selector state will trigger a change as well.

```js
const { useRecoilValue } from 'recoil';

const Recipes = () => {
  const filteredItems = useRecoilValue(filteredItemsState);

  ...
};
```

Finally we need to add some spinners with React Suspense, which is supported out of the box.

```js
<ErrorBoundery>
 <Suspense fallback={<span>Loading..</span>}>
   <Recipes />
 </Suspense>
</ErrorBoundery>
```
Take a look at [github](https://github.com/emilmork/recoil-foodtalk-demo) to see all the code, which is also written in TypeScript. 😁

### So what's great about Recoil ?

Libraries for React are constantly appearing, but [Recoil.js](https://recoiljs.org) is much more than “just another library”. Compared to other state libraries for React, Recoil feels like a fresh breath from the future - and it's great in so many ways:

#### Tailored for React

Recoil is made specifically for React and offers close compatibility with features like React Concurrent mode and React Suspense as we saw in the example. The team also claims to support new React features as they become available.

#### Easy to learn

When I tried Recoil I realized how complicated and difficult other state libraries like Redux were.

Recoil offers a simple API, with semantics and behavior in a known reactish manner. It also comes "boilerplate-free". All you need to get started is to wrap your code with RecoilRoot.

```js
import { RecoilRoot } from "recoil";

ReactDOM.render(
    <RecoilRoot> ⬅️
      <App />
    </RecoilRoot>,⬅️
  document.getElementById("root")
);
```

#### Flexible and powerful

The concept of atoms let us isolate state in small pieces, making it very flexible. By using selectors we can easily combine pieces of state and move between being synchronous and asynchronous without modifying the components. It's also easy to observe and/or persist the entire state - which use be used to synchronize our state with a server or debug our app with time travel.


Read more about the motivation for Recoil [here](https://recoiljs.org/docs/introduction/motivation).


### Final thoughts

The concept of derived state is very powerful, and atoms and selectors let you build a flexible and maintainable application. Its super easy to get started, and it really feels like a natural extension of React. It might not be a silver bullet, but if you need a way to handle distributed state in a simple manner - Recoil is your friend. 👍

Recoil is still in alpha and parts of the API might change, but based on the fact that Recoil is created by a Facebook team and currenty has 10k stars on github - I would say it’s pretty safe to try out.  😄 


I recommend watching [Dave McCabe's presentation of Recoil](https://youtu.be/_ISAA_Jt9kI). He explains why they made Recoil and demonstrates the power of atoms and selectors.





