---
calendar: thecloud
post_year: 2019
post_day: 4
title: WIP Getting started with Github Actions
image: >-
  https://images.unsplash.com/photo-1567792825717-84dcd666b715?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: >-
  This November 13th, Github Actions moved to General Availability making
  another mark of Githubs push towards eating more of the CI/CD ecosystem.




  In this article I'll show you how you can start testing your code directly in
  Github.
authors:
  - Andreas Heim
---
First off, let's talk a little bit about what Github Actions actually is! Github describes it like this: 
> GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want

Pretty sweet, right? The things that I'm usually using it for is build and deploy, and today we're going to focus on how to start testing your app with Github Actions.

First off, we need an app. The app we're looking at today is a basic `Hello World` Java app, that we're building with Gradle.

You can follow along with the code in [this repo](https://github.com/heim/gh-actions-example).

## Take action

To get your app tested with Github Actions is actually quite simple. You need to place a YAML-file in the `.github/workflows` directory in your app, and then push your code and Github will run your workflow automatically.


```
name: Test
on: [push]
jobs:
  build:
    name: Run tests with Gradle
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Set up JDK 12
      uses: actions/setup-java@v1
      with:
        java-version: 12
    - name: Test
      run: ./gradlew --no-daemon test
```


For our example app, there is only a few steps that need to be run.

First we must tell Github Actions to check out our source code, then we must set up Java, and finally we can run our tests with Gradle. Luckily Github provides us with some helpful tools, and the runners contain a [healthy list](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/software-installed-on-github-hosted-runners) of pre-installed software.

That's actually all that is to it!

## What's in it for me?

So you might ask yourself why you should care about Github Actions? I find that the most useful thing about it is to gather all of your building, testing and deployment within the same tool. Github Actions doesn't provide the polished user experience and speedy builds that for instance [CircleCI](https://circleci.com) can give you, but in return it is tightly integrated with the different [events](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows) that is triggered when you push, deploy, open issues, close pull requests, etc.

