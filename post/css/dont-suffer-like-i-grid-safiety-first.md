---
calendar: css
post_year: 2019
post_day: 8
title: Don't suffer like I Grid - SafIEty first
image: >-
  https://images.unsplash.com/photo-1511377398397-8f0fb9ae372d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80
ingress: >-
  Many developers hesitate to use CSS Grid in their project. A typical argument
  is that Grid is not supported in all browsers. But that's not true!
links:
  - title: Feature queries @supports  by MDN
    url: 'https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/ '
  - title: Grid in IE and the new Autoprefixer by Daniel Tonon
    url: 'https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/ '
  - title: 'IE11 Countdown and informative links '
    url: 'https://death-to-ie11.netlify.com/'
authors:
  - My Thao Nguyen
---
_If you're not familiar with CSS Grid, check out this short article_  [_"Oops! I Grid it again"_](https://css.christmas/2019/4)_._ 

Grid is fully supported by all browsers except Internet Explorer.  Well, at least partially. 🤷🏻 Partially because what IE10 and IE11 does support is the older [specification](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/) of CSS Grid syntax. 

![Can I Use - CSS Grid ](/assets/screen-shot-2019-12-07-at-20.02.40.png "Can I Use - CSS Grid ")

Thus , some Grid syntax will work fine while newer Grid properties will fail. There are some tools to help you with this! 

## Autoprefixer can fix! 👩🏻‍🔧

Autoprefixer is a PostCSS plugin to parse CSS and what it does is that it adds necessary CSS and prefixes to your CSS rules so that it will work even in IE. So what are you waiting for? Add it to your project with:

```
npm install autoprefixer@latest
```

Or if you have used `create-react-app` to create your app, then all you have to do is enable it. By default, Autoprefixer is disabled for Grid. To switch it on, add this comment `/* autoprefixer grid: autoplace */` at the top of your CSS file.

To see it in action, test your code with their [online tool](https://autoprefixer.github.io/). 

![Autoprefixer online tool](/assets/screen-shot-2019-12-02-at-20.06.13.png "Autoprefixer online tool")

Awesome, right?  💁🏻✨ \
Check out their [docs ](https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie)for details. 

## Limitations

Autoprefixer do have its limitations, thus there are properties even Autoprefixer can not fix. So here's a short list of things you should be aware of:

1. IE does not support [autoplacement](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout). Thus, grid autoplacement properties like `grid-auto-rows` or `grid-auto-columns` does not really work even with Autoprefixer. Read more about Grid Autoplacement support in IE [here](https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie). 
2. Defining your grid with _grid tracks_ and `grid-template-areas`? Make sure each grid element have unique area names. 
3. In the new version of Autoprefixer, `grid-gap` _kinda_ is supported. However, make sure to defined both `grid-template-areas` and `grid-template-columns`. Daniel Tonon has a pretty good [article ](https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/)about IE and the new Autoprefixer.
4. Avoid shorthands! Shorthands such as `grid` or `grid-column`/ `grid-row`. `grid-column` and `grid-row` are both shorthands for placing grid items using _grid lines_, which means that you will have to go from two code lines back to four. 

![Avoid shorthands](/assets/screen-shot-2019-12-07-at-14.36.28.png "Avoid shorthands")

5. `grid-template-areas` and grid tracks is your friend! It's quite the hassle to write four codelines for each grid item when you use grid lines and have to support IE. So try to use `grid-template-areas` and  `grid-area` as much as you can. 
6. Still gotta use grid lines? Always make sure to define _both_ columns and rows for your grid items. Thus, you gotta write four codelines for your grid item. 🙄
7. Always check your grid fix in IE! ****You have probably used grid a lot of places in your code even though it can be a hassle, make sure you check if your site behaves like you would expect it do. If you're like me and do not have IE on your laptop, you can either download a Virtual Machine (VM) to use Windows on your laptop such as [Parallels](https://www.parallels.com/eu/landingpage/pd/general/?gclid=CjwKCAiAuK3vBRBOEiwA1IMhuqLT-NrvSBWj2X-tD5V5qznVF2fHHRYRDUPzX4ilW9TJCYq92cowTBoCVEoQAvD_BwE) or test your website through a web solution such as [SauceLabs](https://saucelabs.com/) or [Browserstack](https://www.browserstack.com/?gclid=CjwKCAiAuK3vBRBOEiwA1IMhut0Cwdq1tfEk_2VcHmKcDM5YknUkDkRtOLtd0hqkEoDfE1Usi-m5-RoChkgQAvD_BwE). Because you know, safiety first 😆!

## @supports

If you would still love to have some autoplacement properties, such as `grid-auto-rows` or `auto-fill`, then another option could be using the feature query, `@supports`. You can then use some CSS features, such as `grid`, depending on whether the browser supports it or not. So you basically put the grid code you would like to use IF the browser supports grid inside of the `@support (display: grid) {...}` and keep the fallback code outside of it. So in the example below, the flexbox code will be used as a default and if the browser do support grid? Well, then the grid code is used instead ✨ 

![@supports - feature query](/assets/screen-shot-2019-12-07-at-14.36.57.png "@supports - feature query")

This is because `@supports` is not supported in IE, thus it would not helpfull to use the other way around. 🤷🏻

## Have you tried not supporting IE?

Even [Microsoft](https://techcommunity.microsoft.com/t5/Windows-IT-Pro-Blog/The-perils-of-using-Internet-Explorer-as-your-default-browser/ba-p/331732) writes Internet Explorer off as a browser and describes it more as a “compatibility solution”  for enterprise customers to deal with legacy sites that should be updated for modern browsers, and also have plans to stop supporting IE11 themselves. Read more about it [here](https://www.microsoft.com/en-ca/windowsforbusiness/end-of-ie-support).  

A solution could be to show the users an informative banner that is shown if IE is used. [Bowser](https://github.com/lancedikson/bowser) can be used to detect your users browser and version. Then show them a nice banner to enlighten them how much at risk they are from using an outdated browser, and that the application will not work properly in IE. If you want to be extra kind, then consider adding download links to other browsers. ✨

## Internet Explorer is not all bad though 🤷🏻

You will rarely meet a web developer that has not had a fateful encounter with Internet Explorer. Most feel strong emotions when it comes to making a site that actually supports IE, thus it can always be a fun subject to rant over when you meet someone new in the same field 😄. 

Hope you enjoyed the article! 

See you later, alligator! 🐊
