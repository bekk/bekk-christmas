---
calendar: css
post_year: 2019
post_day: 12
title: 'CSS Christmas card - Part 1: Cutting corners '
image: >-
  https://images.unsplash.com/photo-1541500233866-71164d920e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: ''
authors:
  - Dag Frode Solberg
---
Once upon a time, a developer named Dag was asked to create a Christmas card for his team. Having little experience with photo editing software, he turned to his main strength: web development.

He started out collecting some photos of his team. He considered many options. Should he find them on Facebook, take some himself, or find some funny characters to illustrate them? While pondering about this, he opened a pull request to give some feedback. Looking back at him from the pull request was the answer!

"Why not use the profile pictures on GitHub? They are already uploaded and can easily be scaled!" So he did just that, collected the GitHub profile pictures of everyone on his team.

<iframe height="317" style="width: 100%;" scrolling="no" title="OJPMMwe" src="https://codepen.io/dagfs/embed/OJPMMwe?height=317&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/OJPMMwe'>OJPMMwe</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Sphering it up

"That is a good start," he thought to himself. But where do I go from here? He remembered Mira on his team styling the user profile images in their project, so he went and asked her how she had done it.

"How I styled those rounded images?" Mira said. "That is quite easy - you can use border-radius 50% to get a circular image!"

Dag added the following styling to the images he had collected. 


```css
img {
  border-radius: 50%;
}
```

"This is looking nicer already," he thought to himself.

<iframe height="265" style="width: 100%;" scrolling="no" title="Christmas card - rounded images " src="https://codepen.io/dagfs/embed/OJPMMoe?height=265&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/OJPMMoe'>Christmas card - rounded images </a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Being the curious soul that he is, Dag had to look into what the CSS did. Looking up his trusted MDN web docs he found [MDN web docs: border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)

```css
/* 
radius-top-left | radius-top-right | radius-bottom-right | radius-bottom-left 
/
second-radius-top-left | second-radius-top-right | second-radius-bottom-right | second-radius-bottom-left
*/
border-radius: 1px 0 3px 4px / 20% 10% 30% 40%; 
```

"Neat!", he thought. "This can be very useful for anything that needs rounded corners. Even if the items have variable sizes as I can use both lengths in px and percentages. I can also create elliptical shapes and have control of each corner. But for now, I'll stick with the one value to rule them all".

## Cutting corners for Christmas

"But this is still not a Christmas card," he thought. "We need to make this more christmassy. " Had he not just read something about `clip-path`? He had thought that "that sure looks nice, but when will I ever use it?". He figured he could give it a go. He looked up the documentation; he even checked it twice. He was going to make sure he could figure it out. But even after looking at the documentation multiple times, it was hard to do what he wanted to do.

In the end, Dag looked up a clip-path generator [Clippy — CSS clip-path maker
](https://bennettfeely.com/clippy/) as he was not satisfied with anything less than the best Christmas three (shape)! After generating the path and cleaning it up. He could take a step back and look at the tree he had created.

<iframe height="673" style="width: 100%;" scrolling="no" title="three" src="https://codepen.io/dagfs/embed/XWJXXwe?height=673&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/XWJXXwe'>three</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

And to think that all it took was a little code.

```css
#three{
  width:400px;
  height:700px;
  background:green;
  clip-path: polygon(50% 0%, 80% 30%, 70% 30%, 90% 50%, 80% 50%, 100% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 20% 50%, 10% 50%, 30% 30%, 20% 30%);
}
```

Dag tried to summarize the property, but quickly found he would have to reference the documentation when needed. But he noted that one could use different geometric shapes as well as SVG to create a clipping region of what parts of an element to show.

```css
/*
* A short excerpt from the MDN web docs
*/

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');
```
[MDN web docs: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)

## Decorating the three

After taking some time to enjoy his hard work, Dag thought to himself, "Let's put it together." He added the images of his team to the three and using <absolute> positioning, positioned them on the three as Christmas decoration. "Look at how nice I've hung them on the tree," he thought to himself, followed by "... Uhm, that was a poor choice of words." He also added a fitting background to make it all come together even better.

"This is starting to look like something! But we should have a star too!". Using the same steps as with the three, he created a star and placed it on the top of the three.

<iframe height="836" style="width: 100%;" scrolling="no" title="three with decorations" src="https://codepen.io/dagfs/embed/PowZNpP?height=836&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/PowZNpP'>three with decorations</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


"Better! But not quite there." The three looks a bit bland. "Maybe a gradient could spice up the three? But I've never gotten the hang of them". He took to his favorite search engine with a quack and quickly found something he thought he could use. [CSS Stripes Generator](http://stripesgenerator.com). Generating some rad stripes and then tweaking them, he came up with a result he was happy with.

<iframe height="837" style="width: 100%;" scrolling="no" title="three with decorations" src="https://codepen.io/dagfs/embed/MWYKybE?height=837&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/MWYKybE'>three with decorations</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


The [background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) property turned out to be powerful, as one could get an image generated based on gradients.

All the CSS needed to generate some nice stripes was:

```css
background-image: linear-gradient(5deg, #1a9900 25%, #00ab17 25%, #00ab17 50%, #1a9900 50%, #1a9900 75%, #00ab17 75%, #00ab17 100%);
background-size: 49.44px 68.05px;
``` 

He noted the following as his own reference for how to use the `linear-gradiant`:

```css
linear-gradient( <angle-in-deg>, [<color> <step-in-percentage>] )
linear-gradient( 5deg, red 50%, blue 100%)
```

He put his hands behind his head, leaned backward, and enjoyed his work. But he only got to enjoy it for a short while as he noticed what time it was. "I'll finish this tomorrow," he thought as he made sure his hard work was saved.

_To be continued tomorrow._
