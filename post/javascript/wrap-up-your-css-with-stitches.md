---
calendar: javascript
post_year: 2020
post_day: 15
title: Wrap up your CSS with Stitches!
image: https://source.unsplash.com/vRGfB0Pxga0/1600x900
ingress: "Have you ever struggled with CSS? Have you found it hard to structure
  a large CSS codebase, even when using methodologies like
  [BEM](http://getbem.com) or
  [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-or\
  iented-css-oocss/)? Have you tried using CSS-in-JS solutions, but struggled
  with the setup or lack of typing? Or maybe you've used
  [Tailwind](https://tailwindcss.com/), but find the initial bundle size
  intimidating, or the tooling to reduce it too complex?\r

  \r

  [Stitches](https://stitches.dev/) is a new CSS-in-JS library from
  [Modulz](https://www.modulz.app/) and **Christian Alfoni**, creator of
  [Cerebral](https://cerebraljs.com/) and [Overmind](https://overmindjs.org/).
  It promises _\"Near-zero runtime, server-side rendering, multi-variant
  support, and best-in-class developer experience.\"_\r

  \r

  We'll take a look at what this means, and how Stitches compares to existing
  CSS-in-JS solutions like [Styled Components](https://styled-components.com/),
  [Emotion](https://emotion.sh/docs/introduction) and [Material
  UI](https://material-ui.com/styles/basics/)."
---

# Getting started

Stitches provides two separate libraries, `@stitches/core` for framework-agnostic functionality, and `@stitches/react` which is very similar to Styled Components for React.

## `@stitches/core`

Stitches can be used without any specific view framework, and provides us with several benefits, for example:

- Type safe CSS
- Minimal CSS size due to atomic classes
- Custom token support

We'll take a look at each one of these.

## Type safe CSS

Here is a very simple example using nothing but `@stitches/core`:

```typescript
import { createCss } from '@stitches/core'

const css = createCss({})

const root = css({
  background: 'lightblue',
  padding: '1rem',
})

const content = css({
  paddingLeft: '1rem',
})

document.getElementById('app')!.innerHTML = `
<div class="${root}">
  <h1>Hello Stitches!</h1>
  <div class="${content}">Time to make some styles!</div>
</div>
`
```

When using a modern editor like VS Code, we can get full autocompletion of CSS styles with Stitches:

<p><img src="/assets/stitches-01.png" alt="CSS Autocompletion" style="width: auto; max-width: 100%;" /></p>

No more mistyped CSS properties!

## Atomic classes

The above example renders into:

```html
<main id="app">
  <div
    class="_initial_pl_hmLUax _initial_pb_hCFMjp _initial_pr_gPZsxG _initial_pt_dbpDZB _initial_bc_hdHkoT"
  >
    <h1>Hello Stitches!</h1>
    <div class="_initial_pl_hmLUax">Time to make some styles!</div>
  </div>
</main>
```

What are all these classes? Let's take a look:

```css
._initial_pl_hmLUax {
  padding-left: 1rem;
}
._initial_pb_hCFMjp {
  padding-bottom: 1rem;
}
._initial_pr_gPZsxG {
  padding-right: 1rem;
}
._initial_pt_dbpDZB {
  padding-top: 1rem;
}
._initial_bc_hdHkoT {
  background-color: lightblue;
}
```

Stitches splits up our styles into separate **atomic classes**; this is useful because components with the same style only need a single class definition per property, e.g. `_initial_pl_hmLUax`, which maps to `padding-left: 1rem`, is used both for our `root` and `content` classes!

_Atomic classes means less CSS, which makes our page load faster. This is a good thing._

## Custom tokens

Even the simplest web page needs some kind of overall look and feel, which might be as simple as a preferred font and color palette, or a full theme with customized components, predefined margin sizes and all the bells and whistles.

To avoid having to repeat yourself with your selected colors or sizes, Stitches lets you define custom tokens:

<p><img src="/assets/stitches-02.png" alt="CSS Custom Tokens" style="width: auto; max-width: 100%;" /></p>

Here we can see we have defined a couple of colors, `primaryText` and `primaryBlue`. Notice how these actually show up with autocompletion when we define the classes! This also works for the other kinds of tokens like `sizes`, `borderRadius` and many more as well.
