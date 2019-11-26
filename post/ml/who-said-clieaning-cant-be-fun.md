---
calendar: ml
post_year: 2019
post_day: 20
title: Who said cleaning can't be fun?
image: 'https://imgflip.com/i/3hmoao'
authors: []
---
The most important part of any data science project is the data. It does not matter how fancy your algorithm is if you’re data has low quality or does not capture the relationships you are interested in. In the end it all comes down to the simple truth: “garbage in, garbage out”. Data cleaning refers to a variety of methods for improving the quality of your data. It can be a time consuming and challenging process, but the reward for properly cleaning your data can be great.


<img src="https://i.imgflip.com/3hme43.jpg" width=150 align="right" style="margin:10px 0 0 5px"/>

**Inspect the raw data**

First of all, look at your data. It may sound trivial, but it is easy to forget. Once your data is in a tabular format, use a couple of minutes to scroll through the table and look at the entries. After inspecting the table, calculate statistics (mean, median, standard deviation, etc.) and visualize the data (e.g. scatter plots, line plots, heat maps, etc). The above steps often give you a feeling for the overall quality of the data and if you know the domain you are working with you will often be able to spot obvious errors in the data.

<img src="https://i.imgflip.com/3hmhb3.jpg" width=150 align="right" style="margin:10px 0 0 5px"/>


**Remove irrelevant variables**

Irrelevant variables may be defined as variables we know to have nothing to do with the problem we are trying to solve. For example, say you are trying to predict the probability of a disease in a population. In this context we can be pretty sure that a persons phone number will not affect the probability. Hence, we can safely remove this variable from the data set. Another example is if a data set where two variables are 100% correlated. In this case both variables contain the same information and we can safely remove one of the variables (pick your favourite).

<img src="https://i.imgflip.com/3hme01.jpg" width=230 align="right" margin-right=10 style="margin:20px 0 0 5px"/>

**Drop duplicate observations**

A data set may contain observations that are repeated by mistake. Data sets combined from different sources often results in duplicate observations. Data from a database where users may submit entries multiple times may also include duplicates. In many situations duplicated records do not represent two separate observations and we should therefore remove the extra ones.

**Missing data**

Data sets without missing values are widespread when you learn data science and machine learning in school, but very rare in the real world. Most machine learning algorithms do not work on data with missing values, hence handling missing data is an unavoidable part of being a data scientist. There are many approaches available.

_Drop observations with missing values_. If your data set contains relatively few observations with missing values, removing them is the easy fix.

_Impute missing values_. A more complex approach is to replace missing values with “best guesses”. This is called imputing missing values and there are many approaches available. One common and easy approach is to use statistical values like the mean or median for the variable in question. A second approach is to use a linear regression model between correlated variables to impute the missing values. A third is to copy values from similar observations based on a clustering algorithm.

<img src="https://i.imgflip.com/3hmipk.jpg" />
