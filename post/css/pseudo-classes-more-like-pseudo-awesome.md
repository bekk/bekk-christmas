---
calendar: css
post_year: 2019
post_day: 23
title: Pseudo classes? More like pseudo awesome
---
Pseudo classes are used to select elements of a specific state. For example, we might want some custom styling on all first element of a type or we want to change the styling of a button on mouse over or if it is active. 

Pseudo classes come in handy if you want to change the styling of some elements based on user interactions. For example to give the user feedback that an element is clickable. To achieve this we can use psuedo classes like; `::checked`, under `::focus` or `::disabled`. 

In addition, they are useful if you want to change the styling of every other element or every element that is first of its type. 

Pseudo classes give you the flexibility to add specific styling to certain elements, while still keeping you markup nice and clean. 

The fun begins when we start using pseudo elements. Pseudo elements are elements that will act as if they were added to your markup. With `::before` and `::after` we can add elements with a speficied content. 

Let’s start with an example. I want to make an interactive Christmas card!

I start of with a nice Christmas color and some boxes where todays date is written. In the html I have hidden a secret message! 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/Examjar" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

For each box I add an pseudo element with ::after and position it to be placed right beneath the box. Then I insert the secret message using attr(). 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/rNamVOQ" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/RwNpvGG" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

I now rotate the pseudo elements in order to create a box. I use transform to rotate the pseudo element 90 degrees along the X-axis. On hover the boxes will turn. To get the effect of a turning box I rotate the parent element and change the color of the pseudo element to imitate shadow. I set the transition time to 0.3 seconds. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/ExamjVM" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/RwNpvGG" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

I'm not quite happy with the hover effects. The boxes are turning too quickly and I cannot grasp the secret message. I want to change the boxes to turn on click. In order to achieve this I have to change the boxes into checkboxes. If the checkbox is checked, it will rotate. 

To style the checkbox as the boxes we had before I have to add a label and style the label. Then I can hide the actual checkbox. Here’s the result. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/RwNpvGG" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

Merry christmas everyone!
