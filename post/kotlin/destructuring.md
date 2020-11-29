---
calendar: kotlin
post_year: 2020
post_day: 16
title: Destructuring
links:
  - url: https://kotlinlang.org/docs/reference/multi-declarations.html
    title: Destructuring Declarations
authors:
  - Matias Vinjevoll
---
A handy feature in Kotlin is the ability to destrucure datatypes into multiple variables.
Given a data class:

```kotlin code
data class Country(val name: String, val population: Int, val area: Int)
```

And an instance `country` of `Country`:

```kotlin code
val country = Country(name = "Norway", population = 5_432_580, area = 385_207)
```

We can use the syntax called destructuring declaration to extract the values of `name`, `population` and `area` from `country`, where the left-hand side of the assignment are comma separated variables wrapped in parentheses: 

```kotlin code
val (name, population, area) = country
```

With this syntax, it is possible to assign multiple variables from properties of a single instance of an object, in one line. This code would give the same result without using destructuring declaration:

```kotlin code
val name = country.name
val population = country.population
val area = country.area
```

The variable names does not have to be the same as the names of the properties of the data class,
and we can also specify the types like for regular variable assignments:

```kotlin code
val (x: String, y: Int, z: Int) = country
```

Destructuring declaration should not be confused with tuples found in other languages such as Python, Haskell, Scala and C#.  While the syntax of destructuring declaration on the left-hand side looks very
similar to tuples on the right-hand side, Kotlin does not have tuples. Here is an example to illustrate the similarity:

```kotlin code
val (name, population, area) = ("Norway", 5_432_580, 385_207) // not compiling
```

However, data classes can be seen as powerful tuples with the advantage of both being named themselves
as well as their properties.

But how does the destructuring work? It is based on a convention of functions called `component1(), component2(), ..., componentN()`, where in the assignment `val (v1, v2, ..., vN) = x`, `v1` would be assigned to `x.component1()`, `v2` to `x.component2()` and so on. These functions are automatically generated for data classes, and would look like the following for the data class `Country` as extension functions:

```kotlin code
operator fun Country.component1(): String = name
operator fun Country.component2(): Int = population
operator fun Country.component3(): Int = area
```

This means that we can get destructuring capabilities on any data types, by defining `componentN()` functions.
When destructuring, we can destructure as many, or few, variables as we like, as long as there are defined
enough `componentN()` functions. So if we are not interested in the `area` variable of `country`, we can omit `area` in the destructuring:

```kotlin code
val (name, population) = country
```

If we are only interested in the `population` variable of `country`, we can replace the variable name for assigning 
`name` with an underscore:

```kotlin code
val (_, population) = country
```

Another useful case of destructuring found in the standard library is on lists, where `component1()` to `component5()` functions are defined, making it possible to destructure lists like this:

```kotlin code
val (a, b, c, d, e) = listOf(1, 2, 3, 4, 5)
```

One should however be sure not to destructure more elements than the list contains, to avoid `IndexOutOfBoundsException`.

Destructuring can also be used in lambdas. So this lambda, printing the `population` property of `country`:

```kotlin code
val f: (Country) -> Unit = { country -> println(country.population) }
```

Could also be written like this:

```kotlin code
val f: (Country) -> Unit = { (_, population) -> println(population) }
```

Destructuring is one useful feature in Kotlin that contributes to keeping our code clean and concise. In the future, maybe we will see additional destructuring capabilities in Kotlin, like [this proposal for pattern matching](https://github.com/Kotlin/KEEP/pull/213) using the `when` expression.