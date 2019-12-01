---
calendar: opensource
post_year: 2019
post_day: 1
title: How to contribute to Open source
image: >-
  https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  We think Open Source is such an important part of a developer’s life that
  we’ve devoted an entire advent calendar to the subject! For a lot of
  developers, the thought of putting your code or ideas out there for the whole
  community to see, can be daunting. Once you get the hang of it and get more
  comfortable though, it has a tendency to drag you in. 


  Let's start by going through your first steps towards your first contribution
  together.
links:
  - title: Firsttimersonly
    url: 'https://www.firsttimersonly.com/'
  - title: Search GitHub for good first issues
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

Here's a few ideas on what typically are low-hanging fruits:

-   fix errors in the repository's documentation
-   write missing documentation
-   fix spelling in code or in documentation
-   help out on troubleshooting other people's issues
-   give feedback on pull requests

### Before you start working

Look for the *README* or the *CONTRIBUTING* file first, you'll usually find those at the repository's root folder. 

The maintainers might have a set of requirements that you should fulfill before you start working. Maybe its signing a Contributor License Agreement [like the .NET Foundation has](https://cla.dotnetfoundation.org/) or following steps for testing your changes before you create the pull request. 

### Work on your issue

Once you've found an issue you're comfortable working on, [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository to your account and [clone your fork](https://git-scm.com/docs/git-clone) to your local machine.

Choose a [Git-workflow](https://bocoup.com/blog/git-workflow-walkthrough-feature-branches) that suits your preferred way of working on Git and start your work!

When picking an issue and committing time to work on it, it's good practice to write a comment on the issue stating that you're keen on helping out. This lets the repository maintainers know that someone's working on it, they might even assign you to the issue 😀

_Tip: refer your pull request and issue by using `#<issue/pull request id>`. This generates a link to the issue/pull request._

### Create a pull request

Once your work is done and you've pushed your changes on your branch to your fork on GitHub, you are ready to create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). This tells the maintainers that your work is ready to be reviewed and your code merged from your branch to the **master** branch.

Pay attention to the pull request and any build steps it might trigger. If the pull request build fails, you'll need to fix your code so that the build succeeds before continuing.

Check up on your GitHub notifications as you might get comments and need to adjust your work, based on the feedback you'll receive from the maintainers.

### Issue fixed and closed

Once the maintainers have completed your pull request, your work is done! On the issue's page you'll see that your pull request has been merged and marked as complete.

Congratulations on your first Open Source contribution! Well done! 🎉👏
