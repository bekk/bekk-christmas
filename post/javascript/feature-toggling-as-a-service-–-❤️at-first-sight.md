---
calendar: javascript
post_year: 2019
post_day: 15
title: Feature toggling as a service – ❤️at first sight
ingress: >-
  I used to think that feature switches were clunky if-statements in my code
  that would require re-compilation or at least restart of my app. Launch Darkly
  proved me totally, swinging me from cynical scepticism to deep love!
---
Feature toggling as a service is best explained by a live demo. This 60 second sample from our enterprise app shows how instantly we can enable/disable a feature, and how we can easily do that down to the specific user of our app.

<video controls autoplay>
  <source src="https://www.dropbox.com/s/pa8xrsvp1e01jfd/Feature%20Flag%20demo.mp4?dl=0" type="video/mp4">
  Your browser does not support the video tag.
</video>

Although not shown in the video, Launch Darkly obviously also allows you to target groups of users based on whatever criteria you have available. It's also backed by great audit logging and statistics, so you can see how feature configuration has changed over time and what values have been served to the users over time.

Launch Darkly has a nice SDK, allowing you to integrate with all popular programming language, including packages for both general JavaScript and React apps. There also 3rd party libraries like Flopflip, which smoothly mirrors the flag states to your Redux store. This is what we do, and it makes it really easy to debug issues related to feature flags, e.g. using time-travel.
