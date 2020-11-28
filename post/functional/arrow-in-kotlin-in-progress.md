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
Either is great for handling errors because we can easily switch in a neat manner. The type consists of either a success or an error. This way we are forced to check both cases, which might make the code more reliable and prone to human error.

In Arrow, Result<T, E> is implemented by using the type Either. Either has a left and right value. The Left contains an error and the Right contains a success value. 