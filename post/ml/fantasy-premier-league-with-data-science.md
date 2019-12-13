---
calendar: ml
post_year: 2019
post_day: 23
title: Fantasy Premier League with data science
image: >-
  https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
ingress: '### Helping you pick the top team for Boxing Day!'
description: >-
  fantasy, premier, league, football, machine learning, random forest, linear
  regression, data science
---
If you’re a below-average Fantasy Premier League performer and an above-average data science enthusiast, we have at least two things in common – and you’ve found exactly the right article!

Picking the right Fantasy team with data science is no new subject<sup>1</sup>, but we thought we’d give it a go and compare three classic prediction models: linear regression, a basic neural network, and random forest. We’ll train the models on historical data, evaluate their performance<sup>2</sup>, and finally set up our ultimate team for the pinnacle of Premier League – Boxing Day⚽

The process for all models is built on three steps. First, the models are trained to predict expected amount of points achieved by each Premier League player in any round, based on a set of input data. Second, the models try to predict the points scored by each player in a new round (in our case, game week 19). Third, the simplex algorithm is used to construct a team of 11 players<sup>3</sup>, fulfilling the constraints given by the Fantasy rules, maximizing number of expected points. Still hanging on? Let’s dive in!

### 1. Training the models
The models are trained using 

### 2. Predicting points
Lorem ipsum

### 3. Selecting the XI
Lorem ipsum

### Results

(results here)

### Next steps



<sup>1</supt>Articles written in 2017, 2018 and 2019
<sup>2</sup>We compare results from our models with the average human score for each round. This implicitly relies on the false premise that all human players can pick a brand-new squad (in practice, use a wildcard) every single round, so the machine scores should ideally be slightly devaluated.
<sup>3</sup>Subtitutes are accounted for in the available budget, but are not subbed in should any of the players in the first XI not play.
