---
calendar: kotlin
post_year: 2020
post_day: 22
title: "val aGoodLife = collectionOf(moments).filter {it.isHappy} "
image: https://source.unsplash.com/JBrfoV-BZts/1600x900
ingress: >-
  Kotlin has a restricted menu of collection types available. Basically, it
  boils down to `Set`, `List`, and `Map` (`Map` is technically not a
  `Collection`, though), whereas java has a seemingly much larger offering. For
  example, java's List has Stack, Vector and LinkedList implementations. On top
  of that, the kotlin collection interfaces are more compact than the java
  counterparts.  


  One reason is probably platform interoperability, which could allow kotlin code more easily to be complied down to javascript, native mobile platforms, or the CLR. Another is that extension methods and properties allow kotlin to add a lot more features to the various collections without "polluting" the interface. Finally, the corresponding java interfaces are all mutable, while kotlin has explicit interfaces for mutable collections, like MutableList, MutableSet, and MutableMap. 


  Under the hood kotlin uses the corresponding java classes, and a bit of compiler magic to ensure that the types effectively implements the kotlin interfaces, known as *mapped types*. Runtime, however, there is no difference between the java and kotlin counterparts. There is a couple of big benefits with this approach: First, instead of implementing new collections natively in kotlin, the battletested implementations of java can be used. Second, interoperability between java and kotlin is ensured. And it means you can still use the`java.util.Vector` class, and get the extension goodies associated with the kotlin `Collection` and `List` interfaces.


  ```

  val vector = Vector<String>(3) // java.util.Vector

  val first = vector.first()     // from kotlin.collections

  ```


  Generally, it is a good idea to use factory methods for creating collections. Examples are `listOf`, `setOf` and `mapOf`, and the corresponding `mutableListOf`, `mutableSetOf` and `mutibleMapOf` for the mutable variants. It leaves your code less dependent on concrete implementations, which may or may not be portable across platforms, and open for future improvements. 


  Using `listOf` and `mutableListOf` will in the end give you an istance `java.util.ArrayList`, unless the list is empty, which in the immutable case will give you the singleton `EmptyList`. Similarily, `setOf` and `mapOf`, will return `LinkedHashSet` and `LinkedHashMap`, respectively.  The linked versions ensure that the collections will be iterated in the same order as the items were added to them, but both of these have a higher memory footprint than `HashSet` and `HashMap` would have. If you need to deal with large sets or maps, this could be an issue, and you would want to instantiate the appropriate implementations yourself. 


  The fact that a collection is mutable, is not the same that the variable needs to be mutable. In fact, the opposite is closer to the truth. Consider


  ```

  // Immutable list assigned to reassignable variable

  var varList = listOf("good","better","best")

  varList = listOf("even better")


  // Mutable list assigned to read-only variable

  val valList = mutableListOf("good","better","best")

  valList.clear()

  valList.add("even better")


  ```
---
TODO