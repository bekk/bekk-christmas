---
calendar: css
post_year: 2019
post_day: 3
title: 'Stroke it and Dash it – A stroke-dasharray Christmas tale '
image: 'https://unsplash.com/photos/unG80SBSfMU'
links:
  - title: SVG loader
    url: 'https://codepen.io/zzavrski/pen/qXrVpJ'
authors:
  - Halldis Søhoel
---
Once upon a time a there was a designer. The designer lived in a small city far in the north. One day the designer woke up to find white fluffy snow falling softly outside her window. The designer felt a tingling feeling in her tummy. December is here and soon Christmas will be here. “I need to write a letter to Santa with my wish list!”. She pulled out some pen and paper and started to write. 

A few days later, a letter arrived at the North Pole. A little elf came running into Santa’s office with the letter. “What is this?” said Santa? “It’s a letter to you, sir”. Santa opened his letter with a little golden letter opener and started to read. Then he started to smile. “It’s a wish list! And I have a very special assignment for you!”. The Elf was stunned “Special assignment? For me?”. “Yes I want you to make an amazing spinner”. The little elf almost fell of his chair. “Santa, do you really think I can do it?” “I believe in you little elf”. 

The little elf ran to the workshop and started to draw his solution. This really was a hard nut to crack. He wanted to make a round spinner chasing its tail. After a few hours of pulling his hair, he still had not figured it out. He started with a SVG circle. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/BaaeEGv" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

“But I don’t want it to be a full circle and I want it to move around chasing its tail” He needed to ask for assistance from his dear friend Rudolf. He found Rudolf outside playing in the snow. When Rudolf saw the elf hanging with his head he said “What’s wrong little friend?” the elf said, “Santa, assigned me a very special task, but I can’t figure it out”. “Don’t worry friend, I will help you! What do you need?” The elf explained the problem. “hmmm, that’s a tricky one…” said Rudolf. “… luckily I have the answer!” the elf lit up! “Really?!”

Well back in the workshop the elf stared at the circle once again. “Ok, so I need to use something called stroke-dash array. But how does it work?” He went to the bookshelf to fetch a big and heavy book. The weight of it almost made him loose his balance. With a big poof, he slapped the book on the table. “Stack overflow” it read on the front page. “Ok, hmmm, S for stroke-dasharray”

“Stroke-dasharray is a way of adding dashes to a stroke. Given a value of, for example, 5 it will divide the stroke into dashes and gaps of equal length 5. 

If you provide stroke-dash array with two values, for example 20 and 5, it will divide the line into dashed of 20px and gaps of 5px.

 It becomes interesting when stroke-dasharray is provided with three values, say 20, 10 and 5. The first dash will have a length of 20px, the first gap will have the length of 10px and the second dash will have the length of 5px. Then it starts over, with the second gap of length 20, the third gap of length 10px, and so on. “

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/PoovgvX" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

The elf stared at the thick book. “What I really want is one big dash!”

First, let us calculate the circumference of the circle. We do that by calculating 2\* Pi\*radius. Our circle has a radius of 40; this leaves us with 2 \*3.1416\*40 = 251. Giving the circle a stroke-dash array of 251, will simply give us a full circle. Giving stroke-dasharray two values where the sum is 251 will give it one dash. For example 11 241 and 188 73. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/gOOJNgM" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

“Awesome!” Cheered the elf. Let’s animate it with some keyframes. 

<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/dyyEEYe" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

The spinner was finally coming together. The final touch is making it rotate. We do this by using translate: rotate(); 



<iframe height="320" style="width: 100%;" scrolling="no" src="https://codepen.io/halldis-sohoel/pen/yLLWWzVe" frameborder="no" allowtransparency="true" allowfullscreen="true">
</iframe>

For inspiration on other cool stuff you can make with stroke-dash array check out the links listed.
