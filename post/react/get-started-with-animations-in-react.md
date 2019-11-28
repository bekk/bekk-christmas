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
There are several approaches on how to make things move in a React app, and Framer-Motion an amazing library that will get you started really quickly. It is the successor to the popular library Pose, and the creators of Framer-Motion claims that “Motion attempts to make the API even simpler for the simplest cases, yet more flexible to handle the most advanced”. 

Framer Motion let's you implement animations to your app by having a "motion component" for each HTML-element that exists, and by adding different props supported by the Framer API to the components, you can  easily add things like drag, hover, transitions and more to the elements. 

A simple example is given below, where a `div` styled as a simple square is replaced by a `motion.div` with two Motion specific props: `whileHover` and `whileTap`. These props both take objects that can contain various properties depending on the desired behaviour when tapping and hovering the element. In the example, perhaps the simplest property is used: `scale`.

<iframe
  src="https://codesandbox.io/embed/example-1-simple-hover-3uf4x?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

Making transitions to elements is also fairy simple using the `animate`-prop, as shown in the example below. Again, the prop takes an object (most/all of them do), which in the example contains two properties: `x` and `rotate`. Here, `x` is an array containing 5 values, each representing a keyframe in the animation. There are several other properties supported by the object passed to the `animate`-prop, such as `y`, scale, properties for setting the acceleration of the element, opacity etc. The second prop, `transition`, is used to configure the animation. In this case it is used to specify the duration of the animation (1.5 seconds) and how many times the animation should run (infinitely).

<iframe
  src="https://codesandbox.io/embed/amazing-robinson-zokwh?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

I mentioned drag, so let's do a drag-example. Again, we use the motion component of a `div`-element, and adding drag to an object is as easy as adding the `drag` prop to the element. In our example, we're allowed to drag the square in the horizontal direction, which is achieved by setting the property to `"x"`. We can control how far we are allowed to drag the element by providing the `dragConstrains` prop.

<iframe
  src="https://codesandbox.io/embed/example-3-simple-drag-9tin5?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

It is possible to "hook into" a motion component and acquire motion values associated with it, such as the position and velocity. How? You guessed it: Using a hook! Let's continue working with the previous example and see how we can use the drag position of the an element to animate another element.

The motion elements all use `MotionValue`'s to track its state and velocity, and while these are created automatically by default, we can create one using a `useMotionValue`-hook and pass it to a motion element explicitly. This way, we have direct access to the state of the element. This is done in the following example, where the `MotionValue` `sliderXVal` is passed to the drag element by giving it the following the prop: `style={{x: sliderXVal`}}. Then, we can access the actual value using `sliderXVal.get()` and animate another element using this value. 

In the example below we define a state which we update to the current value of the `MotionValue` using a `useEffect`-hook and the `onChange`-method of `MotionValue`s, to be able to trigger a new render each time the motion value changes.

<iframe
  src="https://codesandbox.io/embed/example-4-drag-with-motionvalue-s55j7?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>

## Example 5

<iframe
  src="https://codesandbox.io/embed/example-5-menu-1kqgp?codemirror=1&hidedevtools=1&hidenavigation=1&view=preview&editorsize=50"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
></iframe>
