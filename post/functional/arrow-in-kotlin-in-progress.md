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
Traditionally, we may use exceptions to handle errors. We perform some action and throw an exception if something goes wrong. However, the problem with exceptions is that we might lose control of where the error is handled because the error might be caught somewhere completely different in the project. Also, if you are calling a function, how do you know if it can throw and exception? And if it does, what kind of exception? These are hard questions to answer, enter `Either`:

`Either` can be used as a typesafe alternative for error handling. `Either` holds one of two values, a `Left` or a `Right`. When we call a function which returns an `Either`, we are forced to handle both a successful and an unsuccessful case, and get know exactly what this function returns. On the other hand, if we were to use exceptions, there is no method signature for the developer to see what cases may occur. With a lack of a complete method signature, developer must either ignore the exception or interpret the function body and all possible underlying method calls.

Let us say that we want to validate an email address using an _opaque type_. Look at the code below. The only way to obtain an instance of `ValidatedUser` is to provide a `RawUser` with a valid email address to the static `validate` function.

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

We do not know what exception to catch, therefore we have to catch Exception and log. You can check the implementation of `validate` function, but most developers wont. Also, if this would be an external library it might be hard to navigate and find what exception is thrown.

However, using the same RawUser class, we can implement using Either like this:

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

```

It is crystal clear what this function does from the signature alone. You either get an `ValidationError` or a `ValidatedUser`. Because `Either` inherits from a sealed class, we also get exhaustive pattern matching using when. Additionally, we get smart casting which automatically gives us an `a` if it is left or a `b` if it is right.

There are cons to this approach as well as with exceptions. The choice of whether error value is in the left of right slot is completely dependent on convention. It may be easily confused by new developers but also more senior developers. Consider this, which of these cases prints the error?

```kotlin
when(val validatedUser = ValidatedUser.validate(RawUser(emailAddress))) {
    is Left -> println(validatedUser.a)
    is Right -> println(validatedUser.b)
}
```

`Either` is rather generic and thus left and right may not make sense for the reader. Additionally, `left` and `right` suddenly change to `a` and `b`. Not a huge problem, but readability suffers nonetheless. 

If you want all the advantages of Either, but also want to stay semantically accurate in relation to error handling, check out `Result<T, E>`. Right changes to Ok, and Left to Err. It makes it significantly harder to confuse Left and Right as Ok and Err makes sense in their own right. For such a type check out [Kotlin-result](https://github.com/michaelbull/kotlin-result).
