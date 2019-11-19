---
calendar: kotlin
post_year: 2019
post_day: 4
title: '''Twas the night before KotlinConf'
image: 'https://i.imgur.com/I8uhLjx.jpg'
ingress: >-
  'Twas the night before KotlinConf when we began on a journey. Leaving the snow
  clad north behind, heading for warmer shores of sealed classes, co-routines
  and extension functions. 


  Tomorrow the festivities, that are KotlinConf 2019, are upon us. And in that
  spirit we take time to look back at last years conference and some of the
  informative, inspiring and fun talks we witnessed in Amsterdam. 
links: []
authors: []
---
KotlinConf 2018 was held over two days (not including workshops) in  Beurs van Berlage in central Amsterdam. After the keynote that kicked off the conference, there was four talks in parallel trough-out. This presented a problem, as it was not easy to choose which talks to attend (or even more so, write about). But choices were made, and we will try to present some of them here.

## Best Practises for Unit Testing in Kotlin

related [blog post](https://phauer.com/2018/best-practices-unit-testing-kotlin/)

* har vært nyttig på prosjekt som gikk fra java til kotlin
* bruker kotlins styrker i samarbeid med junit 5 (som er utviklet med tanke på kotlin)

[Best Practices for Unit Testing in Kotlin](https://www.youtube.com/watch?v=RX_g65J14H0) by Philipp Hauer

## Kotlin Puzzlers

A tradition in the making? This was the second edition of the Kotlin Puzzlers, and the [schedule](https://kotlinconf.com/talks/6-dec/101328) confirms that there will be a third edition this year. Anton Keks presented absurd snippets of code and challenged the audience to vote for the correct result when running the code. After the answer was reviled, an audience member volunteered to explain the result.    

```
fun hello(): Boolean {
  println(print("Hello") == print("World") == return false)
}

hello()

// What will it print?
// a) HelloWorld
// b) HelloWorldfalse
// c) HelloWorldtrue
// d) will not compile 
```

This was the first puzzler, can you explain what answer it will give and why? There may be some Estonian liqueur in it for you if you do...  

For more puzzlers: [Kotlin Puzzlers, vol 2](https://www.youtube.com/watch?v=Xq9vBZs0j-8) by Anton Keks

## ...and much more

If your are interested in more, you can find videos (and some slides) from KotlinConf 2018 [here](https://kotlinconf.com/2018/talks/). And there will of course be more Kotlin in Copenhagen the next couple of days. We hope to see you there!

### Happy KotlinConf!

TODO: 

* litt om fire forskjellige talks/fordrag (skal noen erstattes?)

Lenker til fire kandidater:

* [Beat the High-Score: Build a Game Using libGDX and Kotlin](https://www.youtube.com/watch?v=kDxerDYelLs) by David Wursteisen\
  Game development
* [Making Noise with Kotlin Native](https://www.youtube.com/watch?v=vc04QKnryKs) by Josh Skeen\
  Music! 
* [Best Practices for Unit Testing in Kotlin](https://www.youtube.com/watch?v=RX_g65J14H0) by Philipp Hauer \
  Very informative, and perhaps the talk I've personally applied most at projects at work. 
* [Kotlin Puzzlers, vol 2](https://www.youtube.com/watch?v=Xq9vBZs0j-8) by Anton Keks\
  A tradition in the making? A fun way to end the conference.
