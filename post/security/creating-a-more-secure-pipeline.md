---
calendar: security
post_year: 2020
post_day: 3
title: How secure is your build pipeline?
image: https://images.unsplash.com/photo-1559510981-10719ce4266a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: As developers, we usually use some sort of pipeline to build and deploy
  our code. Tools like Circle CI, Gitlab CI/CD or Github Actions are popular.
  Can your pipelines be a security vulnerability? Can you use your pipeline to
  create a more secure application?
description: build, pipeline, dependencies, github actions, snyk, owasp,
  jenkins, gitlab, circleci, repo-supervisor, git-secrets, truffleHog
authors:
  - Robert Larsen
---
Pipelines come in many shapes and variants. Usually, they print some kind of console output, which can be very useful when something goes wrong and we need to debug. However, this output might also be of great interest to an attacker. Especially if it happens to contain any credentials or other sensitive information, such as passwords or tokens for code repositories, container-image/package-registries, and so on. Such secrets are often placed in some kind of vault, a mechanism in the pipeline tools for storing secrets. Vaults are worthless if the pipeline print its secrets anyway. Do also take into consideration who has access to read the output from the pipeline. 

A good mindset is to consider every dependency as an attack vector. That includes dependencies the application has in runtime, during test, or when built. Of course, the amount of attack vectors should be as low as possible. But, we can not live in total isolation, and need to depend on something. The dependencies we need should be pinned to specific versions. That does also apply to container-images. These dependencies should be monitored continuously, to check that your dependencies does not have any known vulnerabilities.

Your pipeline should include a mechanism to check for vulnerable dependencies in an automated way. [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) is a tool for that purpose, and can be triggered by your pipeline. [Snyk](https://snyk.io) is also an alternative that is widely used, the same is Github Dependabot, which we talked about [yesterday](https://security.christmas/2020/2). Just as important as having the tools in place, you also need to establish routines on how to act when they report something is wrong. The value of such tools is very much reduced if you don't follow-up on their findings.

If you have automated build or deploy from your main-branch, make sure that pushing directly to that branch without going through a pull-request first is being rejected. Otherwise, that is a highway into your environments, and will let others run and deploy their code. If you have your code in a public repository, you should never let automated builds be triggered by opening a pull-request. That is basically the same as triggering on direct push. You should instead wait until the pull-request is merged by someone authorized to do so.

Applications usually have some sort of unit- or integration-tests, and these tests are usually run when the application is built. Thus, these tests is also running when your pipeline builds your code. A good idea is to have tests that verifies that authentication and authorization work as intended. You should also have tests that cover how the application handles invalid input. These tests should, as far as possible test the real implementation and cases. They should preferably not require the application to run in a special "local", "mock" or "test"-mode, disabling most of the security mechanisms. Running such tests in an automated way by a pipeline gives you lots of security-bang for the buck.

Even if we all know that we should keep credentials and other potentially sensitive data away from our source code, it ends up there from time to time anyway. The probability can be heavily reduced by enabling a pre-commit hook, that scans the code for sensitive data, before the code is committed. This puts more responsibility on the developers, demanding that they enable the hook on their own computers. While they definitely should do so, it is a good idea to also have a mechanism in the pipeline that will reject to build your code if it contains sensitive data. You can argue that it is too late if the pipeline detects it, as the code already will have been committed and pushed. But, it will give you a chance to act - remove remove the sensitive data and re-write the commit history. There are a few tools available, that you can use to scan for sensitive data. [Repo-supervisor](https://github.com/auth0/repo-supervisor), [git-secrets](https://github.com/awslabs/git-secrets) and [truffleHog](https://github.com/dxa4481/truffleHog) are worth checking out.

This short text is of course not the complete, definitive guide on how to build a secure pipeline. But, we hope it can make you reflect a bit upon your own pipelines, and the pipelines you use, to see if you can make some improvements.