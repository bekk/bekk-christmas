---
calendar: kotlin
post_year: 2019
post_day: 8
title: Anti-bikeshedding with ktlint
---
# One less worry with automatic formatting

When you have two or more people working on the same codebase, there is bound to be disagreements. It might be about larger things such as the architecture or what framework to use. It might be about smaller things, like the number of spaces used for indentation or the order of modifiers.

Meet [ktlint](https://github.com/pinterest/ktlint), ''an anti-bikeshedding Kotlin linter with built-in formatter'', which is here to help you with the small things!

## Wait, bikeshedding? 🙋

What, you haven't heard of this term before? What about [Parkinson's law of triviality](https://en.wikipedia.org/wiki/Law_of_triviality)? No?

Me neither! In short, the term bikeshedding stems from the aforementioned 'law' which argument that ''members of an organization give disproportionate weight to trivial issues''. Here, an example.

> While building a nuclear power plant, large issues such as the size of the workforce and the budget for the containment vessels are passed without much hassel as there are just a few experts fronting each issues. However, when the small issue of a bikeshed is raised, everyone has an opinion, so the issue drags on and ends up claiming a larger part of the meeting then the rest of the large issues combined.

For a full version, I recommend the blog post [Bikeshedding](https://exceptionnotfound.net/bikeshedding-the-daily-software-anti-pattern/). Just remember the gist; we tend to spend too much time on trivial things, especially when we compare it to larger things.

So in other words, an ''anti-bikeshedding'' tool is a tool which aims to tackle the small and trivial issues, so that you won't have to!

## So what is ktlint? 🤔

It's an opinionated tool that performs linting and formatting of your Kotlin source code, based on the [official style guide](https://kotlinlang.org/docs/reference/coding-conventions.html).
Other similar tools are Prettier(javascript), eslint(javascript), gofmt(Go) and black(python).

ktlint can perform two actions; it can check kotlin source files, and it can fix the source files. When checking the source files, it will report any errors it encounters in the file, and it will be up to the developer to fix it. Performing the fixing action however, will fix any identified flaw in place in the file, leaving fixed source files in place.

## Getting started in two simple steps

It's quick and easy to get started!

1. Download ktlint from their [github releases](https://github.com/pinterest/ktlint/releases) page
2. Run it as a jar file with `java -jar ktlint`.

Alternatively, if you're on Linux or macOS, make the downloaded file executable(`chmod +x ktlint`) and call it directly with `./ktlint`. You can also install ktlint with Linuxbrew and Homebrew.

By default, ktlint will only perform the check action on all kotlin files in the current folder and subfolders. To specify directories, simply pass one or more ant-style paths(e.g. "src/**/*.kt"). To make ktlint fix the source files, pass the `-F`/`--format` flag.

There's also several other flags and triggers, such as what style to print the reports in or to configure Intellij to use ktlint-compatible style(`ktlint applyToIDEAProject`). Call `ktlint --help` to learn more!

## Usage in build automation tools

Calling ktlint manually is one way to do it, but it's even better if your build tools can do it for you.

### Maven

Maven can be overly verbose. To keep the configuration somewhat short, the example below will use the plugin mentioned in their github documentation. This will give you the commands `mvn ktlint:check` and `mvn ktlint:format`.

SI NOE OM HVILKE LIFECYCLES SOM BLIR SATT OPP

```xml
<build>
  <plugins>
    ...
    <plugin>
      <groupId>com.github.gantsign.maven</groupId>
      <artifactId>ktlint-maven-plugin</artifactId>
      <version>1.2.3</version>
    </plugin>
    ...
  </plugins>
</build>
```

### Gradle

### Andre byggeverktøy ?
