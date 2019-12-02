---
calendar: thecloud
post_year: 2019
post_day: 4
title: WIP Build and deploy your apps with Github Actions
image: >-
  https://images.unsplash.com/photo-1567792825717-84dcd666b715?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: >-
  This November 13th, Github Actions moved to General Availability making
  another mark of Githubs push towards eating more of the CI/CD ecosystem.




  In this article I'll show you how you can start building your code directly
  Github.
authors:
  - Andreas Heim
---
First off, let's talk a little bit about what Github Actions actually is! Github describes it like this: 

> GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want



Pretty sweet, right? The things that I'm usually using it for is build and deploy, and today we're going to focus on the how to start testing your app with Github Actions.



First off, we need an app. The app we're looking at today is a basic `Hello World` kotlin app, that we're building with Gradle.



You can follow along with the code at github.com/heim/gh-actions-example.
