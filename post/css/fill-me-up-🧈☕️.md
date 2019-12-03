---
calendar: css
post_year: 2019
post_day: 20
title: Fill me up (butter cup)
ingress: ''
---
Recipe:
- Make a `<button>`
- Set the `background-color` to transparent
- Create colored background using background-image and a linear-gradient.
- Move it out of sight with `background-position`.



A minimalistic example of the effect can be seen below. In order to be able to move the background, we somehow need to be able to define the size of it, so that it in effect is larger than the size of the button. Unfortunately, we can't really.

The `background` property is a shorthand that allows ut to define all the following properties in a single declaration:

* `background-clip`
* `background-color`
* **`background-image`**
* `background-origin`
* **`background-position`**
* **`background-repeat`**
* **`background-size`**
* `background-attachment`

The highlighted properties are the ones relevant to this example.

Basically, we are a bit limited in what we can do with a background, as long as we only use `background-color`. That is, `background-position` and `background-size` only has an effect on background images. "But I don't want a background image. I just want a uniform color!" you say. No problem, we can hack it by using a `linear-gradient` that basically transitions from one color, to _exactly_ the same one. 

Let's take it step by step.

...

You could achieve this by using a pseudo element like `:before`, or a regular `<span>`. But why write more CSS than we have to?

<iframe height="265" style="width: 100%;" scrolling="no" title="Simple button fill effect" src="https://codepen.io/mfeiring/embed/vYYwoee?height=265&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">

  See the Pen <a href='https://codepen.io/mfeiring/pen/vYYwoee'>Simple button fill effect</a> by Mira Feiring

  (<a href='https://codepen.io/mfeiring'>@mfeiring</a>) on <a href='https://codepen.io'>CodePen</a>.

</iframe>
