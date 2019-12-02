---
calendar: kotlin
post_year: 2019
post_day: 9
title: WIP - Extension functions
image: >-
  https://images.pexels.com/photos/3186163/pexels-photo-3186163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
ingress: >-
  An extension functions is, as the name implies, a function that extends an
  existing class. The function does this without actually modifying the it!
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
We also do not need to derive the class, by using a [decorator pattern](https://en.wikipedia.org/wiki/Decorator_pattern), like we would have to do in for example Java.

Cool, right?

## The calculator

Let's take a look at an example. Say you have a calculator class:

```
class Calculator() {
  fun add(a: Int, b: Int) = a+b

  fun subtract(a: Int, b: Int) = a-b
}
```

This class i obviously missing some functionality. So, if you would like the Calulator class to also have a multiply function, one way to make that happen is to use an extension function like this:

```
 fun Calculator.multiply(a: Int, b: Int) = a*b
```

Now you can use the extension just like the _native_ functions:

```
fun main() {
    var a = 20
    var b = 16
    var calc = Calculator()
    println(calc.add(a, b))
    println(calc.subtract(a, b))
    println(calc.multiply(a, b))
} 
```

Running the main function would give the following output:

```
36
4
320
```

The syntax for extension functions is as follows: `fun <Class>.<Name of extension>(<Parameters>): <Return type if any> {}`

# Statically resolved
