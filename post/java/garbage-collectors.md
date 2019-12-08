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
Garbage collection is the mechanism used in Java to free up unused memory. In order to achieve this it keeps track of all objects and determines which ones that safely can be removed from the heap, thus freeing up that precious memory. 

When a Java process launches it allocates memory for the heap, metaspace (PermGen successor), JIT codecache, thread stacks, and shared libraries depending on how much memory is available to the process. Though the metaspace and codecache also have garbage collection we're going to focus on the Java heap. 

The Java heap is divided into three separate areas as shown below;

<p>
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/heap-light.png" alt="The anatomy of the heap (eden, survivor, and tenured space)."/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/heap-dark.png" alt="The anatomy of the heap (eden, survivor, and tenured space)."/>
</p>

Eden space is the part where newly created objects are places, so whenever you create an `new` object it is places in eden space. Objects in eden space that survive a garbage collection are moved to the survivor space. And if the object survives in survivor space long enough to exceed a threshold (ex. survived 8 garbage collections) it is promoted to tenured space.

This process of promoting objects through different spaces is known as generational -or ephemeral garbage collection, and is based on the hypothesis that most objects are likely to be short lived. It also is the reason why we talk about minor and major garbage collection. Typically minor GC works on the young space, which is the combination of eden space and survivor space. While major GC does its work in the tenured space. 

## Phases in a GC cycles
After this short introduction to Java's memory model it is time to take a closer look at what is going during a GC cycle. 

### Marking
In any GC algorithm the first thing that needs to happen is the **marking** phase. During this phase the algorithm looks at the heap space in question and tries to figure out which objects it can remove. 

<p>
<b>Before marking:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-before-light.png" alt="Image of partially full heap"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-before-dark.png" alt="Image of partially full heap"/>
</p>

<p>
<b>After marking:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-marked-light.png" alt="Image of partially full heap with sections marked as ready to be garbage collected"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-marked-dark.png" alt="Image of partially full heap with sections marked as ready to be garbage collected"/>
</p>

Marking objects as ready to be garbage collected (dead objects) can be achieved in several ways. The simplest to reason about is the well-known reference-counter approach; where each object keeps track of how many references to it are floating around. Whenever a reference is removed, the referenced object decrements its reference-counter, and when it reaches zero it can be marked as dead. This approach does however have some limitations when it comes to cyclic references, and is not used by any garbage collector in Java. Instead the Java GC algorithms uses graph traversal algorithms to find which objects it can reach. 

<p>
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/graph-light.png" alt="Example of mark-phase"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/graph-dark.png" alt="Example of mark-phase"/>
</p>

By starting at what is referred to as **GC Roots** and following all references it finds, it is able to correctly mark all objects that are reachable. Unreachable objects are then marked as dead objects and can be garbage collected. What is considered a GC root may vary, but include; local variables and input arguments for any currently executing methods, active threads, static fields of loaded classes and several more. For example when running a minor GC (remember, just the young space), then every reference from tenured space into young space is considered a GC root. 

### Sweeping
After marking all objects that can be removed from memory the GC moves on to actually freeing up the space. One approach would be to just free up all space occupied by dead objects.

<p>
<b>Before sweep:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-marked-light.png" alt="Image of partially full heap with sections marked as ready to be garbage collected"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-marked-dark.png" alt="Image of partially full heap with sections marked as ready to be garbage collected"/>
<b>After sweep:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-after-light.png" alt="Image of heap after marked sections are freed"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-after-dark.png" alt="Image of heap after marked sections are freed"/>
</p>

While this does free up space, but you run the risk of encountering a `OutOfMemoryError` later on if you try to allocate memory larger then any of the given free regions. To solve this one might turn to **compacting**;
<p>
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-after-compact-light.png" alt="Image of heap after marked sections are freed"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-after-compact-dark.png" alt="Image of heap after marked sections are freed"/>
</p>

Compacting, moves all object to the start of the memory region, and thus allows larger allocations to happen in the future. The downside of course is that the GC time increases as nothing is free in this world.

As an alternative to compacting the memory in place is to use seperate region and copy live objects to another region. In the heap-description above we saw that survivor space was divided into to regions; `S0` and `S1`. One approach could therefor be to alternative between these two:
<p>
<b>Before marking:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-partition-light.png" alt="Image of S0/S1 before marking"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-partition-dark.png" alt="Image of S0/S1 before marking"/>
<b>After marking:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-partition-marked-light.png" alt="Image of S0/S1 after marking"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-partition-marked-dark.png" alt="Image of S0/S1 after marking"/>
<b>After copy</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-copied-light.png" alt="Image of S0/S1 after copying"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-copied-dark.png" alt="Image of S0/S1 after copying"/>
</p>

Mark-and-copy is similar to mark-compact in that it also reallocates all living objects. The advantage of mark-and-copy is that since all objects are moved to a new region it is able to copying objects simultaneously with the marking phase, though at the expense of an extra memory region.

## GC Algoritms
We finally arrive to the point where we can talk about the different GC algorithms.

### Serial GC
`Serial-GC` uses the mark-copy approach for the young space, and mark-sweep-compact for tenured space. As the name somewhat implies it is a single threaded collector relying on **stop-the-world** (all application threads stopped) pauses to get its work done. As a result it is best suited for environments where you have a small heap size (<200Mb), and single CPU core available. Enable it by passing: `-XX:+UseSerialGC` when starting the Java process.

### Parallel GC 
`Parallel-GC` (also known as *throughput collector*) is very similar til `serial-gc`, but uses multiple thread during marking, compacting and copying. In Java 8 this was default algorithm for the server-class machines, while client-class machines used `serial-gc`. A computer is considered server-class if it has 2+ physical processors and 2+GB of physical memory.
Enable it by passing: `-XX:+UseParallelGC -XX:+UseParallelOldGC` to use it in young space and tenured space, or `-XX:+UseParNewGC -XX:+UseConcMarkSweepGC` to only use it in young space (CMS in tenured space). 

### Concurrent Mark and Sweep (CMS)
This is the first GC algorithm which doesn't rely on stop-the-world pauses for all its work, hence the *concurrent* part. It uses standard parallel mark-copy for the young space, and concurrent mark-sweep in tenured space. The goal of this algorithm is to minimize the pauses due to garbage collection, and does this by running part of the cycle concurrently with the application threads. Enable it by passing: `-XX:+UseConcMarkSweepGC`, it is however deprecated in Java 9 and scheduled to be removed in Java 14.

### G1GC
`G1GC` (Garbage first GC) is the first region-based GC. Which means that the heap illustration from earlier doesn't really fit anymore.
<p>
<b>Example of heap with multiple regions:</b><br />
<img class="light-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-grid-light.png" alt="Heap regions"/>
<img class="dark-theme-image" src="https://github.com/nutgaard/gc-illu/raw/master/img/memory-grid-dark.png" alt="Heap regions"/>
</p>

`G1GC` keep track of the amount of live vs dead objects in each region, and collects garbage in the regions that contains the most garbage, hence the name *garbage first*. This allows the collector to avoid collecting the entire heap at once, and instead it can select a few regions. Which in turn leads to smaller pause times needed by the GC, thus making G1GC very well suited for application where latency is important.
`G1GC` was first introduced in Java 7 as an experimental GC, and made the default GC in Java 9. Enable it by passing: `-XX:+UseG1GC`.

### The future
Recent releases of Java have seen the introduction to two new alternatives; `ZGC` and `Shenandoah GC`. Both being low-pause times, "fully"-concurrent, region-based and capable of handling large heap sizes. 

`ZGC` is available in OpenJDK 11 (linux only), with macOS and windows support planned for JDK 14 according to the [OpenJDK Wiki - ZGC](https://wiki.openjdk.java.net/display/zgc). 
If you are interested in the inner workings of ZGC have a look at [this post at baeldung.com](https://www.baeldung.com/jvm-zgc-garbage-collector#zgc-concepts).

`Shenandoah GC` is available upstream in OpenJDK 12 with backports to OpenJDK8u and OpenJDK11u, which should make it availble to most programmers out there. Progress can be tracked at the [OpenJDK Wiki - Shenandoah GC](https://wiki.openjdk.java.net/display/shenandoah).
