---
calendar: java
post_year: 2019
post_day: 20
title: Garbage collection
ingress: >-
  **Garbage collection** (GC) has been one of Java's most compelling features
  since its inception. Allowing developers to focus on the core functionality of
  their application instead of memory management. 
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
- https://howtodoinjava.com/java/garbage-collection/all-garbage-collection-algorithms/

Garbage collection is the mechanism used in Java to free up unused memory. In order to achieve this it keeps track of all objects and determines which ones that safely can be removed from the heap, thus freeing up that precious memory. 

When a Java process launches it allocates memory for the heap, metaspace (PermGen successor), JIT codecache, thread stacks, and shared libraries depending on how much memory is available to the process. Though the metaspace and codecache also have garbage collection we're going to focus on the Java heap. 

The Java heap is divided into three separate areas as shown below;

![The anatomy of the heap (eden, survivor, and tenured space).](https://i.ibb.co/yqb7zGF/heapillustration.png)

- https://dzone.com/articles/understanding-the-java-memory-model-and-the-garbag
- https://stackoverflow.com/questions/2129044/java-heap-terminology-young-old-and-permanent-generations

Eden space is the part where newly created objects are places, so whenever you create an `new` object it is places in eden space. Objects in eden space that survive a garbage collection are moved to the survivor space. And if the object survives in survivor space long enough to exceed a threshold (ex. survived 8 garbage collections) it is promoted to tenured space.

This process of promoting objects through different spaces is known as generational -or ephemeral garbage collection, and is based on the hypothesis that most objects are likely to be short lived. It also is the reason why we talk about minor and major garbage collection. Typically minor GC works on the young space, which is the combination of eden space and survivor space. While major GC does it work in the tenured space. 

**WHY DOES IT MATTER, LATENCY VS THROUGHPUT ETC** 

## Phases in a cycle
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://plumbr.io/handbook/garbage-collection-algorithms
- mark
- sweep
- copy
- compacting

## Algoritms
Descibing a algorithm; concurrent, incremental, parallel, stop-the-world

- serial
  - Single-threaded mark, sweep, compacting (copy?)
- parallel
  - Multi-threaded mark, sweep, compacting (copy?)
- CMS
  - Concurrent mark, sweep, compacting (copy?)
- G1GC
  - Region-based
- ZGC
  - Low-latency, concurrent, region-based, compacting
  - https://wiki.openjdk.java.net/display/zgc
- Senandoah GC
  - Low-latency, concurrent, region-based, compacting
  - https://wiki.openjdk.java.net/display/shenandoah/Main#Main-Heuristics

