---
calendar: java
post_year: 2019
post_day: 1
title: Thread safety in Java
image: >-
  https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1240&q=80
links:
  - title: Java concurrency (multi-threading) - Tutorial
    body: N/A
    url: 'https://www.vogella.com/tutorials/JavaConcurrency/article.html'
  - title: What is Thread-Safety and How to Achieve it?
    body: N/A
    url: 'https://www.baeldung.com/java-thread-safety'
  - title: Guide to java.util.concurrent.Locks
    body: N/A
    url: 'https://www.baeldung.com/java-concurrent-locks'
  - title: Understand Java Collections and Thread Safety
    body: N/A
    url: >-
      https://www.codejava.net/java-core/collections/understanding-collections-and-thread-safety-in-java
authors:
  - Tia Helene Firing
---
## What is multi-threading?
Java is a multi-threaded language. This means that you can run your Java application, or specific parts of it, in parallel as separate threads. If the computer running the Java program has multiple CPUs, as most modern computers do, then performing tasks concurrently may improve performance and utilize the available resources more efficiently. This sounds great, you may think, let's do this! However, there are a few pitfalls. A Java program is running as a process, and a thread started by your program will have access to all shared data of all other threads that is started by the same process. For instance, if you have a Java application that is responsible for creating and sending the monthly utility bill to all customers of a power company, you really want the bill to contain the right amount for each particular household, and that no bills are being sent with a random combination of customer and amount.

## Design your code to be thread safe
If a piece of code can be run by more than one thread without harmful side effects it is said to be thread safe. There are many ways to ensure thread safe code, and we will mention a few in this post. 

### Immutable objects
Always make your objects immutable. All fields should be private and final, and they should be assigned when the object is created. One of the challenges with multi-threading is that one thread may overwrite fields of an object that is used in another thread. Using immutable objects will make sure that the object cannot be modified after creation by another thread. 

### Avoid state
Write stateless code as far as possible. If there is no state, then there is no state that can be shared between multiple threads. Stateless code is methods or functions that are independent of anything but the input parameters, and given the same input it will produce the same output every time. Another advantage of stateless code is that you can easily write automatic tests for it as well!

### Java functionality for concurrency
Java provides several ways to control what is shared between threads. A common way to make sure that only one thread at a time can access a particular piece of code is by using the synchronized keyword. You can also use a [lock](https://www.baeldung.com/java-concurrent-locks) to achieve this. 

Sometimes you have the opposite problem - you have a field that is being updated, and you want all threads to see the new value. By declaring the field volatile you are forcing the JVM to keep this value in the main memory, and all threads must read the value from there. 

**And one final gotcha:** Many commonly used libraries and even quite basic Java APIs are not thread safe. This includes most collections from the java.util package, almost all OutputStreams, SimpleDateFormat and JAXB Marshaller and Unmarshaller, to mention a few. 

## Multi-threading is scary, I'll rather not use it!
Yes, multi-threading requires a little more thought, and yes, in many cases you probably don't need to deal with it. But, whenever you create a REST API and deploy it on Jetty or Tomcat or some other application server, then you are in fact running your code on multiple threads. All application servers, even the really light ones, will have a threadpool, and each new request to the API will start a new thread, as long as there are available threads in the threadpool. This is what makes your API able to handle more than one request at a time. 
