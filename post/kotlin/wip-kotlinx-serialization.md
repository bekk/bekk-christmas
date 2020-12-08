---
calendar: kotlin
post_year: 2020
post_day: 9
title: "Serialization: New player has joined"
image: https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=1226&h=400&fit=crop&crop=edges
ingress: >-
  With the release of Kotlin 1.4 we got a new treat; `kotlinx.serialization`. A
  new tool to help us with the cumbersome task of converting our objects to and
  from Json. 

  We've previously seen how some library may not support kotlin fully, but this is obviously not the case with `kotlinx.serialization` as it is written in Kotlin and available on all Kotlin multiplatform targets.
links:
  - title: Kotlin serialization
    url: https://kotlinlang.org/docs/reference/serialization.html
  - url: https://github.com/Kotlin/kotlinx.serialization/blob/master/docs/serialization-guide.md
    title: Kotlin Serialization Guide
authors:
  - Nicklas Utgaard
---
`kotlinx.serialization` provides a framework for converting an object into a sequence of bits and bytes, and of course a way of converting it back into an object. It ships with support for Json, Protobuf, CBOR, Properties and HOCON, albeit all except Json are at this point considered experimental. 

To achieve this level of flexibility the process is split into two distinct phases; serialization and encoding. The serialization phase is shared between all data formats, and is responsible for converting a object into a serial sequence of primitives. The sequence of primitives is then passed on to encoding, where the data format specifics are located.

<p>
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/serialization-light.png" alt="The anatomy of the heap (eden, survivor, and tenured space)."/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/serialization-dark.png" alt="The anatomy of the heap (eden, survivor, and tenured space)."/>
</p>
The process of serialization and deserialization are encapsulated within the `KSerializer<T>` interface, whereas encoding and decoding have their own aptly named interfaces; `Encoder` and `Decoder`.


To get started using `kotlinx.serialization` you will have to make some changes to your build configuration. First you'll need to add the compiler plugin used to generate the serializers for you classes. This is needed as `kotlinx.serialization` does not rely on reflection, and as such needs to generate code at compile-time to know how a class should be serialized. Lastly, you'll need to add a dependency to the data format encoder, which in this example happens to be JSON.
```kotlin
plugins {
  kotlin("jvm") version "1.4.21"
  kotlin("plugin.serialization") version "1.4.21"
}
dependencies {
  implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.0.1")
}
```

At this point you may try to convert an object into JSON, but you'll be disappointed when seeing this exception; 
```kotlin
kotlinx.serialization.SerializationException: Serializer for class 'MyFavoriteObject' is not found.
Mark the class as @Serializable or provide the serializer explicitly.
```
As briefly mentioned earlier this framework does not rely on reflection, and therefore needs to generate some code when compiling your code in order to work properly. But, how could the compiler ever know which classes it should support? Creating `KSerializer`s for every class seen in the classpath would make the compile time excruciating slow. And this is why it hints about adding `@Serializable` to your class. The `@Serializable` interface serves as the entrypoint to the serialization process, and instructs the serialization plugin to automatically generate the appropriate `KSerializer` for the annotated class. 

At this point you are ready to convert your object to Json (or another data format);
```kotlin
@Serializable
data class MyFavoriteObject(val favoriteObject: String)

val favorite = MyFavoriteObject("the computer")
println(Json.encodeToString(favorite)) // prints; {"favoriteObject": "the computer"}
println(ProtoBuf.encodeToHexString(favorite)) // prints; 0a0c74686520636f6d7075746572
```

And of course you'll be able to convert the output back into an object;
```kotlin
val fromJson = Json.decodeFromString<MyFavoriteObject>(jsonString)
val fromProtobuf = ProtoBuf.decodeFromHexString<MyFavoriteObject>(protobufString)
```

One caveat to bear in mind is however to what degree your codebase uses java classes, whether they are defined in your codebase or provided by the java runtime environment. This relates to the fact that the framework is depends on having access to `KSerializer`'s in order to work, which classes defined in or by java does not provide. And as such if you try to convert a `java.util.UUID` you'll see a similar exception to the one we got before adding `@Serializable` to `MyFavoriteObject`. 

To remedy this you must create and register you own serializer;
```kotlin
class UUIDSerializer : KSerializer<UUID> {
    val serializer = String.serializer()

    override val descriptor = serializer.descriptor
    
    override fun deserialize(decoder: Decoder) = 
        UUID.fromString(serializer.deserialize(decoder))
    
    override fun serialize(encoder: Encoder, value: UUID) = 
        serializer.serialize(encoder, value.toString())
}

val json = Json {
    serializersModule = SerializersModule {
        contextual(UUIDSerializer())
    }
}

println(json.encodeToString(UUID.randomUUID()))
```

In this example we reused the `String.serializer()` to implements our serializer, we registered the serializer, and then successfully converted a `UUID` to JSON. Being able to reuse the `String.serializer()` we could make the implementation rather simple, but more complex data structures will undoubtedly require [more complex serializers](https://github.com/Kotlin/kotlinx.serialization/blob/master/docs/serializers.md#sequential-decoding-protocol-experimental).


So, should you start porting all you apps to `kotlinx.serialization`? Possibly, if your app is entirely written in Kotlin it will probably work like a charm, and potentially even fix [some issues](https://kotlin.christmas/2020/8). However, if your app is heavily dependent on java classes it may be just easier to use [moshi](https://github.com/square/moshi#kotlin).
