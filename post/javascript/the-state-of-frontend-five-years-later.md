---
calendar: javascript
post_year: 2019
post_day: 5
title: 'The State of Frontend, Five Years Later'
image: >-
  https://images.unsplash.com/photo-1463960145376-fd6d2b245ee6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80
ingress: >-
  I recently became a frontend developer. Again. The last time I was, was back
  in 2014. And it's pretty much like riding a bike: if you haven't done it in 5
  years, you're going to feel pretty damn wobbly. Especially if the bikes
  started using create-react-webapp and Sagas in the meantime.


  So, with all the wisdom of a child who just fell of his bike, I'm going to try
  to share a few insights on the state of ~biking~ frontend in 2019!
description: 'JavaScript, Rants'
authors:
  - Jøran Vagnby Lillesand
---
## Types are here, and you should be using them

In 2014 I wrote my first big application using Backbone. Not particularily early to the party, I know, but it was definitely a step up from my former favourite frontend framework, jQuery Spaghetti 2.0. TypeScript was out already back then, but for some reason that was mostly for the .Net developers. Us Java guys were too cool. So instead we just passed around objects called `data` and `opts`, and console logged them to figure out what the heck was going on. And then we forgot to remove the console logging, and the application crashed in Internet Explorer in production.

Even then, writing large scale JavaScript application without types was starting to look like a rather shoddy idea. Coming back to frontend now, I had the pleasure of meeting a codebase where types had just been introduced. And what a joy! Not only does the types make life soo much easier, it even turns out that TypeScript has become a quite decent type system!

So, seriously: if you're writing JavaScript for money today and not using TypeScript, it's probably time to look that up.


## The npm ecosystem turned out just as expected

"Oh great, even this guy caught the leftpad drama," you're probably thinking, and you're right. I did. Back in the day, the npm micro package ecosystem was all the rage. And why wouldn't it be? Everyone was super tired of Java, Spring and the whole _one dependency to rule them all_ approach. So we did the only reasonable thing, and over-compensated by creating a million small packages.

Soo… leftpad happened. But that's obviously just one small symptom. How many packages do you currently have installed on your local development machine? How many different people authored those? How many of those authors are NSA or FSB? Oh well, best not to think too much about that. 

Maybe in a few years we'll have Spring for JavaScript. At least there's some comfort in that!


## React (kind of) turned out to be the endgame

For those of you too young (or too old and senile) to remember, there was a beautiful period of 5-6 years when we played Frontend Framework of the Year, where we would choose a new frontend framework to get excited about every year. And then run along and rewrite everything from last year to that.

Just kidding. Kinda.

I'm happy to see that React has gained some kind of permanent foothold. That kind of stability is good for tooling, good for developers, and certainly good for whoever is footing the bill. It also leads to sensible innovation, such as React Native. Which I've recently learned that also is available for web. React Native for React. What a time to be alive!

So although there are interesting alternatives like Elm around, it looks like React is going to be worth your investment for at least a few years to come.


## JavaScript has become a Proper Language

Speaking of stuff that's been around for a few years, it's a pleasure to see the state of JavaScript these days. Back in the days, the most important thing when learning JavaScript was figuring out why it sucked and how to work around that. 

These days, most things seem to work as expected, and there aren't that many bad parts. Even browsers seems to mostly behaving nicely, and more or less the same way, which is nice. Although, I must say that I am looking forward to giving a talk on why the correct way of comparing things in JavaScript is equalequalequal.


## Build times are… meh

One of the great things about JavaScript when coming from the deep, dark caves of backend was the (almost) zero build time. That's definitely gone. I'm guessing the stable language I touted in the previous section didn't come for free. It looks like the average frontend build today would make my 2010 maven builds blush with embarassment, in terms of build time, dependency madness and complexity. 

I guess that just comes with maturity. Before a language has any use in enterprise applications (which I'm starting to figure out means 'real world' applications), the last thing anyone wants to deal with is dependency management, backwards compatibility and other boring enterprise stuff. But the quickly passes once your 20 million dollar business starts to fall apart because someone upgraded Babel.

JavaScript is definitely way past that point by now, and it's interesting to see how mature the toolchain has become. And hey, I get to take breaks to get coffee while My Code Is Building.


## Developer tooling is… meh

With the maturity of the toolchain, developer tooling has improved. React and especially Redux provides some great debugging functionality, but overall I'm a bit disappointed that the state of things aren't better than they are. Source maps are good, but the fact that the standard debuggers can't evaluate variables properly with source maps is a bit of a bummer.

There might be things I should know here that I don't, but I was hoping that we'd be well past the point where `console.log` and attaching things to global state are reasonable approaches to debugging.


# In short

All in all, things are not bad in the world of frontend. The community is thriving, and innovation is both rapid and reasonably well directed. So, I guess I could reasonbly say that things used to be worse. The coffee was bitter, and the developers were too. These days the coffee is single lot, the function scope is predictable and the developers are hopefully slightly less bitter than they used to be.

So, if you yourself is part of the frontend community, enjoy it! Frontend as an area of expertize has undergone huge changes the last few year, and I dare say most are for the much better. 
