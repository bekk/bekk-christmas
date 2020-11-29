---
calendar: kotlin
post_year: 2020
post_day: 9
title: Type Classes
authors:
  - Matias Vinjevoll
---
A type class is a construct that defines a set of behaviours that can be adapted to different types. Unlike
inheritance, the implementation of the behaviour for a type is decoupled from the definition of the type.
In this post, we'll walk through an example that demonstrates this in Kotlin. 

Lets use the example of finding the sum of something, like integers. From the standard library we have the `sum`
function that can be applied to lists, `listOf(1,2,3).sum()`, resulting in `6`. The `sum` function is implemented 
in the standard library as an extension function on `Iterable`:

```kotlin code
public fun Iterable<Int>.sum(): Int {
    var sum: Int = 0
    for (element in this) {
        sum += element
    }
    return sum
}
```

Say we wanted to sum a list of `java.math.BigDecimal`, `listOf(BigDecimal(1), BigDecimal(2), BigDecimal(3)).sum()`.
This does not compile because the function `sum` does not exist for `BigDecimal`.
We could define it like the following code snippet, which is exactly the same as the implementation for `Int` except from swapping `Int` with `BigDecimal`:

```kotlin code
public fun Iterable<BigDecimal>.sum(): BigDecimal {
    var sum: BigDecimal = BigDecimal(0)
    for (element in this) {
        sum += element
    }
    return sum
}
```

To avoid repeating this implementation for all the types we want to sum, let's try creating an interface `Addable`
so that we can make the sum function generic for subtypes of `Addable`:

```kotlin code
interface Addable<T> {
    fun plus(other: T): T
}
```

The `Addable` interface has one function `plus`, adding two instances of `T` and returning the result. 

Using the `Addable` interface, our sum function on `Iterable` would look like this:

```kotlin code
fun <T : Addable<T>> Iterable<T>.sum(): T? {
    var sum: T? = null
    for (element in this) {
        sum = sum?.plus(element) ?: element 
    }
    return sum
}
```

One problem with this implementation is that we do not know how to represent the initial value for `sum`, namely zero.
This is a problem when the iterable is empty, so we'll have to change the return type from `T` to `T?` and return
`null` if the iterable is empty.

A second problem is that we cannot make `BigDecimal` extend our new `Addable` interface - or any other types that
we use from other libraries. So to make this work for `BigDecimal`, we'll have to make a wrapper that can extend `Addable`:

```kotlin code
inline class BigDecimal(val value: java.math.BigDecimal) : Addable<BigDecimal> {
    override fun plus(other: BigDecimal): BigDecimal = BigDecimal(value + other.value)
}
```

This does not seem to be an ideal solution, whereas duplication of the function for different types will make it more
convenient to use. In fact, the function `sum` is duplicated for `Byte`, `Short`, `Int`, `Long`, `Float`, `Double`,
in the standard library.
However, let's try to redefine our `Addable` interface to a type class:

```kotlin code
interface Addable<T> {
    fun T.plus(t: T): T
    fun zero(): T
}
```

It is still an interface, but we have defined the `plus` function as an extension function on `T` since we do not intend
for the interface to be inherited by `T` as in the previous version of the `Addable` interface. We want to decouple
the behaviour of `Addable` for the type `T`, from the implementation of `T`.

Since the implementation of `Addable` for a type `T` will be decoupled from the implementation of `T`, we may add
singleton behaviour to the type class, i.e. behaviour that is not related to a specific instance of `T`.
That makes it possible to deal with the `null` issue from our previous implementation of `sum` with inheritance, 
by adding the function `zero` to the type class.

This is how the implementation of `sum` could be, using the `Addable` type class: 

```kotlin code
fun <T> Iterable<T>.sum(addable: Addable<T>): T {
    var sum: T = addable.zero()
    for (element in this) {
        addable.run {
            sum = sum.plus(element)
        }
    }
    return sum
}
```

In this version, we provide an instance `addable` of `Addable<T>`. The variable `sum` is initialized to
`addable.zero()` so that we do not need to worry about `null` when the list is empty. In the `for`-loop, we 
wrap the sum operation inside a block of `addable.run`, making `Addable<T>` the receiver type which makes the
extension function `plus` available for instances of `T`.

To make it more convenient to create instances of the `Addable` type class, we can add a function `instance` to its
companion object, taking the two functions `zero` and `plus` as parameters, and returning a new instance of `Addable`:

```kotlin code
interface Addable<T> {
    fun T.plus(t: T): T
    fun zero(): T

    companion object {
        fun <T> instance(plus: (T,T) -> T, zero: () -> T): Addable<T> {
            return object : Addable<T> {
                override fun T.plus(t: T) = plus(this, t)
                override fun zero(): T = zero()
            }
        }
    }
}
```

Now, it is easy to create an instance of `Addable` for `BigDecimal`: 

```kotlin code
fun bigDecimalAddable(): Addable<BigDecimal> =
    Addable.instance({ a, b -> a + b },  { BigDecimal(0) })
```

Which can be used like this:

```kotlin code
listOf(BigDecimal(1), BigDecimal(2), BigDecimal(3)).sum(bigDecimalAddable())
```

There is a [proposal to enable compile-time dependency resolution](https://github.com/Kotlin/KEEP/pull/87) with a 
new `extension` keyword to define instances of interfaces, and mechanisms to retrieve those instances by the `with` 
keyword. These changes could make it more convenient to use type classes in Kotlin in the future. For the above example, 
by enabling invocation of `sum()` without providing the type class instance of `bigDecimalAddable()`.

If you found this short introduction to type classes in Kotlin interesting, you should definitely check out the [Arrow library](https://arrow-kt.io/docs/typeclasses/intro/), which implements a number of type classes.