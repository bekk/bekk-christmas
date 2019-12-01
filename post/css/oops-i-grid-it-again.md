---
calendar: css
post_year: 2019
post_day: 4
title: Oops! I Grid it again
image: >-
  https://images.unsplash.com/photo-1494506195512-4d6e9a7beb35?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80
ingress: >-
  It’s been six months since I’ve been introduced to CSS Grid and I just can't
  stop sharing how useful it is! It’s amazing when you’re in the need of a
  responsive layout!
links:
  - title: The Complete Guide to CSS Grid
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/ '
  - title: Does Grid replace Flex?
    url: 'https://css-tricks.com/css-grid-replace-flexbox/'
authors:
  - My Thao Nguyen
---
## How to Grid

CSS Grid is basically a 2-dimensional layout system that lets you place items across a number of rows and columns, unlike Flexbox which was made for placing items in a single row or column. Grid is used like Flexbox by setting the container with `display: grid`. You then need to define your grid by saying how many rows and columns you would like it to consist of with `grid-template-columns` and `grid-template-rows`. For instance:

![Defining you grid example](/assets/screen-shot-2019-11-28-at-23.58.03.png "Defining you grid example")

In this example, I have used `fr` which will split the grid vertically into three equal fractions of the total space in the grid. This can also be written in a simpler way, by using `repeat(3, 1fr)` - where the number `3`represents how many rows you would like of the size of one fraction (`1fr`) of the remaining space. 

After defining your columns and rows, you can decide whether to position your items by using _grid lines_ or _grid tracks_. The numbers in the image below defines the grid lines for columns and rows, while tracks is the any group of cells.

![grid lines vs grid tracks](/assets/screen-shot-2019-12-01-at-20.34.54.png "grid lines vs grid tracks")

With grid-lines, you place each item by defining from which column/row line to which column/row line you want your item stretch. For instance, to define the position of my header, I set`.header { grid-column: 1/4; }`:

<iframe width="560" height="315" src="https://codepen.io/Myau/pen/yLyBdqb"></iframe>

To use grid tracks, you first have to define your `grid-template-areas` by naming each cell. Then tell your grid item which cell(s) it should cover with just one line, `grid-area: header`. I prefer this method 😊 Check out the code:

<iframe width="560" height="315" src="https://codepen.io/Myau/pen/PowYOyq"></iframe>

If the placement of your grid items is not defined then all direct children of the container will be automatically be placed inside of each cell in the grid. It's super simple! ✨

## What's good about it?

Grid really shines when it comes to dividing your webpage into different parts without letting your markup suffer! Imagine going from having a layout with loads of nested flexboxes:

![Pure Flexbox layout example](/assets/screen-shot-2019-11-30-at-13.45.01.png "Pure Flexbox layout example")

To this simple pure grid markup:

![Pure Grid layout example](/assets/screen-shot-2019-11-30-at-13.44.50.png "Pure Grid layout example")

Not only does a pure flexbox layout require nested divs, but it also require more css to get gap in between each flex item compared to using `grid-gap`. Check out this [codepen](https://codepen.io/Myau/pen/yLyBPaV) want to check out the code above!

Of course, Grid is not here to replace Flexbox, but rather allow you to write concise and more semantically correct code! 

So instead of drowning in infinite nested flex boxer, how about you start using a combination of both Grid and Flexbox? You will definitiely reap of the results! ☺️

##
