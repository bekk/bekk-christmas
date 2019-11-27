---
calendar: ml
post_year: 2019
post_day: 13
title: Dimensionality reduction using Principal Component Analysis
image: >-
  https://images.unsplash.com/photo-1518252283669-e5cbf7cd40af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
links:
  - title: Principal Component Analysis Explained Visually
    url: 'http://setosa.io/ev/principal-component-analysis/'
authors:
  - Aryan Iranzamini
---
The main idea behind dimensionality reduction techniques is to reduce the amount of features, whilst retaining as much information in the data as possible. There are many reasons for doing this, for example lower dimensions means that less computational resources are needed and it also makes it easier to visualize and interpret the data. It is therefore a must know for every data scientist.

Principal Component Analysis (PCA) is one of the most common dimensionality reduction techniques. The magic behind it lies in the math, but today we are just going to briefly introduce it without any potentially confusing variables or formulas. As mentioned earlier, the goal is to find a lower-dimensional representation of the data that represents the original structure of the data just as well. The way PCA tries to find this representation is by first finding the directions in the data with the most variance, these directions are also known as principal components. After the principal components have been found, one can then project the original data points onto the most important principal components and discard the others to achieve a new subspace with lower dimensions.

This might sound complicated at first, but let's look at an example.

![Photo: Victor Powell](/assets/screenshot-2019-11-12-at-18.03.52.png "A projection of data onto a new subspace using PCA. The tool used for visualization can be found at http://setosa.io/ev/principal-component-analysis/")

As one can see in the leftmost graph in the figure above, the data set consists of 5 points in a two-dimensional space. A green line and a red one is also plotted in the graph and corresponds to the principal components of the points. The rightmost graph shows what it would look like if one were to project the points onto these principal components.

This might not look like something special at first glance. However if we view each principal component by itself, which can be seen in the second figure, we can see that first principal component accounts for most of the variance in the data. It is barely possible to distinguish the data points in the second one and it can therefore just be discarded. Thus, we can just use the first principal components to represent our data.

This was an example of how we can use PCA to go from two dimensions to just one, while still retaining all the important information in the data.

![Photo: Victor Powell](/assets/screenshot-2019-11-12-at-19.11.12.png)
