---
calendar: security
post_year: 2020
post_day: 3
title: Creating a more secure pipeline
image: https://images.unsplash.com/photo-1559510981-10719ce4266a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: Many of us has pipeline to build and deploy our applications, and tools
  like Circle CI, Gitlab CI/CD or Github Actions are popular. Have you thought
  about your pipelines might have security vulnerabilities?
authors:
  - Robert Larsen
---
1. Console output

   Pipelines usually print some kind of console output, which can be very useful when something goes wrong and we need to debug. However, this output might also be of great interest to a potential attacker. Especially if it happens to contain any credentials or other sensitive information. This can typically be passwords or tokens needed to access code repositories, image/package-registries and so on. Such secrets are often placed in some kind of vault, but that is worthless if the pipeline prints it anyway. Do also take into consideration who has access to read the output from the pipeline. 
2. Check for outdated dependencies



Run automated tests testing application security.

Use specific versions of every dependency, including containers. Make sure the versions you use are not outdated and contain vulnerabilities. 

Have routines on how to ensure that what is supposed to end up in production actually does, and somehing not going there doesn't. Don't trigger builds automatically on pull-requests on public repositories.

If you have automated deploy from your main-branch, make sure that pushing directly to that branch without PR is rejected.

Not directly security-related, but validate you are compatible with the licenses in your dependencies.

Certificate renewal

Secrets

How to prevent credentials and other potentially sensitive data are ending up in the source code.