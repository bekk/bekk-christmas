---
calendar: react
post_year: 2019
post_day: 3
title: Get started with animations in React
image: >-
  https://images.unsplash.com/photo-1478700485868-972b69dc3fc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=3300&q=80
ingress: >-
  Have you never been able to make that menu appear in the awesome way you've
  always wanted? Perhaps you've got lots of experience making things move with
  CSS animations, but you want to learn how (or if) a modern animations library
  could make your life easier? Or perhaps you just want to have fun and see how
  easy it is to animate elements in React using Framer Motion? Then read on!
  This article won't give you all the answers, but hopefully it will help you
  getting started.
links:
  - title: Framer Motion documentation
    url: 'https://www.framer.com/api/motion/'
authors:
  - Bendik Bjørndal Iversen
---
Framer Motion is a popular animations library for React that is simple enough to get you started quickly with implementing actual animations in your app, yet has enough features and possibilities to support more advanced use-cases. The library has a "motion component" for each HTML-element that exists, and lets you implement animations by adding various Framer-specific props to the components to get things like drag, hover, transition effects, and more. This article will present code examples of some of the things you can do with Framer Motion.

A simple example is given below, where a `div` styled as a simple square is replaced by a `motion.div` with two props: `whileHover` and `whileTap`. These props both take objects that can contain various properties depending on the desired behaviour of the element. In the example, a single `scale` property is used to control the size of the element.

<iframe
  src="https://codesandbox.io/embed/example-1-simple-hover-3uf4x?codemirror=1&hidedevtools=1&hidenavigation=1&autoresize=1&fontsize=14"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

Animating transitions on elements is also fairly simple using the `animate`-prop, as shown in the example below. Again, the prop takes an object (all of them do), which in the example contains two properties: `x` and `rotate`. Here, `x` is an array containing 5 values, each representing a single keyframe in the animation. There are several other properties supported by the `animate`-prop, such as `y`, `scale`, properties for setting the acceleration of the element, `opacity` etc. The second prop, `transition`, is used to configure the animation itself. In this case, it is used to specify the duration of the animation (1.5 seconds) and how many times the animation should run (infinitely).

<iframe
  src="https://codesandbox.io/embed/amazing-robinson-zokwh?codemirror=1&hidedevtools=1&hidenavigation=1&autoresize=1&fontsize=14"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

I mentioned drag, so let's do a drag example. Again, we use the motion component of a `div`-element, and adding drag to an object is as easy as adding the `drag` prop to the element! In our example, the drag is restricted to the horizontal direction, which is achieved by setting the property value to `"x"`. We can control how far we are allowed to drag the element by providing the `dragConstrains` prop.

<iframe
  src="https://codesandbox.io/embed/example-3-simple-drag-9tin5?codemirror=1&hidedevtools=1&hidenavigation=1&autoresize=1&fontsize=14"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

A motion element uses a `MotionValue` to track its state and velocity, and while it is created automatically by default, we can create one using a `useMotionValue`-hook and pass it to a motion element explicitly. This way, we have direct access to the state of the element. This is done in the following example, where the MotionValue `sliderXVal` is passed to the drag element by giving it the following prop: `style={{x: sliderXVal`}}. Now, we can access the actual value simply by calling `sliderXVal.get()`, and in the example we utilize this to animate another element based on the position of the drag element.

In the example, we also define a state which is updated to the current value of the MotionValue each time the MotionValue changes, using a `useEffect`-hook and the MotionValue's `onChange`-method, to be able to continuously trigger new renders for every update:

<iframe
  src="https://codesandbox.io/embed/example-4-drag-with-motionvalue-s55j7?codemirror=1&hidedevtools=1&hidenavigation=1&autoresize=1&fontsize=14"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

I started this article talking about animating a menu, so let's end the circle and finish off with a simple menu example! However, first we need to talk a bit about something Framer calls "variants". 

Variants is a powerful feature in the Framer Motion API, which is basically an object that can contain multiple "animation states". Say you want to orchestrate animations in your app based on some criterias, actions from a user etc. Then you can define an animation state for each scenario and use variants to conditionally animate your motion element!

An example of a variant object is seen below. Here, we have declared two simple animation states, "open" and "hidden":

```js
const menu_variants = {
    open: { opacity: 1 },
    hidden: { opacity: 0 }
  };
```

Variant objects needs to be passed to the `variants`-prop of a motion element. Simply doing this, while setting the `animate`-prop as either of the states in the variants object, would animate the element according to the values of the chosen state! This lets us set the animation state conditionally, for instance depending on whether a button is clicked or not. Such as hiding or displaying a menu, which is implemented in the very last example!

<iframe
  src="https://codesandbox.io/embed/example-5-menu-1kqgp?codemirror=1&hidedevtools=1&hidenavigation=1&autoresize=1&fontsize=14"
  style="width:100%; height:300px; border:none; border-radius: 5px; overflow:hidden;"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

This was just a quick walkthrough of some of the possibilities you get with Framer Motion. If you want to learn more, I recommend taking a look at some of the examples in the documentation and start experimenting on your own!