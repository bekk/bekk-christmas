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

Picking the right Fantasy team with data science is no new subject<sup>1</sup>, but we thought we’d give it a go and compare two classic prediction models: linear regression and a basic neural network. We’ll train the models on historical data, evaluate their performance<sup>2</sup>, and finally set up our ultimate team for the pinnacle of Premier League – Boxing Day⚽

The process for both models is built on three steps. First, the models are trained to predict expected amount of Fantasy points achieved by each Premier League player in any round, based on a set of input data. Second, the models try to predict the points scored by each player in an out-of-sample round. Third, the simplex algorithm is used to solve the LP problem of constructing a team of 11 players fulfilling the constraints given by the Fantasy rules, maximizing number of expected points. Still hanging on? Let’s dive in!

## 1. Training the models

### Input data

The models are trained using data provided by GitHub user [Vaastav Anand](https://github.com/vaastav/Fantasy-Premier-League), who publishes all Fantasy results and stats after each gameweek. The input parameteres for each individual player in any given round are:

* Position (four variables)
* Team (20 variables)
* Opponent team (20 variables)
* Home/away game (one variable)
* Form the last 5 games (Fantasy's own [ICT index](https://www.premierleague.com/news/65567), normalized) (five variables)

This results in 50 input variables in total, with actual Fantasy points achieved in each round as the dependent variable. All data from previous rounds are used in the training phase to predict a given round (i.e., predicting results in round `n`, the training sample contains data from rounds `n-1, n-2, ... , 1`). Predicting round 19, data from rounds 1 to 17 was used<sup>3</sup>.

### Designing the models

The linear regression is set up with the assumed weakest team as baseline on the team variable, and the assumed strongest team as baseline on the opponent team variable. An ordinary least squares regression is performed. The neural net uses four layers: Input layer (50 neurons), two middle layers (50 and 30 neurons) and finally an output layer (one neuron). All layers use the relu activation function, except the output which uses a linear activation function. There is also added a [dropout layer](https://towardsdatascience.com/machine-learning-part-20-dropout-keras-layers-explained-8c9f6dc4c9ab) between the two middle layers with a dropout probability of 0.2. The model uses mean squared error as loss function and the [Adam](https://keras.io/optimizers/#adam) optimizer.

## 2. Predicting points

After fitting the models, they predict points achieved by all the Premier League players in the out-of-sample round – in our case, round 19. Injured or suspended players are not predicted.

## 3. Selecting the XI

After predicting points scored, the [simplex algorithm](https://en.wikipedia.org/wiki/Simplex_algorithm) is used to construct a team maximizing total expected points. The official [Fantasy rules](https://fantasy.premierleague.com/help/rules) are set as constraints, including the £100m budget. Substitutes are accounted for by leaving room in the budget for the cheapest possible players to fill up the squad, but are not selected (and consequently, no players are subbed on should any in the first XI not play). The player with the highest amount of expected points is set as captain, and the second highest as vice captain.

### Results from earlier rounds

The models have been run to demonstrate their 

### Gameweek 19 teams

![Fantasy Screenshot, Regression Team](/assets/reg_pred_gw19.png)

![Fantasy Screenshot, Neural Network Team](/assets/nn_pred_gw19.png "Neural Netters F.C.")

### Next steps

<sup>1</sup>Examples of articles written in [2017](https://medium.com/@277roshan/machine-learning-to-predict-high-performing-players-in-fantasy-premier-league-3c0de546b251), [2018](https://towardsdatascience.com/beating-the-fantasy-premier-league-game-with-python-and-data-science-cf62961281be) and [2019](https://medium.com/@sol.paul/how-to-win-at-fantasy-premier-league-using-data-part-1-forecasting-with-deep-learning-bf121f38643a)

<sup>2</sup>We compare results from our models with the average human score for each round. This implicitly relies on the false premise that all human players can pick a brand-new squad (in practice, use a wildcard) every single round, so the machine scores should ideally be slightly devaluated.

<sup>3</sup>The GitHub data is usually published 2-3 days after the last game of the round (which was played yesterday, on the 22nd). Further, since the Liverpool and West Ham match was postponed, the form data would be incomplete.
