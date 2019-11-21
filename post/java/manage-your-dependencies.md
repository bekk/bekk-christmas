---
calendar: java
post_year: 2019
post_day: 9
title: Manage your dependencies
ingress: >-
  During an application's lifespan you've probably added quite a few
  dependencies. But are all of them necessary? And are you using some libraries
  you're not even aware of? Today I'd like to talk a little bit about a maven
  plugin I'm a big fan of: **maven-dependency-plugin**.
links:
  - title: Apache Maven Dependency Plugin
    url: 'https://maven.apache.org/plugins/maven-dependency-plugin/index.html'
authors:
  - Sindre Nordbø
---
This plugin has [a fair amount of goals](https://maven.apache.org/plugins/maven-dependency-plugin/plugin-info.html). I'll highlight a couple of my favorites, but first, let's get the boring part out of the way:

To start using this plugin, simply add the following to your `<pluginManagement>` section:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-dependency-plugin</artifactId>
    <version>3.1.1</version>
</plugin>
```

Version `3.1.1` is the most recent at the time of writing, check [The Central Repository](https://search.maven.org/search?q=g:org.apache.maven.plugins%20AND%20a:maven-dependency-plugin&core=gav) to see if there has been a new version released.

Now, let's look at the more interesting bits!

# `analyze`

This goal analyzes the project’s dependencies and figures out if any of the declared dependencies are unused and vice versa – which dependencies you’re using which are not declared (i.e. transitive dependencies that you _actually_ depend upon).

Let's say I run `mvn dependency:analyze` and get the following output:

```xml
$ mvn dependency:analyze

[INFO] Scanning for projects...
[INFO]
[INFO] ----------------< com.example:dependency-plugin-demo >------------------
[INFO] Building dependency-plugin-demo 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
          <execute test-compile phase>
[INFO]
[INFO] --- maven-dependency-plugin:3.1.1:analyze (default-cli) @ dependency-plugin-demo ---
[WARNING] Used undeclared dependencies found:
[WARNING]    com.foo:bar:jar:1.0.0:compile
[WARNING] Unused declared dependencies found:
[WARNING]    com.foo:baz:jar:2.0.0:compile
[INFO] ------------------------------------------------------------------------
```

See those four lines starting with **[WARNING]**? This indicates I've got some issues in my project.

I've got a dependency on `com.foo:baz`, but I'm never using it. I should be able to safely remove it.

`com.foo:bar` is not a dependency declared in my POM, but I'm still using it. This must mean one of my dependencies are depending on `com.foo:bar`. Since I'm actually using it in my project, I should declare it in my POM for two reasons:
1. If I upgrade the dependency that contains `com.foo:bar` and they have removed said dependency, I’ll get a build failure.
1. The POM should serve as documentation for my project, describing which third party libraries I'm using.

But wait a minute – what if I don’t even know how `com.foo:bar` snuck into my code?

Allow me to introduce you to:

# `tree`

This goal displays the entire dependency tree of the project.


```
$ mvn dependency:tree

[INFO] Scanning for projects...
[INFO]
[INFO] ----------------< com.example:dependency-plugin-demo >------------------
[INFO] Building dependency-plugin-demo 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-dependency-plugin:3.1.1:tree (default-cli) @ dependency-plugin-demo ---
[INFO] com.example:dependency-plugin-demo:jar:0.0.1-SNAPSHOT
[INFO] +- com.foo:qux:jar:1.3.0:compile
[INFO] |  +- com.foo:bar:jar:1.0.0:compile
[INFO] \- com.foo:baz:jar:2.0.0:compile
[INFO] ------------------------------------------------------------------------
```

For small to medium sized projects this gives a great overview of _all_ dependencies, even transitive ones I don't use. For large projects, this list will probably be very long and hardly usable for any purpose.

So, in this example it's _fairly_ easy to see how `com.foo:bar` is a transitive dependency because of `com.foo:qux`. For large projects, simply use the `includes` parameter to filter the dependency tree:

```
$ mvn dependency:tree -Dincludes=com.foo:bar

[INFO] Scanning for projects...
[INFO]
[INFO] ----------------< com.example:dependency-plugin-demo >------------------
[INFO] Building dependency-plugin-demo 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-dependency-plugin:3.1.1:tree (default-cli) @ dependency-plugin-demo ---
[INFO] com.example:dependency-plugin-demo:jar:0.0.1-SNAPSHOT
[INFO] \- com.foo:qux:jar:1.3.0:compile
[INFO]    \- com.foo:bar:jar:1.0.0:compile
[INFO] ------------------------------------------------------------------------
```

💡 You can even [use wildcards](https://maven.apache.org/plugins/maven-dependency-plugin/tree-mojo.html#includes), such as `*:bar` for the `includes` parameter.

# Include it in your build lifecycle

Remembering to run `dependency:analyze` every now and again is probably unrealistic – I know I'd forget to do it. I'd highly recommend including it in your build, so it's always executed.

Add the following to your `<build>` section:

```xml
<plugins>
  <plugin>
      <artifactId>maven-dependency-plugin</artifactId>
      <executions>
          <execution>
              <goals>
                  <goal>analyze-only</goal>
              </goals>
              <configuration>
                  <failOnWarning>true</failOnWarning>
              </configuration>
          </execution>
      </executions>
  </plugin>
</plugins>
```

The plugin will execute upon running e. g. `mvn verify` and report any violations.

There are two things worth noting in the code above:

1. The goal I'm using is `analyze-only`. This pretty much does the same as `analyze`, except it assumes the `test-compile` phase is already executed. `analyze-only` is intended for use in the build lifecycle, `analyze` is intended to run standalone.
2. The `failOnWarning` property is set to `true`. This means your **build will fail** if you have any violations. It's probably going to be an issue turning this property on for a big project where you might have a lot of violations, but I'd suggest enabling it once you've regained control over your dependencies to prevent unknown transitive dependencies to sneak into your project once again.

Now that you've hopefully removed a lot of unnecessary dependencies and declared all the ones you actually use, have another look at the [list of goals](https://maven.apache.org/plugins/maven-dependency-plugin/index.html) to see if there are any other sweet features you can make use of!
