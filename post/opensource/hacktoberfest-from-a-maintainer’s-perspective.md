---
calendar: opensource
post_year: 2019
post_day: 10
title: Hacktoberfest from a maintainer’s perspective
ingress: >
  Hacktoberfest provides a great opportunity for people to win a t-shirt. But it
  is also a great way for maintainers of open source code to get some help with
  their issues. Here are some of my experiences from being a maintainer this
  October.
links:
  - title: Our Hacktoberfest Christmas Article
    url: 'https://opensource.christmas/2019/6'
  - title: Hacktoberfest Official Website
    url: 'https://hacktoberfest.digitalocean.com'
authors:
  - Mats Byrkjeland
---
First of all, if you don't know what Hacktoberfest is, get a quick introduction here: https://opensource.christmas/2019/6

The main thing I learned from trying to be a maintainer during Hacktoberfest is that Hacktoberfest is really popular. Most of the issues I created were picked after few minutes. The power of tagging the issues with "hacktoberfest" was truly remarkable. I had to laugh when two people asked for the same issue, and not long after a third person submitted a pull request.

I think that defining issues with a small scope and no (or little) requirement of understanding the domain of the application is important for having success as a maintainer during hacktoberfest. I tried to follow these principles and had success with issues like "Initialize TypeScript", "Rewrite this script from bash to Node.js" and "Rewrite this class component into a function component". These kinds of issues should be possible to do "mechanically" without necessarily understanding much of what the app really does.

Things might go wrong, and I experienced this. Through Hacktoberfest I got help with rewriting some React class components into being function ones. I reviewed the code, it looked good to me, and I merged it. The app was configured to deploy automatically when the master branch was updated. And of course this PR had more than a few flaws, and quite a lot of time was spent fixing it. Having some tests might be a good idea when accepting PRs from the community. And more importantly: no auto-deploy to production. :face_palm: There were also some PRs that really were not following our team’s preferred code style. Often the easiest thing to do was just merge it and fix it ourselves. But using tools like ESLint and Prettier with strict configurations can be very valuable to make it easier for outsiders to write the code you prefer.

The [Hacktoberfest official pages](https://hacktoberfest.digitalocean.com/details) also have some tips for maintainers to get the most out of Hacktoberfest. I did not know about this before after October, but make sure to check out the webinars there next year.

Trying out being an open source maintainer during Hacktoberfest was really fun. People are very active and helpful. It comes at a cost though. Reviewing (potentially bad) pull requests, writing well-defined issues and maintaining good README and CONTRIBUTING guides will take some time. But man, is it rewarding and fun! I can’t wait for next October.

Things I learned, summed up:
* Hacktoberfest is very popular
* Write well-defined, small issues
* Create issues that don't require domain knowledge
* Use GitHub tags (hacktoberfest, good first issue, help wanted)
* Assign people to issues if they request one.
* Be ready to receive contributions. Have a good README, maybe some tests, a build step that lints and tests.
