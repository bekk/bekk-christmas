---
calendar: css
post_year: 2019
post_day: 11
title: CSS Grid's Best Friend
image: >-
  https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: >-
  There is a display property that goes hand-in-hand with CSS grid: `display:
  contents`. With this property you can keep good HTML semantics when using CSS
  grid. Let's see how.
links:
  - title: 'Display, MDN web docs'
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/display'
  - title: Flexible data tables
    url: 'https://adamlynch.com/flexible-data-tables-with-css-grid/'
authors:
  - Sondre Kongsgård
---
Let's say you're writing a blog, and want an overview page of all the posts you've written. You might choose the following markup:

```html
<section>
    <h1>My Awesome Blog</h1>
    <article>
        <h2>Title #1</h2>
        <p>Ingress #1</p>
    </article>
    <article>
        <h2>A title that spans multiple lines</h2>
        <p>Ingress #2</p>
    </article>
    <article>
        <h2>Title #3</h2>
        <p>Ingress #4</p>
    </article>
    <article>
        <h2>Title #4</h2>
        <p>Ingress #4</p>
    </article>
</section>
```

If you want to present this in e.g. a two-column layout, a good choice would be to set `display: grid` on the section tag:

<iframe height="400" style="width: 100%;" scrolling="no" title="Simple CSS grid" src="https://codepen.io/kongsgaard/embed/bGNVMOV?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/kongsgaard/pen/bGNVMOV'>Simple CSS grid</a> by Sondre Kongsgård
  (<a href='https://codepen.io/kongsgaard'>@kongsgaard</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

However, you might stumble into a challenge if you also want both the title and the ingress of each article to align nicely with each other. In that case it might be tempting to remove the `<article>` tag from the markup, but instead you may simply add `display: contents` on this tag, along with some extra CSS to specify the flow of the elements in the grid:

<iframe height="400" style="width: 100%;" scrolling="no" title="display: contents" src="https://codepen.io/kongsgaard/embed/ExaVLym?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/kongsgaard/pen/ExaVLym'>display: contents</a> by Sondre Kongsgård
  (<a href='https://codepen.io/kongsgaard'>@kongsgaard</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See how Ingress #1 is now vertically aligned with Ingress #2? 🤩

When the display property `display: contents` is added to the `<article>` tag, the `h2` and `p` elements act as if they were direct children of the grid.

So next time you're working with CSS grid, see if you can utilize its companion `display: contents` to get the grid just the way you want it - while keeping the HTML semantics in tip-top shape.

PS: `display: contents` also enables you to use CSS grid with tables, which potentially gives you superpowers over the common `table-layout: fixed` approach (see the link "Flexible data tables" for an in-depth blog post). Here is a simple example:

<iframe height="400" style="width: 100%;" scrolling="no" title="Table, display: contents" src="https://codepen.io/kongsgaard/embed/RwNWJbz?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/kongsgaard/pen/RwNWJbz'>Table, display: contents</a> by Sondre Kongsgård
  (<a href='https://codepen.io/kongsgaard'>@kongsgaard</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
