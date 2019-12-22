---
calendar: css
post_year: 2019
post_day: 23
title: Pseudo classes? More like pseudo awesome
image: >-
  https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
authors:
  - Halldis Søhoel
---
Pseudo classes are used to select elements of a specific state. The state of an element can either be something that is applied to it by the user, such as hover, or it is based on the element's position in the markup, for example it is the first of its type. 

We can use pseudo classes to change the styling of some elements based on user interactions. For example, if we want to give the user feedback that an element is clickable, we can use psuedo classes like; `::hover`, `::focus` or `::checked`.

Pseudo classes give you the flexibility to add specific styling to certain elements, while still keeping your markup nice and clean. 

The fun begins when we start using pseudo elements. Pseudo elements are elements that will act as if they were added to your markup. With `::before` and `::after` we can add elements with a specified content. 

Let’s start with an example. I want to make an interactive Christmas card! To make it more interesting let's hide a secret message using pseudo elements. 

I start of with a nice Christmas color and some boxes where today's date is written. The secret message is hidden in the html! Can you see it? 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/Examjar" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

Now let's hide the message on the page. If we imagine that the date boxes are cubes we can hide the message on the side facing down and turn them around on mouse over. I start off by adding pseudo element to each box using `::after` and position them right below the box. Then I insert the secret message using `attr()`. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/rNamVOQ" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

Now I can fold the pseudo element beneath the box to create the illusion of a cube. I use `transform `to rotate the pseudo element 90 degrees along the X-axis. The boxes will turn on hover. To get the effect of a turning box I rotate the parent element and change the color of the pseudo element to make it look like shadow. I set the transition time to 0.3 seconds. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/ExamjVM" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

I'm not quite happy with the hover effects. The boxes are turning too quickly and I cannot grasp the secret message. I want to change the boxes to turn on click. In order to achieve this I have to change the boxes into checkboxes. If I check the checkbox, it will rotate. 

To style the checkbox as the boxes we had before I have to add a label and style the label. Then I can hide the actual checkbox. Here’s the result. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/RwNpvGG" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

Merry christmas everyone!
