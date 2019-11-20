---
calendar: css
post_year: 2019
post_day: 12
title: Bleeding edge - making your grids bleed
image: >-
  https://images.unsplash.com/photo-1572470468728-1b2277637d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  Grid layouts are nice until you need to do something slightly outside of its
  bounds. Want to learn a quick trick to escape?
description: >-
  Want to go outside of the confines of your grid? This article shows you how to
  create bleeding edges.
---
I'm a huge fan of grid layouts. As a developer, I love how easy they make it to achieve good vertical rhythm, a clean element flow and a consistent design across widely different layouts. It is - in other words - the bees knees.

There are tons of great CSS grid implementations out there, but the simplest one is probably the one built in to CSS itself - the `display: grid;`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 1em;
}
```

If you hold back a bit on the grid features you use, you can even make it look pretty [in Internet Explorer 11](https://medium.com/@elad/supporting-css-grid-in-internet-explorer-b38669e75d66)!

However, even CSS's grid feature lacks the option of "bleeding" a grid column out into its gutter. It's a design I've had to implement a ton of times - and it always ends up breaking my grid implementation. Or, well, it used to.

## What's a bleeding edge?

In the printing industry, bleed refers to printing outside of the area that's being kept after trimming. When you print stuff this way, it lets you print to the very edge of what's being produced.

On the web, I refer to bleed as the area outside of a grid cell. Here's an example on how it can look:

![A screenshot of a layout with bleeding grid column edges](https://i.ibb.co/Bs2pyzn/Skjermbilde-2019-11-20-kl-21-57-56.png)

## How can I start bleeding too?

Good question! First, donate blood to [your local blood bank](https://www.rodekors.no/gi-blod/). Then, dip into the world of box shadows.

Box shadows is this blurring shadow effect that's often used to create the illusion of depth. It often looks like this:

![A screenshot of a blurry drop shadow](https://i.ibb.co/Hdqt9fY/image.png)

Box shadows are rendered outside of the regular layout flow, and doesn't affect its surrounding elements. This is a powerful property, that when used right, can help us achieve our bleed effect!

First, let's create a basic grid with 5 columns:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.grid-item {
  background-color: #eee;
  min-height: 5rem;
}
```

Second, let's scaffold up some HTML to apply this CSS to:

```html
<div class="grid">
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>

  <div class="grid-item" style="grid-column: 2 / span 3"></div>
</div>
```

Here's a row of 5 one-column columns, and one three-column column below them. It looks like this:

![A screenshot of the design we're creating](https://i.ibb.co/svC4D55/image.png)

Now, let's apply our bleed effect. Let's start by creating a new modifier class `.grid-item--bleed`:

```css
.grid-item--bleed {
  box-shadow: -1rem 0 #eee, 1rem 0 #eee;
}
```

Whoa, what happened here? We're specifying two box-shadows - one offset 1rem (equal to the column gap) to the left, and one offset 1rem to the right. This gives the effect of our container "bleeding out" into its margins, all while keeping the content happily aligned inside.

As a final touch - let's use some CSS custom properties to clean up our code:

```css
.grid {
  --column-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--column-gap);
}

.grid-item {
  --grid-item-background: #eee;
  background-color: var(--grid-item-background);
  min-height: 5rem;
}

.grid-item--bleed {
  box-shadow: 
    calc(var(--column-gap) * -1) 0 var(--grid-item-background), 
    var(--column-gap) 0 var(--grid-item-background);
}
```

It's a bit more wordy - sure - but now everything will be in sync even if you feel like changing parts of your design.

Here's a code pen with the code above for you to play around in.

Thanks for reading, and I hope this helps!

<iframe height="366" style="width: 100%;" scrolling="no" title="Bleeding grid columns" src="https://codepen.io/selbekk/embed/GRReWzV?height=366&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

