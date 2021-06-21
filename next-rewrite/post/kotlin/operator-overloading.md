---
calendar: kotlin
post_year: 2020
post_day: 13
title: Operator Overloading
image: https://images.unsplash.com/photo-1548690596-f1722c190938?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3453&q=80
ingress: Have you ever tried to use the compare operations on two instances of
  your self-made data class in Kotlin just to realize it is not possible? By
  employing operator overloading, you are actually able to do so!
links:
  - url: https://kotlinlang.org/docs/reference/operator-overloading.html
    title: Kotlin Docs - Operator overloading
authors:
  - Eivind Reime
---
From Wikipedia: 

> *Operators are constructs defined within programming languages which behave generally like functions, but differ syntactically or semantically.*

The most common operators are the arithmetic operators `+`, `-`, `/` and `%`, and they are widely used in all sorts of programming languages. But these are only a few of all the operators defined in Kotlin (for an exhaustive list, take a look at the official documentation [here](https://kotlinlang.org/docs/reference/keyword-reference.html#operators-and-special-symbols)). All operators have a fixed symbolic representation, such as `+` and `-`, and a function with a fixed name that specifies its functionality. You can see all the arithmetic operators with their corresponding functions in the table below.

![Table showing all arithmetic operators with their corresponding functions](https://i.ibb.co/tp3t6pg/Screenshot-2020-12-09-at-19-04-50.png)

When working with the basic types in Kotlin (such as Int, String, Boolean, etc.), all operators work in a sensible way. We can, for example, write `2 + 2` and Kotlin calculates the sum of 4. We are also able to compare strings with an equality operator, such as `"myfantasticstring" == "myfantasticstring"`. 

But what about the user-defined types? Let's say we have a simple date class defined as

```kotlin
data class MyDate (
  val year: Int, 
  val month: Int, 
  val day: Int
)
```

What happens if we try to subtract two MyDate objects? We get an error because the operator function is not yet defined for this data class. Operator overloading comes to the rescue. 

We can define the operator function for subtraction as an extension function:

```kotlin
operator fun MyDate.minus(other: MyDate) =
            kotlin.math.abs(this.year - other.year) * 365 + // Assuming all years have 365 days
            kotlin.math.abs(this.month - other.month) * 31 + // Assuming all months have 31 days
            kotlin.math.abs(this.day - other.day)

            
val date1 = MyDate(2020, 12, 16)
val date2 = MyDate(2019, 11, 12)

print(date1 - date2) // Prints the number of days between the two dates: 400
```

That's all. Easy, right? Now we are able to calculate the number of days between two `MyDate`-objects just by subtracting them from another. The operator function can also be defined as a member function on the data class itself. Let us say we want to check whether a `House` is smaller or bigger compared to another `House`. We could implement it as follows:

```kotlin
data class House (
        val size: Int,
        val numOfBedrooms: Int,
        val numOfBathrooms: Int,
        val garage: Boolean
) {
    operator fun compareTo(other: House): Int {
        if (this.size < other.size) {
            return -1
         } else if (this.size == other.size) {
            return 0
        }
        return 1
    }
}


val myHouse = House(122, 4, 2, true)
val neighboursHouse = House(157, 3, 3, true)

print(myHouse < neighboursHouse) // true
```

These are just two basic examples of how you could use operator overloading in your application. You can define the operator function both as a member function and an extension function on a data class. Just remember to mark the overloading operator function with the `operator` modifier. Operator overloading might be a great solution to your problem, but be aware, comprehensive use could make your application both complex and confusing.