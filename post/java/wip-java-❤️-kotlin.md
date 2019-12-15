---
calendar: java
post_year: 2019
post_day: 18
title: Java ❤️ Kotlin
ingress: >-
  It's time to get on the `fun` train. Start simple by introducing small pieces
  of Kotlin into your existing Java code.
links:
  - title: Kotlin data classes
    url: 'https://kotlinlang.org/docs/reference/data-classes.html'
  - title: kotlin.christmas
    url: 'https://kotlin.christmas'
  - title: It's in the small things
    url: 'https://kotlin.christmas/2019/10'
  - title: Extension functions
    url: 'https://kotlin.christmas/2019/9'
authors:
  - John Ringø
---
Kotlin v1.0 was released in February 2016, almost four years ago. Since then the language has gained a lot of traction, and in 2019 Google made Kotlin the preferred language for Android app development. Kotlin has full interoperability with Java, making it easy to introduce Kotlin bit by bit into your existing Java code base. To set up your existing project with Kotlin, read [Get started with Kotlin](https://kotlin.christmas/2019/1).

Once your project is ready for some Kotlin code, a good place to start can be to introduce Kotlin data classes into your Java code.

# Data classes - when less is more

Data classes are designed for one thing: Holding data. A great first step when introducing Kotlin into your Java project is to convert your simple Java classes, such as DTOs, into Kotlin. In Java there's a lot of unnecessary boilerplate code needed to represent even the simplest of objects. A DTO class with two properties will stretch out across 17 lines.

```java
public class CustomerDTO {
    private String name;
    private String address;

    public CustomerDTO(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }
}
```

A Java class such as the example above can be converted to a Kotlin data class, giving you immutability and null safety on all its properties in one line:

```kotlin
data class CustomerDTO(val name: String, val address: String)
```

That's really all you need. One line, and you'll have access to both defined properties, a `toString()` function, `equals()` and `hashCode()`, as well as a `copy()` function. Your code will contain less clutter and become more concise. A simple start, well worth the little effort to change your existing Java code into something more robust and more maintainable.

Tip: If you convert a class which also contains methods that implement logic, keep in mind that you want to avoid tainting your pure data classes with functions containing logic. If you do need some logic connected to your data classes, check out the [post on extension functions](https://kotlin.christmas/2019/9) from the Kotlin advent calendar.

# Summary

If you work on a large Java application, but your team is curious about Kotlin, don't worry. You don't have to rewrite your entire app to start exploring Kotlin. You can start simple with data classes. You can even do it while you're still introducing more Java code. Try it on for size, and let the `fun` begin!

Read more about Kotlin data classes in our Kotlin advent calendar and in the Kotlin documentation, linked below.
