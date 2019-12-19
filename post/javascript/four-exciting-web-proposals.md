---
calendar: javascript
post_year: 2019
post_day: 24
title: Four Exciting Web Proposals
image: >-
  https://images.unsplash.com/photo-1433757741270-94a3bcadc2f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2169&q=80
ingress: >-
  The JavaScript Advent Calendar is coming to an end. For each day in December,
  we've written an article on a subject that matters to us. If you want to keep
  learning about the language and the web itself, here's four exciting web
  proposals you might want to play with during the holidays!
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
💡 A _web proposal_ is the specification of a feature, API or any other addition to the official web standards, governed by the [World Wide Web Consortium (W3C)](https://www.w3.org). These additions are typically developed [in the open](https://github.com/w3c/) by volunteers and large browser vendors such as Apple, Google, Microsoft and Mozilla.

🛠 As a result, browsers such as Chrome and Firefox often let you try new features before they're ready to go public. In Chrome, you can enable experimental features by navigating to `chrome://flags/#enable-experimental-web-platform-features` and enabling the flag. Just make sure you're on the latest version!

## Shape Detection

A few years ago, I helped develop an arcade machine for a large student festival in Trondheim, Norway. The machine had a camera that would scan for QR codes to identify the player. It ran on a Raspberry PI with a Chrome Web app, so the scanning would be implemented in JavaScript. Finding a suitable library was not an easy task. They were either slow, unstable, or unable to read the QR codes at all.

We had to go for the slow option. But soon, this and other, similar problems can be solved using the proposed [Shape Detection API](https://wicg.github.io/shape-detection-api/)! While JavaScript solutions are typically heavy on the CPU, this proposal lets the browser access specialized hardware modules and SDKs that support both efficient scanning of both QR codes and traditional barcodes.

In addition to QR and barcodes, the Shape Detection API lets you do text recognition and even _face recognition_ – directly in the browser! Using the API is also quite simple. Here's an example by Cassie Evans from CSSCamp 2019, showing how to retrieve faces from a webcam feed:

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

🎥 In [the video](https://www.youtube.com/watch?v=8p5SDI4TNDc&feature=youtu.be&t=1619), Evans demonstrates what you can do once the browser has discovered a face!

The Shape Detection API is openly [available on GitHub](https://github.com/WICG/shape-detection-api). Take a look for current browser and device support, examples and more!

## Progressive Web Apps

Progressive Web Apps (PWAs) erase the boundaries between apps that live in your browser, and native apps you install on your OS. PWAs are actually a combination of _at least_ two, new web proposals; The [Web App Manifest](https://w3c.github.io/manifest/) lets you define a name, icon and colors for your app, and enables the app to be installed locally on the user's device. Using [Service Workers](https://www.w3.org/TR/service-workers/), the app can work without a stable internet connection and send push notifications using the [Push API](https://www.w3.org/TR/push-api/).

PWAs have been around for a while, but the API support still varies a bit across browsers and devices. Creating a PWA from scratch is also a daunting task, given the long [checklist](https://developers.google.com/web/progressive-web-apps/checklist) of features to keep in mind. However, frameworks such as [Gatsby](https://www.gatsbyjs.org/) for React or [Gridsome](https://www.gridsome.org) for Vue makes the process as easy as installing a handful of plugins.

🎥 If you want to build a PWA, I recommend watching Maximiliano Firtman's [talk from JSConf EU 2019](https://www.youtube.com/watch?v=cybhV88KLfI) with an updated perspective on the matter.

## Native File System

This is a big one. A team from Google is working on a [Native File System API](https://wicg.github.io/native-file-system/) for the browser. Currently, web applications are very limited in terms of reading and writing files to your local storage. When they want to read a file, the user must manually choose the file using a native file explorer. Saving works in a similar fashion. This quickly becomes tedious when dealing with frequent file operations or handling multiple files simultaneously.

Using the Native File System API, the browser can (if given permission) gain access to local files like any other, native application. This opens a lot of possibilities for the Web. Combined with features of a Progressive Web App, there may be less need for bundlers such as _Electron_, which powers VSCode, Slack, Discord and many other desktop apps. Certainly an opportunity for _ChromeOS_, which mainly relies on web applications. But only time will show if the public wants this merge of the desktop and web, or if they want the browser to remain a separate, sandboxed corner of their operating system.

🚀 See it for yourself in [this interactive demo](https://googlechromelabs.github.io/text-editor/), or read a thorough introduction at [web.dev](https://web.dev/native-file-system/).

## Picture-in-Picture

I found this while watching [NRK TV](https://tv.nrk.no/), a streaming platform by the Norwegian, government-owned broadcasting company. While watching a video, I discovered a button that made it pop out of the browser, appearing in a stand-alone, sleek and resizable window.

As I later discovered, this is an implementation of the [Picture-in-Picture API](https://w3c.github.io/picture-in-picture/). While the proposal is mainly available in Chrome, many other browsers support a similar, proprietary implementation. Either way, this API can often be utilized even if the streaming platform has not yet implemented it – using a little JavaScript.

Assuming the streaming site contains an HTML5 `video`-tag, the following one-liner should drag the feed into a picture-in-picture window:

```javascript
document.getElementsByTagName('video')[0].requestPictureInPicture();
```

Try it with the [previous](https://www.youtube.com/watch?v=8p5SDI4TNDc&feature=youtu.be&t=1619) [videos](https://www.youtube.com/watch?v=cybhV88KLfI) – just paste the snippet into your console and press `enter`!

## Wrapping it up

These are all relatively new web proposals, so don't assume they're available to users of your app just yet. I recommend checking the amazing [caniuse.com](https://caniuse.com/) for the current implementation status across all modern browsers. In any case, you can try experimenting locally on your own!

From all the JavaScript nerds here at Bekk, thank you for staying this far! It's been lovely to serve you articles every day this December. If you want to learn the nitty gritty of how these calendars were all made, stay tuned for a special article on [bekk.christmas](https://www.bekk.christmas).

Until then – merry Christmas! 🎄🎅🏻
