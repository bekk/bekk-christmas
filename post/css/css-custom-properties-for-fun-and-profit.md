---
calendar: css
post_year: 2019
post_day: 2
title: Switch it up with CSS custom properties
image: >-
  https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80
ingress: >-
  Custom properties doesn't look like much, but is one of the real super powers
  of CSS. Let's see what it's all about!
links:
  - title: Lea Verou's talk
    url: 'https://www.youtube.com/watch?v=2an6-WVPuJU'
  - title: The Smashing guide to CSS Custom Properties
    url: >-
      https://www.smashingmagazine.com/2018/05/css-custom-properties-strategy-guide/
authors:
  - Kristofer Giltvedt Selbekk
---
I'm currently working on a client's design systems team. It's a lot of fun. We have the opportunity to implement something completely from scratch - and it's been a blast. This presented us with the option to play with the power of the so-called dynamic properties of CSS - and see how they can be used to improve the readability, maintainability and flexibility of the system.

## What are custom properties? 

CSS Custom Properties - or CSS Variables as everybody still calls them - is a fun new way to specify a value once, and use it throughout your code base. And since they're just CSS, they cascade down the tree of HTML, and can be overridden at any point. They are specified like this:

```css
.some-container {
  --text-color: #FF5B5B;
}
```

and are used like this:

```css
.some-container__child {
  color: var(--text-color);
}
```

Another way you can think of them is like named arguments to your selectors, that can be overridden from the outside.

```css
.button {
  --background-color: #16DBC4; /* the default */
  background-color: var(--background-color);
}

.button--blue {
  --background-color: #43CBFF;
}
```

But with great css custom property comes great responsibility - but how could that power be wielded for good? How about in a design system?

## Get to the :root of the issue

The first thing we did, was to specify the custom properties on the `:root` level. For most purposes, it's the same as `html` with a higher specificity score.

We wanted to specify the most basic of properties - the background color, and the text colors. Just for funs, let's specify them in primary, secondary and tertiary pairings:

```css
:root {
  --primary-background-color: #FFFFFF;
  --primary-text-color: #0E0E0E;
  --secondary-background-color: #EEEEEE;
  --secondary-text-color: #000000;
  --tertiary-background-color: #FF8034;
  --tertiary-text-color: #FFFFFF;
}
```

Then, we get to use these to specify our typography colors:

```css
.paragraph {
  color: var(--primary-text-color);
}

.label {
  color: var(--secondary-text-color);
}

.box {
  background-color: var(--tertiary-background-color);
  color: var(--tertiary-text-color);
}
```

Woah - that's a lot of syntax for something we could've done with a pre-processor like SCSS - **where's the payoff?**

## The sweet, sweet payoff

The payoff comes whenever you want to create something that breaks with this initial design. Let's say you want to specify a pop-out section of your site that wants extra attention. How can we implement this?

Previously, we'd have to specify a new set of classes with a new set of colors on it. Now, we just need to change the custom properties!

Let's create a new class `popout-section` that looks extra delicious:

```css
.popout-section {
  --primary-background-color: #0E0E0E;
  --primary-text-color: #FFFFFF;
  --secondary-background-color: #000000;
  --secondary-text-color: #EEEEEE;
  --tertiary-background-color: #FFFFFF;
  --tertiary-text-color: #FF8034;

  background-color: var(--primary-text-color);
}
```

Now, if we wrap our previous classes in this class, we get the updated values automatically, with nothing else required!

```html
<section>
  <p class="paragraph">This will be black text on white background</p>
  <label for="some-value" class="label">What's your value?
    <input type="number" max="10" min="1">
  </label>
</section>

<section class="popout-section">
  <p class="paragraph">This will be white text on black background</p>
  <label for="some-value" class="label">What's your value?
    <input type="number" max="10" min="1">
  </label>
</section>
```

This is an incredibly powerful pattern that can create some really nice-looking effects. In addition, you barely add a byte to your CSS, and your code is still super-readable.

## Theming

With a nicely thought out group of global custom properties in your arsenal, global theming becomes a case of a few lines of code. We can use the same technique as before, but place our modifier class on the `<body />`-tag for example.

We simply change the values of our custom properties, like so:

```js
.high-contrast-theme {
  --primary-background-color: black;
  --primary-text-color: white;
  --secondary-background-color: white;
  --secondary-text-color: black;
  --tertiary-background-color: black;
  --tertiary-text-color: yellow;
}
.christmas-theme {
  --primary-background-color: red;
  --primary-text-color: white;
  --secondary-background-color: white;
  --secondary-text-color: red;
  --tertiary-background-color: green;
  --tertiary-text-color: white;
}
```

That's really all there is to it. Since we're using the custom properties in the rest of the code, these will be updated automatically.

### Preferred theming - also known as dark mode!

Most sites doesn't have the time or need for several themes - but since iOS 13 came out, dark mode has become _really_ popular. Implementing it is now as easy as a single media query!

```css
@media screen and (prefers-color-scheme: dark) {
  ::root {
    --primary-background-color: #0E0E0E;
    --primary-text-color: #FFFFFF;
    --secondary-background-color: #000000;
    --secondary-text-color: #EEEEEE;
    --tertiary-background-color: #FFFFFF;
    --tertiary-text-color: #FF8034;
  }
}
```

Just remember that you also need to change the values in lower-level overrides, like the `.popout-section` above. Otherwise, it's smooth sailing.

## Bonus tip - use with inline styles too!

Sometimes, we just want to play around with values, or perhaps we want to set them dynamically with JavaScript. In those cases, it's nice to know that you can  specify css properties through the `style` prop in HTML as well!

```html
<section class="popout-section" style="--background-color: rebeccapurple;">
  <p class="paragraph">This will be white text on purp' background</p>
  <label for="some-value" class="label">What's your value?
    <input type="number" max="10" min="1">
  </label>
</section>
```

## But what about IE?

Always the party pooper, Microsoft's black sheep Internet Explorer 11 doesn't support CSS properties. It's not a problem for my current project, but it will probably be for you.

PostCSS to the rescue! This CSS post-processing tool lets us use the initial values as the default, if it isn't supported. It's added by adding [this plugin](https://github.com/postcss/postcss-custom-properties) to your PostCSS config.

## Use them today!

CSS custom properties is an incredibly powerful addition to the language that polyfills nicely and can do wonders for your codebase.

If you want to dig in deeper, I suggest you start watching the talk and article linked below. Both are amazing deep dives that turns you into a CSS custom property wiz in an hour.
