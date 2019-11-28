---
calendar: react
post_year: 2019
post_day: 3
title: Get started with animations in React
image: >-
  https://images.unsplash.com/photo-1516659836501-0d5acdca89ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80
ingress: >-
  Have you never been able to make that menu appear in the awesome way you've
  always wanted? Perhaps you've got lots of experience making things move with
  CSS animations, but you want to learn how (or if) a modern animations library
  would make your life easier? Or perhaps you just want to have fun and learn
  how easy it is to animate elements in React using Framer-Motion? Then read on!
  I won't give you all the answers, but I'll try to get you started.
authors:
  - Bendik Bjørndal Iversen
---
There are several approaches on how to make things move in a React app, and Framer-Motion an amazing library that will get you started really quickly. It is the successor to the popular library Pose, and while Pose is  marketed as “A truly simple animations library for React”, the creators of Framer-Motion claims that “Motion attempts to make the API even simpler for the simplest cases, yet more flexible to handle the most advanced”. In other words, even if you already know Pose it may be valuable to learn and start using Framer-Motion instead. Also, there are similarities, so the switch should not be too comprehensive. But enough chit chat, lets get started with some code examples!

Framer Motion let's you implement animations to your app by having a "motion component" for each HTML-element that exists, and by adding different props supported by the Framer API to the components, you can  easily add things like drag, hover, transitions and more to the elements. 

A simple example is given below, where a `div` containing a simple square is replaced by a `motion.div` with two Motion specific props: `whileHover` and `whileTap`:

<iframe
  src="https://codesandbox.io/embed/example-1-simple-hover-3uf4x?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

Making transitions to elements is also fairy simple using the `animate`-prop, shown in the example below. The prop takes an object, which in the example contains two properties: `x` and `rotate`. `x` is here an array containing 5 values, which represents 5 keyframes. There are several other properties supported by the object passed to the `animate`-prop, such as `y`, properties for setting the acceleration of the element, scale, opacity etc. The `transition` prop is used to configure the animation, and is in this case used to specify the duration of the animation (1.5 seconds) and how many times the animation should run (infinitely).

<iframe
  src="https://codesandbox.io/embed/amazing-robinson-zokwh?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

I mentioned drag, so let's do a drag-example. Again, we use the motion component of a `div`-element, and adding drag to an object is as easy as adding the `drag` prop to the element. In the example, we only want to be able to drag the square horizontally, so we set the property to `"x"`. We can control how far we are allowed to drag the element by providing the `dragConstrains` prop, which in the example is set to `[-150px, 150px]`.

<iframe
  src="https://codesandbox.io/embed/example-3-simple-drag-9tin5?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

## Example 4

<iframe
  src="https://codesandbox.io/embed/example-4-drag-with-motionvalue-s55j7?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

## Example 5

<iframe
  src="https://codesandbox.io/embed/example-5-menu-1kqgp?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>
