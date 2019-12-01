---
calendar: java
post_year: 2019
post_day: 20
title: Garbage collection
ingress: >-
  **Garbage collection** (GC) has been one of Java's most compelling features
  since the start. Allowing developers to focus on the core functionality of
  their application instead of managing memory management. 
description: >-
  In this post we'll provide a short introduction to what garbage collection is,
  how it works, and some different implementations provided in by Java.
links:
  - title: Java Garbage Collection Introduction (4 part series)
    url: 'https://javapapers.com/java/java-garbage-collection-introduction/'
  - title: 'Java Garbage Collection Algorithms [till Java 9]'
    url: >-
      https://howtodoinjava.com/java/garbage-collection/all-garbage-collection-algorithms/
  - title: Understanding the Java Memory Model and Garbage Collection
    url: >-
      https://dzone.com/articles/understanding-the-java-memory-model-and-the-garbag
  - title: Choosing the Right GC
    url: 'https://dzone.com/articles/choosing-the-right-gc'
authors:
  - Nicklas Utgaard
---
Garbage collection is a mechanism used in Java to free up unused memory. In order to achieve this it tracks all objects and determines which ones that safely can be removed from the heap. In this post we'll provide a short introduction to how it works, and some different implementations provided in by Java.


