---
calendar: functional
post_year: 2020
post_day: 15
title: On Monadic Error Handling
ingress: "In this article, we compare the use of exceptions, `Either`, and
  `Result`: the good and the bad."
description: ""
links:
  - url: https://arrow-kt.io/
    title: Arrow
  - title: Kotlin-Result
    url: https://github.com/michaelbull/kotlin-result
authors:
  - Simen Fonnes
---
Traditionally, we may use exceptions to handle errors. We perform some action and throw an exception if something goes wrong. But, if you are calling a function, how do you know if it can throw an exception at all? And if it does, what kind of exception? These are hard questions to answer, enter `Either`:

`Either` can be used as a typesafe alternative for error handling. `Either` holds one of two values, a `Left` or a `Right`. When we call a function which returns an `Either`, we are forced to handle both a successful and an unsuccessful case, and get to know exactly what this function returns. On the other hand, if we were to use exceptions, there is no method signature for the developer to see what cases may occur. Developers may annotate a function with `@Throws("")`, but since this is optional, it is not dependable. Therefore, with lack of a complete method signature, developers must either ignore the exception or interpret the function body and all possible underlying method calls.

Let us say that we want to validate an email address using an [_opaque type_](https://en.wikipedia.org/wiki/Opaque_data_type). Look at the code below. The only way to obtain an instance of `ValidatedUser` is to provide a `RawUser` with a valid email address to the static `validate` function.

```kotlin
data class RawUser(
    val email: String
)

class InvalidEmailException: RuntimeException("Invalid email")

class ValidatedUser private constructor(
    val email: String
) {
    companion object {
        fun validate(rawUser: RawUser): ValidatedUser =
            if (EMAIL_REGEX.matches(rawUser.email)) {
                ValidatedUser(rawUser.email)
            } else {
                throw InvalidEmailException()
            }
    }
}
```

And we may call it like so:

```kotlin
try {
    println(ValidatedUser.validate(RawUser(emailAddress)).email)
} catch (e: Exception) {
    println(e.message)
}
```

You may have already noticed that we catch `Exception` and not `InvalidEmailException`. This illustrates the main issue with exceptions, they are dynamically typed. The only way to know which exceptions might be thrown is to manually parse the function body (and the body of any internal function calls). This may not always be trivial, for example, if you are calling a function from an external library.

Luckily, there is a neat solution to this problem. Using the same `RawUser` class, we can implement it using `Either` from the [Arrow library](https://arrow-kt.io/docs/apidocs/arrow-core-data/arrow.core/-either/):

```kotlin
enum class ValidationError {
    INVALID_EMAIL
}

class ValidatedUser private constructor(
    val email: String
) {
    companion object {
        fun validate(rawUser: RawUser): Either<ValidationError, ValidatedUser> =
            if (EMAIL_REGEX.matches(rawUser.email)) {
                Either.right(ValidatedUser(rawUser.email))
            } else {
                Either.left(ValidationError.INVALID_EMAIL)
            }
    }
}

when(val validatedUser = ValidatedUser.validate(RawUser(emailAddress))) {
    is Left -> println(validatedUser.a)
    is Right -> println(validatedUser.b)
}
```

It is crystal clear what this function does from the signature alone. You either get an `ValidationError` or a `ValidatedUser`. Because `Either` is a sealed class, we also get exhaustive pattern matching using `when`. Additionally, we get smart casting which automatically gives us access to an `a` (the error) if it is a `Left`-instance, or a `b` (the success value) if it is a `Right`-instance.

There are cons to this approach as well as with exceptions. The choice of whether the error value is in the left or right slot is completely dependent on convention. It is easy to confuse, especially when you are working with different implementations where they are reversed (for example, [Result](https://doc.rust-lang.org/std/result/) in Rust and [Kotlin-result](https://github.com/michaelbull/kotlin-result)). Consider this, which of these cases prints the error?

```kotlin
when(val validatedUser = ValidatedUser.validate(RawUser(emailAddress))) {
    is Left -> println(validatedUser.a)
    is Right -> println(validatedUser.b)
}
```

`Either` is rather generic, and thus, `Left` and `Right` may not make sense for the reader by itself. Additionally, you may also notice that `left` and `right` suddenly change to `a` and `b`. Not a huge problem, but readability suffers nonetheless. 

If you want all the advantages of `Either`, but also want to stay semantically accurate in the context of error handling, check out [`Result<T, E>`](https://github.com/michaelbull/kotlin-result). Right changes to `Ok`, and `Left` to `Err`. It makes it significantly harder to confuse `Left` and Right as Ok and Err makes sense in their own right.
