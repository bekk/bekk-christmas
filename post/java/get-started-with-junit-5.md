---
calendar: java
post_year: 2019
post_day: 5
title: Get started with JUnit 5
ingress: >-
  JUnit 5 was released two years ago. Are you still running your tests with
  JUnit 4.12? Let’s change that, and get you started with JUnit 5.
links:
  - title: JUnit 5 User Guide
    url: 'https://junit.org/junit5/docs/current/user-guide/'
authors:
  - John Ringø
---
# Moving from 4.x to 5.x

If you want to use features available in Java 8 and above, you really should move to JUnit 5. 

To migrate from JUnit 4.x to JUnit 5 you don’t have to rewrite all your tests at once. If you want to start using JUnit 5, do it. JUnit Vintage helps us with this. Get rid of JUnit 4 and include the JUnit Vintage Engine on your classpath. The vintage engine runs your old JUnit 4 tests in the context of JUnit 5.

Just add the following dependency to your `pom.xml` if you use Maven:

```
<dependency>
    <groupId>org.junit.vintage</groupId>
    <artifactId>junit-vintage-engine</artifactId>
    <version>${junit5.version}</version>
    <scope>test</scope>
</dependency>
```

So far, so good. You should now be able to run your old JUnit 4.x tests with JUnit 5, but you're still not able to write new tests with JUnit 5. Add the following dependencies to your `pom.xml` to be able to use the new features provided with JUnit 5 in your tests:

```
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>${junit5.version}</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>${junit5.version}</version>
    <scope>test</scope>
</dependency>
```

Now you should be ready to get started with JUnit 5. Start by converting some of your old test annotations to the ones provided with JUnit 5.

# Basic annotations

I won’t go into detail about every annotation in JUnit 5, but I’d like to focus on a few of them. The most important annotation is of course `@Test`, which is still used to denote that a given method is a test method. However, in JUnit 5 the `@Test`-annotation doesn’t declare any attributes. Test expectations, like expected throwables, should now be handled in an assertion instead.

Some of the annotations that have changed from JUnit 4 to JUnit 5:

* The `@Before` and `@After` annotations have changed to `@BeforeEach` and `@AfterEach`
* `@BeforeAll` and `@AfterAll` have been renamed to `@BeforeClass` and `@AfterClass`
* `@Ignore` no longer exists. You can use `@Disabled` instead. Or maybe you can use some of the included annotations for conditional execution? Is your test only supposed to work on a specific OS? `@EnabledOnOs({ LINUX, MAC })`. Or maybe it shouldn’t run on Java 9? `@DisabledOnJre(JAVA_9)`

# Integrating your tests with other frameworks

In JUnit 4 you could specify different test runners to integrate your tests with other frameworks, like the Spring Framework with the `@RunWith` annotation.

```java
@RunWith(SpringJUnit4ClassRunner.class)
public class MySpringTest {
    // All your Spring magic here
}
```

`@RunWith` no longer exists in JUnit 5. It has been replaced by `@ExtendWith`, which provides similar functionality.

```java
@ExtendWith(SpringExtension.class)
public class MyOtherSpringTest {
    // Still your Spring magic here
}
```

You should have enough to get started with JUnit 5 in your projects. JUnit has an excellent JUnit 5 User Guide that you can use for a more comprehensive introduction to how you can best write your tests with JUnit 5.

If you want more handy JUnit 5 tips, be sure to check out:

* [Useful new features in JUnit 5](https://java.christmas/2019/9)
