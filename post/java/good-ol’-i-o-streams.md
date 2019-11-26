---
calendar: java
post_year: 2019
post_day: 8
title: Good ol’ I/O streams
image: 'https://picsum.photos/id/964/800/300?blur=5'
ingress: >-
  No, not the Stream API introduced in Java 8, but the API for stream-based I/O
  which has been part of the JDK since Java 1.0. That is even older than the
  Collections Framework, which you had to wait until Java 1.2 to be available.
  And as with the Java Collections, even though the `java.io` API is quite
  dated, it is still heavily in use. InputStreams and OutputStreams are passed
  around, and consumed and written to, also in applications which are written
  nowadays.
authors:
  - Rune Flobakk
---
Java got proper support for managing releasing I/O resources used by these classes as late as in version 7 with the try-with-resources language facility. Using it, the runtime would ensure that `close()` is invoked on the stream you are working on before going out of scope. This makes it easier to ensure your application is not unnecessarily holding on to I/O resources, and even eventually exhausting available resources, so called resource leaks.

But it may still not be entirely intuitive _when_ to actually ensure to close streams, and when to leave the resource management to other parts of the code. It may be tempting to defensively just wrap any use of streams with a `try(..) {`, so closing is not forgotten, and while this actually works for many cases, in some circumstances leads to erroneous behaviour.

Let’s look at some simple principles to handling InputStreams, OutputStreams, and other AutoCloseable resources. We can summarize when you should take care to close streams with three prioritized rules-of-thumbs, prioritized meaning that each rule applies as long as it is not conflicting with any of the previous ones.

1. Do not close streams offered from someone else
2. Do not close streams you hand to someone asking for them
3. Close streams you acquire yourself

## Do not close streams offered from someone else

This means that code operating on streams it gets from method arguments, should not close the streams as well. This is simply because the code does not know how the stream was created. Even though if the method is used to fully read an InputStream, it should _not_ as a convenience close it when the stream is delivered through a method argument from some calling code.

## Do not close streams you hand to someone asking for them

This may seem obvious, as why would you return an unusable (i.e. closed) stream from a method? Even so, it is included as it sets an important presedence for the next rule.

## Close streams you acquire yourself

The _only_ cases to consider whether or not to ensure proper closing of streams are when you take active means to acquire them, either through creating a new instance, or calling a method which returns a stream. There is a notable exception for streams which are created to be delivered as a return value from the method. Code which acquire streams are responsible for the resource management of the stream, and should expect methods which are handed the stream to not close it, because they follow the first principle, and therefore does not close streams that are offered from someone else.

## Examples

The implications of this helps us realize that the following code is wrong:

```java
InputStream in = Files.newInputStream(Path.of("myfile.txt"));
String myFileContent = IOUtils.toString(in, UTF_8);
```

We use a handy utility from Apache Commons IO to read a textfile completely as a String. As the `IOUtils.toString` method exhausts the InputStream, one may be inclined to think that it should also close it, being a nice utility library and all which lightens the burden on me having to think about such things. The javadoc does not mention anything whether it will close it or not, and if we trace the source code we will eventually come to the conclusion that, no, it does not even bother to close the stream, even though it could have, and it would help me a lot with writing less code. The thing is, it is perfectly valid for an InputStream to be exhausted, to be read until there are no more bytes available, and at a later time produce more bytes, and the `IOUtils.toString` method have no way to know that, because it was offered from someone else as a method argument.

The correct code would be something like this:

```java
try (InputStream in = Files.newInputStream(Path.of("myfile.txt"))) {
    String content = IOUtils.toString(in, UTF_8);
}
```

because the code is _actively_ acquiring the stream using `Files.newInputStream`.
Likewise, it would be similarily wrong to do resource management if our code got the InputStream yielding the file content from someone else, like this:

```java
void process(InputStream input) throws IOException {
  try (input) {
    String content = IOUtils.toString(in, UTF_8);
  }
}
```

The resource management of the `InputStream` passed to the process-method is the responsibility of the calling code, and the calling code must apply the two principles to decide if it should do resource management.
