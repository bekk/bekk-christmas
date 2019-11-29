---
calendar: functional
post_year: 2019
post_day: 3
title: Immutable by default
ingress: >-
  You should always strive to make, and make use of, immutable data structures.
  Even if your domain is inherently mutable (like most domains, really), there
  are quite a few pitfalls that can give you headaches later on if you also use
  mutable data structures. Many of them are avoidable simply by making it harder
  to accidentally modify data.
links:
  - title: '[0] – Concurrency (Computer Science)'
    url: 'https://en.wikipedia.org/wiki/Concurrency_(computer_science)'
authors:
  - Bendik Solheim
---
An immutable data structure is one that cannot change. Its values are set in stone. Once created, it is simply not possible to assign a new value to either the object itself, or one of its children. If this thought is completely new to you, it might sound quite strange and limiting. And you would not necessarily be wrong on the limiting part – a key point with immutability is actually to limit what can be done with an object. As it turns out, if you cannot change an object, many sources of bugs also disappears!

## Reasoning

Reasoning about programs can be quite hard. And when they grow in size, it becomes even harder. Our minds are limited, and can only keep so much information present at once. This is where immutability becomes quite a valuable tool: by limiting the possible interactions with objects, you no longer have to keep track of all the possible places an object might be mutated. Reasoning about your program is now more about understanding the general flow than keeping track of every tiny bit of your program.

## Data Flow

I don’t like surprises. Well, there are of course nice surprises, but when I program I like things to behave the way I expect them to. If I pass my data to a function to have some computation performed, I expect that function to play nice and don’t change my data in the process. But if my data structures are mutable, how can I be sure they don’t? Actually, there is nothing more than conventions to stop that from happening. If my data structures are immutable, change is prohibited by the compiler itself. Passing data around in your application is suddenly a completely safe operation, and you no longer have to worry about the implementation of every function you use.

## Concurrency

Concurrency is a biggie nowadays, with home computers having more and more CPUS and threads available. Yeah, I know, this was also true 15 years ago. But I needed a way to start this paragraph, so just keep on reading. Concurrency is also inherently hard, as threads might need to synchronize, and sometimes even needs access to shared data to perform their operations. What would happen if you had two threads operating on the same, shared data structure – one reading from it while the other mutates it? Best case scenario, your program blows up and execution stops. Worst case, you end up with the wrong result and have no idea that something is seriously wrong. This is not a new problem – concurrency and all its issues has been discussed by computer scientists since at least the 1960s [0]. There are therefore also multiple ways to deal with concurrency, and prevent concurrency issues. The easiest though, at least in my opinion, is simply making your data structures immutable. When shared resources can’t change, threads can’t cause issues for each other as easily. Again, we have removed possible problems by limiting the number of possible operations.

# But what about the real world?

As we can see, immutability gives us several desired properties when programming. We all want to get rid of bugs, and we all want to remove sources of confusion. At least I do. We want to spend more time solving the real problems, not the problems we created ourselves two weeks ago. I don’t know about you, but I can tell you that the list of bugs caused by my code is already seriously long, and if something can stop that list from growing at the speed of light I’m all in!

But just making things immutable does not solve the problems by itself. In real life, data change over time, and if our programs can’t do this it’s quite hard to solve real life problems with them. If I make software for cars, having an immutable speed dial does not exactly help the driver. "Yeah, I know it doesn’t change, but at least it doesn‘t crash your car!" – good luck selling your car on that premise. Luckily, immutable data structures also have ways of modelling changes. In fact, they often have quite similar APIs as mutable data structures, but with the key difference that they return a new copy with the change included rather than modifying the data in place. With our speed dial example, we would simply receive a new speed dial and swap out the old one when accelerating or braking instead of modifying the current one. Now, this might be where you start thinking "creating new copies all the time.. that sure sounds expensive.". And I wouldn’t blame you for thinking like that, because naively implemented that might actually be true. But let me assure you that correctly implemented, this pattern is no more resource intensive than modifying in place.

Again, if this way of thinking is completely new to you, I can imagine you still might be a bit puzzled after reading this. If you are curious how one would actually structure code following an immutable pattern, I recommend picking up and learning a functional programming language. You might just get addicted.
