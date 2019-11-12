---
calendar: ml
post_year: 2019
post_day: 1
title: Dimensionality reduction using Principal Component Analysis
links:
  - title: Principal Component Analysis Explained Visually
    url: 'http://setosa.io/ev/principal-component-analysis/'
---
There are many reasons to learn dimensionality reduction techniques. The goal of this article is to briefly explain what dimensionality reduction techniques are, when they are used and what the benefits are. Lastly, we will introduce and explain Principal Component Analysis which is one of the most common techniques.

// kladd

Principal component analysis is essentially an orthogonal transformation from the original subspace to a new subspace, which maximizes variance and ensures that features are not correlated to each other.

Principal component analysis aims to reduce the amount of features, whilst retaining as much information in the data as possible. This is essentially done by projecting the current data onto another subspace with a set new of features. These new features are called Principal Components, and are created such that they maximize the variance of the previous features.

Let’s look at an example.

![](/assets/screenshot-2019-11-12-at-18.03.52.png "A projection of data onto a new subspace using PCA. The tool used for visualization can be found at http://setosa.io/ev/principal-component-analysis/")

As one can see in the figure above, the original data set has been projected onto another sub space with two principal components. This is nothing special in itself, however if we view each principal component by itself we can see that 
