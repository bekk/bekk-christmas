---
calendar: java
post_year: 2019
post_day: 3
title: Hidden memory costs
image: >-
  https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1240&q=80
links:
  - title: Java performance tutorial – How fast are the Java 8 streams?
    url: >-
      https://jaxenter.com/java-performance-tutorial-how-fast-are-the-java-8-streams-118830.html
  - title: 'Benchmark: How Misusing Streams Can Make Your Code 5 Times Slower'
    url: >-
      https://blog.overops.com/benchmark-how-java-8-lambdas-and-streams-can-make-your-code-5-times-slower/
  - title: 3 Reasons why You Shouldn’t Replace Your for-loops by Stream.forEach()
    url: >-
      https://blog.jooq.org/2015/12/08/3-reasons-why-you-shouldnt-replace-your-for-loops-by-stream-foreach/
authors:
  - Tia Firing
---
50 years ago humans managed to land on the moon using a [guidance computer](https://www.bbc.com/future/article/20190704-apollo-in-50-numbers-the-technology) with no more than 4KB RAM. During these 50 years memory has become a lot cheaper, and the need for writing memory efficient code is not that critical anymore. Today, your simplest Hello World Spring Boot app will probably use at least 100MB RAM. But still, sometimes, typically when we realize that we have to provide even more memory for an application, we can not help but wonder: Why in the world should this app need so much memory?! 

At least a part of the answer to that question lies within our code. Sometimes we write applications that use far more memory than necessary just because we are not aware of the hidden memory costs of our coding choices. Let us look at a few examples. 

## IO operations with InputStreams and OutputStreams
Let's say you need to read a file, and do something with each line. If you read the file like this: 
```java
try (InputStream is = new FileInputStream(myFile);
    BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
    String s = "";
    while ((line = br.readLine()) != null) {
        s += line + "\n";
    }
    // do something with s
}
```
Then the String `s` will contain the entire file, meaning that you now hold the entire file in memory. For smaller files that are read once this is usually not a problem, but if you are reading a large file, or if you are processing files that are received through an API, this way of reading the contents will probably result in an OutOfMemory exception, or at least excessive use of memory. A better way to read the file is like this: 
```java
try (InputStream is = new FileInputStream(myFile);
    BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
    String line;
    while ((line = br.readLine()) != null) {
        // do something with this line
    }
}
```

Now you will read and process one line at a time, which means that you only keep that one line in memory at a time. 

When writing to a file using an OutputStream you may encounter the same memory problem, so you should also process and write one line at a time. 

See https://www.baeldung.com/java-read-lines-large-file for more ways to read a file efficiently. 

## Tightening up the code
Each object you create will require some memory, and when it is no longer used the garbage collector will have to clean it up. Make sure you don't create objects that you don't really need. This sounds obvious, but in some cases we are creating objects without really thinking about it. For instance, when using the `+` operation to add something to a String, we are creating a StringBuilder object under the hood. When adding to a String using `+` repeatedly, like in the inefficient InputStream example above, we are actually creating a new StringBuilder object for each time. When manipulating Strings it is better to use a StringBuilder object in the first place so that you can [reuse it](https://blog.jooq.org/2015/02/05/top-10-easy-performance-optimisations-in-java/): 
```java
StringBuilder sb = new StringBuilder("a");
sb.append(args.length);
sb.append("b");
 
if (args.length == 1) {
    sb.append(args[0]);
}
```

[Lambdas](https://www.beyondjava.net/performance-java-8-lambdas) are another example. When using a Lambda for the first time, what actually happens is that a new class representing the Lambda is created by the JVM. The next time the Lambda is used, this class will be reused, but if you use your Lambda only once, this is quite costly. 

You should also use primitives instead of objects whenever possible, e.g. int is preferable to Integer as it requires less memory. 

And, as always, clean up unnecessary method calls. 

## Java Streams
There has been a lot of debate concerning the performance of Java Streams, that were introduced in Java 8, compared to more traditional for and for-each loops. Several experiments have proven streams to be slower and more resource consuming than traditional loops, but they have received a lot of criticism for writing the code using streams in a poorly optimized way. The conclusion regarding streams and performance seems to be that streams are not necessarily performing worse than traditional loops, but you should pay some attention when writing the code to avoid for instance resource demanding auto-boxing and Lambdas that are used just a few times. 
