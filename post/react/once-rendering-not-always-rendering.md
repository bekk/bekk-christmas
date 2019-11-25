---
calendar: react
post_year: 2019
post_day: 2
title: 'Once rendering, (not) always rendering'
image: 'https://unsplash.com/photos/vb_V6W1nmeA'
ingress: >-
  Since a conference in 2018 we have been promised Concurrent Mode. This new
  features for React will help the rendering issues, allowing to "pause" the
  render to do more important tasks.
authors:
  - Caroline Odden
---
In most React applications today there are some problems that are recurring. The problem where you have triggered some sort of fetching of data, and you want to go on with your life, which is not alway easy. There are some events that you want to happen immediately, for instance hovering over some elements or typing into an input field. When React begins to render, you can't stop it until it is done. 

# User Experience

The "once rendering, always rendering" problem is hard to avoid, because even though your application has nice performance measures, the device the user has may not be strong enough to handle it regardless. Factors as network speed and device capabilities.
