---
calendar: ml
post_year: 2019
post_day: 5
title: Lost in branches?
---
First of all, this is not an git article. This article will give a short introduction to a set of powerful trees, decision trees. We will briefly go through what a decision tree is, and reasons for using these trees.

In short, decision trees are models used in the field of machine learning to predict the value of a target variable based on multiple input variables. Some machine learning techniques are hard to learn and near impossible to fully understand - decision trees on the other hand can be really simple. 

We will start of with a super short description of the structure of a decision tree model. The first gray circle at the top is called the root node, this is where we start. The rest of the gray circles are just called nodes - except the ones at the bottom, without any preceding nodes, these are called leafs. Take a look:

...

Decision trees can, as already pointed out, be simple and straightforward. Let's make the simplest possible tree, and let's use it for predicting if guests at a restaurant are vegetarian or not. Try it out:

…

This machine learning technique is pretty intuitive to work with, you start at the top (root node) and work your way down answering questions. The nodes asks the questions, and in the end the leafs gives us the prediction. Let’s add a question:

...

In the examples above the trees are only made up by one and two questions, and to be fair, there are many different types of decision trees and some of them can be complex and less intuitive to work with. That said, regular decision trees does not need to be a lot more complicated than this. At first one could think trees are too simple to handle complex problems, yet, with more nodes this technique can be surprisingly powerful.

However, trees are not always convenient. With lots of data and features, trees can be huge. They are also prone to overfitting. They get too familiar with training data, and when a real data sample is pushed through the tree, the slightest of difference can send you down the wrong track and into a wrong classification. Let’s say you ask this question on seafood restaurant, the guests might not be vegetarian, but asking if they ate beef here will get us nowhere. 

Many machine learning techniques are like a black box e.g. neural networks, we have no idea what conclusions the neural network drew. That's not the case with trees. We can easily visualize the decision, that's just the nature of the trees. By starting at the top and answering questions on our way down, we can see and understand each small decision made up by the tree. It's difficult to get lost, just follow the branch out of the tree.
