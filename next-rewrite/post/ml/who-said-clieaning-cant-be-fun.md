---
calendar: ml
post_year: 2019
post_day: 20
title: Who said Christmas cleaning can't be fun?
image: >-
  https://images.unsplash.com/photo-1529220502050-f15e570c634e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  The most important part of any data science project is the data. It does not
  matter how fancy your algorithm is if your data has low quality or does not
  capture the relationships you are interested in. In the end it all comes down
  to the simple truth: “garbage in, garbage out”. Data cleaning refers to a
  variety of methods for improving data quality. It can be a time consuming and
  challenging process, but the reward for properly cleaning your data can be
  great.
authors:
  - Michael Nordmo
---
<img src="https://i.imgflip.com/3hmrcj.jpg" style="display: block; margin-left: auto; margin-right: auto;"/>¨

<br/>

<img src="https://i.imgflip.com/3hmudr.jpg" align="right" style="margin:30px 0 0 5px; width:12em;"/>

**Inspect the raw data**

First of all, look at your data. It may sound trivial, but it is easy to forget. Once your data is in a tabular format, use a couple of minutes to scroll through the table and look at the entries. After inspecting the table, calculate statistics (mean, median, standard deviation, etc.) and visualize the data (e.g. scatter plots, line plots, heat maps, etc). The above steps often give you a sense of the overall quality of the data, and if you know the domain you are working with you will often be able to spot obvious errors in the data.

<br/>

<img src="https://i.imgflip.com/3hmum2.jpg" align="right" style="margin:30px 0 0 5px; width:12em;"/>

**Remove irrelevant variables**

Irrelevant variables may be defined as variables we know to have nothing to do with the problem we are trying to solve. For example, say you are trying to predict the probability of a disease in a population. In this context we can be pretty sure that a persons phone number will not affect the probability. Hence, we can safely remove this variable from the data set. Another example is data sets with 100% correlated variables. If a data set has two variables that are 100% correlated they contain the same information. Hence, we can safely remove one of them - pick your favourite!

<br/>

<img src="https://i.imgflip.com/3hmurq.jpg" align="right" style="margin:40px 0 10px 5px; width:24em"/>

**Drop duplicate observations**

A data set may contain observations that are repeated by mistake. Combining data sets from different sources often results in duplicate observations. Data from a database where users may submit entries multiple times may also include duplicates. In many situations duplicated records do not represent two separate observations and we should therefore remove the extra ones.

<br/>

**Handle missing data**

Data sets without missing values are widespread when you learn data science and machine learning in school, but very rare in the real world. Most machine learning algorithms do not work on data with missing values, hence handling missing data is an unavoidable part of being a data scientist. There are many approaches available.

_Drop observations with missing values_. If your data set contains relatively few observations with missing values, removing them is the easy fix.

_Impute missing values_. A more complex approach is to replace missing values with “best guesses”. This is called imputing missing values and there are many approaches available. One common and easy approach is to use statistical values like the mean or median for the variable in question. A second approach is to use a linear regression model between correlated variables to impute the missing values. A third is to copy values from similar observations based on a clustering algorithm.
<img src="https://i.imgflip.com/3hmv8b.jpg" style="display: block; margin-left: auto; margin-right: auto;"/>

Now, you're all set to start cleaning for Christmas!