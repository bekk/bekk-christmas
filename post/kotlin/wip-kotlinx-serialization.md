---
calendar: kotlin
post_year: 2020
post_day: 9
title: "WIP: kotlinx.serialization"
image: https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=1226&h=400&fit=crop&crop=edges
ingress: >-
  With the release of Kotlin 1.4 we got a new treat; `kotlinx.serialization`. A
  new tool to help us with the cumbersome task of serialization and
  deserialization of our Kotlin (and Java?) objects. 

  We've previously seen how some library may not support kotlin fully, but this is obviously not the case with `kotlinx.serialization` as it is written in Kotlin and available on all Kotlin multiplatform targets.
authors:
  - Nicklas Utgaard
---
<pre style="display:none;">
Usikker på om dette er riktig vinkling

Serialization and deserialization is hard, and if used incorrectly you may have just inadvertently introduced a [sneaky bug](https://kotlin.christmas/2020/8) or even a [security flaw](https://www.cvedetails.com/product/42991/Fasterxml-Jackson-databind.html?vendor_id=15866) into your application. 

Java Classes require a custom KSerializer, written by hand.

Adapt Moshi, none of the flaws from gson or jackson, and still typesafe.
</pre>