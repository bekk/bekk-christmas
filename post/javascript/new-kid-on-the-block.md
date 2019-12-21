---
calendar: javascript
post_year: 2019
post_day: 23
title: New kid on the block
image: 'https://images.unsplash.com/photo-1555813456-94a3dd418cd3'
ingress: >-
  The world of front end frameworks is [always
  evolving](https://2019.stateofjs.com/front-end-frameworks/). For years it was
  dominated by [jQuery](https://jquery.com/) and
  [Backbone](https://backbonejs.org/), but these days we hear most talk about
  [React](https://reactjs.org/) and [Vue](https://vuejs.org/). However, there is
  another framework that hasn't been talked about so much, namely
  [Svelte](https://svelte.dev/). Although this framework is actually three years
  old, it had a [rebirth in
  April](https://svelte.dev/blog/svelte-3-rethinking-reactivity) this year with
  the release of its third major version.
links:
  - title: Svelte.dev
    url: 'https://svelte.dev/'
authors:
  - Henrik Hermansen
---
## Rethinking reactivity

Svelte was created by [Rich Harris](https://twitter.com/rich_harris), a graphics editor in [The New York Times](https://www.nytimes.com/). While working with data visualization with loads of nodes and lots of small changes he encountered problems with performance. Frameworks like React and Vue use a [virtual DOM](https://www.codecademy.com/articles/react-virtual-dom) on which the framework can perform diffing and calculations to perform effecient updates of the DOM, seemingly in a reactive manner. This mostly works great, until a point where diffing and calculations actually becomes a bottle neck.
Rather than trying to improve this technique Rich wanted to change the way we think of reactive changes.

Rich took his inspiration from good old spreadsheets. When you change the value of a cell in a spreadsheet, the program instantly knows to update all cells referencing the changed cell. In order to achieve this Rich didn't just create a framework – he created a compiler. Svelte knows all dependencies between your variables and DOM nodes at build time. This means it can create code which surgically updates specific nodes in your DOM. Hence the virtual DOM is no longer needed. The DOM is actually really fast when you know exactly what needs to be done. And what's more, this will create smaller and faster applications.

## Svelte at a glance

Are you intrigued? Good. You should be. Now you know the core idea of what makes Svelte different, but I'm sure you're wondering what it looks like using Svelte. Much like React you will create components and each component has its own file. The basic structure of a Svelte component [looks like this](https://svelte.dev/repl/5d53fba8baa345c4bc5b4776dfd8f521?version=3):

```svelte
<script>
  let name = 'David';
</script>

<style>
  h1 {
    color: red;
  }
</style>

<h1>Hello {name}!</h1>
```

Because this is a component all code in your `<script>`- and `<style>`-tags are scoped. This means that the Javascript in this component won't affect other components, and your styling won't affect nodes from other components.
Outside the scripts and styling we have some templated HTML.

## What's with `let`?

Well _let_ me explain. By default Svelte expects data to be mutable. What if we wanted to add an input field to the code above to allow the user to specify his name? With React you would need to create a state and run a set-function every time you wanted to update it. With Svelte you simply bind your mutable value to an input field and [voilà](https://svelte.dev/repl/b1f0ebec4a9645f5a38d906b05d8bcf4?version=3):
```svelte
<script>
  let name = 'David';
</script>

<h1>Hello {name}!</h1>
<input bind:value={name} />
```

For simplicity I removed the `<style>`-tag in this example.

## Reactive declerations

One more thing you should know to truly make your Svelte code reactive is how to deal with reactive declerations. Say you want to show the users name in capital letters. Could you just [make another `let`](https://svelte.dev/repl/e6439904f18f453e80feab69b371d0ea?version=3)?

```svelte
<script>
  let name = 'David';
  let capitalLetters = name.toUpperCase();
</script>

<h1>Hello {name}!</h1>
<input bind:value={name} />
<p>Your name in capital letters: {capitalLetters}</p>
```

If you run this code you would see the text _Your name in capital letters: DAVID_, but sadly this would not react to changes in the input field. In functional React components all your code runs on every render. In Svelte components your code only runs once.

When the value of the input field changes, there's no need to re-render the component. What happens is very straightforward:
* the value of `name` changes
* the text in the `h1` node is updated

But Svelte has no way of knowing you also have an expression that depends on `name`. To solve this, Svelte borrows the [Javascript label syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) to introduce [the reactive decleration syntax](https://svelte.dev/docs#3_$_marks_a_statement_as_reactive) `$:`.

With this in hand it really is a piece of cake to make [reactive declerations](https://svelte.dev/repl/05a3a7d8c467492c8fcbfe3819edaaf1?version=3):

```svelte
<script>
  let name = 'David';
  $: capitalLetters = name.toUpperCase();
</script>

<h1>Hello {name}!</h1>
<input bind:value={name} />
<p>Your name in capital letters: {capitalLetters}</p>
```

## Is this all?

No, no. That was just the basics. Svelte is actually rich on features. Both in terms of possibilities in the [template syntax](https://svelte.dev/docs#Template_syntax) and helpful [features](https://svelte.dev/docs#Run_time) you can import to your Javascript.

What I personally loved the most when I started making something with Svelte was how easy it was to add transitions. Although I am capable of making transitions with CSS, I loved how I could just throw in an [element directive](https://svelte.dev/docs#Element_directives), and [it just worked](https://svelte.dev/repl/7bb21f2434c645fea09461b5af1aedb2?version=3):

```svelte
<script>
  import { fade } from 'svelte/transition';
  let showMessage = false;
</script>

<input type="checkbox" bind:checked={showMessage} />

{#if showMessage}
<div transition:fade>
  Hello world!
</div>
{/if}
```

I could go on for a while about all the built-in functionality of Svelte, but I'd rather you go [try it for yourself](https://svelte.dev/tutorial/basics).

P.S. if you're intrigued and curious, but feel guilty for betraying your current framework of choice, don't worry. Svelte was actually awarded the [Prediction Award](https://2019.stateofjs.com/awards/prediction_award) in this years state of JS, so you're not alone.
