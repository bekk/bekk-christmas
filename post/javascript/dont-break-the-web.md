---
calendar: javascript
post_year: 2018
post_day: 2
title: Don't break the web
image: >-
  https://images.unsplash.com/photo-1473158912295-779ef17fc94b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=64ba681ba6416d7c5ea43a307a46483c&auto=format&fit=crop&w=2250&q=80
ingress: >-
  Did you know that you can reload the current webpage in over 500 different
  ways?
links:
  - title: Read the Stack Overflow post that inspired this article
    url: >-
      https://stackoverflow.com/questions/7014796/535-ways-to-reload-the-page-with-javascript-what-are-the-consequences
  - title: Read about the history API over at MDN
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/History'
authors:
  - Nicolai August Hagen
---
Many years have passed since your (grand) parents surfed the web with Netscape Navigator, or Internet Explorer was actually used by the people of the web.
Browsers have not always had the same version, and neither have the various web standards.

## Reloading the window in JS
In order to NOT break existing websites, old syntax has never been removed when new features are added. This makes JavaScript extra exotic for experienced developers, but quirky and cumbersome for new ones.

For example, did you know that JavaScript has at least [*500 different ways to reload a window*](http://www.phpied.com/files/location-location/location-location.html)?!

## 10 randomly picked examples

```javascript
location = location
location = window.location['href']
window.location.assign(location)
window.location.replace(location)
self.location.replace(location)
location.href = location
self['location']['assign'](window['location'])
location['reload']()
self.location['href'] = self.location.href
self['location']['href'] = self.location
```

This is simply insane!

Or, you could go for the even crazier approach:

```javascript
(([][[]]+[])[+!+[]+!+[]+!+[]+!+[]+!+[]])+(([][[]]+[])[+!+[]])+((![]+[])[+!+[]+!+[]+!+[]])+((![]+[])[+!+[]])+(([][[]]+[])[+!+[]])+((!![]+[])[+!+[]+!+[]+!+[]])
```
(hint: run it in the console)

As you can see, these quirks are caused by the fact that the JavaScript language allows for different ways to write essentially equivalent code.
Here’s an example:

`location.href = location` versus `location['href'] = location`

where both snippets in practice does the exact same thing.

Discussing which one of the 500+ ways to reload is the best is like discussing wheter you should use Emacs or Vim, or Flow or TypeScript.
The most important thing, I guess, is readabiliy - making sure you and all co-developers understand.

So perhaps not the `self['location']['assign'](window['location'])` part.

Oh, by the way. Almost forgot. Caused by the fresh off-the-shelf [history API](https://developer.mozilla.org/en-US/docs/Web/API/History), we now got **even** more ways to reload a window in JavaScript. After all, we don't want to break the web?

Tomorrow, choose one of the 500+ ways to reload the window to get the latest hatch of the JavaScript advent calendar.

`window.history.go(0)`, JavaScript !
