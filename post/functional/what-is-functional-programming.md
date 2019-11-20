---
calendar: functional
post_year: 2019
post_day: 1
title: What is Functional Programming?
ingress: ''
authors:
  - Kjetil Valle
---
Hi there, and welcome to this advent calendar! While you wait for Christmas, we'll provide you with an article related to Functional Programming (FP) each day until December 24 🎅

We will try to tackle a wide range of topics. We will cover a few "classic" FP-concepts, both basic and more advanced. We also aim to have some articles with a more practical focus. Some posts will be intended for beginners and some will have a more experienced audience in mind. So if a particular article isn't for you, hopefully the next one will be!

To get the show on the road, lets start out by answering the following question:


## So, what is FP anyway?

Functional Programming is, like Object Oriented Programming (OOP), a programming paradigm. There isn't a formal agreed-upon definition of what FP entails, but there are two core concepts most people would agree are central to the paradigm: 

1. Avoiding mutating state and changing state
2. Using functions as the central building block of programs

Lets discuss each of these in turn.


### Immutability

In functional programming, we strive to avoid mutating state. In fact, in many functional languages modifying a "variable" is simply impossible. We also have a concept of _pure functions_, meaning functions which cannot have any side effects besides returning a value.

Now, if you're new to FP this might sound very strange, but it's actually really nice when you get used to it. Because, in return for giving up the possibility to mutate state in our programs, we get some really nice benefits.

One of the main benefits, at least to me, is that code written in a functional style is much easier to understand. If I want to know what a given piece of code does, I know that I will only have to look at that particular code, and not worry about how state in other parts of the program might affect it.

The computer can also benefit greatly from code being written in a functional style, opening the possibility of some nice optimizations. For example, two _pure_ expressions which does not depend on each other can easily be computed in parallel, and a pure function can be [memoized](https://en.wikipedia.org/wiki/Memoization) automatically since it will always give same result when called with a given set of inputs.

Don't tell anyone, but we will return to this topic and explore it further in later article 🤫


### Functions as building blocks

In Object Oriented Programming the basic building blocks are classes and objects. In FP, in contrast, you build your programs using functions. In most functional languages your entire program will simply be a function. And this function will in turn be built out of other functions. To use a cliché, _it's functions all the way down_…

To make this viable, it is important that functions are first class values of the language. You should be able to assign it to a variable or store it in a data structure, like any other type of value in your program. 

Functions must also accept other functions as arguments, and can even have functions as their return value. (This is often referred to as _higher order functions_.) It is also common to create new functions by _composing_ two other functions together, or by calling a function with only some of its arguments.

These are also concepts we will be returning to in later articles.


### What is a functional language?

A programming language isn't either functional or not functional. It is more like a spectrum, where languages are more or less on the functional side, depending on which features they support. So, language that's considered functional is simply one which makes it easy, or even mandatory, to program in a functional style.

But it's also perfectly possible to use FP in many languages not traditionally considered functional. Often it just requires more discipline on the part of the programmer to stay away from mutating variables, for instance. Most such languages also have useful libraries for those inclined to a more functional style of programming. And by the time Christmas comes around, that will hopefully include you!
