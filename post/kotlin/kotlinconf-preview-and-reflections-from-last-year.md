---
calendar: kotlin
post_year: 2019
post_day: 4
title: '''Twas the night before KotlinConf'
image: 'https://i.imgur.com/I8uhLjx.jpg'
ingress: >-
  Tomorrow the festivities, that are KotlinConf 2019, are upon us. And in that
  spirit we take time to look back at last years conference and some of the
  informative, inspiring and fun talks we witnessed in Amsterdam. 
links: []
authors:
  - Torbjørn Tessem
---
KotlinConf 2018 was held over two days (not including workshops) in  Beurs van Berlage in central Amsterdam. After the keynote kicked off the conference, there were four talks in parallel trough-out. This presented a problem, as it was not easy to choose which talks to attend (or even more so, write about). Even still, we will try to present some of the talks here. 

## Representing the State

TODO

[Representing State: the Kotlin Edition](https://www.youtube.com/watch?v=-lVVfxsRjcY&list=PLQ176FUIyIUbVvFMqDc2jhxS-t562uytr&index=27) by Christina Lee

## Making Noise

TODO

\<vz fyll inn her>

[Making Noise with Kotlin Native](https://www.youtube.com/watch?v=vc04QKnryKs) by Josh Skeen

## Best Practises for Unit Testing
Some talks are fun, some are inspiring and some are downright useful. Working on a team that was in the transition from Java to Kotlin much of the code was coloured by the pretty common anti-pattern where one writes Kotlin like Java, and prehaps especially so when writing tests.

The talk held by Philipp Hauer (and the related [blog post](https://phauer.com/2018/best-practices-unit-testing-kotlin/)) gave many useful tips on how to use the strengths of Kotlin when writing tests, how well Kotlin works with JUnit 5, and presented some of the many different test libraries that are available.

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

## ... and so much more!

If your are interested in more, you can find videos (and some slides) from KotlinConf 2018 [here](https://kotlinconf.com/2018/talks/). And there will of course be more Kotlin in Copenhagen the next couple of days. We hope to see you there!

### Happy KotlinConf!
