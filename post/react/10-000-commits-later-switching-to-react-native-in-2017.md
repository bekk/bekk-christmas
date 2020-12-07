---
calendar: react
post_year: 2020
post_day: 8
title: 10,000 Commits Later - Switching to React Native in 2017
image: https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80
ingress: >-
  Back in 2017, my team were working on a feature-packed, widely used mobile app
  with a legacy codebase. The app had way too much logic, logic of the complex
  sort, with loads of very old code calling old APIs. Build times were terrible.
  Noone had a complete understanding of the code. 




  To make matters worse: the company behind the app were in the middle of a perfect storm. The business was being changed by regulation. The core business idea were changing. This meant large changes coming to the digital side, including the app.




  Naturally, we had quite mixed feelings about our ability to meet delivery expectations from the business side, given the bad state of the app codebase. We were at a crossroads, and felt we had to pick one of the following:




  1. Negotiate a feature timeout while we frantically renovate the core code, or

  2. Start a long-term migration plan towards a hybrid app, or

  3. Write new features in React Native and eventually move all the JS code over to a new app shell




  We decided to try out React Native. Roughly three years later, the app is now 100% JavaScript. The big business transformation has come a long way, and I’ve experienced that React Native as a technology has played a key role in that success.




  This article contains some reflections on *why* switching from pure native technologies to React Native worked so well for us.
description: react-native
authors:
  - Erik Wendel
---
## Starting Out Small Felt Really Safe

We gave React Natives two tests. First, we wrote a small feature with a few developers. Futhermore, we did a larger, several-month feature where the entire team participated. A critical part of the tests was making sure that React Native would work as the small cogwheel it would necessarily start out as, inside of the large legacy app monster.

The people involved in each phase would evaluate the React Native developer experience, carefully considering if moving forward with React Native would be the right choice for us. After all, continuing with RN would mean a long migration process. Lots of our features would exist in the old, smelly native code for a long time, we would have to manually ensure backwards compatibility, handle (deep) navigation from old to new code (and vice verca), and lots of other things.

Even with these challenges in mind, the team were crystal clear post-testing. React Native made work easier, faster and more fun! In case we’d conclude differently, the investment made was so low that we could safely discard the effort as a proof-of-concept, where the learnings were enough to justify the time spent.

Trying out new technology this way just seems like a very smart way to do it. It was also key that it was the voice of the developers spending all day with the technology that weighed the most.

## We Actually Did Develop New Features Much Faster

They say React Native save you half the work. Since your code will run on both iOS and Android, it eliminates the need to develop separate code  for each platform. Write code once – not twice. Neat!

In our experience, this was mostly true. We did end up doing minor platform customizations here and there. Shadows don’t work as well on Android as iOS. Sometimes you’d want different UI behaviours to adhere to platform guidelines. And as with web development, you’ll encounter visual bugs for each platform that need special attention.

**I’d say we saved about 45% of the work involved.** It’s not half - but it still makes a tremendous difference on productivity!

It’s also hard to not talk about the productivity boost obtained by Hot Reload (now Fast Refresh). Seeing the effect of my last code edit presented visually on screen immediately (with state preserved) is simply marvelous. Scale up the time saved for each little change with the amount of the developers involved and the amount of time spent… it’s just huge!

![animation showing how react-native's "Fast Refresh" works](https://microsoft.github.io/react-native-windows/blog/assets/fastrefresh.gif "React Native's \"Fast Refresh\"")

## All Developers Code For Both Platforms

I’ve met hundreds of fine developers, if not thousands. But those skilled and efficient in both native iOS and native Android development - I can count them on one hand. And they’re not exactly looking for work.

With React Native, we experienced that the entire team could do work for both platforms. It’s hard to overstate the importance of this fact. Instead of having dedicated iOS and Android teams, we’d have a feature being made by the same person (or small group) on both platforms, reducing the overhead involved in coordination and organization between devs and designers, business folks, product owners, etc. Also, fewer people needed to learn the ins and outs of that particular feature in a quite complex domain.

This provides great flexibility and robustness for a development team, and was much needed in our setting.

## Recruitment and Onboarding

Not too many people are familiar with native mobile technologies. In comparison, capable JavaScript/React-developers come a dime a dozen. We found that finding talent was easier, and the newcomers found themselves productive way quicker than we’d expect. In a period with frantic scaling and expansion, this was critical. 

I can imagine recruiting top-notch mobile development specialists is easier if you’re a huge company with infinite resources. In that case, you could staff the necessary amount of specialist teams for iOS and Android and just steamroll whatever you’re making. 

In the Norwegian market, with finite resources, easing your requirements from *«five years of Swift»* to *«five years of JavaScript experience»* makes all the difference. The programming language in itself is one thing, but there’s also the ecosystem, development enviroment, IDE, etc. Apple make a lot of really sweet products, but XCode surely isn’t one of them.

## Team Organization

Our old codebase was.. entangled. I imagine it would be challenging to attempt doing distributed development on the same codebase across several teams. At least when aiming for near-continuous delivery. Doing a Spotify-like product team organization with an app dev in each team seemed utopian at the time.

Over the course of a few years, we went from a dedicated mobile team of five to a product team organization with near 20 mobile developer spread across all teams. This would be much harder without the flexibility and familiarity of *«it’s just JavaScript»* or *«it´s just React»*. Not having to invest as much time and energy in specialist competencies for iOS or Android, app devs have more cognitive surplus to work on other things as well - web, cloud stuff, backend, UX-collaboration, etc.

## Deploy To Production At Will

Mobile apps have always had a longer way to production. The *«quality control»* mechanism with manual app reviews adds several days to the pipeline. The Apple App Store was alone responsible for up to a 14-day delay at it’s worst, although the wait times have been vastly reduced since then. Now they’re averaging at about a day.

A good dev team in 2020 will deploy to production many times each day. Looking at some of the biggest Norwegian apps today, it is not uncommon to see two-three-four week old builds as the most recent one. 

The negative effects of not releasing your code often, and not even having the possibility to release at will, are well documented. React Native with it’s *over the air*-update called *CodePush* allows for continous delivery, even for mobile apps! 

CodePush allows your app code to download the latest version of the compressed JavaScript bundle from a third-party server. When a user opens the app, the new bundle is downloaded and immediately installed. Voilà – immediate deploy to production!

Our app’s release cycle went from semi-monthly to several releases per day. Paired with great monitoring, this reduces the need for testing. Non-critical bugs can be tolerated to a larger degree if they don’t reach your entire audience before they’re automatically detected and shortly fixed. 

Product development is also way faster. The team can iterate on small changes on real customers in production as a part of the development process, instead of lengthy sketching and laboratory user testing. This made the entire organization more customer-focused and impatient for real customer feedback.

## A Note On The Rewrite

The whole codebase transformation to React Native took about two years. We only wrote already-planned new features in React Native, allowing us to be productive and produce new features during the process. The business transformation underway meant that most of the features would have required changes anyway, and it could actually be faster to implement them from scratch in React Native than to modify the legacy code. 

This meant that we didn’t need a feature-freeze period with the team stuck on unproductive rewrite work. However, when most of the old app was rewritten, we needed a month-long cleanup to move all the separate features in the old app over to a new, fresh React Native repo. 

From around March 2017 until June 2019 the app was in a state where some features existed in the old codebase and others in the new codebase. That wasn’t a pleasant situation, but not more unpleasant than working in the old legacy codebase before.

## Status As We’re Looming On 2021

A total of **10,000 commits** have been made by **33 contributors** across **5 teams.**. Nearly 50 pull-requests from 14 authors was merged the past week. Our ability to deliver on business requirements have been strengthened. Looking back on our big choice of 2017, it’s truly awe-inspiring to see how big an effect a simple technology choice can have on helping teams reach lofty goals.

No technology is a silver bullet. React Native surely isn’t either. But it does have some truly wonderful effects on an impatient, agile, modern development organization that Swift, Kotlin or C# currently can’t offer, in my opinion. It’ll be interesting to see the evolution of SwiftUI and Flutter over the next years!