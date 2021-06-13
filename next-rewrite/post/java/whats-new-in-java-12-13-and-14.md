---
calendar: java
post_year: 2019
post_day: 17
title: 'What''s new in Java 12, 13 and 14, part I'
ingress: >-
  The release cycle of Java has changed quite dramatically recently, meaning
  we're getting new features at a more rapid pace than earlier. If you still
  hadn't had the time to read up on what's been going on the last releases, look
  no further!
links:
  - title: 'JEP 361: Switch Expressions'
    url: 'https://openjdk.java.net/jeps/361'
  - title: 'JEP 305: Pattern Matching for instanceof (Preview)'
    url: 'https://openjdk.java.net/jeps/305'
authors:
  - Sindre Nordbø
---
We've previously covered [what's new in Java 11](https://java.christmas/2019/11), and today I want to tell you a little bit about what has happened since then. Please beware that none of these versions are LTS (long term support) versions. So if you're not absolutely sure you'll be able to upgrade every six months until Java 17 is released, you might want to stay put on Java 11 for your most critical applications.

With that disclaimer out of the way, we can jump into the good stuff. I wont cover _all_ new features (have a look at the JEP list for version [12](http://openjdk.java.net/projects/jdk/12/), [13](http://openjdk.java.net/projects/jdk/13/) and [14](http://openjdk.java.net/projects/jdk/14/) if you'd like), but I'll highlight a few interesting language features.

Today I'm focused on _two_ new features, another post with some additional features will be available in a couple of days.

## Switch enhancements

`switch` has gotten some changes! They have been previewed in JDK 12 and again in 13 and are at time of writing aimed for release in JDK 14. We'll be getting one new feature for when `switch` is used as a statement and, in addition, it can also be used as an expression going forward.

### Arrow labels

We can now use arrow labels (`case X ->`) in addition to the old `case X:` label in `switch` statements. Upon using arrow labels, only the expression or statement on the right hand side of the arrow will be executed. This means there will be no _fall through_ so you no longer need to remember `break;`:

```java
String quantityString;
switch (n) {
    case 1 -> quantityString = "one";
    case 2 -> quantityString = "two";
    default -> quantityString = "many";
}

```

### Switch expressions

`switch` can now be used as expressions, i.e. it can return a value. This means we won't have to first declare a variable, then assign a value in every single branch. Combined with _arrow labels_ it allows us to express our intent in much fewer lines of code:

```java
String quantityString = switch (k) {
    case 1 -> "one";
    case 2 -> "two";
    default -> "many";
};
```

Sometimes you might be forced to execute a code block as part of a case expression. In order to combine this with arrow label syntax, you must `yield` a value at the end of the block:

```java
DayType type = switch (day) {
    case 1, 2, 3, 4, 5 -> WEEKDAY;
    case 6, 7          -> WEEKEND;
    default            -> {
        logger.warn(day + " is not a valid day. Legal values are [1..7]");
        yield UNKNOWN;
    }
};
```

You may also turn `switch`es using the old style labels from statements to expressions by using `yield`.

```java
Type type = switch (day) {
    case 1, 2, 3, 4, 5:
        yield WEEKDAY;
    case 6, 7:
        yield WEEKEND;
    default:
        logger.warn(day + " is not a valid day.");
        yield UNKNOWN;
};
```

⚠️ Please remember that it is the arrow label syntax that prevents _fall through_. That means, if you forget to `yield`, the next case expression will be evaluated and you might end up with the wrong result. I'd recommend you stay away from this syntax for this reason.

---

As usual more features leads to more complexity. We've certainly gotten a more feature rich `switch`, but as illustrated above it has also become much more complex. You have to remember which label style, `:` or `->`, has _fall through_ – and what was the point of `yield` again? Stephen Colebourne (you know, that guy who wrote [Joda-Time](https://www.joda.org/joda-time/)) has written [a much more in depth blog post](https://blog.joda.org/2019/11/java-switch-4-wrongs-dont-make-right.html) where he raises some important questions regarding the UX of these features. If you're interested in the new `switch` features, make sure to read this first!

## Pattern matching for `instanceof`

As a Java developer you've most likely been in a situation where you have to check if an object is a certain type, and if it is – cast it to that type. This pattern is widely used in e.g. `equals` implementations.

Introduced as a preview feature in JDK 14, `instanceof` is extended to take what's called a _type test pattern_ instead of just a type. A _type test pattern_ consists of a predicate and a binding variable.

**⚠️ Disclaimer:** This feature is currently not supported by IntelliJ. You can follow the progress in Jetbrain's [issue tracker](https://youtrack.jetbrains.com/issue/IDEA-227613).

Consider the following example:

```java
@Override
public boolean equals(Object obj) {
    if (obj instanceof Person) {
        Person other = (Person) obj;
        return this.name == other.name;
    }
    return false;
}
```

Using this new feature, you may rewrite as follows:

```java
@Override
public boolean equals(Object obj) {
    if (obj instanceof Person other) {
        return this.name == other.name;
    }
    return false;
}
```

In the above example `Person other` is the _type test pattern_.

Inside the `if` block, you may use `other` and it's guaranteed to be a `Person`. `other` is, however, _not_ accessible outside the `if` block.

⚠️ It's worth noting that the scope of a binding variable is determined by the semantics of the containing expressions, which might lead to some surprising results:

```java
if (!(obj instanceof String s)) {
    System.out.println(s); // 1
} else {
    System.out.println(s); // 2
}
```

1. `obj` is _not_ a `String`, `s` is some other variable in scope (e.g. a member of the enclosing class).
2. `obj` is a `String`, `s` is `obj` cast to `String`.


This is certainly not the most game changing feature in itself, but it sends a signal that Java is embracing _pattern matching_ as a concept, a language feature many other popular languages has supported for a long time. And as an added bonus, your `equals` implementation can be shortened slightly to emphasize the important bits.


## Enabling preview features

The new `switch` changes currently have _preview_ status in the most recently released JDK version (13). This means you probably don't want to use them to a large extent in the code base you earn your living of. APIs could change, and there is still a chance the feature won't be promoted to a stable feature in its current form.

It is, however, valuable to experiment with them. Trying new features is a good way to broaden your skill set, and if there is something you strongly dislike about the usability of a feature you can even provide feedback to the JDK developers. Look for the _Discussion_ label on a feature's JEP page (linked below) to find the correct mailing list.

To get started experimenting with preview features in the tool you use, follow the guides below:

### Maven

To activate during compilation, add the following configuration to `maven-compiler-plugin`:

```xml
<configuration>
    <release>13</release>
    <compilerArgs>
        --enable-preview
    </compilerArgs>
</configuration>
```

For test execution, add the following configuration to `maven-surefire-plugin` and/or `maven-failsafe-plugin`:

```xml
<configuration>
    <argLine>--enable-preview</argLine>
</configuration>
```

### Gradle

Enable the compiler flag for compilation and test execution as follows:

```groovy
compileJava {
    options.compilerArgs += ["--enable-preview"]
}
test {
    jvmArgs '--enable-preview'
}
```

### IntelliJ

Go to _Project Settings > Project_ and find the _Project language level_ dropdown. If you previously targeted version 13 and want to enable the preview features, choose _13 (Preview)_.

![](https://i.ibb.co/xzxbqp3/intellij-enable-preview.png)
