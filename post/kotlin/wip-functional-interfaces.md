---
calendar: kotlin
post_year: 2020
post_day: 21
title: WIP Functional Interfaces
---
Functional interfaces

Functional interfaces was introduced in Kotlin 1.3

```kotlin
val uppercaseFn: (String) -> String = {
    it.toUpperCase()
}
println(uppercaseFn("Hello")) // HELLO
```

We can use type aliases... 

```kotlin
typealias Uppercase = (String) -> String

val uppercaseFnx: Uppercase = {
    it.toUpperCase()
}
println(uppercaseFn("Hello")) // HELLO
```

Now for type interfaces. Lets start with...

```kotlin
fun interface Suffix {
    fun exclaim(s: String): String
}
val suffixFn: Suffix = Suffix {
    "$it!"
}
println(suffixFn.exclaim("Hello") // "Hello!"
```

We can use the invoke operator...

```kotlin
fun interface Prefix {
    operator fun invoke(s: String): String
}
val prefixFn: Prefix = Prefix {
    "~$it"
}
println(prefixFn("Hello")) // "~Hello"
```

You can also return functions from functional interfaces

```kotlin
fun interface Math {
    fun value(s: Int): (Int) -> Int
}
val timesX = Math { times ->
    { it * times }
}
val timesTwo = timesX.value(2)
println(timesTwo(5)) // 10
```


Type aliases vs functional interfaces