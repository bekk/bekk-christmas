---
calendar: functional
post_year: 2020
post_day: 15
title: Arrow in Kotlin *IN PROGRESS*
ingress: Arrow is a library that provides functional types out of the box in
  Kotlin. These functional types are typed and resemble popular functional types
  such as `Functor`, `Monad`, etc. In this article, we take a closer look at
  Arrow's `Either` type and how it is often used as an Error monad, the pros,
  the cons, and alternatives.
links:
  - url: https://arrow-kt.io/
    title: Arrow
  - title: Kotlin-Result
    url: https://github.com/michaelbull/kotlin-result
authors:
  - Simen Fonnes
---
Traditionally, we might use exceptions to handle errors. We perform some action and throw an exception if something goes wrong. However, the problem with exceptions is that we might lose control of where the error is handled because the error might be caught somewhere completely different in the project. Enter Either:

Either is a monadic alternative to handling errors. Either holds either a success or an error. When we call a function which returns an Either, we are forced to handle both a successful and a nonsuccessful case, and get a more direct engagement to the error handling.

In Arrow, Either has a left and right value. The Left contains an error and the Right contains a success value.