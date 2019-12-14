---
calendar: kotlin
post_year: 2019
post_day: 19
title: 'WIP: Streamlining your functions with Named and Default Arguments'
image: >-
  https://images.unsplash.com/photo-1464348123218-0ee63dfd2746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2328&q=80
ingress: "As developers, we spend a considerable amount of time declaring and invoking functions when writing software. Kotlin provides several features that can boost your productivity when working with functions. Today we'll take a closer look at two of these features; Named Arguments and Default Arguments, and how we might use them to make our Christmas preparations carefree \U0001F384"
links:
  - title: 'Kotlin Docs: Default Arguments / Named Arguments'
    url: 'https://kotlinlang.org/docs/reference/functions.html#default-arguments'
authors:
  - Sondre Larsen Ovrid
---
## Named Arguments

When declaring functions we may specify an arbitrary number of parameters that the function expects in order to perform its logic. For example we may declare the following function for preparing Christmas gifts:

```kotlin
fun prepareChristmasGift(
    nameTag: String, 
    applyWrapping: Boolean, 
    applyTape: Boolean, 
    applyRibbon: Boolean, 
    applyGiftBow: Boolean
) { ... }
```

Likewise the caller of the function would probably call the function with the corresponding arguments like so:

```kotlin
prepareChristmasGift("John Doe", true, true, true, false)
```

Now first of all, you may have noticed that the order of the arguments given to the function upon calling it, is not arbitrary. As you probably already know, we have to adhere to the order of the parameters as given in the function signature. The language simply has no other way to map the arguments to its corresponding parameter counterpart.

Named Arguments, on the other hand, lets us specify which particular parameter we are mapping the argument value to. Utilising this concept, we may instead call the function the following way:

```kotlin
prepareChristmasGift(
    nameTag = "John Doe", 
    applyWrapping = true, 
    applyTape = true, 
    applyRibbon = true, 
    applyGiftBow = false
)
```

Alternatively, we may omit the name of one or more of the arguments:

```kotlin
prepareChristmasGift(
    "John Doe", 
    applyWrapping = true, 
    applyTape = true, 
    applyRibbon = true, 
    applyGiftBow = false
)
```

Keep in mind, though; arguments that we do not specify by name must still adhere to the placement as given by the function declaration.

Although a little more verbose, using Named Arguments arguably makes it easier to understand what the function does, without having to look at the function signature itself (or code inspection if your IDE supports it). Additionally, as we'll see later, when combining Named and Default Arguments, we can make function calls even more flexible and sometimes less verbose.

## A word about Java Interop

In the example above we made the assumption that our function was both declared and called from within Kotlin code. If we're making use of Kotlin's interop with Java, we might be tempted to try and call Java methods with named arguments from within Kotlin code. By default this is **not supported**, and thus trying to pass arguments to a Java method call by specifying its parameter name, would result in a compiler error.

Rewriting the Java method to a Kotlin function might not always be an option. In such cases there are some alternatives to named arguments in the context of Java interop; such as utilising the [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern), that might give similar possibilities, although requiring more overhead. 

## Default Arguments

There are use cases when we might want to enable the user of our functions to omit certain arguments, if possible. If you're coming from a language like Java, you may be familiar with the concept of function overloading. The following example is a frequently used pattern to achieve omissible function arguments by utilising function overloading:

```kotlin
fun overloaded(a: Boolean, b: Boolean, c: Boolean, d: Boolean) { ... }

fun overloaded(a: Boolean, b: Boolean, c: Boolean) =
    overloaded(a, b, c, false)

fun overloaded(a: Boolean, b: Boolean) =
    overloaded(a, b, false)

fun overloaded(a: Boolean) =
    overloaded(a, false)
```

In practice we have now allowed the caller of the function to omit arguments for `b`, `c`, `d`, which will be supplied correspondingly with `false` as the default value.

With Default Arguments though, we can achieve the same functionality with a fraction of the overhead. Suppose we wanted to modify our gift-wrapping function with a default value for the `applyGiftWrapping` parameter. After all; half the fun with receiving Christmas presents lies in the unwrapping, so we can expect that most of the callers will want to have this flag set to `true`!

Default Arguments are specified in the function declaration using `=` followed by the default value. Applying this to our function, we get the following:

```kotlin
fun prepareChristmasGift(
    nameTag: String, 
    applyWrapping: Boolean = true, 
    applyTape: Boolean, 
    applyRibbon: Boolean, 
    applyGiftBow: Boolean
) { ... }
```

We may take this a step further, supplying default values for the majority of our remaining parameters:

```kotlin
fun prepareChristmasGift(
    nameTag: String, 
    applyWrapping: Boolean = true, 
    applyTape: Boolean = true, 
    applyRibbon: Boolean = false, 
    applyGiftBow: Boolean = true
) { ... }
```

Now it is possible to call the function while omitting some arguments, which instead will be supplied behind the scenes with the default values that we specified:

```kotlin
prepareChristmasGift("John Doe")
```

Neat! Keep in mind that, unless we combine this with Named Arguments, only trailing arguments can be omitted. If we wanted to supply the `applyRibbon` and the `applyGiftBow` with arguments other than the default ones, we would also have to give values for preceding arguments.

## Combining Named and Default Arguments

​If you're anything like me, you have a ton of presents to prepare for Christmas, but only so much time. No worries! Let's speed up the process a bit by combining Named and Default Arguments. Personally I prefer ribbons over gift bows, so that's what I'll stick to when calling my Kotlin functions as well:

```kotlin
val giftBag = listOf(
    prepareChristmasGift("John Doe", applyRibbon = true, applyGiftBow = false),
    prepareChristmasGift("Jane Doe", applyRibbon = true, applyGiftBow = false)
    ...
)
```

## Summary

​Named and Default Arguments lets us write more user friendly and generalized functions, with little overhead. In return we get more readable code, and often a quicker development process.
