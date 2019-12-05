---
calendar: kotlin
post_year: 2019
post_day: 6
title: On the first day of KotlinConf
image: >-
  https://upload.wikimedia.org/wikipedia/commons/6/6d/Bella_Sky_Comwell_hotell_Orestad_20130421_0247F_%288668782211%29.jpg
ingress: >-
  Yesterday (the non-workshop part of) the third edition of KotlinConf kicked
  off. This year the conference is held in Copenhagen, the capitol of Denmark.
  While a visit to "Kongens by" is nice in any circumstance, a December visit
  with a taste of Kotlin is almost perfect.     
links:
  - title: Day 1 talks
    url: 'https://kotlinconf.com/talks/5-dec'
authors:
  - Torbjørn Tessem
  - Vegard Veiset
---
## The venue

This years venue is the Bella Conference Center _(pictured)_, a quick metro ride from central Copenhagen. While perhaps not as charming as last years venue (Beurs van Berlage in Amsterdam), a larger venue may be fitting to the ever growing Kotlin community. 

![](/assets/welcome-2-.jpg "Welcome to KotlinConf!")

The registration went smoothly, and after leaving our coats in the cloakroom, we went into the huge conference hall. While at first sight it felt a little crowded around the food and drink stations, as we moved further from the entrance the crowds thinned and we could easily help ourselves to some breakfast snacks and a much needed cup of coffee. 

![](/assets/breakfast-3-.jpg "breakfast snacks")

## Talks

As last year, the conference kicked off with a keynote.  Andrey Breslav presented some information on the recent developments and near future of Kotlin 1.4 is on it's way! After the keynote, a long day filled with many excellent talks started, some of which we will present here.  

### Putting Down the Golden Hammer

With great syntax comes great responsibility. Or, at least, with great syntax comes the temptation to use it everywhere, even places where you maybe shouldn't. In this talk [Huyen Tue Dao](https://twitter.com/queencodemonkey) shares with us some examples of going to far with the Kotlin syntax. 

Keep using the great features of Kotlin, but always make the intention of your code as clear as possible, even though that means writing `!!` or dropping an `apply`. We can wholeheartedly recommend this talk for both experienced and new Kotlin developers. 

### Kotless

A fantastic talk about [Kotless](https://github.com/JetBrains/kotless), a serverless framework, by [Vladislav Tankov](https://github.com/TanVD). The talk started with a short introduction to serverless and continued on about some of the issues with it. In theory serverless sounds really nice, as you don't have to deal with all the server infrastructure. In practice though it's slightly more complex. A simple serverless app often requires 500+ lines of infrastructure configuration that you as a developer have to deal with. Shouldn't it and couldn't it be done much easier?

The answer is yes, and Kotless. Kotless introspects your code, generates the configuration for you and makes serverless simple. It currently supports AWS and looks really promising. 

### Kotlin for science

Simulations is an important part of modern natural science, especially for disciplines where experiments are time consuming and expensive. In this talk, by particle physicist Alexander Nozik, the challenges scientists meet when programming and how Kotlin can present solutions to them were discussed.  

![](/assets/power-of-kotlin-2-.jpg "The power of Kotlin")

What strengths does Kotlin have compared to the more common programming languages used in science? Kotlin is expressive and safe enough to be used by people with varying programming experience. Perhaps as opposed to certain other languages, where higher experience is needed to easily avoid errors. Extensions and scoped functions can be very helpful both in this regard and with regards to performance. As for performance, it is often good enough (both for Java and Kotlin), and much better than the well known reputation of the slow JVM. Kotlin also has the advantage of full compatibility with Java. As for so much else, coroutines is a fantastic tool for science, and kotlin/js can be great for creating visualizations. 

However, there are some issues with Kotlin in science as well. There are still certain performance issues and also a lack of easy access to certain scientific tools. But if these problems can be solved, Kotlin may very well be the next big programming language used for science. 

## Party

As we're writing this the first day is coming to an end, and we are waiting for a new product announcement from JetBrains. Then it's time to party! **Skål.kt** :beers:
