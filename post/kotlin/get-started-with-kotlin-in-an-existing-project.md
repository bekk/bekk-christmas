---
calendar: kotlin
post_year: 2019
post_day: 2
title: Get started with Kotlin in your existing Java project!
image: 'https://images.pexels.com/photos/2166/flight-sky-earth-space.jpg'
ingress: >-
  So, you've read about Kotlin and many of its cool features, how do you
  actually get startet with it in your existing Java projects?
authors:
  - Yrjan Fraschetti
---
## Setup

We'll go through how to set up Kotlin in both an existing Gradle and Maven project.

  ### Setup in maven
  If your existing project uses maven, the following dependencies and plugins must be added to the pom.xml-file.

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

  ### Setup in gradle
  Setting up Kotlin in gradle requires quite a bit less code than the maven setup. Since we are setting up Kotlin, we'll assume that your gradle config is not written in Kotlin and will therefore only show the Groovy-way of doing it.

  Depending on what your project targets, the config may vary, but in this project we target the jvm:
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

  If you are not using the default convention, you have to update the `sourceSets` property like this:
  ```
  sourceSets {
    main.kotlin.srcDirs += 'src/main/myKotlin'
    main.java.srcDirs += 'src/main/myJava'
  }
  ```

  For a more in depth explenation of how to set up kotlin with gradle, have a look here: [Using Gradle](https://kotlinlang.org/docs/reference/using-gradle.html).

## Create your first kotlinfile

Depending on how you decided to set up your project in the previous step, either by adding Kotlin sources together with java sources or by adding a separate folder for Kotlin sources, now its time to create your first Kotlin file to the project!

In IntelliJ, simply right click the folder where you want to add the new Kotlin file, select New -> Kotlin File/Class.
