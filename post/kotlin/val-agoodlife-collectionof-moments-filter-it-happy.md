---
calendar: kotlin
post_year: 2020
post_day: 22
title: Collection magic
image: https://source.unsplash.com/JBrfoV-BZts/1600x900
ingress: ""
---
Kotlin has a restricted menu of collection types available. Basically, it boils down to `Set`, `List`, and `Map` (even though `Map` *technically* is not a `Collection`), whereas java has a seemingly much larger offering. For example, java's `List` interface has implementations like `Stack`, `Vector` and `LinkedList`. On top of that, the kotlin collection interfaces have less features than their java counterparts.  

One rationale behind this design choice is probably platform interoperability - simpler interfaces would allow kotlin code to be more easily complied down to javascript, mobile platforms, or other virtual machines. Another reason is that extension methods and properties allow kotlin to add a lot more features to the various collections without "polluting" the interface. Finally, the corresponding java interfaces are all mutable, with methods like `add` and `remove`, while kotlin has explicit interfaces for mutable collections, like `MutableList`, `MutableSet`, and `MutableMap`. This is a cleaner, more readable improvement of the `Unmodifiable`* wrappers for the `java.util.List` interface in java.

Under the hood kotlin uses the corresponding java classes, and a bit of compiler magic to ensure that the types effectively seem to implement the kotlin interfaces, known as *mapped types*. Runtime, however, there is no difference between the java and kotlin counterparts. There is a couple of big benefits with this approach: first, instead of implementing new collections natively in kotlin, the battletested implementations of java can be used. Second, interoperability between java and kotlin is ensured. And it means you can still use the`java.util.Vector` class, and get the extension goodies associated with the kotlin `Collection` and `List` interfaces in kotlin. 

```kotlin
val vector = Vector<String>(3) // java.util.Vector
val first = vector.first()     // from kotlin.collections
```

It goes the other way, too: if you decide to make and implementation of the kotlin `List` interface yourself, the compiler will replace it with `java.util.List`, and supply the missing method implementations itself, all throwing an `UnsupportedOperationException`. In other words, the kotlin collection interfaces are somewhat of an illusion. 

Generally, it is a good idea to use factory methods for creating collections. Examples are `listOf`, `setOf` and `mapOf`, and the corresponding `mutableListOf`, `mutableSetOf` and `mutibleMapOf` for the mutable variants. It leaves your code less dependent on concrete implementations, which may or may not be portable across platforms, and open for future improvements to the default implementation. 

Using `mutableListOf` will in the end give you an instance of `java.util.ArrayList`, while `listOf` returns an `java.util.Arrays$ArrayList` - a lightweight, read-only wrapper over an array. Except if the list is empty, which in the immutable case will give you the singleton `EmptyList` - a nice example of a simple optimization done for you. In the same vain, `setOf` and `mapOf`, will return `LinkedHashSet` and `LinkedHashMap`, respectively, and exactly the same in the mutable case.  The linked versions ensure that the collections will be iterated in the same order as the items were added to them, but both of these have a higher memory footprint than `HashSet` and `HashMap` would have. If you need to deal with large sets or maps, this could be an issue, and you would want to use the more specialized factory methods, like `hashSetOf` and `hashMapOf`. 

An interesting observation is that since the underlying type is the same for mutable and immutable `Set`s and `Map`s, the compiler will gladly accept a change to an immutable collection

```kotlin
 val aSet = setOf("A", "B", "C") // Immutable

 if(aSet is MutableSet) {
    val modifiableSet: MutableSet<String> = aSet
    modifiableSet.add("D")
    modifiableSet.remove("A")
 }

 println(aSet)
```

 which will print `[B, C, D]`.

The fact that a collection is mutable, is not the same that the variable needs to be mutable. In fact, the opposite is closer to the truth. Consider

```kotlin
// Immutable list assigned to reassignable variable
var varList = listOf("good","better","best")
varList = listOf("even better")

// Mutable list assigned to read-only variable
val valList = mutableListOf("good","better","best")
valList.clear()
valList.add("even better")
```

A mutable collection can (and should?) be assigned to a read-only variable. Even though the variable cannot be reassigned you can freely modify the collection. You would in principle expect better performance by modifying the contents of a single collection, rather than creating new instances from scratch (but is a premature optimization until you *actually* hit a performance problem, of course)

All in all, kotlin's handling of collections is a pragmatic compromise between interoperability, reuse, and readability. The result is robust, high-performing implementations, sleak interfaces, and an anbundance of extensions to make your development experience festive and joyful.