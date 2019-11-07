---
calendar: opensource
post_year: 2019
post_day: 1
title: How to contribute to Open source
image: /assets/photo-1454942901704-3c44c11b2ad1.jpg
ingress: >-
  We think Open source is such an important part of a developer’s life that
  we’ve devoted an entire advent calendar to the subject! For a lot of
  developers, the thought of putting your code or ideas out there for the whole
  community to see, can be daunting. Once you get the hang of it and get more
  comfortable though, it has a tendency to drag you in. Let's start by going
  through your first steps towards your first contribution.
links:
  - title: Firsttimersonly
    body: A site that helps you find your first issue.
    url: 'https://www.firsttimersonly.com/'
  - title: Search GitHub for good first issues
    body: The URL opens a GitHub search on open issues marked as 'good-first-issue'.
    url: >-
      https://github.com/search?q=label%3Agood-first-issue&state=open&type=Issues
authors:
  - Henrik Walker Moe
---
## Getting started

### Using Git and GitHub

GitHub is a platform for hosting and collaborating on Git-repositories. You should have a basic understanding of [Git](https://git-scm.com/) in order to contribute.

### Create an account on GitHub

In order to contribute to repositories you'll need a GitHub account. [Create an account](https://github.com/join) if you don't have one already.

### Look for a good first issue

A great way to get started is to look for issues by using [www.firsttimersonly.com](https://www.firsttimersonly.com/) or [searching GitHub for issues](https://github.com/search?q=label%3Agood-first-issue&state=open&type=Issues) marked as **good-first-issue**.

Here's a few ideas on what typicaly are low-hanging fruits:

* fix errors in the repository's documentation
* write missing documentation
* fix spelling in code or in documentation
* help out on troubleshooting other people's issues
* give feedback on pull requests

### Work on your issue

Once you've found an issue you're comfortable working on, [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository to your account and [clone your fork](https://git-scm.com/docs/git-clone) to your local machine. 

Choose a [Git-workflow](https://bocoup.com/blog/git-workflow-walkthrough-feature-branches) that suits your preferred way of working on Git and start coding!

When picking an issue and committing time to work on it, it's good practice to write a comment on the issue stating that you're keen on helping out. This let's the repository maintainers know that someone's working on it, they might even assign you to the issue 😀

_Tip: reference your pull request and issue by using `#<issue/pull request id>`. This generates a link to the issue/pull request._

### Create a pull request

Once your work is done and you've pushed your changes on your branch to your fork on GitHub, you are ready to create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). This tells the maintainers that your work is ready to be reviewed and your code merged from your branch to the **master** branch.

Pay attention to the pull request and any build steps it might trigger. If the pull request build fails, you'll need to fix your code so that the build succeeds before continuing. 

Check up on your GitHub notifications as you might get comments and need to adjust your work, based on the maintainer's feedback.

### Issue fixed and closed

Once the maintainers have completed your pull request, your work is done! On the issue's page you'll see that your pull request has been merged and marked as complete.

Congratulations on your first Open source contribution! Well done! 🎉👏
