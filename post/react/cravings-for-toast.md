---
calendar: react
post_year: 2019
post_day: 20
title: A recipe for toasts
links:
  - title: Create react app
    url: 'https://github.com/facebook/create-react-app'
  - title: Context Docs from React
    url: 'https://reactjs.org/docs/context.html'
---
Toasts are great, so simple but yet so useful. It is for many a part of their daily life, which is why we will today provide one of the quickest and simplest recipes for making toast. Let's dive in.

## The ingredients

The following ingredients are needed:

* Context API
* Hooks

I would like to clarify that we are going to build a toast notification system using the **context api** and **hooks** from react just to avoid any confusion with regular, delicious toast. These are relatively new tools which makes life a whole lot easier when working with both small-scale and especially large-scale code. A very brief explanation of each tool is:

**Context API -** A state management system that fixes many problems or annoyances that comes with handling different components state. The most basic approach for managing state is that each component uses `React.setState(..)` to handle its own internal state. But this can get messy real quick which is why tools such as e.g Redux are used, but these tools are not perfect either. This is where the Context Api comes in, trying to make these imperfections a bit better just to ease state management a little more.

**Hooks -** React hooks are basically functions that lets the user build functional components that can implement state and lifecycle features that were previously only available to components created by `React.createComponent()`. There are however some 'issues' with components created by `React.createComponent()`, e.g that its hard to reuse logic in the lifecycle functions. This is why, long story short, hooks came about.

## Recipe preparation

To get started one can for example use create-react-app (CRA) to quickly get going. More information about CRA can be found in the links below. The boilerplate code that gets rendered is:

```
function App() {
  return(
    //Boilerplate stuff, everything here gets rendered
  )
}
```

The goal is to make `App()` render toasts whenever needed, and for this we need two things:

1. A function that returns a toast.
2. A state where toasts can be saved and managed.

For the sake of simplicity, the function that returns a toast will be as simple as:
```
function ToastBody() {
  return (
    <div className="....">
      i am a toast
    </div>
  )
}
```
Creating the state and managing it will be a bit tricker than that, let's start by creating a new file `Toast.js` where we implement the aforementioned points with the Context api.

First we create the context:
```
const ToastContext = createContext();
```
The context works by having **Providers** and **Consumers**. The **Provider** shares its values with its children, which are called **Consumers**, without explicitly having to send them down as props. Consider the following:
```
const ToastProvider = (props) => {
  const foo = ... // This is the value that gets sent down to the children/consumers
  return (
    <ToastContext.Provider value={foo} >
      {props.children}
    </ToastContext.Provider>
  );
}
```
The idea here is that we can wrap any component with the `ToastContext.Provider`   and get whatever is passed through the `value`-prop. Neat, huh?

For the toast notification system, we need to able to store things in a state but also handle the state with different types of actions. Think of actions as e.g adding a notification to the state or removing one. Here is where we can use the `useReducer`-hook.
```
const toastReducer = (state, action) => {
  const { payload, type } = action
  switch(type){
    case 'ADD_TOAST':
      return [...state, payload]
    case 'REMOVE_TOAST':
      return state.filter(toast => payload.id !== toast.id)
    default:
      return [...state]
  }
}
```

TODO: skriva klart
