---
calendar: kotlin
post_year: 2019
post_day: 8
title: Anti-bikeshedding with ktlint
ingress: >-
  How the code is formatted can be a hot topic, but it's a solved problem - just
  use a linter and/or formatter! In this article, I'll introduce you to a linter
  and formatter for your Kotlin codebase.
authors:
  - Thomas Oddsund
---
When you have two or more people working on the same codebase there is bound to be disagreements. It might be about larger things such as the architecture or what framework to use. It might be about smaller things, like the number of spaces used for indentation or the order of modifiers.

Meet [ktlint](https://github.com/pinterest/ktlint), ''an anti-bikeshedding Kotlin linter with built-in formatter'', which is here to help you with the small things!

## Wait, bikeshedding? 🙋

What, you haven't heard of this term before? What about [Parkinson's law of triviality](https://en.wikipedia.org/wiki/Law_of_triviality)? No? I hadn't neither!

In short, the term bikeshedding stems from the aforementioned 'law' which argument that ''members of an organization give disproportionate weight to trivial issues''. Here, an example.

> While planning to build a nuclear power plant, there is an allocation meeting. In this meeting, large issues such as the size of the workforce and the budget for the containment vessels are passed without much hassel as there are just a few experts fronting each issues. However, when the small issue of a bikeshed is raised, everyone has an opinion, so the issue drags on and ends up claiming a larger part of the meeting then the large issues combined.

For a full version, I recommend the blog post [Bikeshedding](https://exceptionnotfound.net/bikeshedding-the-daily-software-anti-pattern/). Just remember the gist; we tend to spend too much time on trivial things, especially compared to time spent on larger things.

So in other words, an ''anti-bikeshedding'' tool is a tool which aims to tackle the small and trivial issues, so that you won't have to!

## So ktlint is for the small issues? 🤔

Yes it is! More specific, it's an opinionated tool that performs linting and formatting of your Kotlin source code, based on the [official style guide](https://kotlinlang.org/docs/reference/coding-conventions.html).
Other similar tools are ESlint(javascript), Prettier(javascript), gofmt(Go) and Black(python).

ktlint can perform two actions; it can check kotlin source files, and it can format the source files. When checking the source files it will report any errors it encounters in the files, and the developer will have to fix it. Performing the formating action however, will fix any identified flaw in place in the file, leaving nicely formatted source files in place.

## Getting started in two simple steps

It's quick and easy to get started!

1. Download ktlint from their [github releases](https://github.com/pinterest/ktlint/releases) page
2. Run it as a jar file with `java -jar ktlint`.

Alternatively, if you're on Linux or macOS, make the downloaded file executable(`chmod +x ktlint`) and call it directly with `./ktlint`. You can also install ktlint with Linuxbrew and Homebrew.

By default, calling ktlint without arguments will perform the check action on all kotlin files in the current folder and subfolders. To specify directories, simply pass one or more ant-style paths(e.g. "src/**/*.kt"). To make ktlint format the source files, pass the `-F`/`--format` flag.

There's also several other flags and triggers, such as what style to print the reports in or to configure Intellij to use ktlint-compatible style(`ktlint applyToIDEAProject`). Call `ktlint --help` to learn more!

## Usage in build automation tools

Calling ktlint works, but will you always remember to do it? I won't, so let's look into how to integrate it into our build tools.

### Maven

To keep the configuration somewhat short, the example below will use the dedicated plugin mentioned in the ktlint github documentation. This will give you the self-explanatory commands `mvn ktlint:check` and `mvn ktlint:format`, as well as `mvn ktlint:ktlint` to generate a report containg the result of the check.

Note also that we hook it into the verify phase of the build, but one could be even stricter and run it in the validate phase if one so wishes. If you want to configure ktlint manually, just follow the example listed in their github repository.

```xml
<build>
  <plugins>
    ...
    <plugin>
        <groupId>com.github.gantsign.maven</groupId>
        <artifactId>ktlint-maven-plugin</artifactId>
        <version>1.2.3</version>
        <executions>
            <execution>
            <id>check</id>
            <phase>verify</phase>
            <goals>
                <goal>check</goal>
            </goals>
            </execution>
        </executions>
    </plugin>
    ...
  </plugins>
</build>
```

### Gradle

There's two Gradle plugins mentioned in the github documentation for ktlint. For this example, we have elected to use [org.jlleitschuh.gradle.ktlint](https://github.com/jlleitschuh/ktlint-gradle), but the other seems just as good. By adding it to the plugins block, we get access to the `gradle ktlintCheck` and `gradle ktlintFormat` tasks. The former task is also made as a dependency to the general `check` task of gradle, so that it becomes a natural part of the verification process.

```gradle
plugins {
    id("org.jlleitschuh.gradle.ktlint") version "9.1.1"
}
```

## And that's how we got rid of bikeshedding

Armed with ktlint, you can now put an end to style and format discussion. You'll also have one less thing to worry about when looking over pull requests, leaving you with more time to take on the larger and more important things happening in your codebase or at your workplace.
