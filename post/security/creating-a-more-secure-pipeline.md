---
calendar: security
post_year: 2020
post_day: 3
title: How secure is your build pipeline?
image: https://images.unsplash.com/photo-1559510981-10719ce4266a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: Many of us has pipeline to build and deploy our applications, and tools
  like Circle CI, Gitlab CI/CD or Github Actions are popular. Have you thought
  about your pipelines might have security vulnerabilities?
authors:
  - Robert Larsen
---
Pipelines usually print some kind of console output, which can be very useful when something goes wrong and we need to debug. However, this output might also be of great interest to an attacker. Especially if it happens to contain any credentials or other sensitive information. This can typically be passwords or tokens needed to access code repositories, container-image/package-registries and so on. Such secrets are often placed in some kind of vault, a mechanism in the pipeline tools for storing secrets, but that is worthless if the pipeline prints it anyway. Do also take into consideration who has access to read the output from the pipeline. 

A good mindset is to consider every dependency as an attack vector. That includes dependencies the applications has in runtime, during test, or when built. Of course, the amount of attack vectors should be as low as possible. But, we can not be totally isolated, and need to depend on something. The dependencies we need should be pinned to specific versions. That does also apply to container-images. These dependencies should be monitored continuously, to check that your dependencies does not have any known vulnerabilities.

Your pipeline should include some a mechanism to check for vulnerable dependencies in an automated way. OWASP Dependency-Check is a tool for that purpose, and can be triggered by your pipeline. Snyk is also an alternative that is widely used, the same is Github Dependabot which we talked about [yesterday](https://security.christmas/2020/2). Just as important as just having the tools, you also need to establish routines on how to act when they report something is wrong. 

If you have automated build or deploy from your main-branch, make sure that pushing directly to that branch without going through a pull-request first is being rejected. Otherwise, that is a highway into your environments, and will let others run and deploy their code. If you have your code in a public repository, you should never let automated builds be triggered by opening a pull-request. That is basically the same as triggering on direct push. You should instead wait until the pull-request is merged by someone authorized to do so.

Applications usually have some sort of unit- or integration-tests, and these tests are usually run when the application is built. Thus, these tests is also running when your pipeline builds your code. A good idea is to have tests that verifies that authentication and authorization works as intended. You should also have tests that covers how the application handles invalid input. These tests should, as far as possible test the real implementations and cases. They should preferably not require the application to run in a special "local", "mock" or "test"-mode, disabling most of the security mechanisms. To have such tests run in an automated way by a pipeline will give you lots of security-bang for the buck.

Even if we all know that we should keep credentials and other potentially sensitive data away from our source code, it ends up there from time to time anyway. The probability can be reduced by enabling a pre-commit hook 

Not directly security-related, but validate you are compatible with the licenses in your dependencies.

Certificate renewal

Secrets

How to prevent credentials and other potentially sensitive data are ending up in the source code.