---
calendar: kotlin
post_year: 2020
post_day: 3
title: Kotlin language evolution
ingress: >+
  The year 2020 has certainly been a special one, but that hasn't stopped
  Jetbrains from continuing its work on the Kotlin language and its ecosystem.

  In March we got the 1.3.70 version, an incremental release, which included some new functions and classes in the standard library. And after the summer break we got the all new 1.4.0 version, a feature release, which came with some really sought after changes to the language and even more changes to the standard library.

authors:
  - Nicklas Utgaard
---
# 1.3.70 release
This version introduces a new `kotlin.collections.ArrayDeque`, which is conceptually similar to `java.util.ArrayDeque`, but it has its own implementation. And as such it is now possible to use if you're targeting a Kotlin/JS or Kotlin/Native. 

Some other neat additions are the builder functions for common collections; `buildList`, `buildSet` and `buildMap`. And of course you can do whatever you want within the lambda, so this makes it really easy to conditionally add elements to our collections.

```kotlin
val list = buildList {
    add("Hello, ")
    if (isHelloWorld) {
        add("World")
    } else {
        add("Kotlin")
    }
}

val set = buildSet {
    add("Hello")
    add("World")
}

val map = buildMap<String, String> { 
    put("Hello", "World")
}
```

As if that wasn't enough this release also introduces `scan` and `scanReduce`. Functions who are closely related to `fold` and `reduce`, but returns the whole sequence of intermediate results instead of just the final result.
```kotlin
val list = 0..5
val sum: (Int, Int) -> Int = { a, b -> a + b }

val fold = list.fold(0, sum) // Returns 15
val scan = list.scan(0, sum) // Returns [0, 1, 3, 6, 10, 15]
```

This is by no means an exhaustive list of changes, and we recommend taking a closer look at [the changelog](https://blog.jetbrains.com/kotlin/2020/03/kotlin-1-3-70-released/)

# 1.4.0 release

# 1.5.0 release future