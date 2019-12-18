---
calendar: ml
post_year: 2019
post_day: 19
title: The quest for general intelligence
image: >-
  https://images.unsplash.com/photo-1546704864-07235973413d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  Recently, machine learning research has increasingly been focused on general
  learning algorithms where the same algorithm can perform a huge variety of
  tasks. The ultimate goal by many reinforcement learning researchers is to
  create machines that can learn to solve any general task, just like humans!
  Yesterday's article introduced you to the concept of reinforcement learning,
  and today we're going to take a brief look at some of the coolest projects and
  greatest breakthroughs in the field of self-learning machines.
links: []
authors:
  - Asbjørn Steinskog
---
While there are many companies specializing in Reinforcement Learning these days, we'll take a deeper look at one who has been focusing on learning machines to play increasingly complex games, namely _DeepMind_. By having the same algorithm learn to play multiple games from scratch without being explicitly programmed to play any of them, they get one step closer to general artificial intelligence (or singuarity, which may well be the end of all humanity).

This is what DeepMind demonstrated when they had a go at Atari games in 2013. As introduced in yesterday's article, they presented a Deep Learning model that learnt to play seven different Atari games from scratch. The groundbreaking thing about this achievement was that the machines didn't need any information other than the game frames to learn. They were essentially able to learn playing the games just by looking at the screen (like humans!) while smashing random buttons (like humans playing Tekken!) – until their random actions eventually started paying off. The machines would then recognize which actions paid off and which didn’t, and after trying again and again, occasionally succeeding while failing a million times along the way, they would become experts. With no human guidance.

![Breakout](https://i.ibb.co/x2rK5TB/atari.gif)

_Breakout was one of the Atari games that DeepMind's reinforcement learning model learnt to play._


The following years, DeepMind went ahead and beat increasingly complex games, utilizing novel reinforcement learning techniques to beat games that were previously thought to be extremely hard for computers to be good at because of their high complexity. In 2015, they gave birth to _AlphaGo_.

While machines have been better than every living human at chess for about 20 years, they have struggled to beat humans at its Asian cousin Go. The amount of possible moves at each turn is so high that it’s unfeasible for computers to play it in the same brute-forceish way that made them succeed at chess. To beat Go, you needed something more intuitive, something more human. This lead DeepMind to develop AlphaGo, the first computer to surpass humans in the ancient board game.

![AlphaGo](https://i.ibb.co/TvDNfyd/Screen-Shot-2019-12-17-at-16-16-20.png)

Instead of looking at all the possible moves, AlphaGo uses a Monte Carlo tree search to suggest moves based on knowledge it has previously learnt by its neural network. This makes it _think_ in a way that might make it resemble humans more than computers.

Remember: DeepMind's ultimate goal is to _solve_ general intelligence; to create computers capable of learning any task. While AlphaGo trained and improved on its own, it also needed human games to learn from, so the natural next step was to create a version that could learn _only_ by itself. Humans are after all fallible. In 2017, they created _AlphaGo Zero_ and _Alpha Zero_, programs that were capable of teaching itself how to play with no human guidance. AlphaZero also learnt to play Chess and Shogi better than all previous players, both humans and machines. With its ability to learn to play any two-player perfect information games, it had broken another milestone in the quest for general intelligence.

But we're not done yet. Only one month ago, DeepMind presented a new model, *AlphaMu*, with an even higher degree of generality. Although AlphaZero learnt to play games with no human guidance on how to excel at them, they obviously needed to know the rules in advance, right? Well, this new model doesn't even need to know the rules of the games it plays. It also achieved state-of-the-art performance in 57 Atari games as well as matching the performance of AlphaZero at chess, go and shogi!

The reinforcement learning examples mentioned in this articles are all created during the last 6 years, and researchers come up with new techniques that improve the agents ability to learn on a monthly basis.

Who knows where we (or rather, the machines) will be after the next 6?
