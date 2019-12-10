---
calendar: opensource
post_year: 2019
post_day: 11
title: Gitmoji - Yay or Nay?
image: >-
  https://images.unsplash.com/photo-1542394731-170c9e6d914e?ixlib=rb-1.2.1&auto=format&fit=crop&w=3522&q=80
ingress: >-
  Version control software is an essential part of modern-day software developer
  practices, and Git is by far the most used system. However, the amount of
  commits, pull requests and activity in general may be huge, and reduce the
  value of the git history. The Open Source project Gitmoji is an standardized
  emoji guide for your commit messages. It lets you assign an emoji at the
  beginning of commits, and it even comes with an interactive client which lets
  you access the emojis in your command line. Though emojis is always fun, the
  question arises; is it just a gimmick or does it add any value? 


  Overview of emojis:
  [https://gitmoji.carloscuesta.me](https://gitmoji.carloscuesta.me/)
links:
  - title: Gitmoji
    url: 'https://gitmoji.carloscuesta.me/'
authors:
  - Marte Dybendal Gleditsch
---
## A picture says more than words

Gitmoji was born to make it easier for developers to identify the purpose or intention of others commits, simply by looking at the associated emoji. And not to mentioned, the colors and joy it brings to the commit history. 

![](/assets/skjermbilde-2019-12-04-kl.-16.07.04.png "A sample of Gitmojis")

## A small set of gitmojis make commits easy to identify

However, some emojis are more recognizable than others and the Gitmoji guide currently consists of 66 different emojis describing different intentions, some more useful than others. The 🐛emoji is easily recognized as a bug by most people, but will 🔥immediately signalize that code is removed? 

The learning process is an important factor with successful use of gitmoji. By selecting a small set of emojis, you and the contributors can rapidly recognize the emojis and their meanings, which is the whole idea with gitmoji in the first place. Some of the emojis are more general than others. I would recommend using those more general rather than the more detailed ones unless their usage is frequently and should be highlighted. What emojis that are selected should vary depending on technology and which stack you are working in. Frontend repositories would for example use 💄for UI changes, an emoji less relevant for backend development. 

## Forces you to make smaller and more specific commits

A positive outcome of using gitmoji is the fact that it forces you to think through the content and message of your commits to a larger extent. It might reduce the urge to combine completely different changes in the same commits, or even writing commit messages like `small fixes`. The purpose of commit messages to communicate context about a change to other developers working on that project, and indeed, to your future self. Gitmojis may contribute to making this history more understandable a long time after the changes were committed. 

![](/assets/skjermbilde-2019-12-10-kl.-19.43.00.png)

## May also be used for pull request titles

Originally, gitmoji is meant for assigning emojis to the commit messages. This may be suitable for large pull requests with many commits of different nature. However, small pull request with a defined objective may have few commits of similar nature. In this case, assigning gitmojis to the pull request title may be more relevant. From experience, doing both adds value. 

![](/assets/skjermbilde-2019-12-10-kl.-19.55.55.png)

## Summary

To summarize, gitmojis will add value to your development project if it is correctly used. Using a small set of emojis, suitable for your project, will make it easy for the contributors to recognize the intention of the commit. It may contribute to better and more precise commits, and last but not least it definitely adds joy and excitement.
