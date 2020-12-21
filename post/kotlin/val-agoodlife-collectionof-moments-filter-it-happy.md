---
calendar: kotlin
post_year: 2020
post_day: 22
title: "val aGoodLife = collectionOf(moments).filter {it.isHappy} "
image: https://source.unsplash.com/JBrfoV-BZts/1600x900
ingress: >-
  Kotlin has a restricted menu of collection types available. Basically, it
  boils down to `Set`, `List`, and `Map` (`Map` is technically not a
  `Collection`, though), whereas java has a seemingly larger offering. For
  example, java's List has Stack, Vector and LinkedList implementations. On top
  of that, the kotlin collection interfaces are more compact than the java
  counterparts.  


  One reason is probably platform interoperability, which could allow kotlin code more easily to be complied down to javascript or CLR. Another is that extension methods and properties allow kotlin to add a lot more features to the various collections without "polluting" the interface. Finally, the corresponding java interfaces are all mutable, while kotlin has explicit interfaces for mutable collections, like MutableList, MutableSet, and MutableMap. 


  Under the hood kotlin uses the corresponding java classes, and a bit of compiler magic to ensure that the types effectively implements the kotlin interfaces, known as *mapped types*. Runtime, however, there is no difference between the java and kotlin counterparts. There is a couple of big benefits with this approach: First, instead of implementing new collections natively in kotlin, the battletested implementations of java can be used. Second, interoperability between java and kotlin is ensured. 


  Kotlin has a clean distinction between mutable and none mutable collections,




  Extension functions operate on top of the kotlin interfaces.


  The genereal recommendation is to use the the listOf, setOf and mapOf function to create new collections, instead of the concrete implementations. 


  You will typically get Linked ... which preserver insertion order at the cost of higher memory footprint. 


  var updatableList = listOf("good","better","best")


  updatableList.clear()


  updatableList.addAll()
---
TODO