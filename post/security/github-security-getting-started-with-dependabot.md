---
calendar: security
post_year: 2020
post_day: 2
title: "Github Security: Getting started with Dependabot"
ingress: Integrating security as a part of application development is desirable,
  but it is often forgotten or dismissed in practice. Dependabot is a Github
  feature that will help you keep all your dependencies invulnerable and
  up-to-date, and you can enable it in just a few clicks!
links:
  - title: About Dependabot security updates
    url: https://docs.github.com/en/free-pro-team@latest/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-dependabot-security-updates
authors:
  - Gaute Solbu Kleiven
---
During my years at university studying information security, I was taught about the importance of integrating security as a role in application development. The idea of security as a continuous process and a shared responsibility, rather than an isolated, fixed period of time with testing, performed by a security team, was imprinted in my brain. As I started working as a professional developer, I quickly experienced that security was given a low priority, both by my co-workers and myself. I do not believe it was a conscious decision to ignore security during development, but we had a tendency of estimating progress solely by looking at an application’s new features.

In my scenario, my colleagues and I were in agreement that we would benefit from integrating security in our development lifecycle. But how could this be achieved in a way that was not perceived as invasive or complicating to our day-to-day work? Obviously we could implement strict rules and enforce them in our build and deploy pipelines, but we were hesitant to bite off more than we could chew. If the changes were too dramatic, they might be considered overwhelming. Instead, we wanted to make small steps in the right direction, that would be easy to follow and build on over time. As we were already using Github in our everyday work life, enabling Github Security’s Dependabot was considered a good place to start.

## What is Dependabot?

Simply put, Dependabot is a robot designated to keep dependencies secure and up-to-date. How it works can be summarized in the following three steps:

1. Dependabot scans your dependency files for outdated or insecure dependencies.
2. Dependabot creates pull requests for dependencies that need an update.
3. You review, test and merge Dependabot’s changes.

Following Github's acquisition of Dependabot in may 2019, the feature was added natively to Github. With only a few clicks, Dependabot can easily be enabled from the Github dashboard, and help you keep your application’s dependencies up-to-date.

## **Enabling Dependabot**

Enough background information, let us talk about how to get started. Github's security settings can be configured for an [entire organization](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-organizations-and-teams/managing-security-and-analysis-settings-for-your-organization), applying to all of the organization’s repositories, or it can be configured [per repository](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-security-and-analysis-settings-for-your-repository). Which is the better option depends on your context. If you are the owner of your organization and it is desirable to enable the security features across all of its repositories, obviously it would be less time consuming to configure this on the organization level, rather than for each repository individually. However, if you are a part of a large organization with lots of teams and projects, enabling Dependabot on the repository level might be the only option.

In this example, we will enable Dependabot on a single repository. In your repository, there should be a button titled “Security”. Note that the security option is only visible to administrators, hence it will not be visible if you do not have the admin role in the repository. In the security overview, there is a row titled “Dependabot alerts”. If not already activated, there should be a button to “Enable Dependabot alerts”. Click it. You should now have three options that you can enable:

* Dependency graph
* Dependabot alerts
* Dependabot security updates

The dependency graph is a summary of the manifest and lock files stored in a repository. Enabling this feature is a prerequisite for the other options, as Dependabot requires access to the dependency graph in order to create alerts and updates.

![Security: Dependabot alerts](assets/screenshot-2020-11-16-at-19.59.16.png "Unresolved Dependabot alerts are listed in the repository.")

The second option, the alerts, allows Dependabot to notify you when it finds a weakness. This is probably the key feature that you are here for. When activated, the number of unresolved alerts is highlighted in the "Security" button that we previously clicked. On the security tab, the alerts highlighting currently outdated dependencies are listed. By clicking on an alert, you will find more details on it, such as a description of the vulnerability and in what version of the dependency it was patched.

By enabling the third option, the security updates, whenever a vulnerable dependency is discovered, Dependabot will try to fix it. If it is possible to upgrade the vulnerable dependency without disrupting the dependency graph of the repository, Dependabot will generate a pull request bringing the dependency up-to-date. The pull request is given a compatibility score indicating whether the update could cause breaking changes. The number is based on the percentage of tests in public repositories that passed when performing the same update.

Unfortunately, in my experience working with Dependabot, more often than not, it is unable to generate pull requests. This is often due to the vulnerable dependencies being indirect or transitive. The Dependabot documentation states that *“(...) security updates are triggered only for dependencies that are specified in a manifest or lock file. Dependabot is unable to update an indirect or transitive dependency that is not explicitly defined.”.* This means that even though Dependabot is able to perform some automatic updates, you should expect to perform most of the updates yourself - for now.

Even though Dependabot is unable to perform automated dependency updates most of the time, I would recommend enabling the feature. Occasionally it *will* be able to create the pull request for you, and you'll have saved yourself a couple of minutes that you can spend on something else.