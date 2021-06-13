---
calendar: kotlin
post_year: 2019
post_day: 1
title: Get started with Kotlin!
image: 'https://images.pexels.com/photos/2166/flight-sky-earth-space.jpg'
ingress: >-
  Welcome to the Bekk 2019 Kotlin advent calendar! In the days leading up to
  Christmas, we will present you with 24 articles, one for each day, about
  different topics regarding Kotlin. To start of, we'll give a short
  presentation of the language and show you how to get started with Kotlin in
  your existing Java project.
description: ''
links:
  - title: Using Maven
    url: 'https://kotlinlang.org/docs/reference/using-maven.html'
  - title: Using Gradle
    url: 'https://kotlinlang.org/docs/reference/using-gradle.html'
authors:
  - Yrjan Fraschetti
---
# What is Kotlin?
Kotlin is an open source, cross-platform, statically typed, general-purpose programming language with type inference that is fully interoperable with Java. It was started by Jetbrains, and is now supported by them and Google through the Kotlin Foundation. 

The name Kotlin comes from the Russian island of Kotlin (or Kotlin island), located west of St. Petersburg. The lead language designer of Kotlin ([Andrey Breslav](https://twitter.com/abreslav)) has reportedly said that the team decided to name it after an island just like Java was named after the Indonesian island of Java. Though, according to [Wikipedia](https://en.wikipedia.org/wiki/Kotlin_(programming_language)#History), it might as well have been named after the coffee.

Kotlin is really a programing language on the rise, with Google declaring it the official language for android app development on May 7, 2019. The [2019 Stackoverflow developer survey](https://insights.stackoverflow.com/survey/2019#most-loved-dreaded-and-wanted) shows that Kotlin is one of the four most loved languages. So, sit back and relax as we take you on a tour of its features.

# First up, set up Kotlin in an existing project

We'll go through how to set up Kotlin in both an existing Gradle and Maven project.

## Setup in Maven

If your existing project uses Maven, the following dependencies and plugins must be added to the pom.xml-file.

Fist off, the Kotlin standard library:

```xml
<dependencies>
  <dependency>
      <groupId>org.jetbrains.kotlin</groupId>
      <artifactId>kotlin-stdlib</artifactId>
      <version>${kotlin.version}</version>
  </dependency>
</dependencies>
```

This library contains all the standard features of Kotlin, like classes, functions and common types like String and Int, to name a few.
  Then we need the `kotlin-maven-plugin`, which builds and compiles your code:

```xml
<build>
  <plugins>
      <plugin>
              <groupId>org.jetbrains.kotlin</groupId>
              <artifactId>kotlin-maven-plugin</artifactId>
              <version>${kotlin.version}</version>
              <executions>
                  <execution>
                      <id>compile</id>
                      <phase>process-sources</phase>
                      <goals>
                          <goal>compile</goal>
                      </goals>
                      <configuration>
                          <sourceDirs>
                              <sourceDir>src/main/kotlin</sourceDir>
                              <sourceDir>src/main/java</sourceDir>
                          </sourceDirs>
                      </configuration>
                  </execution>
                  <execution>
                      <id>test-compile</id>
                      <phase>process-test-sources</phase>
                      <goals>
                          <goal>test-compile</goal>
                      </goals>
                      <configuration>
                          <sourceDirs>
                              <sourceDir>src/test/java</sourceDir>
                              <sourceDir>src/test/kotlin</sourceDir>
                          </sourceDirs>
                      </configuration>
                  </execution>
              </executions>
              <configuration>
                  <jvmTarget>1.8</jvmTarget>
              </configuration>
          </plugin>
  </plugins>
</build>
```

  The parts to notice here is the `sourceDirs` which shows the plugin where your main and test source files are located.
  For a more in depth explanation of the `kotlin-maven-plugin` see [Using Maven](https://kotlinlang.org/docs/reference/using-maven.html).

## Setup in Gradle

  Setting up Kotlin in Gradle requires quite a bit less code than the Maven setup. Since we are setting up Kotlin, we'll assume that your gradle config is not written in Kotlin and will therefore only show the Groovy-way of doing it.

  Depending on what your project targets, the config may vary, but in this project we target the JVM:

```
plugins {
  id "org.jetbrains.kotlin.jvm" version "1.3.50"
}
```

  Kotlin source files can be put in the same folders as your existing Java sources. But the default convention is to use different folders like this:

```
project
  - src
      - main (root)
          - kotlin
          - java
```

  If you are not using the default convention, you have to update the `sourceSets` property in `build.gradle` like this:

```
sourceSets {
  main.kotlin.srcDirs += 'src/main/myKotlin'
  main.java.srcDirs += 'src/main/myJava'
}
```

  For a more in depth explanation of how to set up Kotlin with Gradle, have a look here: [Using Gradle](https://kotlinlang.org/docs/reference/using-gradle.html).

# And that's all!

You're now all set to write whatever you want in Kotlin, and to tackle the rest of our advent calendar. To get you started with actually writing some code, have a look at the links below, which are all great resources for beginners:

* [Starting a project from scratch](https://kotlinlang.org/docs/tutorials/getting-started.html).
* [Kotlin Koans](https://kotlinlang.org/docs/tutorials/koans.html) is one of the most popular and most effective ways to get into Kotlin for people who already know Java.
* And of course, the [Kotlin documentation](https://kotlinlang.org/docs/reference/).
