---
calendar: ml
post_year: 2019
post_day: 3
title: Linear Models
---
Let's say you are going on a 100 km road trip, and you want to know how much money you should expect to spend on gas. Unfortunately for you, there is no information on the fuel efficiency of your car, so you can't simply calculate the number.

Fortunately for you, however, you have recorded the distance traveled and gas usage for previous roadtrips. Using this data, it might be possible to build some model that can be used to predict roughly how much gas you could expect to need for your road trip.

The first step in any machine learning problem is usually to visualize the data in some way. In this case, we plot it in a scatter plot.

![]()

In machine learning, we decide on some model that we believe describes the data. This model is then fitted to the data, and used to extrapolate to new situations. The simplest of such models is the humble line. A line, or more accuratly a _linear model_, assumes that the relationship between the input and the output is such that twice the input produces twice the output. More precisly, is is a parameterized model of the form

**y = a*x + b** ( er det mulig med latex markdown her?)

Where **x** is the
