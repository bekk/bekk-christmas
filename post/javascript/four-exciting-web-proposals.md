---
calendar: javascript
post_year: 2019
post_day: 23
title: Four Exciting Web Proposals
image: >-
  https://images.unsplash.com/photo-1433757741270-94a3bcadc2f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2169&q=80
ingress: >-
  The JavaScript Advent calendar is soon coming to an end. If you want to
  continue learning about the language and web itself, here's four exciting web
  proposals you might want to play with during the holidays.
description: >-
  Here's four exciting web proposals you might want to play with during the
  holidays!
links:
  - title: Shape Detection API on web.dev
    url: 'https://web.dev/shape-detection/'
  - title: Picture-in-picture on Google Developers
    url: >-
      https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
  - title: Native File System API on web.dev
    url: 'https://web.dev/native-file-system/'
authors:
  - Kjetil Svalestuen
---
Tip! To enable these features in Chrome, make sure you're on the latest version and toggle the [experimental web platform features](chrome://flags/#enable-experimental-web-platform-features) flag in your settings.

## Shape Detection

Snapchat, Facebook and other apps are competing to have the cutest, funniest and craziest face filters. Android and IOS offer a set of SDKs to support face-, barcode and text recognition from live video feeds. More so, hardware vendors have long included special camera modules to manage this more effeciently. The [Shape Detection API](https://wicg.github.io/shape-detection-api/) is a web proposal aimed to bring these goods directly to your browser.

There are many JavaScript libraries for such tasks, but these are typically quite heavy on your CPU. Meanwhile, the Shape Detection API communicates with the more efficient, native SDKs, with a small layer of JavaScript to configure and control the output.

The APIs are very simple to use. Here's an example by Cassie Evans at [CSSCamp 2019](https://youtu.be/8p5SDI4TNDc?t=1619), showing how to discover faces from a webcam feed:

```javascript
const findFace = async () => {
  const myWebcamFeed = document.querySelector('.player');
  const faceDetector = new FaceDetector();

  try {
    const faces = await faceDetector.detect(myWebcamFeed);
    console.log(faces);
  } catch (error) {
    console.log('oops, something went wrong with face detection.');
  }
}
```

The objects you receive contain `(x, y)`-coordinates of the eyes and mouth of the discovered faces. From those, you can do a number of things, as seen in the video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/8p5SDI4TNDc?start=1634" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

See the [GitHub repository](https://github.com/WICG/shape-detection-api) for compatibility, examples and more!

## Progressive Web Apps

Progressive Web Apps (PWAs) erase the boundaries between apps that live in your browser, and native apps you install on your OS. PWAs are actually a combination of at least two, new web proposals; The [Web App Manifest](https://w3c.github.io/manifest/) lets you define a name, icon and colors for your app, and enables the app to be installed locally on the user's device. Using [Service Workers](https://www.w3.org/TR/service-workers/), the app can work without a stable internet connection and send push notifications using the [Push API](https://www.w3.org/TR/push-api/).

PWAs have been around for a while, but the support still varies a bit across browsers and devices. If you want to build a PWA yourself, I recommend watching Maximiliano Firtman's [talk from JSConf EU 2019](https://www.youtube.com/watch?v=cybhV88KLfI) about the matter.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cybhV88KLfI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Creating a PWA from scratch can seem a bit daunting. However, frameworks such as [Gatsby](https://www.gatsbyjs.org/) for React or [Gridsome](https://gridsome.org/) for Vue makes the process as easy as installing a few plugins.

## Native File System

This is an exciting one. A team from Google is working on a [Native File System API](https://wicg.github.io/native-file-system/) for the browser. Currently, working with files from a browser is very tricky, requiring the user to individually open and save files to local storage. Soon, that could change. Using this new web platform feature, apps can ask for permission to the native file system, then read and write like any other, native application.

Combined with features of a Progressive Web App, there may be less need for web bundlers such as _Electron_, which powers VSCode, Slack, Discord and many other desktop apps. See it for yourself in this [interactive demo](https://googlechromelabs.github.io/text-editor/), or read a thorough introduction at [web.dev](https://web.dev/native-file-system/).

## Picture-in-Picture

I found this while watching [NRK TV](https://tv.nrk.no/), the Norwegian government-owned broadcasting company's video platform. One day, I discovered a button that, once pressed, made the video pop out of the browser, appearing as a stand-alone, sleek, resizable window.

This is an implementation of the [Picture-in-Picture API](https://w3c.github.io/picture-in-picture/), available in Chrome. Many other browsers support a similar, but proprietary implementation. Either way, this API can often be utilized even if the video service has not themselves implemented it – using a little JavaScript.

Assuming the video service contains a single `video`-tag, the following one-liner should drag the feed into a picture-in-picture window:

```javascript
document.getElementsByTagName('video')[0].requestPictureInPicture();
```

That's it!

## Wrapping it up

These are all relatively new web proposals, and are probably not available to most (if any) of your users. I recommend checking caniuse.com for the current implementation status across all modern browsers. In any case, all of these features are available today if you just want to experiment on your own. Happy coding!
