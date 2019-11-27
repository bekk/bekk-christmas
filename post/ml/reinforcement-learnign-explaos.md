---
calendar: ml
post_year: 2019
post_day: 19
title: Reinforcement learning examples
image: >-
  https://images.unsplash.com/photo-1546704864-07235973413d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  Recently, machine learning research have increasingly been focused on general
  learning algorithms where the same algorithm can perform a huge variety of
  tasks. The ultimate goal by reinforcement learning researchers is to create
  machines that can learn to solve any general task, just like humans! Today
  we're going to take a brief look at some of the coolest projects and greatest
  breakthroughs in the field of self-learning machines.
authors:
  - Asbjørn Steinskog
---
While there are many companies specializing in Reinforcement Learning these days, we'll take a deeper look at those who have been focusing on learning machines to play increasingly complex games. By having the same algorithm learn to play multiple games from scratch, without being explicitly programmed to play any of them, they get one step closer to general artificial intelligence (or singuarity, which may well be the end of all of humanity).

This is [what DeepMind did to Atari games in 2013](https://deepmind.com/research/publications/playing-atari-deep-reinforcement-learning). They presented a Deep Learning model that learnt to play seven different Atari games from scratch. The really groundbreaking thing about this achievement was that the machines didn't need any information other than the game frames to learn. They were essentially able to learn playing the games just by looking at the screen (like humans!) while smashing random buttons (like humans playing Tekken!) – until their random actions eventually started paying off. The machines would then recognize which actions paid off and which didn’t, and after trying again and again, occasionally succeeding while failing a million times along the way, they would become experts. With no human guidance.

The following years, DeepMind went ahead and beat increasingly complex games, utilizing novel reinforcement learning techniques to beat games that were previously thought to be extremely hard for computers to be good at because of their high complexity. In 2015, they gave birth to _AlphaGo_.

While machines have been better than every living human at chess for about 20 years, they have struggled to beat humans at its Asian cousin Go. The amount of possible moves at each step is so high that it’s unfeasible for computers to play it in the same brute-forceish way that made them succeed in chess. To beat Go, you needed something more intuitive, something more human. This lead DeepMind to develop AlphaGo, the first computer to surpass humans in the ancient board game.

Instead of looking at all the possible moves, AlphaGo uses a Monte Carlo tree search to suggest moves based on knowledge it has previously learnt by its neural network. This makes it _think_ in a way that might make it resemble humans more than computers.

Remember: The ultimate goal for DeepMind is to solve general intelligence. While AlphaGo trained and improved on its own, it also used human games, so the natural next step was to create a version that could learn _only_ by itself. Humans are after all fallible. In 2017, they created _AlphaGo Zero_ and _Alpha Zero_, computers that were capable of learning only by playing itself. AlphaZero also learnt to play Chess and Shogi better than all previous approaches. With its ability to learn to play any two-player perfect information games, it had broken another milestone in the quest for general intelligence.
