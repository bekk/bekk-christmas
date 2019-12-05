---
calendar: css
post_year: 2019
post_day: 9
title: Hyphens - Breaker of Words
authors:
  - Espen Hellerud
---
# Hyphens - Breaker of words
A hyphen (`-`) is a punctuation mark used to join words or separate syllables within a word. The latter comes in handy when a word is just too long, and we need to break it into smaller pieces.
When working with CSS we can use the property `hyphen` to specify how words should be hyphenated, when they are too long for its parent container. To specify the wanted behaviour of `hyphen`, there are three different keywords we can use as values.

## None
_None_ is the default value and it causes words to never break, even if line break characters are used within the words. Lines will only wrap at whitespace. That entails that words longer than the box will overflow outside of it.

## Manual
When _manual_ is used as value, we specify where we want a word to be able to break. This is done by using special unicode characters, inside a word, to suggest line break opportunities. We have two line break characters. 

### U+2010 HYPHEN
This is the hard hyphen. It will indicate a line break opportunity for the browser, but it will render, even though the line is not broken. To insert it into our HMTL, we can use `&hyphen;`, but it will have the same effect as hitting the _dash_ key on your keyboard. 

### U+00AD SHY
The second option is the soft hyphen. It is not rendered visibly, but instead marks where the browser may hyphenate a word not fitting its container. `$shy;` is used in HTML to insert the soft hyphen.

## Auto
With the value _auto_,  the browser identifies appropriate hyphenation points, where it will break the words. By specifying the language of an element, `<p lang="en">`,  we can help the browser pick better hyphenation points. The browsers hyphenation points can be overridden with the line break characters `&shy;` and `&hyphen;`.

