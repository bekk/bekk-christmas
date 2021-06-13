---
calendar: java
post_year: 2019
post_day: 2
title: 'Dependency injection, what is it and how does it work?'
image: >-
  https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1240&q=80
ingress: >-
  Most developers will at some point be exposed to a dependency injection
  framework, and at first glance the whole thing can seem magical and hard to
  understand. Here we'll try to create a conceptual model of how DI-frameworks
  work.
authors:
  - Nicklas Utgaard
---
**Disclaimer:** Throughout this post we'll make references to the [Spring framework](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans). However, this post is not a Spring tutorial nor an explaination of how Spring works. 

## What is it
Dependency injection (DI) is, at its core, an implementation of the [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control) (IoC) principle. Which simply means changing your classes from creating its own dependencies, to a solution where your classes just requests its dependencies.


Let's look at an example to better understand what we're talking about. Starting off with how classes are wired together in application without a DI framework;
```java
// Controller.java
private Service service;
public Controller(DbConnection dbConnection) {
  this.service = new Service(dbConnection);
}

// Service.java
private DAO dao;
public Service(DbConnection dbConnection) {
  this.dao = new DAO(dbConnection)
}

// Config.java
Controller controller = new Controller(dbConnection);
```

In the example without a DI-framework you'll observe that `Controller` must have an understanding of how `Service` is created, and what dependencies `Service` needs.
And in the case where the `DAO` class suddenly needs a second constructor argument it would require changes to all the classes in the example. We can however make the non-DI example a bit more future-proof by moving dependency instantiation to the `Config` class; 

```java
// Config.java
DAO dao = new DAO(dbConnection);
Service service = new Service(dao);
Controller controller = new Controller(service);
```
In small and simple applications this may be acceptable, as introducing a DI-framework also introduces complexity. But as the application grows this `Config` class may become rather large and hard to maintain. And we're interested in how DI-frameworks work, so let's continue by looking at an example using the fictional library `DIY`; 
```java
// Config.java
Controller controller = DIY.get(Controller.class);
```

It should be noted that this is not the full story, and we'll take a look at what changes were made in order for `DIY` to understand how the classes should be wired together. 

## So, how does it work?

At its most basic you can think of `DIY` as a glorified `Map`, often referred to as the IoC Container. Populating the map can be achieved in several ways, but we'll focus on an annotation-based approach, e.g using `@Bean`, `@Component`, `@Inject`, etc.
`@Bean` and `@Component` would be equivalent to `map.put`, whereas `@Inject` is equivalent to `map.get`. 

To start we'll look at the lifecycle of `DIY`, which can be split into three distinct phases: 
1. Scanning
2. Instantiation
3. Injection

### Scanning
Before anything can happen the library needs to get a concept of which classes the application needs. Spring supports a multitude of options here, but we'll focus on the simplest case; classpath-scanning searching for classes annotated with `@Component` and a default constructor. To help us in our efforts we'll use a nifty little library called [reflections](https://github.com/ronmamo/reflections) which will help us scan the classpath. 

Finding all classes of interest is as simple as: 
```java
List<Class<?>> classes = new Reflections("com.myapp", new TypeAnnotationsScanner())
  .getTypesAnnotatedWith(Component.class);
```

### Instantiation

After finding all classes that the application needs we move on to instantiating these. Since we required all classes to have a default constructor we can simply call `Class::newInstance` for each of the classes found. 

```java
List<Object> beans = classes
  .map(cls -> cls.newInstance());
```

### Injection

After instantiating all classes we're left with injecting dependencies where they are needed. All of the classes we found can potentially include fields annotated with `@Inject`, meaning they're dependent on another class. Hence we need to iterate through the list of beans and connect them together.

```
beans
  .forEach(bean -> {
    ReflectionUtils
      .getAllFields(bean.getClass(), withAnnotation(Inject.class))
      .forEach(field -> {
        Object value = resolve(field, beans);
        field.set(bean, value);
      });
  });
```
We iterate through all beans, finding all fields annotated with `Inject` and set their value. `resolve` can be implemented rather straight forward by just finding the first bean which can be assigned to the field-type. 

At this point the `DIY` library has completed its job, and we should now be able to run `DIY.get(Controller.class)` and receive a instance of `Controller` with all fields populated by `DIY`.

## Complicating matters
We made a lot of assumptions and made a really scoped down version of what you may expect from a DI framework. Some of the issues include:

**Having multiple beans of the same type.**
There is no way to differentiate between beans of similar types. Spring provides a way of naming your bean; `@Bean(name = "my-awesome-controller")`, and then requesting that specific bean by using `@Named("my-awesome-controller")` in addition to `@Inject`.

**Code in the constructor of a bean.** Strictly speaking you may create a default constructor and add some code there. But since the bean is instantiated before the injection-phase it will not have the resolved values at that point. Spring's solution comes in the form of the annotation `@PostConstruct`, which can be added to a method in the class and executed whenever Spring has injected the requested dependencies.

**Constructor Injection.** Some people prefer constructor injection instead of field injection. E.g allowing classes to specify a constructor with its dependencies instead of annotating every field. This is supported in Spring by simply annotating the constructor instead of each field in the class. For this to work the library needs to instantiate classes in topological order (hence circular dependencies will no longer work). 

**The `@Bean` annotation.** We did not use the `@Bean` annotation in our library. Supplementing the scanning phase to support the annotation can be achieved by scanning for all classes including methods annotated by `@Bean`, instantiate the containing class, and invoking the annotated method.
