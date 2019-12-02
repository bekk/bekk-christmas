---
calendar: css
post_year: 2019
post_day: 8
title: Don't suffer like I Grid - SafIEty first
image: >-
  https://images.unsplash.com/photo-1511377398397-8f0fb9ae372d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80
ingress: "Many developers hesitate to use CSS Grid in their project. An argument being that it's not supported in all browser, but that is not true! \U0001F624"
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
Grid is fully supported by all browsers except Internet Explorer.  Well, at least partially. 🤷🏻 Partially because what IE10 and IE11 does support is the older [specification](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/) of CSS Grid syntax. Thus, some Grid syntax will work fine while newer Grid properties will fail. So what do you do when you got to support IE but also want to use Grid? No worries..  

## Autoprefixer can fix! 💁🏻✨

Autoprefixer is a PostCSS plugin to parse CSS and what it adds necessary CSS and prefixes to your CSS rules so that it will work even in IE. 

**Grid properties that does not work in IE, but can be fixed with autoprefixer:**

* 

So what are you waiting for? Add it to your project with:

```
npm install autoprefixer@latest
```

Or if you have used `create-react-app` to create your app, then all you have to do is enable it. By default, Autoprefixer is disabled for Grid. To switch it on, add this comment ` /* autoprefixer grid: autoplace */` at the top of your CSS file. 

To see it in action, test your code with their [online tool](https://autoprefixer.github.io/). 

![Autoprefixer online tool](/assets/screen-shot-2019-12-02-at-20.06.13.png "Autoprefixer online tool")

Awesome, right? ✨

Although it's amazing, there is still a few things you need to beware of when using it.  

## Not even Autoprefixer can fix it all 😔😬

* **Autoplacement -->** Read more about Grid Autoplacement support in IE [here](https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie).
* grid-gap limitations 
* Rachels awesome article https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/ 
* 

There are some limitations with Grid Autoplacement when it comes to using Autoprefixer. 

## Have you tried not supporting IE?

Even [Microsoft](https://techcommunity.microsoft.com/t5/Windows-IT-Pro-Blog/The-perils-of-using-Internet-Explorer-as-your-default-browser/ba-p/331732) writes Internet Explorer off as a browser and describes it more as a “compatibility solution”  for enterprise customers to deal with legacy sites that should be updated for modern browsers, and also have plans to stop supporting IE11 themselves. Read more about it [here](https://www.microsoft.com/en-ca/windowsforbusiness/end-of-ie-support).  

A solution could be to show the users an informative banner that is shown if IE is used. [Bowser](https://github.com/lancedikson/bowser) can be used to detect your users browser and version. Then show them a nice banner to enlighten them how much at risk they are from using an outdated browser, and that the application will not work properly in IE. If you want to be extra kind, then consider adding download links to other browsers. ✨

## Internet Explorer is not all bad though 🤷🏻

You will rarely meet a web developer that has not had a fateful encounter with Internet Explorer. Most feel strong emotions when it comes to making a site that actually supports IE, thus it can always be a fun subject to rant over when you meet someone new in the same field 😄.  

Hope you enjoyed the article! 

See you later, alligator! 🐊
