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
**Disclaimer:** Throughout this post we'll make references to the [spring framework](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans). However, this post is not spring tutorial nor an explaination of how spring works. 

## What is it
Dependency injection (DI) is, at its core, a implementation of the [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control) (IoC) principle. Which simply means changing your classes from creating its own dependencies, to a solution where you classes just requests its dependencies.


Lets look an example to better understand what we're talking about. Starting off with how classes a wired together in application without a DI framework;
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

In the example without a DI-framework you'll observe that `Controller` must have a understanding of how `Service` is created, and what dependencies `Service` needs.
And in the case where the `DAO` class suddenly needs a second constructor argument it would require changes to all the classes in the example. We can however make the non-DI example a bit more future-proof by moving dependency instantiation to the `Config` class; 

```java
// Config.java
DAO dao = new DAO(dbConnection);
Service service = new Service(dao);
Controller controller = new Controller(service);
```
In small and simple applications this may be acceptable, as introducing a DI-framework also introduces complexity. But as the application grows this `Config` class may become rather large and hard to maintain. And we're interested in how DI-frameworks work, so lets continue by looking an example using the fictional library `DIY`; 
```java
// Config.java
Controller controller = DIY.get(Controller.class);
```

It should be noted that this is not the full story, and we'll take a look at what changes were made in order for `DIY` to understand how the classes should be wired together. 

## So, how does it work?

At its most basic you can think of `DIY` as a glorified `Map`, often referred to as the IoC Container. Populating the map can be achieved in several ways, but we'll focus on an annotation-based approach, e.g using `@Bean`, `@Component` and `@Inject`.
`@Bean` and `@Component` would be equivalent to `map.put`, whereas `@Inject` is equivalent to `map.get`. 

