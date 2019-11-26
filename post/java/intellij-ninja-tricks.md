---
calendar: java
post_year: 2019
post_day: 10
title: IntelliJ Ninja Tricks
ingress: >-
  As a developer I spend most of my time at work in my IDE, for me that IDE is
  IntelliJ IDEA. During these years I have learned a few tricks, some useful
  keyboard-shortcuts and found a few plugins that have helped me be more
  effective in my day-to-day work. I want to share these lessons with you in the
  form of 4 IntelliJ ninja tricks!
authors:
  - Ketil S. Velle
---
First and foremost, learning some _**keyboard shortcuts**_ will yield great awards. And the good thing in IntelliJ is that to start off you only need one: `CMD + SHIFT + A (`find actions)**\*.** This keyboard shortcut of shortcuts gives you access to all possible actions within IntelliJ, and their corresponding keyboard shortcut!

The second thing I love to use in IntelliJ is _**Scratch files**_ (`CTRL + SHIFT + N`) . I use these as temporary notes or, after choosing a fitting extension, as a quick way to prettify the json or xml structure I want to look at. These files will not be saved as part of your project, and will disappear as you close them. This way you do not have to worry that they end up in your git-repository by mistake.

My third ninja-trick is concerned with debugging. If you have to test a branch of your code, and want a specific method to return a certain value you can set a breakpoint and use an action called _**Force return**_. Using the find actions from my first tip, this is easy to find. Great for those nutty corner cases!

Lastly I want to recommend some great _**plugins**_ that exists in the marketplace:

* Presentation Assistant: Every shortcut you use is shown in a green line at the bottom of the screen - great for pair programming and learning each other new shortcuts!
* Key Promoter X: Helps you to learn keyboard shortcuts for all the things you are using your mouse to do. It tracks what you use keyboard shortcuts to do and what you are missing out on.
* SonarLint: If you use sonar in your ecosystem, this plugin is perfect in order to get instant feedback while you program instead of getting these buildtime at your build server
* EsLint: If you are running EsLint this is great to get early feedback on linting errors on your code.

These are my four ninja tricks to get the most out of IntelliJ - what are yours?

- - -

**\*** Keep in mind that the default keyboard shortcuts may vary from Mac, Linux and Windows. Check them out in the Keymap reference in IntelliJ (Also easily available in find actions) or online here:
<https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html>
