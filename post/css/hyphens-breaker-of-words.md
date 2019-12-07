---
calendar: css
post_year: 2019
post_day: 9
title: Hyphens - Breaker of Words
image: 'https://images.unsplash.com/photo-1485390027107-13d46287ba07'
ingress: >-
  How words are broken when lines overflow their containers is not always
  trivial and can cause many a headaches. Hyphens is a CSS property used to help
  with this, but how does it actually work and what can it do for us?
links:
  - title: MDN - hyphens
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens'
  - title: All you need to know about hyphenation in CSS
    url: 'http://clagnut.com/blog/2395'
authors:
  - Espen Hellerud
---
# Hyphens - Breaker of words
A hyphen (`-`) is a punctuation mark used to join words or separate syllables within a word. The latter comes in handy when a word is just too long, and we need to break it into smaller pieces.
When working with CSS we can use the property `hyphen` to specify how words should be hyphenated when they are too long for its parent container. To specify the wanted behaviour of `hyphen`, there are three different keywords we can use as values.

## Manual
The initial value for `hyphen` is _manual_. When it is used we have to give the browser suggestions about where a word may be able to break. If we do not give any suggestions, a word to long for the box will overflow. By using special unicode characters inside a word, we can suggest line break opportunities for the browser. We have two line break characters. 

### U+2010 HYPHEN
This is the hard hyphen. It indicates a line break opportunity for the browser, but it will always render, even though the line is not broken. To insert it into our HTML, we can use `&hyphen;`, but it will have the same effect as hitting _dash_ on your keyboard. 

### U+00AD SHY
The second option is the soft hyphen. It is not rendered visibly, but instead marks where the browser may hyphenate a word not fitting its container.  Use `$shy;`  in HTML, to insert a soft hyphen.

<iframe height="326" style="width: 100%;" scrolling="no" title="hyphen: manual" src="https://codepen.io/espehel/embed/povJZqv?height=326&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
See the Pen <a href='https://codepen.io/espehel/pen/povJZqv'>hyphen: manual</a> by Espen Hellerud
(<a href='https://codepen.io/espehel'>@espehel</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## None
If _none_ is used as value, words will no longer break when we use the soft hyphen `&shy;` to suggest line breaks. Lines will only wrap at whitespace or the hard hyphen, `&hyphen;`.

<iframe height="384" style="width: 100%;" scrolling="no" title="hyphen: none" src="https://codepen.io/espehel/embed/yLyNqJW?height=265&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
See the Pen <a href='https://codepen.io/espehel/pen/yLyNqJW'>hyphen: none</a> by Espen Hellerud
(<a href='https://codepen.io/espehel'>@espehel</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Auto
With the value _auto_,  the browser identifies appropriate hyphenation points, where it will break the words. By specifying the language of an element, `<p lang="en">`,  we can help the browser pick better points. Be aware that hyphenation points may vary with different browsers and languages. The browsers hyphenation points can be overridden with the line break character `&shy;`.

<iframe height="354" style="width: 100%;" scrolling="no" title="hyphen: auto" src="https://codepen.io/espehel/embed/gObpdKY?height=354&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
See the Pen <a href='https://codepen.io/espehel/pen/gObpdKY'>hyphen: auto</a> by Espen Hellerud
(<a href='https://codepen.io/espehel'>@espehel</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Snacks
If you are not happy with how the browsers hyphenates your words, there is some extras snack available. Here are four CSS properties introduced in CSS Text Module Level 4, that gives us almost an inDesign level of control.

### Setting minimum length before and after an hyphen
`hyphenate-limit-chars` takes three values. The first sets the minimum length of a word that can be hyphenated. The second is the minimum amount of character a word can have before the hyphenation and the third value is after. This can help in the case of the browser hyphenating short words in a manner which makes them hard to read.

### Limiting consecutive hyphenated lines 
`hyphenate-limit-lines` limits how many consecutive lines that the browser can hyphenate. If three or more consecutive lines are hyphenated, it forms what is called a _ladder_. In some languages, e.g. English, it is common to avoid ladders.

### Avoid hyphenating the last line
`hyphenate-limit-last` can be given the value `always` to make the browser never hyphenate the last line. This is to avoid having a part of the word sitting alone on the last line.
