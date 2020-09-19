---
calendar: react
post_year: 2020
post_day: 1
title: Using contexts for fun and profit
image: 'https://images.unsplash.com/photo-1542140444983-a13f273047a8'
ingress: >-
  Context used to be a bad word. Now, everybody is using it to re-implement
  Redux. Here's a great way to create contexts that are contained, compact and
  easy to manage.
links:
  - title: The official context docs
    url: 'https://reactjs.org/docs/context.html'
  - title: How to use React Context effectively
    url: 'https://kentcdodds.com/blog/how-to-use-react-context-effectively'
authors:
  - Kristofer Giltvedt Selbekk
---
React has always had its strengths and weaknesses. Back in the good ol' days, when [mixins weren't considered harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html), one of the biggest grievances was that you had to pass shared state from the very top of your app, where you stored the important stuff, to the leaf components that rendered the data.

To solve this, there was something called the unofficial, do-not-use, very unofficial [context API](https://react.christmas/2017/18), and some libraries, like Redux, used this feature to great success. Even though it was [documented](https://reactjs.org/docs/legacy-context.html), it came with a big fat warning up front that you probably shouldn't. The original API was clunky and hard to use, and it was never meant as a user-facing feature. It was added because of necessity, but it was always scheduled for deprecation.

Today, we have better tools at our disposal. The new context API was released in [16.3.0](https://github.com/facebook/react/pull/11818), and came with the concept of a context provider and consumer. With the addition of hooks in 16.8, we could even consume the context via a hook, improving developer ergonomics even further. 

This article is going to dive into what a context is, when you should be reaching for them, and the best way to create them.

## What is a context, really?

I've always described contexts as React's wormhole. You pass some value into it, nest some component tree inside of it, and then you can retrieve those values without having to pass them as props. It's magic, really.

Another way to think of contexts is that they work as a "shortcut" for your code. They can help you create smoother APIs, and disconnect component structures from your data flow.

However you think of contexts though, they are a very useful feature in React. A feature that isn't used often enough, in my opinion.

## When should you be reaching for a context?

The Context API is a great tool to use when you don't want to pass a value directly by props. There are several use-cases for that:

### When you have shared state

Context is a great tool for those situations where you have a piece of state that needs to be shared across your application. The current language or color scheme, for instance, are great examples of this kind of state.

You can also use contexts at a lower level, for any given part of your application, so don't feel you need to have all those Providers in your `index.tsx` file.

### When you create compound components

Sometimes, you create components that go together. You need to share some information between them, but you don't want to pass the same prop for all of them. 

My favorite example of this is form controls and IDs. The label needs to know the ID of the input field it describes, and any error messages or further description elements also require it for setting the correct aria-tags. Passing it manually is an error-prone process, and just passing it in to a top-level component would be much more preferable.

## The single-file 'text-n-hook

Okay, so we've covered what a context is and when it's a good tool to have. But what's the best way to structure them?

I came across this [wonderful article](https://kentcdodds.com/blog/how-to-use-react-context-effectively/) by Kent C. Dodds some time ago, and this approach is heavily influenced by that article. It's definitely recommended reading (if you have time to spare after reading all of these advent calendar articles, that is 😅). 

This technique creates a single file that only exposes two things - a context provider and a consumer hook. It doesn't expose the underlying context object, and it has no fallback value in case you forgot to do something. 

Here's an example, where we create a language switcher:

```jsx
const LanguageContext = React.createContext();

export const LanguageProvider = ({ 
  defaultLanguage = 'en', 
  children 
}) => {
  const [language, setLanguage] = React.useState(props.defaultLanguage);
  const contextValue = React.useMemo(
    () => ({ language, setLanguage }), 
    [language]
  );
  return (
    <LanguageContext.Provider value={contextValue}>
      {props.children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("You have to wrap this component in a LanguageProvider");
  }
  return context;
}
```

That was a lot of code - so let's go through it step by step:

```jsx
const LanguageContext = React.createContext();
```

This is where we create the context itself. Note that we don't pass a default value to the context - that's an intentional choice. Although there are cases where a default value would make sense, I typically avoid  it. This way, I can warn the developer that they have forgotten to wrap some part of the app in the provider.

```jsx
export const LanguageProvider = ({ 
  defaultLanguage = 'en', 
  children 
}) => {
  const [language, setLanguage] = React.useState(defaultLanguage);
  const contextValue = React.useMemo(
    () => ({ language, setLanguage }), 
    [language]
  );
  return (
    <LanguageContext.Provider value={contextValue}>
      {props.children}
    </LanguageContext.Provider>
  );
}
```

This is the Provider-component. It's responsibility is to contain the state we're passing down, and then passing that value into the context we created in the last step.

You might notice that we're wrapping the context value in a call to the `React.useMemo` hook. This is done to avoid unnecessary re-renders. If we skipped it - all consumers of this context would re-render whenever this provider re-rendered. And even though you shouldn't pre-optimize too much, wrapping contexts in `useMemo` like above is usually a safe bet.

Note that you could go a bit overboard with optimizing for as few re-renders as well. You could - in theory - create two different contexts, one for the value, and one for the update-function, so that components that only deals with changing the value instead of displaying it would avoid re-renders. It's not an approach I've ever found an actual use-case for, but it's a cool trick to know about. Just don't do it because it said so on the internet.

```jsx
export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("You have to wrap this component in a LanguageProvider");
  }
  return context;
}
```

The last part of the puzzle is the consumer hook. Here, we use the `React.useContext` hook to retrieve the context value. We add a check to make sure the developer using this hook has remembered to wrap it in a provider component (it's an easy mistake!), and then just return the context.

I like to pass down the "raw" values and updater functions via context, and create better abstractions in the hook. This way, I can create new hooks based on the same API, and I let the final API be up to the hook, not the provider. There wasn't much of a need for that in this example though!

With these parts, you'll have all you need to create really nice contexts with a very terse, concise API. All you expose are two items - a context provider and a hook to get that value back. That's pretty neat!

I hope this article gave you a few new techniques for dealing with contexts. Thanks for reading!


