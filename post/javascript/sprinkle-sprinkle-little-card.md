---
calendar: javascript
post_year: 2020
post_day: 20
title: Sprinkle, Sprinkle, Little Card
image: https://images.unsplash.com/photo-1571197650032-cbc73669711b
ingress: "I work on the internal applications in Bekk, including a front page
  that shows key information about employees and the company. One of the
  sections shows upcoming birthdays, so you can congratulate your colleagues on
  their big day. But something was missing. You know, that little extra that
  tends to light up people’s faces. How about some confetti bursting out the top
  of your head? :tada: "
links:
  - url: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
    title: Introduction to the DOM
  - url: https://htmldom.dev/
    title: How to manage HTML DOM
  - url: https://kentcdodds.com/blog/super-simple-start-to-css-variables
    title: Super Simple Start to css variables
  - url: https://epicreact.dev/css-variables/
    title: Use CSS Variables instead of React Context
authors:
  - Ida Marie Vestgøte Bosch
---
The goal was to make it as simple and quick as possible. No flashy frameworks, just plain HTML, CSS and JS. Let’s take a closer look at how it was made.

On our internal front page we have a carousel with employees, sorted by birthdays. Every upcoming birthday boy or girl has their own “card” in the carousel, with their image on it. Let’s say each card looks like this:

```html
<div id="employeeId" class="employeeCard">
    <img ... />
</div>
```

For simplification, let’s say that each employee object consists of three properties:

```javascript 
{
   id: 1,
   name: "Santa",
   hasBirthdayToday: true,
}
```

We can then define a method that's applied to every employee in the carousel, to check if they should have confetti or not.

```javascript
function applyBirthdayConfetti(employee) {
   if (employee.hasBirthdayToday) {
       // Make confetti!
   }
}
```

We want to attach the confetti to the card if their birthday is today. To do this, we need to get a hold of their card in the DOM. Luckily, the [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) provides us with the method `document.getElementById()`. Since each card in the DOM uses the `employeeId` as its id, we can do the following to get a hold on that card:

```javascript
function createBirthdayConfetti(employee) {
   if (employee.hasBirthdayToday) {
       const card = document.getElementById(`${employee.id}`);
       // Make confetti!
   }
}
```

This enables us to manipulate the element in the DOM. We can append child elements to it during runtime!

What is confetti, anyway? Isn’t it just a collection of many small, colored dots, spread in multiple directions? That doesn't sound too complicated. And you guessed it – that’s exactly what we’re going to make next!

First, we create a new element, and add a `className` for styling:

```javascript
let dot = document.createElement('div');
dot.className = "confetti";
```

Time to look at some CSS. Don't be intimidated by the variables we have used – we'll get to that. We define the styling for each dot, and an animation to go with it:

```css
.confetti {
  position: absolute;
  width: 4px;
  height: 4px;
  top: 10%;
  left: 50%;
  margin: -2px 0 0 -2px;
  opacity: 0;
  background: var(--color);
  transform: translate(var(--endX), var(--endY)) scale(var(--scale, 1));
  animation: confetti 1s ease-out 1s forwards;
}

@keyframes confetti {
 from {
   transform: translate(0, 0);
   opacity: 1;
 }
}
```

Okay, so we provided some [custom variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to our style by writing `var(--name)`. We did this to vary the colors and animated motions of the dots. Now, we need to define these custom variables in our code to be able to access them in the CSS. They are defined in JavaScript using the [style property](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) of the dot element: `dot.style.setProperty(propertyName, value);`

We want the confetti dots to start from the same source, but end up in different, seemingly random x and y positions.

To simulate this randomness in our confetti, we create a simple method. It gives us a random number within a specified range that we can use to set the end positions of x and y.

```javascript
const random = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
};
```

Let’s go ahead and define our custom properties using our random function:

```javascript
dot.style.setProperty('--endX', random(-260, 260) + 'px');
dot.style.setProperty('--endY', random(-160, 160) + 'px');
dot.style.setProperty('--scale', random(0.6, 1) + '');
```

Lastly, let’s define some happy colors for our confetti.

```javascript
const colors = [
   "#a864fd",
   "#29cdff",
   "#78ff44",
   "#ff718d",
   "#fdff6a"
]
```

```javascript
dot.style.setProperty('--color', colors[random(0,4)]);
```

Then, we append the dot to the card using the method `appendChild()`.

Puh! Let’s take a look at the result:

<iframe src="https://codesandbox.io/embed/birthday-confetti-v56n0?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="birthday-confetti"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

There you go! Awesome confetti with a few lines of code and no sweat. How about playing around with some confetti this holiday? Feel free to use it in your own project, and play with the different variables to customise it.

And remember: _With great confetti comes great joy!_ :tada: :star_struck:
