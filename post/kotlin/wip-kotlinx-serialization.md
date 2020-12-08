---
calendar: kotlin
post_year: 2020
post_day: 9
title: "WIP: kotlinx.serialization"
image: https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=1226&h=400&fit=crop&crop=edges
ingress: >-
  With the release of Kotlin 1.4 we got a new treat; `kotlinx.serialization`. A
  new tool to help us with the cumbersome task of converting our objects to and
  from Json. 

  We've previously seen how some library may not support kotlin fully, but this is obviously not the case with `kotlinx.serialization` as it is written in Kotlin and available on all Kotlin multiplatform targets.
authors:
  - Nicklas Utgaard
---
`kotlinx.serialization` provides a framework for converting an object into a sequence of bits and bytes and of course a way of converting it back into an object. It ships with support for Json, Protobuf, CBOR, Properties and HOCON, albeit all except Json are at this point considered experimental. 


To achieve this level of flexibility the process is split into two distinct phases; serialization and encoding. The serialization phase is shared between all data formats, and is responsible for converting a object into a serial sequence of primitives. The sequence of primitives is then passed on to encoding, where the data format specifics are located.

<p>
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/serialization-light.png" alt="The anatomy of the heap (eden, survivor, and tenured space)."/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/serialization-dark.png" alt="The anatomy of the heap (eden, survivor, and tenured space)."/>
</p>

<pre style="display:none;">
Usikker på om dette er riktig vinkling

Serialization and deserialization is hard, and if used incorrectly you may have just inadvertently introduced a [sneaky bug](https://kotlin.christmas/2020/8) or even a [security flaw](https://www.cvedetails.com/product/42991/Fasterxml-Jackson-databind.html?vendor_id=15866) into your application. 

Java Classes require a custom KSerializer, written by hand.

Adapt Moshi, none of the flaws from gson or jackson, and still typesafe.
</pre>