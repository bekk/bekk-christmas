---
calendar: kotlin
post_year: 2020
post_day: 13
title: "Gson and Kotlin: The nightmare before christmas!"
ingress: "Does it really matter which serialization library you choose for your
  application? They're all pretty much the same, right? Right... It's story
  time! "
links:
  - url: https://android.jlelse.eu/the-fault-in-the-stars-of-kotlin-and-gson-da193bf67d06
    title: The fault in the stars of Kotlin and Gson
authors: []
---
You've just started developing your new WishList application, and you have decided to go with Gson as your serialization library. Gson is a very popular library for serializing and deserializing Java objects and JSON, and you see no reason to use anything else just because you are working on a Kotlin application this time. You create your wish list api that expects a `WhishList` payload. The payload consists of a list of wishes and the name of the person who made the wishes. The application will then save the wish list and a trimmed version of the owner's name to your database. The payload looks like this: 

```kotlin
data class WishList(
	val name: String,
	val wishes: List<Wish>
)
```

But soon after you have published the api, you notice NullPointerExceptions in the logs when the code calls `name.trim()`. But, you say to yourself, name is a non-null type, how can it be null? After a closer look you realize that someone sent a payload that was missing the name parameter: 

```json
{
    "wishes": []
}
```

Why doesn't this fail during deserialization? The answer is that Gson doesn't respect non-null types in Kotlin. The way Gson sets property values is by using a default constructor if it exists. The default constructor takes no arguments, and if we define a constructor ourselves that does take arguments (like we have done under the hood for the data class `WishList`), then the default constructor is no longer available. Then Gson will use reflection to set the property values, and since Gson is made for Java, it does not know that non-null types mean. 

For the same reason, you may see a similar behaviour if you use default values in the constructor, like this: 

```kotlin
data class WishList(
	val name: String = "Rudolph",
	val wishes: List<Wish>
)
```

Gson will not use the default value "Rudolph" if the name parameter is missing or null. 

We may think this is a bug in Gson, but it's actually not: Gson does not provide any [Kotlin-specific support](https://github.com/google/gson/issues/1550), and is only meant to work with Java. Although this has been reported as a bug and as a feature request to Gson several times, it doesn't look like Gson will support default values and non-null types anytime soon. So what do you do? It's getting close to Christmas, and you need to get your WishList application ready in time. There is always the option of [writing your own TypeAdapterFactory](https://medium.com/swlh/using-gson-with-kotlins-non-null-types-468b1c66bd8b). However, for most of us it will probably be easier to go for one of the serialization libraries that offers Kotlin-support, like Jackson or Moshi. After changing serialization library to Jackson the WishList application works as you expect. Just in time for Christmas! 