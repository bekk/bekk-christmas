---
calendar: java
post_year: 2019
post_day: 11
title: What's new in Java 11
links: []
authors:
  - Tia Firing
---
Java 11 was released in September 2018, and it is the new long term support (LTS) version of Java. "Long term support" means that this version will receive public updates for five years, as opposed to the regular Java releases, which will only be supported for six months. This makes Java 11 a good choice if you don't want to migrate to a new Java version every six months, but you still want to get updates (and you do want those updates, of course!). Java 10 was the last free Java release from Oracle, so if you want Java 11 without having to pay for it, you must make sure to download an OpenJDK version of Java 11, for instance from [AdoptOpenJDK](https://adoptopenjdk.net/). 

There are plenty of good articles describing what is new in Java 11, but here are a few highlights. 

## New String utility methods
Have you ever tried to use `trim()` on a String containing a whitespace without being able to remove the whitespace? And after some frustration, you realize that the whitespace you are trying to remove is some Unicode whitespace that `trim()` does not recognize as a whitespace? Java 11 to the rescue! The new String utility method `strip()` is a Unicode aware version of `trim()`. We also have `stripLeading()` and `stripTrailing()` to remove whitespace from the beginning and end of the String. Java 11 also provides a few other new String utility methods that are worth noticing, like `lines()` for splitting a String based on line terminators (`\n`). 


## New garbage collectors
A less visible, but still important new feature in Java 11 is the two new garbage collectors: Epsilon and ZGC. Both of them are considered experimental. The Epsilon [GC](https://openjdk.java.net/jeps/318) is called a No-Op garbage collector because it does memory allocation, but it never reclaims memory. When no memory is reclaimed, you will probably get an OutOfMemoryException, so Epsilon should in most cases not be used in production. The Epsilon GC is meant for performance testing, memory allocation analysis, and for creating a baseline to compare future GCs to. [ZGC](https://openjdk.java.net/jeps/333) is a more traditional garbage collector. Being a low-latency garbage collector, one of its main goals is to reduce the length of GC pausing. 

## So long, Java EE and CORBA! 
If you are migrating straight from Java 8 to Java 11 and use a lot of SOAP based webservices, then you are in for a surprise (or maybe more of a cold shower)... The following packages has been removed, after having been deprecated since [Java 9](https://openjdk.java.net/jeps/320): 

* java.xml.ws (JAX-WS, plus the related technologies SAAJ and Web Services Metadata)
* java.xml.bind (JAXB)
* java.activation (JAF)
* java.xml.ws.annotation (Common Annotations)
* java.corba (CORBA)
* java.transaction (JTA)

However, this only means that these packages have been removed from Java SE, most of the functionality will be available as Maven artifacts if you still need it. 

More details about what's new in Java 11: 
* https://dzone.com/articles/90-new-features-and-apis-in-jdk-11
* https://dzone.com/articles/90-new-features-and-apis-in-jdk-11-part-2
* https://www.journaldev.com/24601/java-11-features
* https://openjdk.java.net/projects/jdk/11/
