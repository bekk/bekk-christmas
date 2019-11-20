---
calendar: functional
post_year: 2019
post_day: 1
title: What is FP?
links: []
authors:
  - Kjetil Valle
---
Hi there, and welcome to this advent calendar! While you wait for christmas, we'll provide you with an article related to Functional Programming (FP) each day until december 24 🎅

We will try to tackle a wide range of topics. We will cover a few "classic" FP-concepts, both basic and more advanced. We also aim to have some articles with a more practical focus. Some posts will be intended for beginners and some will have a more experienced audience in mind. So if a particular article isn't for you, hopefully the next one will be!

To get the show on the road, lets start out by answering the following question:

## So, what is Functional Programming anyway?

Functional Programming is, like Object Oriented Programming (OOP), a programming paradigm. There isn't a formal agreed-upon definition of what FP entails, but there are two core concepts most people would agree are central to the paradigm: 

1. Avoiding mutating state and changing state
2. Using functions as the central building block of programs

Lets discuss each of these in turn.

### Immutability

In functional programming, we strive to avoid mutating state. In fact, in many functional languages modifying a "variable" is simply impossible. We also have a concept of _pure functions_, meaning functions which cannot have any sideeffects besides returning a value.

Now, if you're new to FP this might sound very strange, but it's actually really nice when you get used to it. Because, in return for giving up the possibility to mutate state in our programs, we get some really nice benefits.

One of the main benefits, at least to me, is that code written in a functional style is much easier to understand. If I want to know what a given piece of code does, I know that I will only have to look at that particular code, and not worry about how state in other parts of the program might affect it.

The computer can also benefit greatly from code being written in a functional style, opening the possibility of some nice optimizations. For example, two _pure_ expressions which does not depend on each other can easily be computed in parallel. And a pure function can be [memoized](https://en.wikipedia.org/wiki/Memoization) automatically, since it will always give same result when called with a given set of inputs.

Don't tell anyone, but we will return to this topic and explore it further in later article 🤫

### Functions as building blocks



> TODO: noe om at funksjoner er byggestenene, slik som objekter er i oop
> TODO: noe om førsteklasses funksjoner
> TODO: noe om høyere ordens funksjoner

### What is a functional

> TODO: noe om at det ikke nødvendigvis er enten/eller. språk har varierende støtte for funksjonelle konsepter, og legger i varierede grad opp til å kode funksjonelt. man kan kode funksjonelt i mange språk "oo-språk"

