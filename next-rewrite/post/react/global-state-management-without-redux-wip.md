---
calendar: react
post_year: 2019
post_day: 7
title: Manage Global State with Context API and Hooks
image: >-
  https://images.unsplash.com/photo-1491118217331-c147f566d809?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3084&q=80
ingress: >-
  For quite some time, Redux has been React developers go-to library for
  managing their app’s global state. It’s a great tool – but do you really need
  it?
links:
  - title: Redux - Not Dead Yet!
    url: 'https://blog.isquaredsoftware.com/2018/03/redux-not-dead-yet/'
  - title: You Might Not Need Redux
    url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367'
  - title: Mimic Redux using Context API and useReducer Hook
    url: 'https://vijayt.com/post/mimic-redux-using-context-api-and-usereducer-hook/'
authors:
  - Jonas Løchsen
---
## Global State – What? Why?

So, you have created a new JavaScript app? Cool. Using React? Even better! And filled it with several independent components? Awesome! If only there was a way for all of them to be friends and talk to each other in a convenient way.

This issue is a recurring one when developing new apps for the browser. How should a shared state between all the bits and pieces of your app be managed? Should you jump on the Redux bandwagon or should you explore other possible solutions? The questions are many. 

But first of all, what is a global state anyway? As we know, the typical way to pass data between disconnected components is through prop drilling. This is fine for a couple of levels down the component tree. But as soon as the complexity grows, so does the need for a global state. Imagine a component needing data that lies five levels above in the component tree. Passing props into each component on the way down would quickly become a nightmare. In addition to writing a lot of unnecessary code we would also give each component properties they will never use, which undoubtedly would become a huge mess. A global state would solve this by keeping a state at the top level and provide access methods to all child levels without the need to pass props.

Furthermore, with the global state now defined, what kind of data should live there? Although we now have enabled the possibility to share state globally it doesn't necessarily mean that all of your app's state should be shared. It's rather the opposite. One should strive for the global state to only keep states that concerns the entire app – such as theme, language or other app-wide settings, to name a few. Other states should be kept locally or with contexts further down the component tree.

## To Redux or not to Redux

Redux has been around for over four years now and is still consuming the lion’s share of the state container market – at least for React apps. I refer to the [docs](https://redux.js.org/introduction/getting-started) on how Redux works as I will not delve into it here. It rapidly became very popular, which led many developers to thinking they _had_ to use it. And suddenly the world was filled with apps that hadn't taken into account the tradeoffs that Redux brings.

Redux is a comprehensive tool that is great for larger apps. It offers a centralized, predictable and immutable store, separates data from presentation, can be used for server-side rendering, has powerful DevTools and the ability to add middlewares to name a few of the features.

However, it comes at a cost. The library can be quite overwhelming at first glance and seem challenging to wrap your head around – at least it was for me. It is quite rigid in its design and requires a lot of boilerplate code to get going. Depending on what you wish to achieve with your global state, Redux might be overkill. If your goal is to manage a global state that all child components have access to without the need to pass props, then perhaps a different solution would suit you better.

## Cue React Context API and Hooks

This article will propose such a solution. By utilizing React’s own Context API we can create a global state management tool which resembles Redux, but in a much more lightweighted fashion.

From React’s own docs they say that _Context provides a way to pass data through the component tree without having to pass props down manually at every level_. Great! That sounds exactly like what we are looking for. In combination with the `useContext` and `useReducer` hooks we can create a global store that manages the entire app’s state and supports convenient ways to update the state throughout the app regardless of how deep the component tree goes.

![The Redux pattern](https://upload.wikimedia.org/wikipedia/commons/0/06/Ngrx-redux-pattern-diagram.png "The Redux Pattern. AAMINE1965 [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)]")

Even though we are searching for an alternative to Redux – we will make use of Redux’ core concepts. A store which will hold our state, actions with payload information sent from the application to the store, and reducers specifying how the state changes based on those actions. To show what this could look like we are going to use a simple counter example.

Let’s dive in.

### Setting up the store

In `store.js` we create our global state. This consists of two main ingredients: a context and a state. `createContext()` returns a `Provider` which in turn accepts a `value` prop. This `Provider` will later wrap our entire app. The `value` prop will receive our state which we will create with the `useReducer` hook. This hook accepts a reducer of type `(state, action) => newState` and returns the new state together with a dispatch function. If you are familiar with Redux you have probably seen this before. The reducer defines a set of actions and how the state should be updated depending on the action type. 

The `useContext` hook is how our components access the global store. At the end I have created a custom hook `useStore` so we don't have to export our `StoreContext` and import both that and `useContext` later. 

```jsx
// store.js
import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = {count: 0, message: ""};

const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return {
        count: state.count + 1,
        message: action.message
      }
    case "decrement":
      return {
        count: state.count - 1,
        message: action.message
      }
      case "reset":
        return {
          count: 0,
          message: action.message
        }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);
```

### Making the store globally accessible

To make our `store` accessible everywhere, we wrap our entire app in the `Provider` we just created.

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./store";
import { ChildComponent } from "./childComponent";

function App() {
  return (
    <StoreProvider>
      <ChildComponent/>
    </StoreProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

This way we can access `useStore` everywhere. As you can see, in `childComponent.js`, we extract both the state and the dispatch function from the store. `dispatch` needs the type of action to be called as well as any payload information such as `message` in this case. 

```jsx
// childComponent.js
import React from "react";
import { useStore } from "./store";

export const ChildComponent = () => {
  const {state, dispatch} = useStore();

  return (
    <div>
      {state.count}
      <button onClick={() => dispatch({type: "increment", message:"Incremented"})}>+</button>
      <button onClick={() => dispatch({type: "decrement", message: "Decremented"})}>-</button>
      <button onClick={() => dispatch({type: "reset", message: "Reset"})}>Reset</button>
      {state.message}
    </div>
  )
}
```

There you have it. A simple example that shows a Redux-like state management tool without the boilerplate. Pretty neat right? 

To make it even more explicit and simple we can define an API that takes care of the action dispatching for us.
```js
// storeApi.js
import { useStore } from "./store";

export const useCounter = () => {
  const {state, dispatch} = useStore();
  return {
    count: state.count,
    message: state.message,
    increment: () => dispatch({type: "increment", message:"Incremented"}),
    decrement: () => dispatch({type: "decrement", message: "Decremented"}),
    reset: () => dispatch({type: "reset", message: "Reset"})
  }
}
```
Here we have created a custom hook `useCounter` that accesses the store and returns the state variables and functions that dispatches the actions. In turn this hook kan be used where you need to access the state like this:
```jsx
const {count, message, increment, decrement, reset} = useCounter();
```
where the the actions can be called as regular functions, e.g. `increment()`.

I’ve added a CodeSandbox at the bottom for you to experiment with if you want.

## Conclusion

The purpose of this article is not to leave Redux for dead – cause it’s definitely not. Redux absolutely has its use cases and advantages. This is merely an alternate way to manage global state in a simpler way without the need of external libraries.

However, you have obvious drawbacks with this approach. First of all, it doesn't scale very well. In our example we only had one reducer with three actions holding two states. A real world app would probably need several more states and actions. You can, of course, add all these states to the existing reducer, but that would gradually develop into a maintainability nightmare. A solution would be to create several reducers; one for each group of states belonging together, and then combine them into a root reducer you pass into the `StoreContext`. You can either make this yourself or perhaps use `combineReducers` from Redux.

Another significant drawback is all of the tools Redux gives you out-of-the-box – such as DevTools, middlewares and large community support. But again, if your goal is just to connect all of your components and you can do without much of the fanciness of Redux, I find this solution to be quite reasonable, fast and practical.

<iframe
     src="https://codesandbox.io/embed/sleepy-fermat-m0zge?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fstore.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="sleepy-fermat-m0zge"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>