---
calendar: css
post_year: 2019
post_day: 22
title: BEM - Naming made a little easier
ingress: >-
  The field of computer science is moving forward at an extraordinary pace. The
  phone in your pocket is becoming much more advanced thanks to these feats of
  engineering. The greatest challenge that everyone faces, however, is coming up
  with names in programming. Despite the massive accomplishments in AI and
  machine learning, the most difficult part of these tasks are, I believe,
  coming up with good names. BEM does not solve this issue, but it makes it
  easier by many degrees, and with the addition of a CSS preprocessor, it can
  make your CSS-code more readable and hierarchically sound than before.
description: ''
links:
  - title: Introduction to BEM
    url: 'http://getbem.com/introduction/'
  - title: BEM 101 from CSS-Tricks
    url: 'https://css-tricks.com/bem-101/'
authors:
  - Nicolai Fredriksen
---
So what is BEM? BEM is an acronym of the key elements of its main principles; *Block*, *Element* and *Modifier*. Let's explain each of these, and see how they can be utilized for a more consistent naming scheme for your CSS-classes.

![pie chart visualizing that most time spent is coming up with names](https://i.redd.it/gmrtwstkavpz.jpg)

_Block_, is a standalone entity, that in and of itself has an intuitive purpose. Examples of this could be, `button`, `input`, `menu` and `header`. These are standalone components that do not require any additional naming to be understood with regards to how they operate.

An _Element_ is a part of a specific _block. Meaning, without the _block_, it starts to lose its meaning and its close attribution to the _block_ is what makes it encompass a semantic tie to the _block_. An example of an element is `item`. `item` does not say anything meaningful about what you are giving CSS rules to. However, tied with a block, e.g. `menu item`, gives it a necessary context. Which in turn, provides guidance for the developer to its context, thus aiding in visualizing its implications.

The _Modifier_ is self-explanatory (or autological if you want to be fancy). It described how something is modified. With regards to buttons think `primary`, `danger` and `success`. Similarly to _Element_, it does have a strong association with a _Block_, but could also be used to describe modifications done to an _Element_.

By combining these three principles, one could use this hierarchy to name things more logically and consistently. To combine these, an _Element_ is prepended by two underscores `__`, and a modifier by two dashes `--`. Which leads to the syntax: `Block__Element--Modifier`.

Thus, when for example describing a menu, the wrapper is named `menu` and each menu item is named `menu__item`. If one of the menu-items is disabled, it will be named `menu__item--disabled`. By following these principles for giving class names, specificity remains low. Meaning, how the browser applies what CSS values to apply. By keeping it low, hopefully, your code behaves more like you think it should. Thus keeping "sledgehammers" like `ID` and `!important` out of the picture.

<iframe height="365" style="width: 100%;" scrolling="no" title="Examples of BEM with SCSS" src="https://codepen.io/nicolaif/embed/povRJEY?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/nicolaif/pen/povRJEY'>Examples of BEM with SCSS</a> by Nicolai Fredriksen
  (<a href='https://codepen.io/nicolaif'>@nicolaif</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The examples consist of three _Blocks_: `menu`, `page-content` and `button`. `menu`, for example, has an _element_ called `item` which could be in the _modified_ state of `disabled`. By using the nesting capabilities of SCSS, the code gets a tree-like structure with regards to its logic, and making edits to specific _modifiers_ and _element_ while containing a base-_block_ is how BEM really shines.

BEM does not entirely solve the problem of naming. However, it enhances the readability of code, keeps the specificity low and helps by making your CSS-class names more consistent. Thus, your life becomes a little easier and your code a little bit simpler to understand. Subsequently, your components are more flexible and easier to modify. Adopt BEM in your codebase, you will not regret it.
