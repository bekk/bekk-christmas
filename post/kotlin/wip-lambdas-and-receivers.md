---
calendar: kotlin
post_year: 2019
post_day: 18
title: WIP - Lambdas and receivers
authors:
  - Vegard Veiset
---
Lambdas are a central part of Kotlin!

There are a lot of ways to define a function in Kotlin. Lets take a look at some of them.

The first is what you might be used to from Java. A function with typed arguments, a return type and a function body.

```kotlin
fun plus(a: Int, b: Int): Int {
    return a + b
}
```

Kotlin have single expression functions.

```kotlin
fun plus(a: Int, b: Int): Int = a + b
```

We can also assign values to variables!

```kotlin
val plus: (Int, Int) -> Int = { a, b -> a + b } 
```

So how does the block syntax work?

```kotlin
listOf(1, 2, 3).sumBy { it + 1 }
```

Lets take a look in to the standard library. Passing a function as the last argument means that we can pull the block outside the function and ignore the brackets. 

```kotlin
public inline fun <T> Iterable<T>.sumBy(selector: (T) -> Int): Int {
    var sum: Int = 0
    for (element in this) {
        sum += selector(element)
    }
    return sum
}
```

...

If we dive in to the source code of `apply` from the standard library, we see that it uses some interesting syntax.


```kotlin
public inline fun <T> T.apply(block: T.() -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block()
    return this
}
```

What is this `T.()` syntax?


