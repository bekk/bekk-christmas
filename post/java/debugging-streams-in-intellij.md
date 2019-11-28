---
calendar: java
post_year: 2019
post_day: 15
title: Debugging Streams in IntelliJ
image: >-
  https://images.unsplash.com/photo-1552561618-4fe029f7858a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80
ingress: >-
  Have you ever found it hard to debug Streams in Java? Allow me to introduce
  you to a very powerful tool in IntelliJ IDEA; Mr. Stream Trace.
authors:
  - Sindre Nordbø
---
The introduction of _Streams_ in JDK 1.8 was a welcome change in the Java community. It allows developers to express their intent in code better than the good ol’ loop, encourages less mutability and works well with a functional mindset. There are, however, some disadvantages. One thing that bothered me was how hard it is to debug.

Let's say we have the following (admittedly slightly artificial) piece of code:

```java
IntStream.of(1, 2, 3, 4)
    .flatMap(x -> IntStream.of(x + 1, x - 2, x + 3))
    .sorted()
    .distinct()
    .toArray();
```

Are you able to instantly see what the result of this expression will be? No? Lets try debugging and stepping through each chain in the pipeline.

When learning how to use the Stream API, I had recently learned a super power in IntelliJ: **Evaluate expression**. I’d mark e.g. the first two lines of code and use my new favorite tool:

![](https://i.ibb.co/N9P0xcT/1-evaluate-expression.png)

That was … underwhelming. Where are my numbers?! The only thing looking remotely interesting is `this$0`. Surely `this` are my numbers, right?

![](https://i.ibb.co/RvC9LDR/2-evaluate-expression-2.png)

No 🤦‍♀️

This is because, as we all know, Stream operations are lazy:

> Streams are lazy; computation on the source data is only performed when the terminal operation is initiated, and source elements are consumed only as needed.
> _https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html_

So I guess I have to perform a _terminal operation_:

![](https://i.ibb.co/0hH6qnw/3-evaluate-expression-terminator.png)

Well, yes, this works. But I can no longer just select the interesting code, press a shortcut and see the results. If I want to figure out what the next step in the pipeline does, I have to close the dialog, increase my selection to the next line, press the **Evaluate Expression** shortcut and add `.toArray()` again. I don’t have time for that!

Enter my _new_ favorite feature of IntelliJ: «**Trace Current Stream Chain**». It’s not the most visible button, but you can find it in the Debug pane:

![](https://i.ibb.co/0VKD6dR/5-stream-debugger-hint.png)

Simply press the magic button (or assign a shortcut!) and you’ll see the following panel:

![](https://i.ibb.co/7bnZpGd/6-stream-debugger.png)

This gives you an overview of the entire pipeline and you can now see the input, every step of the chain and the end result. You can even click an item to see how it changes throughout the pipeline:

![](https://i.ibb.co/1Jn8K7x/7-stream-debugger-selected-input.png)

Here I’ve selected the number 2 in the leftmost column. By selecting e.g. the number 4 in the rightmost column you can see how we ended up with that exact number:

![](https://i.ibb.co/BC9sjcb/8-stream-debugger-selected-output.png)

If you have a more complex pipeline with a lot of steps, this flat representation might be too much to take in. In order to concentrate on one single step, press «**Split mode**» in the bottom left corner and choose the operation you want to have a closer look at:

![](https://i.ibb.co/rdCJZT6/9-1-split-mode.png)

If you, like me, have found it hard to debug a Stream pipeline I highly suggest you try out the Stream debugger in IntelliJ next time you get lost in the mysterious woods of flatmap and friends.

Happy debugging!
