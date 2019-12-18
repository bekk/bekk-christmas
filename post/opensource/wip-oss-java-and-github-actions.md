---
calendar: opensource
post_year: 2019
post_day: 21
title: OSS Java and Github actions
ingress: >-
  Github actions is the new kid on the block. Lets look at a first try in
  implementing build and release-functionality.
links:
  - title: Digipost open source java
    url: 'https://github.com/digipost?utf8=%E2%9C%93&q=&type=public&language=java'
  - title: Action maven publish
    url: 'https://github.com/digipost/action-maven-publish'
  - title: Digipost open super pom
    url: 'https://github.com/digipost/digipost-open-super-pom'
authors:
  - Eivind Bergstøl
---
At Digipost we several public open source projects that we manage and release on a quite regular basis. We need to simplify the release process for security, release ease and easier onboarding of developers.

Lets assume you have all you need to deploy to Maven central. In addition you need a configured `nexus-staging-maven-plugin` or you can use [this parent pom](https://github.com/digipost/digipost-open-super-pom) so that the artifact is released without you needing to log in to [oss.sonatype.com](http://oss.sonatype.com) and click close and release.

I will not give a deep explaination of what github actions is. But what is nice to know is that it can run docker images on linux. With that we can setup an environment that can execute maven. Being open source and all, we forked a [nice action](https://github.com/samuelmeuli/action-maven-publish) allready in progress and modified it into [the action we need](https://github.com/digipost/action-maven-publish). Github, at this time of writing, does neither have organization secrets or the ability to add repository secrets with api. We wanted to save time and have only one secret pr repository in stead of 4. In addition we wanted to deploy both a SNAPSHOT and a release with the same action. In addition we want version set automatically from either tag-name of branch-name.

Now, we need to call this from a workflow added to the repoitory. [We made two workflows pr project](https://github.com/digipost/digipost-html-validator/tree/master/.github/workflows): build.yml and release.yml 

For every push to all branches, we build the project on both java 1.8 and 11. In addition we build a version on java 11 and deploy this to Sonatype snapshot-repository.
For every tag (github-release) we will build a release and this is published directly to maven central.
