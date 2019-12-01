---
calendar: kotlin
post_year: 2019
post_day: 2
title: Null Safety
ingress: ''
---
One of the most common mistakes of many programming languages is accessing a member of a `null` reference which results in an exception. Most people have probably experienced getting NullPointerExceptions in Java, or NPE for short. Kotlin's type system, on the other hand, is aimed at eliminating this.

In Kotlin, the type system distinguishes between nullable references and non-nullable references. For example, a String variable cannot be `null`.

```
var nice: String = "Mrs. Claus"
nice = null // This won't compile
```

Preferably you wouldn't want to introduce nullability into your code, but sometimes `null` is inevitable and then it's important to know how to keep your code null safe.

To allow, then, an object to be `null`, we can declare it as a nullable object by suffixing the type with `?`

```
var naughty: String? = "Santa Claus"
naughty = null // This compiles now
```

Now, if you try to access a member of `nice`, it's guaranteed not to cause an NPE, but since `naughty` is nullable, if you try to do the same on it, the compiler reports an error.

```
val niceLength = nice.length // length: 10
val naughtyLength = naughty.length // error: variable 'naughty' can be null
```

To get round this we can check whether the variable is `null` by doing

```
val naughtyLength = if (naughty != null) naughty.length else -1
```

Or by using the safe call operator `?.`

```
val naughtyLength = naughty?.length
```

The safe call operator returns the length of `naughty` if it is not `null` and `null` otherwise. You might be familiar with this this type of from other languages like C#.

Safe calls are especially usefully in chains.

```
santa?.elfs?.head?.name
```

This return `null` if any part of the chain is `null`.

We can also handle nullable objects using the elvis operator `?:`

```
val naughtyLength = naughty.length ?: -1
```

The elvis operator here returns the length of `naughty` if `naughty` is not null or -1 otherwise.

You can also tell Kotlin that a nullable object cannot be null by using the `!!` operator. This converts any nullable type to a non-nullable type and throws an exception if the value is `null`

```
val naughtyLength = naughty!!.length
```

Thus, if you like and want to get NullPointerExceptions, you still can! You just have to ask for it first.
