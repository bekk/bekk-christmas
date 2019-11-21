---
calendar: java
post_year: 2019
post_day: 4
title: Project Lombok
image: >-
  https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1240&q=80
ingress: >-
  Want to use the `var` keyword, but your team is stuck on Java 8? Lombok can
  help you. Sick and tired of writing and maintaining getters and setters?
  Lombok can help you.
links:
  - title: Project Lombok homepage
    url: 'https://projectlombok.org'
  - title: 'JSR 269: Pluggable Annotation Processing API'
    url: 'https://www.jcp.org/en/jsr/detail?id=269'
  - title: Builder pattern
    url: 'https://en.wikipedia.org/wiki/Builder_pattern'
  - title: Lombok features
    url: 'https://projectlombok.org/features/all'
authors:
  - Nicklas Utgaard
---
[Project Lombok](https://projectlombok.org) is a Java compile-time library that “extends” the Java-experience by adding new and exciting annotations and keywords. It does this by utilizing [JSR 269: Pluggable Annotation Processing API](https://www.jcp.org/en/jsr/detail?id=269) and a myriad of other internal and/or compiler-specific APIs.

## Peeking into the future
While some projects may be using Java 11 or 13, there is still a lot of developers and code stuck in the pre- Java-9 era. Project Lombok might help you to peek into the future if this is your everyday reality.

Java 10 introduces the `var` keyword, extending the usage of type inference to include your everyday variables.
In term of code this means that the previously verbose `Customer customer = new Customer("Frank");`, can be simplified to `var customer = new Customer("Frank");`. Add Project Lombok to your built tool and you may experience this glorious new-found freedom yourself, even if you're stuck at Java 8. As a treat, Project Lombok even adds `val`, which is similar to Java 10's `final var`.

## So much code, yet no value

Writing and maintaining a decent sized domain-object can be extremely tedious. Update a field name, and you better make sure you update your getters and setters. Perhaps your team likes using the [builder-pattern](https://en.wikipedia.org/wiki/Builder_pattern), adding even more required maintenance. Project Lombok's remedy; add `@Getter`, `@Setter` and `@Builder` to you domain class, and you're good.

  

Project Lombok introduces a [whole set of interesting annotations](https://projectlombok.org/features/all) to use. Some of the ones I've used the most are:

* `@Data` - Shortcut for `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, and `@RequiredArgsConstructor`.

* `@Value` - Immutable variant of `@Data`

* `@Slf4j` - Adds `private static final Logger log`

* `@ToString` - Generates a human-readable `toString` method

* `@EqualsAndHashCode` - Generates `hashCode` and `equals` based on the fields in your object

  
  

## Not all roses and sunshine

While Project Lombok undoubtedly has some nice features, it also comes with a cost and risks.

* In order for your team to be productive they must all install an IDE plugin. Most major IDEs are supported.

* The usage of non-standard/internal APIs, and how this may affect the future of the codebase.

  

Other alternatives may also be better suited for your team, e.g; upgrading to a newer version of Java, or introducing Kotlin if you main concern is reducing boilerplate code.
