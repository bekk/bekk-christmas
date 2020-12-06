---
calendar: kotlin
post_year: 2020
post_day: 11
title: Operator Overloading
authors:
  - Eivind Reime
---
From Wikipedia: 

> *Operators are constructs defined within programming languages which behave generally like functions, but differ syntactically or semantically.*

The most common operators are the arithmetic operators `+`, `-`, `/` and `%`, and they are widely used in all sorts of programming languages. But these are only a few of all the operators defined in Kotlin (for a full list of Kotlin operators, take a look at the official documentation [here](https://kotlinlang.org/docs/reference/keyword-reference.html#operators-and-special-symbols)). All operators have a fixed symbolic representation, such as `+` and `-`, and function with a fixed name that specify its functionality. For `-` it's `minus()` and for `..` it's `rangeTo()`. 

When working with the primitive types in Kotlin, all  operators work in a sensible way. We can write `2 + 2` and Kotlin calculates the sum 4 and we can compare strings with an equality operator `"myfantasticstring" == "myfantasticstring"`. 

But what about the user defined types. Lets say we have a date class defined as

```kotlin
data class MyDate(val year, val month, val day)
```

What happens when we try to add two MyDate objects or check for equality? We get an error because we have not defined the operator function for this data class. Operator overloading comes to the rescue. 

We can define the operator function for equality as an extension function:

```kotlin
fun MyDate.equals(date: MyDate) = 
  this.year == date.year && 
  this.month == date.month && 
  this.day == date.day
```

Kotlin allows us to specify how a specific operator should work for user defined types by defining its   

What’s an operator? What kinds?

What’s overloading?

What operators can be overloaded?

Examples

Date in Date..Date

Date - Date = number of days between

Team + TeamMember

x in 4..10