---
calendar: opensource
post_year: 2019
post_day: 3
title: ChatOps bekkopen/NoCommons
image: screenshot-2019-11-18-at-10.04.38.png
ingress: >-
  Releasing to Sonatype is for some a daunting task. You need gpg-keys generated
  and distributed, username and password stored on a developers computer and a
  bit of maven knowhow. But with @Rultor til goes away!
links:
  - title: NoCommons
    url: 'https://github.com/bekkopen/NoCommons/'
  - title: Rultor
    url: 'https://www.rultor.com/'
authors: []
---
When maintaining a small, quite static, open source library on github, we need a smooth automatic release-path that is easy and fast to use when a release has to be published. Maybe I changed my computer since last time and need to restore gpg-keys, or even worse, generate new keys and distribute them. And when time goes by, a new maintainer steps up and need to release. How was that done again?

The discussion of a automatic release was started for many years ago, and there are _several_ options for how to do this (None mentioned, none forgotten). Then I came across @Rultor by accident on twitter.

[@Rultor](http://rultor.com) is a open source robot living on github. [Yegor256](https://www.yegor256.com) is the maintainer and hoster of this robot and we all can use it. Just talk to @rultor in an issue and it will tell you what to do to get started. This is what I did:

* Change parent-pom of project to com.jcabi:parent (not necessery, but quite convenient)
* Encrypt setting.xml, private- and public-key (gpg) with rultor and commit them to NoCommons
* Create .rultor.yml and commit to NoCommons with me as `commanders` and `architect`

Rultor need write-access to the repository to publish tags and gh-releases, so I added it as a collaborator in github. This last step was problematic, since Rultor did not accept my invitation. It stayed like that for I don't know how long. But ut resolved it self at some point in time.

Now I can comment this in an issue after merging a PR:

``` @rultor release, tag=\`0.9.0\` ```

[no.bekk.bekkopen:nocommons:0.9.0](https://github.com/bekkopen/NoCommons/releases/tag/0.9.0)

Win!
