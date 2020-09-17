---
calendar: react
post_year: 2020
post_day: 1
title: Using contexts for fun and profit
image: 'https://images.unsplash.com/photo-1542140444983-a13f273047a8'
ingress: >-
  Context used to be a bad word. Now, everybody is using it to re-implement
  Redux. Here's a great way to create contexts that are contained, compact and
  easy to manage.
---
React has always had its strengths and weaknesses. Back in the good ol' days, when [mixins weren't considered harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html), one of the biggest grievances was that you had to pass shared state from the very top of your app, where you stored the important stuff, to the leaf components that rendered the data.

Today, we have better tools at our disposal. 

TL;DR:

- Mention the old version of context, and that that was how Redux (and friends) implemented a lot of stuff
- Explain what contexts are
- Explain what they are good at, and when you should use them
- Explain when you shouldn't use them
- Single-file 'text-n-hook
- Take the reader through how you create one step by step
- Show the VSCode snippet
- Summarize

