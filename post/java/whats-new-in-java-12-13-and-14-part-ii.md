---
calendar: java
post_year: 2019
post_day: 19
title: 'What''s new in Java 12, 13 and 14, part II'
ingress: >-
  A couple of days ago, we had a look at [two new features in Java 13 and
  14](https://java.christmas/2019/17). In todays article, we'll cover some more
  goodies arriving in the near future.
links:
  - title: 'JEP 368: Text Blocks (Second Preview)'
    url: 'https://openjdk.java.net/jeps/368'
  - title: 'JEP 358: Helpful NullPointerExceptions'
    url: 'https://openjdk.java.net/jeps/358'
authors:
  - Sindre Nordbø
---
## Text blocks

Working with big chunks of text has always been tedious in Java. Super long lines are impossible to read and concatenating is impractical both because you can't copy/paste only the text and you've got a lot of noisy characters (`" +`) on every line. And if you want to embed snippets of HTML, XML, SQL and similar, you'll always end up with escaping a whole bunch of characters which distracts the reader from the actual content.

With _text blocks_, those days are hopefully behind us! This feature was first previewed in JDK 13 and is still in preview for JDK 14.

The syntax is quite simple at first glance – you open and close a text block with «fat delimiters» (`"""`):

```java
String s1 = """
            line 1
            line 2
            """;
```

The snippet above is equivalent with:

```java
String s1 = "line 1\nline 2\n";

String s2 = "line 1\n" +
            "line 2\n";
```

If you don't want the trailing newline, simply omit the newline before closing delimiter:

```java
String s1 = """
            line 1
            line 2""";
```

Lets have a look at a more realistic example:

```java
String old_syntax = "SELECT o.*, ol.*\n" +
                    "FROM \"ORDER\" o\n" +
                    "         INNER JOIN ORDER_LINE ol ON ol.order_id = o.id\n" +
                    "WHERE o.date < '2019-12-17';";

String new_syntax = """
                    SELECT o.*, ol.*
                    FROM "ORDER" o
                             INNER JOIN ORDER_LINE ol ON ol.order_id = o.id
                    WHERE o.date < '2019-12-17';
                    """;
```

Since we don't have to escape `"` and there is no need for opening, closing and concatenating the string on every line, it's pretty clear to me that text blocks will bring a big improvement to readability in the future.

**A note on whitespace**

The compiler will remove _incidental whitespace_, meaning whitespace the author probably don't want to be a part of the string. In the example above, all leading whitespace used to align content with the delimiters are removed. In most cases, the closing delimiter's position will decide how much incidental whitespace there is. The most notable exception is if any of the string's content is positioned further to the left than the closing delimiter, in which case the leftmost character wins.

Don't worry if this seems confusing. If you're using IntelliJ IDEA, look at the small green line indicating the margin:

![](text_block_margin.png)

💡Trailing whitespace are also considered undesired and will be removed.

## Helpful `NullPointerException`

`NullPointerException`s can sometimes be hard to narrow down to _exactly_ where it occured.

Consider the following piece of code:

```java
Person person = new Person("Sindre", null);
var streetName = person.address.streetName;
```

Since I've passed `null` as the `address` parameter, this throws the following exception:

```
Exception in thread "main" java.lang.NullPointerException
	 at com.github.sindrebn.NpeDemo.main(NpeDemo.java:7)
```

Starting with JDK 14, the JVM will analyze the program's bytecode and determine which variable causes the exception:

```
Exception in thread "main" java.lang.NullPointerException:
  Cannot read field "streetName" because "person.address" is null
    at com.github.sindrebn.NpeDemo.main(NpeDemo.java:7)
```

This feature is disabled by default in JDK 14, but you may enable it with the command-line option `-XX:+ShowCodeDetailsInExceptionMessages`. At the time of writing, it is planned to be [enabled by default in JDK 15](https://bugs.openjdk.java.net/browse/JDK-8233014?focusedCommentId=14296165&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-14296165).

## Enabling preview features

Text blocks currently have _preview_ status in JDK 13 and 14. Have a look at the [previous post](https://java.christmas/2019/17) in order to learn how you can activate preview features.
