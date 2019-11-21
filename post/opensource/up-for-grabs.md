---
calendar: opensource
post_year: 2019
post_day: 3
title: Automatic deploy (chatops) with @Rultor
image: 'https://imgur.com/gnAbkfu.png'
ingress: >
  The discussion of a automatic release was started for many years ago, and
  there are several options for how to do this (None mentioned, none forgotten).
  Then I came across @Rultor by accident on twitter.
links:
  - title: NoCommons
    url: 'https://github.com/bekkopen/NoCommons/'
  - title: Rultor
    url: 'https://www.rultor.com/'
authors:
  - Eivind Bergstøl
---
[no.bekk.bekkopen:NoCommons](https://github.com/bekkopen/NoCommons) is a small library for validating, generating and manipulating data typical for norwegian domains. SSN, org-nr, names etc. And when maintaining a small, quite static, open source library like this on GitHub, we need a smooth automatic release-path that is easy and fast to use when a release has to be published. Maybe I changed my computer since last time and need to restore GPG-keys, or even worse, generate new keys and distribute them. And when time goes by, a new maintainer steps up and need to release. How was that done again?

[@Rultor](http://rultor.com) is a open source robot living on GitHub. [Yegor256](https://www.yegor256.com) is the maintainer of this robot and we all can use it. Just talk to [@Rultor](http://rultor.com) in an GitHub-issue and it will tell you what to do to get started. This is what I did:

* Change parent-pom of project to com.jcabi:parent (not necessary, but quite convenient)
* Encrypt `setting.xml`, private- and public-key (GPG) with [@Rultor](http://rultor.com) and commit them to NoCommons
* Create _.rultor.yml_ and commit to NoCommons with me as _commanders_ and _architect_

[@Rultor](http://rultor.com) need write-access to the repository to publish tags and GitHub-releases, so I added it as a collaborator in GitHub.

Now I can comment this in an issue after merging a PR:

``@rultor release, tag=`0.9.0` ``

[no.bekk.bekkopen:nocommons:0.9.0](https://github.com/bekkopen/NoCommons/releases/tag/0.9.0)

Win!

So now, lets look at GitHub Actions next…
