---
calendar: react
post_year: 2020
post_day: 21
title: /** Make the nice list with JSDoc */
image: https://images.unsplash.com/photo-1468779036391-52341f60b55d
ingress: Documenting stuff is important, folks! Where would Santa be without his
  naughty and nice list? Let's spend a few minutes learning how you can improve
  the user experience of your components by adding a slash and a couple of stars
  in front of it!
description: Learn how to document your React components with JSDoc in this
  short, Christmas-themed article
links:
  - title: JSDoc spec
    url: https://jsdoc.app/
authors:
  - Kristofer Giltvedt Selbekk
---
If writing good code is hard, understanding somebody else's code, and how to use it, is often bordering on impossible. Even your own code a few weeks down the road is often a weird blend of naming conventions and different ways to do the same thing. 

It's not really the developer's fault either - there's a lot of research, thinking and just general context that was present when the code was written, that just isn't available anymore when you write that `git commit` command and move on.

**That's why it's imperative that we document the code that we write**. We need to include some of that context into our code somehow, while not  
clobbering our code with verbosity that'll just be made obsolete by the next commit anyhow.

Another thing about documentation, is that it needs to be readily available when you need it. Nothing will ruin your flow state like trying to google some obscure component name to figure out how it's used. 

Luckily, there's a solution that makes all of this possible, and it's built into your favorite editors: JSDoc.

Before we dive into why JSDoc is the bees knees though, let's look at how a component documented with JSDoc looks like when it's used:

![A screencast showing how JSDoc will show up in your editor when you use a React component](https://s8.gifyu.com/images/2020-12-03-20.57.09.gif)

Looks sweet, right? Here's another example of the same with component props:

![A screencast showing how JSDoc will show up in your editor when you browse props](https://s8.gifyu.com/images/2020-12-03-21.03.47.gif)

Getting documentation to show up like this is incredibly useful. You can provide all the context in the world, and it will only show up when it's useful.

My favorite example from "the wild" is Firebase's JavaScript SDK - they have tons of useful documentation that show up right in the editor!

## How to JSDoc

So how do you make this magic text to show up whenever people use your code? It's as easy as `/**/`.

Let's start with an example React component:

```tsx
const MessageBox = (props) => {
  return (...);
}
```

To document this fancy component (or any function, really), start a block comment with two consecutive stars, and start writing:

```tsx
/** A box that shows messages 
  * 
  * Show messages in a sassy new way!
  */
const MessageBox = (props) => {
  return (...);
}
```

If you ever use your `MessageBox` component, that text will show up right when you need it - that is, when you're using it.

Note that this block has **full support for markdown**, so you can add formatting like code highlighting, links, tables, text formatting and even images if you want.

Next, let's document those props! It uses the same slash and double star syntax, and supports the same Markdown:

> I'm a huge fan of using TypeScript, so the following example uses that - but you can use the same technique on `propTypes` if that's your preference.

```tsx

type Props = {
  /** The mood of your `MessageBox`
    * 
    * The different variants map to different use cases. If unsure, use `normcore`
    */
  variant: 'normcore' | 'happy' | 'grumpy' | 'evil'
};

/** A box that shows messages 
  * 
  * Show messages in a sassy new way!
  */
const MessageBox = (props: Props) => {
  return (...);
}
```

And like that, you have incredibly useful component documentation embedded in your codebase. If you ever need to update a prop, the documentation is co-located, so it'll be easier to remember to update the documentation as well. If you delete a component, the documentation is deleted with it.

## Fancy tags

If you want to be all fancy about your JSDoc, there are some special tags you can use to provide even more meaning to your code:

If you want to stop people from using a particular prop, component or function, you can mark it as `@deprecated`. In VS Code, any usages will receive ~strikethrough~ text styling, and it will show up on hover as well.

Another great tip is to provide examples of usages. You can do that with the `@example` tag! 

```tsx
/** Some function
  * 
  * @example
  * add(2, 4)
  * // returns 6
  */
function add(a, b) { return a + b }
```

You can even give it a heading with the `<caption>` tag:

```tsx
/** Some function
  * 
  * @example <caption>Add two numbers</caption>
  * add(2, 4)
  * // returns 6
  * 
  * @example <caption>Add three numbers</caption>
  * add(2, 4, 6)
  * // returns 12
  */
function add(a, b, c = 0) { return a + b + c }
```

There are tons of other tags as well, but this will (in combination with the Markdown support) definitely make your code more readable

## Go document

Santa has a pretty cool gig. Once he gets going, he doesn't stop to google who gets presents, and who gets lumps of coal. He just glances over at his naughty or nice list, and instantly knows what to do. He did the work before the work began, and if he gets sick, Mrs Clause can fill his shoes without asking Santa for a ton of context first.

Be like Santa. Write your list and use JSDoc to do it. Thanks for reading 🎅

