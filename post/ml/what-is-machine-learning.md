---
calendar: ml
post_year: 2019
post_day: 2
title: What is Machine Learning?
image: >-
  https://i.iheart.com/v3/re/new_assets/5a0ca9ec111a943785eaff48?ops=contain(740,0)
ingress: ''
authors: []
---
One of the pictures above is of a group of labradoodles. The other is of a bunch of fried chicken. Which is which? While this is an easy problem for most people, this was for a long time considered a virtually impossible problem for computers. Most traditional programming takes an input, performs a series of well defined steps, and produce some desired output. But what are the steps of recognizing a dog or a fried chicken?

When we recognize a dog or a piece of fried chicken, we don't go through a series of explicit steps. We have simply been exposed to enough dogs and pieces of fried chicken to know the difference. This is an important feature of learning: an ability to generalize from experience.

Rather than experience, we often speak of data. A machine learning program is first _trained_ on a large amount of data and then attempt to generalize the data in a way that can be applied to new situations. When trained, the program can be used to solve problems in the same domain as the training data.

There are three broad categories of machine learning: _supervised learning_, _unsupervised learning_ and _reinforcement learning_.

In _reinforcement learning_, the program is trained using labeled data. Consider the problem above: A program is exposed to tens of thousands of pictures, labeled as being of either dogs or of fried chicken. Based on this, it develops some model of what a dog and a piece of fried chicken looks like. When exposed to a new image, it should be able to correctly identify it.

_Unsupervised learning_ deals with unlabelled data. Typically, the program identifies patterns in the data. As an example, a streaming service may wish to segment their customers based on viewing habits. By having an algorithm look at which different customers rate highly, they may identify clusters of customers with similar interests, and use this to recommend movies they are likely to enjoy.

_Reinforcement learning_ is learning by doing. The program, in this context referred to as the _learning agent_, attempts to solve some problem and adjusts its behaviour based on feedback on its actions. Game AI is often trained this way. A chess program might learn by playing games, first playing random moves and gradually learning to prefer moves that lead to victory and avoid those that lead to defeat.

The specific algorithms used are numerous, from traditional statistical  methods predating the idea of artificial intelligence to algorithms inspired by the working of the human visual cortex. All of them are based on the same principle, however: real world problems are often too complex for neat, explicit step-by-step solutions, and are better solved by observing the world and identifying patterns.
