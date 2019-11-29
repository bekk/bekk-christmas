---
calendar: javascript
post_year: 2018
post_day: 21
title: The secret
image: >-
  https://images.unsplash.com/photo-1505238680356-667803448bb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: Yeah. I know! Me too. I was also shocked when hearing this for the first time.
links:
  - title: Compiler theory
    url: >-
      https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md#compiler-theory
  - title: The discussion - One example
    url: 'https://dev.to/genta/is-javascript-a-compiled-language-20mf'
  - title: Part of the discussion - Another example
    url: >-
      https://www.reddit.com/r/javascript/comments/3z6a0q/compiled_or_interpreted/
authors:
  - Nicolai August Hagen
---

I even remember my very first experience with JavaScript, where co-students, the Internet, and even the university taught me the following:

> "As you have experience from the Java paradigm, one of the key differences between Java and JavaScript is that JavaScript is interpreted, and Java compiled."

However, not all people agree that JavaScript really is an interpreted programming language. Yes, we do _not_ compile our JavaScript code before deploying like we do with Java (luckily for us). However, the browser is the magical wizard performing the last preparations of our code before finally ending up at the end users computers.

## The definition

So, in order to know whether JavaScript is a compiled language or not, one ought to define _what_ a compiled language really is. Some (not all) would argue that a compiled language is based upon the following three procedures:

- Tokenizing/Lexing
- Parsing
- Code-Generation

Proponents of JavaScript as _compiled language_ mainly stick with this explanation, where all these 3 compile steps are run by browsers nanoseconds before code execution.

## The discussion

As with many other things, this is **not**, by any means, settled. Kind of like the following (non-exhausting) list:

- Tabs or spaces?
- Emacs or Vim?
- Flow or Typescript?
- Requesting Christmas stockings from your mom at the age of 27, or realize that you _now_ need to become a grown-up? 🤔

But remember, the discussion is half the fun with JavaScript. I guess it's time to decide for yourselves - is JavaScript compiled or interpreted?

Read through the linked articles and discussions for inspiration, and let us know what you think!
