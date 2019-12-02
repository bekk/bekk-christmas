---
calendar: css
post_year: 2019
post_day: 6
title: Clean CSS - rambling edition
image: >-
  https://images.unsplash.com/photo-1493953659556-556b14bdaca8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3891&q=80
ingress: >-
  Over the years I've seen (and indeed written) quite a lot of horrible CSS, and
  I want to take a moment to share some of the rules and principles I try to
  follow when I write and teach CSS in order to keep the code as clean and
  maintainable as possible.


  In this post, I'll go through some general tips before I'll get into some more
  specific tips in tomorrow's post. Let's go!
authors:
  - Peter Hemmen
---
Quick disclaimer: It is generally easier to keep your CSS clean when you are writing CSS-in-JS as many of us do these days. That means that some of these tips might not apply if you have already left external style sheets behind. However, even with CSS-in-JS there are still good and bad ways to write your styling, and I am here to help you avoid a few pitfalls, at least.

## Clean CSS comes from clean HTML

The times I've _really_ struggled with CSS have been the times I've had to fight bad markup. One of the world's hardest problems, vertically centering something on a web page, is basically impossible if the HTML is a jumbled mess. This (along with the rest of this guide) might seem obvious, but I've had to repeat it a lot of times over the years, so here we go again: Elements that should be styled together, should be placed in the same component. You can, and should, think of HTML components as boxes, and vertically or horizontally aligning to elements that are in separate boxes is a surefire recipe for a bad day's work. A lot of terrible CSS – and headaches – disappear when the markup actually plays along with what you are trying to achieve. I always start any CSS task by considering the HTML and I usually don't write a single line of styling until the markup makes sense.

## Use CSS for what it's good for, and nothing else

If you are intent on having a bad time, you can use CSS for almost whatever you want to these days (https://www.sitepoint.com/css3-pong-insane-things-to-do-with-css/). In general, try and use CSS for as much of the actual visual layout as possible. Period. For example, it might be tempting to write some JavaScript to count the number of elements you have in a list and add different classes or styling based on the number of existing elements. Generally, you shouldn't. Making an element look differently based on the number of elements is purely a visual decision, and that means that it should be the responsibility of the CSS. As soon as you start to use JS for styling, you make it harder to locate that styling when someone needs to find it. You should only manipulate styling directly from JS when there really is no other way to accomplish the design you want.

## Read up on `display` and `position`

This might seem like a specific tip. In my experience, however, these properties are really some of the most general knowledge you can have when understanding and writing CSS. Surprisingly, quite a few developers lack a proper grasp of these concepts. Have you ever wondered why the element you are styling doesn't care about the height or width you are trying to give it? The element is probably `inline`. Why is that element you added with `position: absolute` suddenly all the way over in the corner of the screen? You probably forgot to position its ancestor. This stuff might seem daunting at first, but it's not rocket science, and it has made working with CSS that much more fun for me. I'm guessing it will for you too.

My all-time favorite site for learning a few CSS basics is this little beauty which I've shared countless times over the years: http://learnlayout.com/ It might seem a bit dated in the way it talks about supporting IE6 and presents `inline-block` as a new thing, but that only goes to prove the point that `position` and `display` is really something timeless that everyone who writes CSS should know. I can guarantee that the concepts are not going anywhere anytime soon, so go ahead and read it. You'll thank me later. 

## Write as little CSS as possible

CSS is notoriously hard to delete from big projects since you don't get any help out of the box with knowing where it is used and if it has any effect at all. In that way, it is even more important with CSS than other code to be really careful about not writing any unnecessary code. It is way easier and cheaper to remove it before you merge your PR. Before you are done with a feature, you should be ruthless about your newly written CSS and try to consider if every line you have written is really necessary. As soon as the code is merged, every developer – even you, the original author – starts thinking of it in this way: "I am not sure if I can delete this or not. It _might_ be used somewhere by someone or have an effect I am just not understanding. Better leave it in." Say hello to bloated, horribly styling. You'll probably spend a lot of time together.

Along the same line of making something easy to delete, try to avoid creating class names in the code by manipulating strings. This makes it really hard to search for the class names to discover where, and if, it is actually used. Write the full class name whenever you use one.

A stellar example of unneccesary styling is repeating the default properties of an element. There is rarely a reason to specify that a `div` is `display: block` or scatter the code with `position: static`. All that tells me is that you might not know what you're doing.

Speaking of knowing what you are doing: Please don't just try adding some properties willy-nilly and seeing if it works. This shouldn't even be necessary to write, but somehow it seems that the mere act of opening up a stylesheet sometimes makes otherwise responsible developers throw all that responsibility out the window and just cram properties into the CSS until it somehow works. This is also a _great_ way to end up with a lot of styling that really hurts the maintainability of your application. Please try to understand why the web site looks the way it does before you write anything. It will make it a lot more fun to write CSS. I pinky swear.

## In conclusion

That was my general tips/ramblings about CSS. I hope you learned something. Follow along tomorrow for some more nitty-gritty  tips with code examples.
