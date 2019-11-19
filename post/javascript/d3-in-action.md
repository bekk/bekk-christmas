---
calendar: javascript
post_year: 2018
post_day: 19
title: D3 in action
ingress: >-
  [D3 (Data Driven Documents)](https://d3js.org/) is a JavaScript library that's
  well suited to create data visualizations on the web. It brings data to life
  using HTML, SVGs and CSS. You can make everything from static graphs to
  interactive articles.
authors:
  - Svein Petter Gjøby
---
D3.js has been around for a long time, it was initially released in 2011, and has gained a lot of traction during these years. Nowadays, it is the de facto standard of data visualization and has a large community. Just take a look at this [list of examples](https://github.com/d3/d3/wiki/Gallery).

## What's the fuss about?

The core idea of D3 is to connect data with HTML and/or SVG. Let's say we have some data about the population in some countries and we want to visualize it.

```js
const data = [
    { name: 'Ireland', pop: 6378 },
    { name: 'Tanzania', pop: 3407 },
    { name: 'Norway', pop: 5084 },
];
```

Then we let D3 do its magic, and suddenly we have the SVG below.

```html
<svg height="300" width="600">
    <circle cx="100" cy="150" r="64" style="fill:green" />
    <circle cx="220" cy="150" r="34" style="fill:orange" />
    <circle cx="340" cy="150" r="51" style="fill:red" />
</svg>
```

The SVG contains three circles, each of which has a radius relative to the population of the country.

## This is where the magic happens

Let's take it one step further, and take a glimpse at what D3 can do.

```html
<svg id="mySVG" width="600" height="300"></svg>
```

Given this html and the same data as in the previous example.

```js
const data = [
    { name: 'Ireland', pop: 6378 },
    { name: 'Tanzania', pop: 3407 },
    { name: 'Norway', pop: 5084 },
];
```

Then we use the `data` method of D3 to join each datum in our dataset to a `circle` element in the SVG above.

```js
let circles = d3
    .select('#mySVG')
    .selectAll('circle')
    .data(data, d => d.name);
```

Wait, what?! There are no `circle` elements in the SVG.

I found this really confusing the first (and second) time I saw it. Instead of telling D3 how to do something, you tell D3 what you want. In our case we want one `circle` element for each datum in our dataset. This concept is called joining data and [this article](https://bost.ocks.org/mike/join/) explains it better than I ever could.

In our example the SVG does not contain any `circle` elements. Hence, all our data points are a part of the `enter` selection. The `enter` selection contains unbound data points, which represents missing elements.

```js
let newItems = circles.enter();
```

> Joining data with the `data` method creates [multiple selections](https://github.com/d3/d3-selection/blob/master/README.md#joining-data). To better understand data binding in D3 you should check them out.

Then we use the `append` method to append a `circle` element for each of the datums in the `enter` selection.

```js
newItems
    .append('circle') // Add a <circle />
    .attr('cx', (d, i) => 50 + i * 100)
    .attr('cy', 150)
    .attr('r', (d, i) => d.pop / 100);
```

Now we have modified the original html and it contains three circles that represent the population of each of the countries.

<img src="https://raw.githubusercontent.com/bekk/intro-til-d3/master/img/slides/svg-example.png" />

This is just the tip of the iceberg. You can literally make anything you want with D3.

If this article got you interested, you should check out the offical documentation (link below). In my humble opinion that's the best place to start.
