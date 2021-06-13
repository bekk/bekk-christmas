---
calendar: functional
post_year: 2019
post_day: 5
title: An overview of the monad
image: >-
  https://images.pexels.com/photos/2870497/pexels-photo-2870497.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260
ingress: >-
  In this article I will give a brief overview of what a _monad_ is. Later
  articles in this series will use monadic features in different programming
  examples, therefore I thought it would be a good idea to first give an
  overview of what a monad is. I will use metaphors to explain the concept, and
  I will _not_ give any code examples in this article.
links:
  - title: What we talk about when we talk about monads
    url: 'https://arxiv.org/pdf/1803.10195.pdf'
  - title: Learn about monads in Haskell
    url: 'http://learnyouahaskell.com/a-fistful-of-monads'
  - title: Bartosz Milewski's programming cafe
    url: >-
      https://bartoszmilewski.com/2011/01/09/monads-for-the-curious-programmer-part-1/
authors:
  - Ragnhild Aalvik
---
## You're using monads!

I'm sure most of you are already using monads, even without knowing it. You see, monads are hidden behind various names in different programming languages. `Promises`, `Tasks`, `Maybes`, `Optionals`, and `Lists` are all examples of monads. :exploding_head:

## Some context

A monad is a concept that belongs to a branch of mathematics called _category theory_, where it was introduced in the 1960s. It wasn't until the 1990s that monads were found useful in programming. In category theory, a monad can be defined like this:

> _Definition 1. A monad over a category C is a triple (T,η,µ) where T : C → C is a functor, η : id<sub>C</sub> → T and µ : T<sup>2</sup> → T are natural transformations such that:_
>
> µ<sub>A</sub> ◦ Tµ<sub>A</sub> = µ<sub>A</sub> ◦ µ<sub>TA</sub>\
> µ<sub>A</sub> ◦ η<sub>TA</sub> = id<sub>TA</sub> = µ<sub>A</sub> ◦ Tη<sub>A</sub>

This is probably pretty incomprehensible if you're not familiar with category theory. Luckily it is not needed for understanding and using monads in the context of programming. I just wanted to show the formal definition before moving to the more tangible way of talking about monads in the following section.

## Useful metaphors

To understand monads, either you have studied category theory or not, we need to concretize them with metaphors. We simply cannot think about such abstract concepts without introducing some sort of metaphor. In this section I will explain one of the most common metaphors for monads, namely _a monad as a container_.

### A monad as a container

A monad can be seen as a container around some value, along with operations on that value. Concretely, in programming we can think of a monad as a datatype with two operations: `>>=` (pronounced _bind_) and `return`.

A little simplified, `>>=` takes a container with a value inside, applies a function to the value, and puts the new value back in the container. `return` takes a value and puts it in a container. One concrete example of a container monad is `Maybe`. `Maybe` is a datatype that either contains a value (`Just x`) or it is empty (`Nothing`). To do operations on a `Maybe` value, we must first check if the value is present or not. This makes it tedious to compose operations on a `Maybe`, as we need to unwrap the value for every step. This is where our monadic friend `>>=` comes in handy, as it lets us compose functions on monadic values, such as `Maybe`, effortlessly.

## Rounding up

Was this all a little too fluffy to grasp? I agree, therefore I recommend checking out [this awesome visualization](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html "Monads in pictures") of how we work with monads in programming. I hope this gave you a little intuition for what monads are, and that it helps when they return in later articles.

And remember, a monad is just a monoid in the category of endofunctors, what's the big deal 😉
