---
calendar: java
post_year: 2019
post_day: 22
title: 'Code as data, Java edition'
ingress: ''
description: A blog post about Byte Buddy written by Rafael Winterhalter from Scienta
links:
  - title: Byte Buddy (GitHub)
    url: 'https://github.com/raphw/byte-buddy'
  - title: Byte Buddy (webpage)
    url: 'https://bytebuddy.net'
  - title: Instrumentation API
    url: >-
      https://docs.oracle.com/en/java/javase/13/docs/api/java.instrument/java/lang/instrument/package-summary.html
  - title: Free introductiory book to Lisp and code as data
    url: 'http://www.paulgraham.com/onlisp.html'
  - title: Introduction to Byte Buddy
    url: 'https://www.youtube.com/watch?v=Gjtrl66J26g&t=1s'
  - title: Guide to Java agents
    url: 'https://vimeo.com/362325091'
authors:
  - Rafael Winterhalter
---
Any student of computer science has encountered the concept of *code as data*. Most famously, in the the Lisp language, all code can easily be manipulated by code written in Lisp, dissolving the barrier between the program and its input.

And while it is less obvious, this concept of code as data can also be applied to any Java application. Admittedly, in a less obvious manner: when compiling Java sources, the Java compiler generates *.class* files which represent the source in a binary format. And by thinking of binaries as arrays of bytes, it is of course possible to serve those arrays as input to the very same Java application those arrays represent. Fortunately, the Java class file format is specified in the minutest [detail](https://docs.oracle.com/javase/specs/jvms/se13/html/jvms-4.html) what makes processing classes a very feasible task.

**Why is this useful?**

At first glance, such metaprogramming might seem overly complicated. Isn’t Java Turing complete what makes such expenditures unnecessary? The truth is that almost any Java enterprise application uses code manipulation, for convenience and to create concise APIs that base on existing types. As an example, consider that you needed to implement a security library, where any method annotated with `@Secured(role = "admin")` should only be invoked if the current user is indeed equipped with administrator rights. The most straightforward and reliable option would of course be to change all application code to enforce such state by adding a corresponding snippet of code at the beginning of any annotated method.

**Code manipulation with Byte Buddy**

Byte Buddy is a library for manipulating and generating Java class files within a running application, a tool that hides the gory details of byte array processing to make metaprogramming in Java approachable. The library’s API intends to resemble the Java programming language as much as possible to give a familiar start to developers who already program in Java.

To understand what Byte Buddy can be used for, consider the previous example of an annotation-driven security library. Using Byte Buddy, it is simple to implement a security check at runtime by for example creating a subclass of an existing class. By overriding methods of the base class, Byte Buddy can add additional behavior in this subclass and only invoke the original method based on conditions provided by the library’s user.

As an example, consider a service:
```
public class SampleService {
  @Secured(role = "admin")
  public void doSomethingSensitive() { … }
} 
```
Using Byte Buddy, it is now possible to apply code manipulation to invoke the following security interceptor prior to invoking the the annotated method. Doing so, one can check if the logged-in user really has the necessary privilege:
```
public class SecurityInterceptor {
  public static void onMethodEnter(@Origin Method method) {
    if (!CurrentUser.hasRole(method.getAnnotation(Secured.class).role())) {
      throw new IllegalStateException("Insufficient privileges");
     }
  }
}
```
Using this interceptor that checks any method’s annotated role against some static user management utility, a secured subclass is created as follows:

```
SampleService sampleService = new ByteBuddy()
  .subclass(SampleService.class)
  .method(isAnnotatedWith(Secured.class))
  .intercept(MethodDelegation.to(SecurityInterceptor.class)
        .andThen(SuperMethodCall.INSTANCE))
  .make()
  .load(SampleService.class.getClassLoader())
  .getLoaded()
  .getConstructor()
  .newInstance();

sampleService.doSomethingSensitive(); // throws exception if user is not an administrator
```

As the code hopefully indicates, Byte Buddy will override any method that is annotated with Secured and invoke the above interceptor before calling the original method. Only if an exception is thrown in the interceptor, the call to the original method will never be applied, thus securing the method call.

This is similar to how frameworks such as Spring implement annotation processing on their bean instances where annotations are processed and enforced by proxy subclasses in a similar manner. Similarly, frameworks like Hibernate, Mockito, AssertJ and many others also use subclasses to inject their code into methods where deemed necessary.

**Changing code during build time**
Many frameworks choose the generation of subclasses for code manipulation because of convenience. Subclass generation does not require any particular setup. However, there is more to code generation. For a security framework such as that proposed in this article, it would be more reliable to add the security check directly to the methods in question. For this purpose, Byte Buddy offers plugins for Maven, for Gradle and for the command line that manipulate classes during a build. To implement such build-time manipulation, Byte Buddy offers delegation to a user-implemented interface that determines what classes are picked for manipulation and what manipulation is applied:

```
public class SecurityPlugin implements net.bytebuddy.build.Plugin {
  @Override
  public boolean matches(TypeDescription type) {
    return !type.getDeclaredMethods()
      .filter(method -> method.getDeclaredAnnotations().isAnnotationPresent(Secured.class))
      .isEmtpy();

  }
  
  @Override
  public DynamicType.Builder<?> apply(
        DynamicType.Builder<?> builder, 
        TypeDescription type, 
        ClassFileLocator locator) {
    return builder
      .method(isAnnotatedWith(Secured.class))
      .intercept(MethodDelegation.to(SecurityInterceptor.class)
        .andThen(SuperMethodCall.INSTANCE));
  }

  @Override
  public void close() { }
}
```
The above plugin first chooses classes to manipulate where classes are selected if they declare at least one method that is annotated with *Secured*. For those classes, it applies the same interception as before, even using the same API. After applying this build plugin, all classes with the annotation implement  the security check that is now reliably executed upon any invocation and not only if guarded by a subclass proxy.

As an example, the Hibernate framework allows for build-time manipulation where the framework even generates more efficient proxies than it would by using subclasses. For convenience, the framework does however give developers a choice and applies runtime subclass generation only if it detects that its build plugin was not used.

**Changing code during runtime**

Finally, the JVM also allows runtime manipulation of classes by installing a so-called Java agent into a running virtual machine process. Java agents are shipped within separate jar files where their manifest points to an entry point, similar to Java’s main method, only that it is executed prior to the actual program as a *premain* method.

Besides running before the actual program, Java agents are supplied with an API as an argument that allows to hook into the JVM’s class loading process, giving Java agents the ability to transform class files before they are loaded. And also for this use case, Byte Buddy includes an API to make use of agent-based code manipulation as simple as possible:

```
public class SecurityAgent {
  public static void premain(String arg, Instrumentation inst) {
     new AgentBuilder.Default()
       .type(type -> !type.getDeclaredMethods()
         .filter(method -> method.getDeclaredAnnotations().isAnnotationPresent(Secured.class))
         .isEmtpy())
       .transform((builder, type, loader, module) -> builder
         .method(isAnnotatedWith(Secured.class))
         .intercept(MethodDelegation.to(SecurityInterceptor.class)
            .andThen(SuperMethodCall.INSTANCE)))
       .installOn(inst);
  }
}
```
As a result, all classes within any application in which the Java agent was included will apply the security check, just as if the previous build plugin would have been applied.

In the end, the right approach to code manipulation depends on the actual requirements but Byte Buddy tries to make it easy to share as much code between the different ways of manipulating Java classes. Also, there is much more to Byte Buddy and to Java agents what is too much to cover in a single blog posting but which are covered in various other blog postings and conference presentations, some of which are linked in the references below.

***

This was a guest post written by Rafael Winterhalter from [Scienta](https://scienta.no).
Thank you Rafael!

