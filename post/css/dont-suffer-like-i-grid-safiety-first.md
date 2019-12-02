---
calendar: css
post_year: 2019
post_day: 8
title: Don't suffer like I Grid - SafIEty first
image: >-
  https://images.unsplash.com/photo-1565548506122-24cf4665ece4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2110&q=80
ingress: "Many developers hesitate when it comes to CSS Grid. A common argument against it is that it's not supported by all browsers, but that is not true! \U0001F624"
links:
  - title: Feature queries @supports
    url: 'https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/ '
  - title: CSS Grid in IE and Autoprefixer
    url: 'https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/ '
  - title: 'End of IE11 support countdown and informative links '
    url: 'https://death-to-ie11.netlify.com/'
authors:
  - My Thao Nguyen
---
Grid is fully supported by all browsers except Internet Explorer.  Well, at least partially. Partially because IE10 and IE11 supports an older specification of CSS Grid syntax. Thus, some Grid syntax will work fine while newer properties will fail.

## Autoprefixer will fix! 

This tool is a PostCSS plugin to parse CSS and will add necessary CSS prefixes to the CSS rules. To see how it works, check out their [online tool](https://autoprefixer.github.io/).

They have a whole section informing about using Autoprefixer for Grid layout in IE. 

That is why Autoprefixer is disabled for Grid as a default. To switch it on, ´ /\* autoprefixer grid: autoplace \*/´ at the top of your css file. 

**Autoplacement**

Read more about Grid Autoplacement support in IE [here](https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie).

However, even Autoprefixer cannot fix it all when it comes to Internet Explorer. 

## What can't even Autoprefixer fix?

There are some limitations with Grid Autoplacement when it comes to using Autoprefixer. 

## Have you tried not supporting IE? 

Even [Microsoft](https://techcommunity.microsoft.com/t5/Windows-IT-Pro-Blog/The-perils-of-using-Internet-Explorer-as-your-default-browser/ba-p/331732) writes Internet Explorer off as a browser and describes it more as a “compatibility solution”  for enterprise customers to deal with legacy sites that should be updated for modern browsers, and also have plans to stop supporting IE11 themselves. Read more about it [here](https://www.microsoft.com/en-ca/windowsforbusiness/end-of-ie-support).  

A solution could be to show the users an informative banner that is shown if IE is used. [Bowser](https://github.com/lancedikson/bowser) can be used to detect your users browser and version. Then show them a nice banner to enlighten them how much at risk they are from using an outdated browser, and that the application will not work properly in IE. If you want to be extra kind, then consider adding download links to other browsers. ✨

## Internet Explorer is not all bad though 

You will rarely meet a web developer that has not had a fateful encounter with Internet Explorer. Most feel strong emotions when it comes to making a site that actually supports IE, thus it can always be a fun subject to rant over when you meet someone new in the same field. :D 

Hope you enjoyed the article! 

See you later, alligator! 🐊
