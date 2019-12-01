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

<style>
.c20_heapfig {
  max-width: 760px;
  margin: 0 auto;
}
.c20_heap {
  display: flex;
  max-width: 760px;
  margin: 0 auto;
  font-weight: bold;
  font-family: sans-serif;
  text-align: center;
}
.c20_box {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}
.c20_eden {
  background-color: rgb(22, 219, 196);
  flex: 1;
}
.c20_survivor {
  position: relative;
  background-color: rgb(255, 240, 43);
  display: flex;
  flex-direction: column;
  flex: 1;
}
.c20_survivor > div {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.c20_survivor > div:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgb(199, 163, 0);
}
.c20_survivor > span {
  position: relative;
  top: 0.5rem;
}
.c20_tenure {
  background-color: rgb(255, 91, 91);
  flex: 2;
}
</style>
<figure class="c20_heapfig">
<div class="c20_heap">
  <span class="c20_box c20_eden">Eden space</span>
  <span class="c20_box c20_survivor">
    <div>
      <span>S0</span>
      <span>S1</span>
    </div>
    <span>Survivor space</span>
  </span>
  <span class="c20_box c20_tenure">Tenure space</span>
</div>
<figcaption>The anatomy of the heap (eden, survivor, and tenure space).</figcaption>
</figure>



