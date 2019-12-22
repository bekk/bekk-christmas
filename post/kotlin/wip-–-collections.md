---
calendar: kotlin
post_year: 2019
post_day: 23
title: Lists vs. sequences
ingress: >-
  The Kotlin library comes with several container types. Two of these are `List`
  and `Sequence`. At the first glance these two look quite similar, but we will
  look at the differences in this article.
description: Kotlin list sequence
authors:
  - Øyvind Midtbø
---
A `List` implements the `Collection` interface, which again implements the `Iterable` interface. A `List` is an ordered collection of elements, and every element can be accessed by an index.

```
val numbersList = listOf(1, 2, 3, 4)
println(numbersList[1]) // 2
println(numbersList.indexOf(4)) // 3
```

The `listOf()` method returns an immutable list, and as a result you can't add or remove objects. If you want to work with a mutable list, you can specify that when creating the list:

```
val mutableNumbersList = mutableListOf("a", "a", "b", "c", "d")
mutableNumbersList.remove("a") // Removes the first occurrence
mutableNumbersList.add("e")
println(mutableNumbersList) // [a, b, c, d, e]
```

Note that although the list is created as a constant with the `val` keyword, you can still add or remove objects. The reason for that is that write operations modify the same object reference.

A `Sequence` offers the same functionality as `Iterable`, but implements another approach to multi-step collection processing.

```
val numbersSequence = sequenceOf(1, 2, 3, 4)
println(numbersSequence.elementAt(1)) // 2
println(numbersSequence.indexOf(4)) // 3
```

You can also create a sequence from an `Iterable`:

```
val letters = listOf("a", "b", "c", "d")
val lettersSequence = letters.asSequence()
```

On both sequences and lists you can operate upon collection of elements, like you can see in this example:

```
data class Country(val name: String, val population: Long)

val countries = listOf(
    Country("Norway", 5_300_000),
    Country("Denmark", 5_600_000),
    Country("Sweden", 10_100_000),
    Country("Finland", 5_500_000),
    Country("Germany", 82_800_000)
)

val bigCountries1 = countries
    .filter { it.population > 6_000_000 }
    .map { it.name }

println(bigCountries1) // [Sweden, Germany]

val bigCountries2 = countries
    .asSequence()
    .filter { it.population > 6_000_000 }
    .map { it.name }
    .toList()

println(bigCountries2) // [Sweden, Germany]
```

Now let's look at the difference between sequences and lists. If a sequence operation returns another sequence, it’s an intermediate function. If it doesn’t return a sequence, it’s terminal. Sequences are lazy, so intermediate functions for sequences don’t do any calculations. All the calculations are added to the sequence, and they are not performed until a terminal operation is called. On a list, however, the intermediate function does the calculation and returns a new collection.

If we expand the example above with some print statements, we can see how the program executes:

```
println("List:")
val bigCountries1 = countries
    .filter {
        println("Filters the population: ${it.name}")
        it.population > 6_000_000
    }
   .map {
        println("Maps the name: ${it.name}")
        it.name
    }

println(bigCountries1) // [Sweden, Germany]
println("\nSequence:")

val bigCountries2 = countries
    .asSequence()
    .filter {
        println("Filters the population: ${it.name}")
        it.population > 6_000_000
    }
    .map {
        println("Maps the name: ${it.name}")
        it.name
    }
    .toList()

println(bigCountries2) // [Sweden, Germany]
``

The output:
```
List:
Filters the population: Norway
Filters the population: Denmark
Filters the population: Sweden
Filters the population: Finland
Filters the population: Germany
Maps the name: Sweden
Maps the name: Germany
[Sweden, Germany]

Sequence:
Filters the population: Norway
Filters the population: Denmark
Filters the population: Sweden
Maps the name: Sweden
Filters the population: Finland
Filters the population: Germany
Maps the name: Germany
[Sweden, Germany]
```
