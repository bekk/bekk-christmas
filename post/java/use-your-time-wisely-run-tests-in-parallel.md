---
calendar: java
post_year: 2019
post_day: 14
title: Use your time wisely! Run tests in parallel
image: >-
  https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80
ingress: >-
  Have you ever been annoyed that your tests take an incredibly long time? I
  have. A simple trick can save time by running (almost) all your tests in
  parallel.
links:
  - title: Read more about parallel execution
    url: >-
      https://junit.org/junit5/docs/current/user-guide/#writing-tests-parallel-execution 
authors:
  - Ole Reidar Holm
---
Sometimes tests can be a pain in the ass. I’ve used countless amount of hours waiting for slow tests, which in the end slows my progress. After an extensive session of searching the Internet, I found one cool experimental feature in JUnit5 that have saved me a lot of time. 

By default, JUnit tests are run sequentially in a single thread. I like to compare that to a traffic jam caused by only one lane to be free during rush hours. If they decide to open more lanes, more traffic can pass through and the jam will eventually end. 

Running tests in parallel - for example, to speed up execution is quite easy. In JUnit 5, parallel test execution is available as an opt-in feature and it is easy to configure. I’ll show you how. 

You need these dependencies:
```
plugins {
    id 'java'
    id 'eclipse' // optional (to generate Eclipse project files)
    id 'idea' // optional (to generate IntelliJ IDEA project files)
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation('org.junit.jupiter:junit-jupiter:5.5.2')
}

test {
    useJUnitPlatform()
    testLogging {
        events "passed", "skipped", "failed"
    }
}

```

*Are you using maven? Don’t worry!* [Use this link](https://github.com/junit-team/junit5-samples/tree/r5.5.2/junit5-jupiter-starter-maven) 

Alright! Now we have the dependencies in order and it’s time to get our hands dirty. To enable parallel test execution you will have to create a file called `junit-platform.properties`. Add this file to your project’s test resources folder (usually `src/test/resources`).

The file should contain at least one line:
```
    junit.jupiter.execution.parallel.enabled=true
```
*The line tells JUnit to enable parallel test execution. The desired parallelism will be equal to the number of available processors/cores.*

If you run your tests now, you should see that JUnit has discovered your new configuration file (look for  `INFO: Loading JUnit Platform configuration parameters from classpath resource [...]` in your console), but the tests still run sequentially. This is because we haven’t told JUnit which tests to run concurrent. 

Luckily for us there is a simple solution for that! Annotate a test class with `@Execution(ExecutionMode.CONCURRENT)`. This annotation tells JUnit to run the test in parallel. 

I hope you learnt something useful. It does not solve all your time consuming problems, but at least it is a step in the right direction Good luck!

