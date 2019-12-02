---
calendar: css
post_year: 2019
post_day: 7
title: Clean CSS - detailed edition
image: >-
  https://images.unsplash.com/photo-1457524461416-8796b6d23efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80
ingress: >-
  In yesterday's post, I listed some of the general tips I use when I try to
  write clean CSS code. Today, I'll try to be a bit less fluffy and instead show
  some detailed tips you can start applying to your projects right away. Ready?
  Here we go.
links:
  - title: 'My favorite CSS book (okay, it''s the only CSS book I''ve read)'
    url: 'https://www.oreilly.com/library/view/css-secrets/9781449372736/'
authors:
  - Peter Hemmen
---
## Not all CSS properties are created equal

A useful habit I've acquired over the years is to sort the properties for a component after what I consider to be most important. When I read CSS, I am usually most interested in how a component interacts with – and positions itself within – the world around it, and then how it organizes its internals. The least pressing matters are stuff like borders, colors and text decoration.

Whenever I write CSS, then, I try and place `position` and `display` at the very top. An added point here is that all additional properties that are connected with specific values for these properties should also be placed close. For example, if you are using `display: flex` or `position: absolute`, add all your extra needed properties and be done with it.

`width`, `height`, `margin` and even `z-index` can fight it out for the next places, before it's time for `padding`, `background`, `text-align` and maybe an `overflow`. Finishing up, add all your `color`, `text-transform`, `border` and whatever other properties you might need. We are now officially in the "miscellaneous" section.

I think a small example might be in order. The following code (which I jumbled together based on some real production code) can be improved upon:

```css
/*Not very good*/
.component {
    cursor: pointer;
    height: 60px;
    font-size: 70px;
    text-decoration: none;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    margin: 0 0 0 -40px;
    line-height: 60px;
    position: absolute;
    left: 50%;
    color: #FFF;
    text-align: center;
    width: 80px;
    bottom: 0;
    z-index: 100;
}
```

How does this component look? How big is it? Where is it placed on the page compared to the normal float? In order to answer all these, quite important, questions, you need to read the entire styling for the component and remember to place the relevant pieces of information together in your head yourself.

Now let's have a look at the exact same code after I have sorted it the way I think it should be written:

```css
/*Much better*/
.component {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 80px;
    height: 60px;
    margin: 0 0 0 -40px;
    z-index: 100;
    text-align: center;
    font-size: 70px;
    line-height: 60px;
    color: #FFF;
    text-decoration: none;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}
```

This way, the code right away tells you some pretty important facts about the component. It's positioned at the bottom middle of its ancestor. It is 80 by 60 pixels big, and it's probably always visible if it is in the viewport because of the high z-index. If you need to know how the text inside the component is styled, it's inviting you to have a look at the bottom, where it is all conveniently placed. You are welcome.

We could of course also have added some line breaks to make these distinctions even clearer, but I don't think it's really necessary. This sorting is already a major improvement.

## Write your CSS mobile first

When it comes to using media queries to make a site responsive, I have a simple, but powerful rule:

> Always write the code the way it should be for the smallest screen sizes, and only use `@media (min-width: <ideally some global variable here>)` to adjust the styling for the bigger screen sizes. 

If you follow this rule from the start, you very rarely have to resort to using media queries with `max-width` or create ranges of media queries. This way, the breakpoints get so much easier to reason about, and you can usually get a good feel for how the site will look on different devices just by browsing the code. Be sure to always to sort the code ascending by screen size to minimize confusion. Of course, you should also try and be really sparse with your media queries, and write as little specific code as possible per screen size in the cases you really need to use them.

Here's a quick example to show you how this might look in a real project. Notice I am using `less` here in order to have access to predefined constants to use for the actual media query widths. That's a convenient way to make sure you never exceed five breakpoints on your site (which you probably shouldn't).

```less
.container {
  display: flex;
  flex-direction: column-reverse;
  
  @media (min-width: @tablet) {
    flex-direction: row;
    width: 100%
  }

  @media (min-width: @smallDesktop) {
    width: 70%;
  }

  @media (min-width: @largeDesktop) {
    width: 50%;
  }
}
```

### Dude. What if I need to style something just for mobile?

Good question! In my opinion, it is also then best to avoid anything else than `min-width` in your media queries. The trick here is to recognize that you usually can play around with the keywords `initial`, `inherit` and `unset` to negate whatever styling you had to apply only for the smallest screen size. You may of course also set the property to the value you want yourself, but these keywords convey more meaning to the reader than if you hard code some value yourself.

Example time:

```less
.qouteContainer {
  display: flex;
  margin-bottom: 20px;
  color: blue;

  @media (min-width: @tablet) {
    display: unset;
    margin-bottom: initial;
    color: inherit;
  }
}
```

## Don't be too smart with selectors (without leaving a comment)

In the last article, I said that you shouldn't write JavaScript for something that can be appropriately handled by CSS. While this, in my humble opinion, is rock solid advice, it might also sometimes lead to some rather complicated selectors. I'll use an example from my own project: A few months ago, I was trying to adjust the width of a list element based on how many elements there were in the list. I knew that this could be done with a few carefully crafted selectors, and after some googling and adjustment, I landed on a few variations over these selectors:

```scss
 price-list-item:first-child:nth-last-child(n + 3),
 price-list-item:first-child:nth-last-child(n + 3) ~ price-list-item {
    /*CSS code goes here*/
}
```

I agree, this looks quite scary. However, I still contend that it is the right choice to use CSS in order to achieve this styling. So what to do?

When I write code, I always try to surprise the next developer as little as possible. Oftentimes, the next developer is me, so this would have been the right thing to do even if I weren't the extremely nice guy that I am. I don't know any way to simplify this selector any further, so I guess this is one of the real, legitimate use-cases for a comment. Have a look at the same code with a comment:

```scss
 //this selects the items when there are three or more
 price-list-item:first-child:nth-last-child(n + 3),
 price-list-item:first-child:nth-last-child(n + 3) ~ price-list-item {
    /*CSS code goes here*/
}
```

This completely explains and justifies the complicated selector, and truthfully, when I stumbled upon this code myself weeks after I'd written it, I read the comment, and was more than a little satisfied with my own cleanliness. It's nice to see that I can surprise myself in a good way once in a while as well.

## You probably shouldn't use `float`

If you are actually creating a design where text wraps around an image, you hereby have my permission to go ahead and add a carefully placed `float`. If, instead, you are trying to position something to the left or to the right, or next to another thing, please use something else. `position: flex`, `display: grid` or even good old `inline-block` usually does the job a whole lot better than `float` has ever done. `float` is a really old school technique which is still sometimes overused as a hack to this day in order to achieve effects we now have much better tools to accomplish. Do everyone (most of all yourself) a favor and skip it.

## Wrapping up

I hope you found some of these tips useful. If you disagree with anything, or just want to reach out, feel free to shoot me an e-mail, and we'll have a chat. CSS you around!
