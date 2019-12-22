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
links:
  - title: 'https://github.com/vaastav/Fantasy-Premier-League'
    url: Fantasy Data
authors:
  - Tobias R. Pettrém
---
![]()

If you’re a below-average Fantasy Premier League performer and an above-average data science enthusiast, we have at least two things in common – and you’ve found exactly the right article!

Picking the right Fantasy team with data science is no new subject<sup>1</sup>, but we thought we’d give it a go and compare two classic prediction models: linear regression and a basic neural network. We’ll train the models on historical data, evaluate their performance, and finally set up our ultimate team for the pinnacle of Premier League – Boxing Day⚽

The process for both models is built on three steps. First, the models are trained to predict expected amount of Fantasy points achieved by each Premier League player in any round, based on a set of input data. Second, the models try to predict the points scored by each player in an out-of-sample round. Third, the simplex algorithm is used to solve the LP problem of constructing a team of 11 players fulfilling the constraints given by the Fantasy rules, maximizing number of expected points. Still hanging on? Let’s dive in!

## 1. Training the models

### Input data

The models are trained using data provided by GitHub user [Vaastav Anand](https://github.com/vaastav/Fantasy-Premier-League), who publishes all Fantasy results and stats after each gameweek. The input parameteres for each individual player in any given round are:

* Position (four variables)
* Team (20 variables)
* Opponent team (20 variables)
* Home/away game (one variable)
* Form the last 5 games (Fantasy's own [ICT index](https://www.premierleague.com/news/65567), normalized) (five variables)

This results in 50 input variables in total, with actual Fantasy points achieved in each round as the dependent variable. All data from previous rounds are used in the training phase to predict a given round (i.e., predicting results in round `n`, the training sample contains data from rounds `n-1, n-2, ... , 1`). Predicting round 19, data from rounds 1 to 17 was used<sup>2</sup>.

### Designing the models

The linear regression is set up with the assumed weakest team as baseline on the team variable, and the assumed strongest team as baseline on the opponent team variable. An ordinary least squares regression is performed. The neural net uses four layers: Input layer (50 neurons), two middle layers (50 and 30 neurons) and finally an output layer (one neuron). All layers use the relu activation function, except the output which uses a linear activation function. There is also added a [dropout layer](https://towardsdatascience.com/machine-learning-part-20-dropout-keras-layers-explained-8c9f6dc4c9ab) between the two middle layers with a dropout probability of 0.2. The model uses mean squared error as loss function and the [Adam](https://keras.io/optimizers/#adam) optimizer.

## 2. Predicting points

After fitting the models, they predict points achieved by all the Premier League players in the out-of-sample round – in our case, round 19. Injured or suspended players are not predicted.

## 3. Selecting the XI

After predicting points scored by all players, the [simplex algorithm](https://en.wikipedia.org/wiki/Simplex_algorithm) is used to construct a team maximizing total expected points. The official [Fantasy rules](https://fantasy.premierleague.com/help/rules) are set as constraints, including the £100m budget. Substitutes are accounted for by leaving room in the budget for the cheapest possible players to fill up the squad, but are not selected (and consequently, no players are subbed on should any in the first XI not play). The player with the highest amount of expected points is set as captain, and the second highest as vice captain.

### Results from earlier rounds

Results achieved by the models have been compared with the average score of all Fantasy players in a given round<sup>3</sup>. The results are displayed in the table below:

|       | Regression | Neural Network | Average |
|-------|:----: |:----: |:----: |
| GW 15 |     54     |       26       |    49   |
| GW 16 |     69     |       89       |    54   |
| GW 17 |     69     |       52       |    56   |

### Gameweek 19 teams

| ![Regression Team](/assets/reg_pred_gw19.png) | ![Neural net team](/assets/nn_pred_gw19.png) |
|:---:|:---:|
| The Regressed Registas. Cost: £79.5m                            | The Neural Netters. Cost: £63.2m                          |

As we see, the two teams are fundamentally different. The regression settles on a conventional 3-5-2 formation, with familiar faces such as Vardy, Lundstram and De Bruyne, which were in fact the top three selected players in GW 18. A great performance against Aston Villa in round 17 paired with a supposedly managable home match against Watford makes Lundstram's teammates Fleck and Stevens favorable selections. Vardy and Maddison will hope to shorten the Liverpool lead on Boxing day, while Maupay needs to bounce back from a disappointing home performance against Sheffield United on Saturday. A slightly weaker opponent gives De Bruyne the edge as captain over Mohamed Salah.

The neural network has opted for a refreshing 5-2-3 formation, with large emphasis on Sheffield and Aston Villa defenders. Doherty and Neves will face a tough task in Pep Guadiola's men on Thursday, while Christian Benteke is still waiting for his first goal of the 19/20 season. Notably, all players but Martinelli have home matches, which could indicate a substantial preference for this by the model. Abraham should have plenty of chances to prove his worth as captain against the most conceding team of the Premier League season so far. Although the models as mentioned do not specify substitutes, there should be plenty of room in the budget for some decent benchwarmers.

### Next steps

These models have been built primarily to show the value of adding machine learning capabilities to solve problems which require consideration of a large amount of factors. While they are basic and could relatively easily be improved or replaced by more sophisticated models (e.g., some ensemble learning approach or improve data preprocessing with [PCA](https://towardsdatascience.com/principal-component-analysis-intro-61f236064b38)), a more interesting discussion is whether this is in fact a problem worth solving with machine learning.

Modeling all possible variables influencing a player's performance in a given Premier League round is not feasible. The problem of setting up a Fantasy draft is, as most complex problems of this sort, an area where expert humans are likely to continue outperforming automated efforts. However, the value of machine learning, data science and quantitative methods as decision support is indisputable. Letting machines do what they do best – crunching big data sets and discovering deep patterns – and use this insight as guidance for making <i>human</i> decisions, is probably (and perhaps, hopefully) a more rational approach, also for Fantasy Premier League.

<sup>1</sup>Examples of articles written in [2017](https://medium.com/@277roshan/machine-learning-to-predict-high-performing-players-in-fantasy-premier-league-3c0de546b251), [2018](https://towardsdatascience.com/beating-the-fantasy-premier-league-game-with-python-and-data-science-cf62961281be) and [2019](https://medium.com/@sol.paul/how-to-win-at-fantasy-premier-league-using-data-part-1-forecasting-with-deep-learning-bf121f38643a)

<sup>2</sup>The GitHub data is usually published 2-3 days after the last game of the round (which was played yesterday, on the 22nd). Further, since the Liverpool and West Ham match was postponed, the form data would be incomplete.

<sup>3</sup>We compare results from our models with the average human score for each round. This implicitly relies on the false premise that all human players can pick a brand-new squad (in practice, use a wildcard) every single round, so the machine scores should ideally be slightly devaluated.

