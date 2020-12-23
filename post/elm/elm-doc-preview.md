---
calendar: elm
post_year: 2020
post_day: 24
title: Log Off and Read Some Docs
image: https://source.unsplash.com/nmePCnbj5fQ
ingress: Wow! It's Christmas Eve, and elm.christmas is drawing to a close. We've
  published 24 articles, and I want to thank you for visiting our advent
  calendar, regardless of whether you've read all 24 articles, or if this is the
  first one you've read. This last article won't be long, as I just want to
  highlight a neat tool that you might not have used for your Elm project.
authors:
  - Aksel Wester
---
I remember being really inspired by Richard Feldman's [keynote talk at Elm Europe 2018](https://youtu.be/x1FU3e0sT1I), and on the plane from Paris I was in the middle of rewriting of my side project using some of the techniques from that talk, when I needed to check the documentation of a package at [package.elm-lang.org](https://package.elm-lang.org). The only problem was that I was 30 000 feet above France, with no Internet access.

What I didn't know at the time, was that I actually had all of the documentation locally for Elm packages I was using already. So I _could_ have just checked the source files to read the documentation I was looking for.

Another, even better, solution would have been to use the command line tool [`elm-doc-preview`](https://github.com/dmy/elm-doc-preview) to view the documentation I wanted. Elm Doc Preview shows a webpage displaying the documentation of the packages you have installed, and makes them look exactly like the documentation does on package.elm-lang.org.

You can install the command line tool using `npm`:

```
$ npm install -g elm-doc-preview
```

And to view the documentation, you simply run the following command:

```
$ elm-doc-preview
```

The command line tool starts up a web page showing all the dependencies you have installed in your app.

![A webpage showing elm-doc-preview and a list of all the dependencies the app is using](/assets/elm-doc-preview-1.png)

Select a dependency and you see that the documentation page looks exactly like it does on package.elm-lang.org.


![elm-doc-preview displaying the documentation for the elm/browser/dom module](/assets/elm-doc-preview-2.png)

The tool is a really nice convenience for those times where you don't have an internet connection. And even when you do, it's nice to have an easy way to see the documentation for every dependency in your app in one spot.

## Lastly...

Lastly I want to thank everyone who contributed to this years elm.christmas. 10 authors wrote 24 articles in total, in addition to reading and giving feedback to articles written by others. Thank you all for taking the time in a busy holiday season to give a little back to the Elm community. ❤️