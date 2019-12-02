---
calendar: kotlin
post_year: 2019
post_day: 9
title: Extension functions
image: 'https://images.unsplash.com/photo-1551650322-a0cfff4dd76b'
ingress: >-
  An extension functions is, as the name implies, a function that extends an
  existing class. The function does this without actually modifying it!
links:
  - title: Kotlinlang - Extensions
    url: 'https://kotlinlang.org/docs/reference/extensions.html'
  - title: Clean models using extensions
    url: 'https://okkotlin.com/clean-models/'
  - title: Write extension functions for your own classes
    url: 'https://blog.frankel.ch/write-extension-functions-own-classes-kotlin/'
  - title: Decorator pattern
    url: 'https://en.wikipedia.org/wiki/Decorator_pattern'
authors:
  - Yrjan Fraschetti
---
We also do not need to derive the class, by using a [decorator pattern](https://en.wikipedia.org/wiki/Decorator_pattern), like we would have to do in Java or any other language that does not support extensions.

Cool, right?

## Naugthy or Nice

Let's take a look at an example. As we all know, Santa Claus keeps two lists to know who is naughty and who is nice. For this purpose he makes a data class containing all the data on each child.

```
data class Child (
	val name: String,
	val adress: String,
	val listensToParents: Boolean,
	val sharesToys: Boolean,
	val doesHouseChores: Boolean
)
```
This class contains all the important parameters for Santa Claus to determine who is naugthy or nice, but not the actual logic to give him a consise answer. Santa does not want to taint the pure data class with logic, so the logical solution to his problems is of course, to extend the class.

```
Child.isNice(): Boolean = listensToParents && sharesToys && doesHouseChores
Child.getNameAndAdress: String = "$name, $adress"
```
Santa Claus can now easly sort all the children into their respective lists using the `isNice()` extension function. To know where to go and who he is visiting, he can call the `getNameAndAdress()` extensiuon function to get a formated string of the info. Pretty neat!

Just to get it staight, the syntax for extension functions is as follows: `fun <Class>.<Name of extension>(<Parameters>): <Return type if any> {}`

# Statically resolved
One thing Santa does need to be aware of is that extension functions in Kotlin are dispatched statically. This means that the extension function that is being called is determined by the type of the expression on which the function is invoked, not by the type of the result of evaluating that expression at runtime. Let's take a closer look:
```
data Naughty: Child()

fun Child.getClassName() = "Child"

fun Naughty.getClassName() = "Naughty"

fun printClassName(c: Child) {
    println(c.getClassName())
}    

printClassName(Naughty())
```
In the example above Santa Claus has created a new class called Naughty, that implemets the Child-class from before. This example prints "Child", because the extension function being called depends only on the declared type of the parameter c, which is the Child class.

For more information on extension functions, have a look at the [Kotlin docs](https://kotlinlang.org/docs/reference/extensions.html).
