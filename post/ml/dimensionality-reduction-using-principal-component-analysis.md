---
calendar: ml
post_year: 2019
post_day: 1
title: Dimensionality reduction using Principal Component Analysis
links:
  - title: Principal Component Analysis Explained Visually
    url: 'http://setosa.io/ev/principal-component-analysis/'
---
The main idea behind dimensionality reduction techniques is to reduce the amount of features, whilst retaining as much information in the data as possible. There are many reasons for doing this. Lower dimensions means that less computational resources are needed and it also makes it easier to visualize the data. It is therefore a must know for every data scientist.

Principal Component Analysis (PCA) is one of the most common dimensionality reduction techniques. It is essentially done by projecting the current data onto another subspace with a new set of features, and selecting the most important ones. The new features are called Principal Components. The amount of variance a feature has determines its importance in PCA, the higher the variance the better. PCA therefore creates each new feature in such way that they maximize the variance 

Let’s look at an example.

![](/assets/screenshot-2019-11-12-at-18.03.52.png "A projection of data onto a new subspace using PCA. The tool used for visualization can be found at http://setosa.io/ev/principal-component-analysis/")

As one can see in the figure above, the original data set has been projected onto another sub space with two principal components. This might not look like something special at first glance, however if we view each principal component by itself we can see that first principal component accounts for most of the variance in the data. It is barely possible to distinguish the data points in the second one and it can therefore just be discarded. This was an example of how we can use PCA to go from two dimensions to just one, while still retaining all the important information in the data.

TODOOOO: Credit på bilder osv.

![](/assets/screenshot-2019-11-12-at-19.11.12.png)

![]()
