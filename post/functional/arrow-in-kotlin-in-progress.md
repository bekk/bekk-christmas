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
Traditionally, we may use exceptions to handle errors. We perform some action and throw an exception if something goes wrong. However, the problem with exceptions is that we might lose control of where the error is handled because the error might be caught somewhere completely different in the project. Also, if you are calling a function which may throw an exception, it is difficult to know what kind of exception is thrown. Enter Either:

Either can be used as a typesafe alternative for error handling. `Either` holds one of two values, a Left or a Right. When we call a function which returns an Either, we are forced to handle both a successful and an unsuccessful case, and get a more direct engagement to the error handling. The return type will be Either, showing the developer exactly what cases may occur. If we were to use exceptions, there is no method signature for the developer to see what cases may occur. This leads to the developer either ignoring the exception or having to interpret the function body and all possible underlying method calls.

Let us say that we want to return a `ValidatedUser` if the email address of a `RawUser` matches a given regex pattern. Using exceptions, we can implement it by calling the matches function and throwing a RuntimeException if the email does not match the regex:

```kotlin
data class RawUser(
    val email: String
)

class ValidatedUser private constructor(
    val email: String
) {
    companion object {
        fun validate(rawUser: RawUser): ValidatedUser =
            if (EMAIL_REGEX.matches(rawUser.email)) {
                ValidatedUser(rawUser.email)
            } else {
                throw RuntimeException("Invalid email")
            }
    }
}
```

