---
calendar: kotlin
post_year: 2019
post_day: 17
title: Typesafe Error Handling in Kotlin
links:
  - title: Failure is not an Option - Functional Error Handling in Kotlin
    url: 'http://oneeyedmen.com/failure-is-not-an-option-part-1.html'
  - title: kotlin-result
    url: 'https://github.com/michaelbull/kotlin-result'
  - title: Encapsulate successful or failed function execution
    url: >-
      https://github.com/Kotlin/KEEP/blob/master/proposals/stdlib/result.md#encapsulate-successful-or-failed-function-execution
authors:
  - Fredrik Løberg
---
In Kotlin, the standard way of handling errors is with _exceptions_, more specifically, _unchecked exceptions_. This is god mode. As long as the object we are throwing is a subtype of `Throwable`, we can do whatever we want. The compiler will not complain. This sounds like a good thing, right? Well, _it depends_.

Unchecked exceptions are, by definition, dynamically typed, and thus, _not_ typesafe at compile-time. The compiler will not tell you what to catch or even whether what you are trying to catch will be thrown at all. You must either _know_ or _check_ it yourself. As the codebase and number of developers grow, knowing _will_ become futile at some point, and lazy developers are more likely to _not check_ than _check_. I would much rather have the compiler tell me _then and there_ exactly what I might have missed.

## Error Handling with `Result<T, E>`

A common way to deal with error handling, without the use of exceptions, is with a `Result<T, E>` type. This type comes in many shapes and forms and is also commonly referred to as `Try` or `Either`, but it primarily aims to _enforce_ error handling in a _typesafe_ way. A very barebone, yet fully functional, implementation is listed below.

```kotlin
sealed class Result<out T, out E>
class Ok<out T>(val value: T): Result<T, Nothing>()
class Err<out E>(val error: E): Result<Nothing, E>()
```

`Result` is a superclass that can only be instantiated as an `Ok` or an `Err`. If you receive an instance of `Result`, the only way to get the encapsulated value is by _explicitly_ checking whether it is an `Ok` or an `Err` instance. In other words, error handling is both enforced and compile-time typesafe. Simple enough, right? Let us look at an example.

```kotlin
fun divide(dividend: Int, divisor: Int): Result<Int, String> =
    when (divisor) {
        0 -> Err("Cannot divide by zero!")
        else -> Ok(dividend / divisor)
    }

fun main() {
    val dividend = 42
    val divisor = 10
    val division = divide(dividend, divisor)

    when (division) {
        is Ok -> println("$dividend / $divisor = ${division.value}")
        is Err -> println("Division failed: ${division.error}")
    }
}
```

In this example, the `divide` function either returns a `String` (the error case) or an `Int` (the quotient). Together with Kotlin's awesome `when` and `smartcast` functionality, the above code is minimal, easy to read, and straight to the point. Great!

But what about more complex problems you might ask. Well, this barebone implementation suffers from a readability problem when it comes to more complex problems, especially in the case of lambdas. Imagine being forced to check whether the result is an `Ok` or and `Err` in _every step_ of a lambda pipeline. To illustrate the problem further, let us look at a function that should periodically transfer all changed users from a database to a third-party API. It performs the following subtasks:

- Fetch the timestamp of the previous successful transfer from the database.
- Fetch all users that have changed since this timestamp from the database.
- Transfer all those users, one by one, to a third-party API.
- Save the result of the transfer to the database.

The signature of the functions we use are as follows:

```Kotlin
fun getLastSuccessfulTransferTimestamp(): Result<LocalDateTime, String>
fun getAllUsersChangedAfter(timestamp: LocalDateTime): Result<List<User>, String>
fun transferUser(user: User): Result<Unit, String>
fun saveTransferResult(startedAt: LocalDateTime, successCount: Int, failureCount: Int): Result<Unit, String>
```

With the barebone implementation of `Result` listed above, this function may be implemented like this:

```Kotlin
fun transferChangedUsers(now: LocalDateTime): Result<Unit, String> {
    val lastTransferTimestamp = getLastSuccessfulTransferTimestamp()

    if (lastTransferTimestamp is Ok) {
        val changedUsers = getAllUsersChangedAfter(lastTransferTimestamp.value)

        if (changedUsers is Ok) {
            val userTransfers = changedUsers.value.map(::transferUser)
            val (succeededTransfers, failedTransfers) = userTransfers.partition { it is Ok }

            val saveTransferResultStatus = saveTransferResult(now, succeededTransfers.size, failedTransfers.size)

            if (saveTransferResultStatus is Ok) {
                return Ok(Unit)
            }
        }
    }

    return Err("Failed to transfer users")
}
```
This implementation does not feel right. With all the error handling so tightly intertwined with the actual business logic, its readability suffers. Imagine that you needed to let the failure of each step propagate up the call-stack (an extremely common scenario). To do that, we could to add else-clauses to all those ifs and then return the error. That would make it even more verbose and harder to read. There is, however, a simple fix for this readability problem: make `Result<T, E>` a monad. By adding a `map` and a `flatMap` function to the Result-type, we get the benefits of _monadic chaining_. For readability and explicitness, we name the `flatMap` function `andThen` (you will see why shortly) and also add a `mapError` function as well.

```Kotlin
fun <U, T, E> Result<T, E>.map(transform: (T) -> U): Result<U, E> =
    when (this) {
        is Ok -> Ok(transform(value))
        is Err -> this
    }

fun <U, T, E> Result<T, E>.mapError(transform: (E) -> U): Result<T, U> =
    when (this) {
        is Ok -> this
        is Err -> Err(transform(error))
    }

fun <U, T, E> Result<T, E>.andThen(transform: (T) -> Result<U, E>): Result<U, E> =
    when (this) {
        is Ok -> transform(value)
        is Err -> this
    }
```

With these three functions added, let us see how improved the readability of the `transferChangedUsers` function becomes:

```Kotlin
fun transferChangedUsers(now: LocalDateTime): Result<Unit, String> =
    getLastSuccessfulTransferTimestamp()
        .andThen { lastTransferTimestamp -> getAllUsersChangedAfter(lastTransferTimestamp) }
        .map { users -> users.map(::transferUser) }
        .map { userTransfers -> userTransfers.partition { it is Ok } }
        .andThen { (succeededTransfers, failedTransfers) -> saveTransferResult(
            startedAt = now,
            successCount = succeededTransfers.size,
            failedCount = failedTransfers.size,
        ) }
        .mapError { "Failed to transfer users" }
```

Neat, huh? Now it reads very much the same way as the specification points themselves! The error handling is no longer tightly intertwined with the business logic. Notice that both `map` and `andThen` do nothing when the result is an `Err`. This means that if we now needed to let the error of each step propagate up the call stack, we remove the `mapError` call at the end. If, for example, the call to `getLastSuccessfulTransferTimestamp` fails, none of the `.andThen` nor the `.map` calls are going to apply its transformation function.

We still have one challenge remaining, though. What if function `C` needed the result of function `A` and `B` as arguments, and both `A` and `B` could fail, and thus, return a `Result<T, E>`? As an example, picture the `transferUser` function from the above example suddenly needing an authentication token as input.

The signature of `transferUser` changes to:

```kotlin
fun transferUser(user: User, token: String): Result<Unit, String>
```

and a new function to fetch a token is introduced:

```kotlin
fun fetchToken(): Result<String, String>
```

The `transferChangedUsers` function could now look like this:

```kotlin
fun transferChangedUsers(now: LocalDateTime): Result<Unit, String> =
    getLastSuccessfulTransferTimestamp()
        .andThen { lastTransferTimestamp -> getAllUsersChangedAfter(lastTransferTimestamp) }
        .andThen { users -> fetchToken().map { token -> Pair(users, token) } }
        .map { (users, token) -> users.map { user -> transferUser(user, token) } }
        .map { userTransfers -> userTransfers.partition { it is Ok } }
        .andThen { (succeededTransfers, failedTransfers) -> saveNewTransfer(
            timestamp = now,
            successCount = succeededTransfers.size,
            failedCount = failedTransfers.size
        ) }
        .mapError { "Failed to transfer users" }
```

Notice the use of `Pair`. When we have to carry the results of previous actions through the chain, it becomes unreadable fast, very fast. Luckily, people have also found solutions to this problem, often referred to as _monad comprehension_, _for-comprehension_, _async/await_, etc. By adding monad comprehension to the Result type, we can make it look very much like conventional imperative code.

```kotlin
fun transferChangedUsers(now: LocalDateTime): Result<Unit, String> =
    runResultTry {
      val lastTransferTimestamp = getLastSuccessfulTransferTimestamp().abortOnError()
      val changedUsers = getAllUsersChangedAfter(lastTransferTimestamp).abortOnError()
      val token = fetchToken().abortOnError()

      val userTransfers = changedUsers.map {user -> transferUser(user, token) }
      val (succeededTransfers, failedTransfers) = userTransfers.partition { it is Ok }

      saveNewTransfer(now, succeededTransfers.size, failedTransfers.size)
    }
    .mapError { "Failed to transfer users" }
```

Now, that is much easier to follow! So, let us dissect what happens here. If you are familiar with _async/await_ from javascript, this is the same concept, just in a different context. `runResultTry` can be seen as the equivalent of `async`, while `.abortOnError()` the equivalent of `await`. The implementation is listed below.

```kotlin
fun <T, E> runResultTry(block: RunResultTryContext<E>.() -> Result<T, E>): Result<T, E> =
    try {
        RunResultTryContext<E>().block()
    } catch (ex: RunResultTryAbortion) {
        Err(ex.err as E)
    }

class RunResultTryContext<E> {
    fun <T> Result<T, E>.abortOnError(): T =
        when (this) {
            is Ok -> value
            is Err -> throw RunResultTryAbortion(error as Any)
        }
}

private class RunResultTryAbortion(val err: Any) : Exception()
```

In simple terms, the `runResultTry` function takes a function as an argument and executes it in a `try/catch`. The `.abortOnError` function is a _scoped extension function_ of the Result type, which is _only_ available inside the block passed to `runResultTry`. When a result is an `Err`, the `.abortOnError` function aborts execution by jumping to the catch block of `runResultTry`, or else it unwraps and returns its encapsulated value. The fact that it uses exceptions internally is just an implementation detail, and not important. You may also notice the suspicious casts. These casts are a way to get around the fact that exceptions cannot have generic types (a consequence of dynamic typing and type erasure). Regardless, the casts are safe in the current implementation above.

## When Should You Use `Result<T, E>`?
The Result type is not a silver bullet that fits every error-handling situation perfectly, at least not in languages with side effects. When this pattern is used to handle errors of functions where you do not care about the return value (i.e., impure functions), a problem arises: errors might be _swallowed_. If you are not prepared to receive a return value, it is very easy to forget to check whether the invocation failed. In situations where nothing fails or blows up, errors and bugs may be difficult to debug. In other words, exceptions might be a better choice in such situations. At least then, everything blows up and gets (hopefully) logged.

There are solutions/workarounds to this swallowing-problem, even for impure languages. Javascript, for example, has the global `unhandledrejection`-event, which fires whenever a promise is rejected but lacks an error handler (i.e., a `.catch()`). In Kotlin (and Java), we may utilize the `finalize`-method to implement the same concept, but on the other hand, `finalize` is only called when the object is about to be garbage collected, which makes it somewhat unreliable.


Currently, my rule of thumb is that you should use:

Exceptions when:
* You treat all errors equally, and the type of the error is irrelevant. I.e.,
  * An error handler at the top-level of your application that _only_ catches instances of `Exception` would suffice.
  * You do not try to recover from failure.
* There is a high risk of the error being swallowed, either now or after a refactor in the future.

Result when:
* None of the above points about exceptions apply.
