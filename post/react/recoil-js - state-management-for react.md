---
calendar: react
post_year: 2020
post_day: 10
title: "[Draft] Recoil.js - State management for React 🔥"
image: https://images.unsplash.com/photo-1496816877232-460195b16fb8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1554&q=80
ingress: Recoil is a new state management library for React — offering a
  React-ish API and a simple and powerful way of dealing with global,
  asynchronous and derived state.
description: ""
authors: []
---
### What is Recoil ?

Recoil is a new state management library for React  (link)— offering a React-ish API and a simple and powerful way of dealing with global, asynchronous and derived state.

Recoil aims to solve some specific challenges when working with modern React apps like flexible shared state, derived state and global observation.

### What's great about Recoil ?

State libraries for Ready are constantly appearing, but I quickly realized that Recoil was much more than just “another library”. Compared to other state libraries for React, Recoil feels like a fresh breath from the future - and it's great in so many ways:

##### Tailored for React

Recoil is made specifically for React and offers close compatibility with React Suspense, Concurrent mode and claims to support new React features as they become available.

* react suspense
* Concurrent mode

##### Easy to learn

When I tried Recoil I realized how complicated and difficult other state libraries like Redux really was. 

* The API is 
* Boilerfree

Recoil offers a boilerplate-free API where shared state has the same simple get/set interface as React local state. All you need is to wrap you code with RecoilRoot:

```js
import { RecoilRoot } from "recoil";
import App from "./App";

ReactDOM.render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
  document.getElementById("root")
);
```

### Example and code

I have made a demo application with React and Recoil which I use as a starting point to illustrate the use of Recoil. The app lets you sort, filter and search for recipes. Take a look at the [demo](https://emilmork.github.io/recoil-foodtalk-demo/) or the source code on [github](https://github.com/emilmork/recoil-foodtalk-demo).

##### Atoms

An atom is simply a piece of state. It's exactly like react setState, except that it can be subscribed by any component. By updating the atom value, all subscribed components will be re-rendered. In our recipe application we use an atom to store our search text value:

```js
import { atom } from "recoil";

export const searchState = atom({
  key: "searchStateKey",
  default: "",
});
```

To read and write to this atom we use a hook called `useRecoilState`.

```js
import { useRecoilState } from "recoil";

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

Selectors is a piece of derived state. Just like a pure function, selectors can modify existing state and return something new instead. In our recipe application we use a selector to combine different filters to return a filtered list of recipipes.

```
import { selector } from "recoil";

export const filteredRecipesState = selector({
    key: "filteredRecipes",
    get: ({ get }) => {
      const recipes = await fetchRecipes(); // async
    
      const searchValue = get(searchState); // sync
  
      return recipes
          .filter(r => r.name.indexOf(searchValue) >= 0);
    },
  });
```

We can use the useRecoilValue() hook to read the value of filteredRecipesState.
The cool thing here is that if our search state changes, our selector state will trigger a change as well. 

```js
const { useRecoilValue } from 'recoil';

const Recipes = () => {
  const filteredItems = useRecoilValue(filteredItemsState);

  ...
};

```