---
calendar: kotlin
post_year: 2019
post_day: 9
title: WIP - Extension functions
image: >-
  https://images.pexels.com/photos/3186163/pexels-photo-3186163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
ingress: >-
  An extension functions is, as the name implies, a function that extends an
  existing class. The function does this without actually modifying it!
links:
  - title: Kotlinlang - Extensions
    url: 'https://kotlinlang.org/docs/reference/extensions.html'
  - title: Extension function in Kotlin
    url: 'https://www.tutorialkart.com/kotlin/extension-functions-in-kotlin/'
  - title: Decorator pattern
    url: 'https://en.wikipedia.org/wiki/Decorator_pattern'
authors:
  - Yrjan Fraschetti
---
We also do not need to derive the class, by using a [decorator pattern](https://en.wikipedia.org/wiki/Decorator_pattern), like we would have to do in Java or any other language that does not support extensions.

Cool, right?

## Naugthy or Nice

Let's take a look at an example. As we all know, Santa Claus keeps two lists to know who is naughty and who is nice. For this he makes a data class containing the data on each child:

```
data class Child (
	val name: String,
	val adress: String,
	val listensToParents: Boolean,
	val sharesToys: Boolean,
	val doesHouseChores: Boolean
)
```
This class contains all the important parameters for Santa to determine who is naugthy or nice, but he does not want taint the pure data class with logic. The solution to his problems is of course, to extend the class.

```
Child.isNice(): Boolean = listensToParents && sharesToys && doesHouseChores
Child.getNameAndAdress: String = "$name, $adress"
```
Santa Claus can now easly sort all the children into their respective lists using the `isNice()` extension function. To know where to go and who he is visiting, he can call the `getNameAndAdress()` extensiuon function to get a formated string of the info. Pretty neat!

Just to get it staight, the syntax for extension functions is as follows: `fun <Class>.<Name of extension>(<Parameters>): <Return type if any> {}`

# Statically resolved
