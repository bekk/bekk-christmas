---
calendar: functional
post_year: 2020
post_day: 11
title: Functional TypeScript
ingress: |
  I have a confession to make.

  I actually enjoy JavaScript.
description: Desciption
authors:
  - Bendik Solheim
---

I know, I know, I’m not really supposed to feel this way. It’s supposed to be this weird language full of flaws that never follows established rules and conventions, and we’re all supposed to not like it. But that’s just not the case for me – despite all the quirks and unusual behavior I still enjoy it.

I have given this quite a bit of thought. Why do I, who usually loves elegant type systems and smart compilers, enjoy JavaScript so much? I don’t have a definite answer, but I believe it boils down to it being straight to the point and having very little... «fuzz». It requires very little boilerplate, and due to its dynamic nature it can be quite elegant as well.

Even with all this positivity towards JavaScript, there are still sides of it I enjoy less. The two things I dislike the most are probably lack of strong, static typing, and a well-built standard library. Sure, there is a still growing standard library, but it certainly has its quirks. So, this is a blog post about how I made JavaScript even more enjoyable by introducing types and a library for typed, functional programming.

To keep this blog post short, I will assume you know both JavaScript and TypeScript. You will probably still understand most of it even if you are not fluid in any of them, but consider yourself warned.

## fp-ts

[fp-ts](https://github.com/gcanti/fp-ts) introduces _a lot_ of functional concepts to your code base. If you come from Java or Kotlin, I guess you can compare it to [Vavr](https://www.vavr.io) or [Arrow](https://arrow-kt.io), respectively- It provides several popular data types, type classes, and other functional abstractions.

Wading through every feature of fp-ts would be an enourmous task, and one way too overkill for this blog. Instead, I will take you through some of the simpler concepts that anyone can benefit from even if they are not FP zealots. My goal is to show you exactly how to use some of these concepts, so you can deploy them on your own code base right after.

### The Data Types

`Option`, `Either`

### Composing Flows and Pipes

`flow`, `pipe`

### Extended built-ins

`Array`, `Map`, `Set`

### ... and so much more

We have only really scraped the surface here. These concepts should give you enough to get you started, and hopefully see the value this library can give. When you’re ready, there are tons of other concepts to dive into, which can make your code even more readable and safe. I still haven’t had the time to wade through it all myself, so I still keep finding small gems which makes my day just a bit easier.

If you want to know more, the [learning resources section](https://gcanti.github.io/fp-ts/learning-resources/) of the [documentation](https://gcanti.github.io/fp-ts/) is actually quite good. As the author states, fp-ts does not really aim to teach functional programming from the ground up, but the resources are still really good and manages to convince at least me quite well.

I also recommend reading the source code. It is surprisingly readable, even to me – a person who is neither fully fluent in advanced typescript or an FP zealot.
