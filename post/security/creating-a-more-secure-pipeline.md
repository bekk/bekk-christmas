---
calendar: security
post_year: 2020
post_day: 3
title: Creating a more secure pipeline
image: https://images.unsplash.com/photo-1559510981-10719ce4266a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: Many of us use a pipeline to build and deploy our applications. They
  can be build using tools like Jenkins, CircleCI or Github Actions. Have you
  thought about that your pipelines can have security vulnerabilities? We will
  share some recommendations so you can create more secure pipelines.
authors:
  - Henrik Walker Moe
  - Tjerand Silde
  - Martin Strand
---
Make sure the pipeline does not print any credentials or other sensitive information in its console output.

Run automated tests testing application security.

Use specific versions of every dependency, including containers. Make sure the versions you use are not outdated and contain vulnerabilities. 

Have routines on how to ensure that what is supposed to end up in production actually does, and somehing not going there doesn't. Don't trigger builds automatically on pull-requests on public repositories.

If you have automated deploy from your main-branch, make sure that pushing directly to that branch without PR is rejected.

Not directly security-related, but validate you are compatible with the licenses in your dependencies.

Check for outdated dependencies

Certificate renewal

Secrets

How to prevent credentials and other potentially sensitive data are ending up in the source code.