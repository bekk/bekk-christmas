---
calendar: kotlin
post_year: 2020
post_day: 2
title: Kotlin changelog
ingress: >+
  The year 2020 has certainly been a special one, but that hasn't stopped
  Jetbrains from continuing its work on the Kotlin language and its ecosystem.

  In March we got the 1.3.70 version, an incremental release, which included some new functions and classes in the standard library. And after the summer break we got the all new 1.4.0 version, a feature release, which came with some really sought after changes to the language and even more changes to the standard library.

links:
  - title: Kotlin 1.3.70 Released
    url: https://blog.jetbrains.com/kotlin/2020/03/kotlin-1-3-70-released/
  - title: What's New in Kotlin 1.4.0
    url: https://kotlinlang.org/docs/reference/whatsnew14.html#new-functions-for-arrays-and-collections
  - title: Kotlin Roadmap
    url: https://kotlinlang.org/roadmap.html
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
This release brought a number of changes to the language, tooling and even more changes to the standard library.

## SAM (Single Abstract Method) conversions 
SAM (Single Abstract Method) conversions for Kotlin interfaces are now supported. Previously SAM conversions were only possible for interfaces defined in Java, but with the new `fun interface` syntax it is now possible to create similar constructs in kotlin. 
As the example show we are now able to call `accept` on our `Predicate`s, this is possible since behind the scenes the kotlin compiler actually creates classes and instances that implement the abstract function.
```kotlin
fun interface Predicate<T> {
    fun accept(value: T): Boolean
}
typealias StringPredicate = Predicate<String>

fun main() {
    val hello = Predicate<String> { it.startsWith("Hello") }
    val world = StringPredicate { it.endsWith("World") }

    println(hello.accept("Hello, World")) // true
    println(world.accept("Hello, World")) // true
    println("What is it? $hello") // What is it? ReifiedKt$main$hello$1@b81eda8
}
```

## Mixed named and positional arguments
When using named arguments in kotlin 1.3 you were forced place all positional arguments before the named ones, e.g you could do `quadraticEquation(5, 6, c = 1)` but not `quadraticEquation(5, b = 6, 1)`. In kotlin 1.4 this restriction is relaxed, you you may mix positional and named arguments as you please as long as the arguments are in the correct order.

This can be especially helpful if you have a function with a couple of boolean flags;
```kotlin
fun split(value: String, trimPrefix: Boolean, trimSuffix: Boolean, delimiter: String): Array<String) = TODO()
split(
  "  Hello, World",
  trimPrefix = true,
  trimSuffix = false,
  ", "
)
```

## Trailing comma
Kotlin 1.4 also adds a possibly contentious new feature with its trailing commas, e.g `listOf("A", "B", "C",)`. The feature affects arguments and parameter lists, when entries and components of destructuring declarations.

```kotlin
fun sum(
  a: Int, 
  b: Int,
) = a + b

val list = listOf(
  1,
  2,
  3,
)

val isPrimse = when (Random.nextInt()) {
    2, 3, 5, 7, 11, -> true
    else -> false
}

val (a, b,) = Pair(0, 1)
``` 


## New compiler
The new compiler was available behind a feature-flag in version 1.3, but is now the new default. With it comes a new type inference algorithm which is even better than the previous version at inferring types, smart-casting and SAM conversions.

```kotlin
val result = run {
    var str = currentValue()
    if (str == null) {
        str = "test"
    }
    str
}

// This fails in kotlin 1.3 since it believes that `result` still can be nullable.
println(result.toUpperCase()) 
```

## Additions to the standard library

Version 1.4 continues to add even more stuff into the `kotlin.collections` package; 
- `setOfNotNull()` is added, mirroring its sibling `listOfNotNull`
- `shuffled()` is added to `Sequence`, whereas it was previously only available on `Iterable`
- `min()` and `max()` has gotten a deprecation notice, guiding you to use `minOrNull()` and `maxOrNull()`
- The arrays have gotten some love as well, introducing `shuffle()`, `onEach()`, `reverse()` and more.
- The first stable version of `kotlinx.serialization` is shipped - version 1.0.0-RC. Is this the end of weird serialization bugs in kotlin? We'll see.


This was just a quick overview of what I personally found interesting in the changelog, and a lot of things were left out. I encourage everytone to take a look the [full changelog](https://kotlinlang.org/docs/reference/whatsnew14.html) for a more comprehensive list of changes.

# 1.5.0 and future roadmap
The Kotlin roadmap outlines a few areas where we can expect changes, including further work on the new compiler and extra improvements in tooling and multiplatform support. 

Perhaps we'll see support for functions with multiple receivers ([KT-42435](https://youtrack.jetbrains.com/issue/KT-42435)), JVM sealed classes ([KT-42433](https://youtrack.jetbrains.com/issue/KT-42433)) and JVM records ([KT-42430](https://youtrack.jetbrains.com/issue/KT-42430)). Or perhaps we'll get Kotlin/WASM ([KT-42292](https://youtrack.jetbrains.com/issue/KT-42292)), only time will tell.

The next feature release is scheduled for March 2021, and we'll be eagerly await its arrival.
