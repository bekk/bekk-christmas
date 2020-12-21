---
calendar: kotlin
post_year: 2020
post_day: 22
title: "val aGoodLife = collectionOf(moments).filter {it.isHappy} "
image: https://source.unsplash.com/JBrfoV-BZts/1600x900
ingress: >-
  Kotlin has a restricted menu of collection types available. Basically, it
  boils down to Set, List and Map, whereas java has a seemingly larger
  offering. 


  One reason is probably platform interoperability, which could allow kotlin code to be complied down to javascript or CLR. 


  Kotlin has a clean distinction between mutable and none mutable collections,


  Under the hood kotlin uses the corresponding java classes, and a bit of compiler magic to ensure that the types implements the kotlin interfaces.


  Extension functions operate on top of the kotlin interfaces.


  The genereal recommendation is to use the the listOf, setOf and mapOf function to create new collections, instead of the concrete implementations. 


  You will typically get Linked ...
---
TODO