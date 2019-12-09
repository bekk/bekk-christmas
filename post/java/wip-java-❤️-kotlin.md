---
calendar: java
post_year: 2019
post_day: 18
title: 'WIP: Java ❤️ Kotlin'
ingress: Let's put some `fun` into your existing Java code with Kotlin.
links:
  - title: Kotlin data classes
    url: 'https://kotlinlang.org/docs/reference/data-classes.html'
  - title: kotlin.christmas
    url: 'https://kotlin.christmas'
authors:
  - John Ringø
---
Kotlin v1.0 was released in February 2016, almost four years ago. Since then the language has gained a lot of traction, and in 2019 Google made Kotlin the preferred language for Android app development. Kotlin has full interoperability with Java, making it easy to introduce Kotlin bit by bit into your existing Java code base.

# Data classes

A good place to start can be to convert simple classes such as DTOs.

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

A Java class such as the example above can be converted to a Kotlin data class, giving you immutability and null safety on all its properties:

```kotlin
data class CustomerDTO(val name: String, val address: String)
```

Tip: If you convert a class which also contains methods that implement logic, keep in mind that you want to avoid tainting your pure data classes with functions containing logic. If you do need some logic connected to your data classes, check out the [post on extension functions](https://kotlin.christmas/2019/9) from the Kotlin christmas calendar.
