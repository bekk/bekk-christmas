---
calendar: ml
post_year: 2019
post_day: 6
title: How good is a model based on historical data?
image: >-
  https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  Machine learning algorithms are helping us predict the future by learning
  patterns from past observations. How does this effect the way we assess our
  models?
authors:
  - Jonas Nouri
---
Go to Google Translate and type in the sentence “He is a nurse, she is a doctor”. If you translate this sentence into Hungarian and then back to English, the translation reads “She is a nurse, she is a doctor”. This would probably enrage everyone who is concerned with women’s rights and equal opportunities in the workplace. The same thing happens if you translate the sentence into Finnish or Estonian. Also, the Finnish language has the gender-neutral pronoun hän that can mean either he or she. The screenshot below exemplifies how Google Translate chooses to interpret this pronoun in two different cases.

![](/assets/ml_6_pic1.png "Translating two sentences from Finnish to English illustrates how the pronoun hän is interpreted differently")

This phenomenon is known as gender bias. Could it be that Google secretly is anti-feminist or is it simply that the translation algorithm is not good enough? 

There are several ways to determine the accuracy of our machine learning models. Among the most popular is _R-squared_, which is a statistical measure of how close the data are to the fitted regression line. It is always a number between 0 and 1 and indicates the proportion of total variability that is explained by our model. A high number usually indicates a good fit for our model. Sometimes, however it is not enough to ensure a good model, we also need to consider the data that we feed into the model as well. 

In our example from Google Translate we experienced a bias stemming from the training data. The machine learning model, or any other predictive model for that matter, is trying to tell us what will happen next based on what has already happened. This time the algorithm was trained using data or literature in which the word _she_ occurred in relation to words like nanny and nurse more often then the word he did. Historically women have been overrepresented in these professions and this is reflected in the available literature. Therefore, when trying to predict or translate our sentence the chance of placing the feminine pronoun with these words is more likely to reflect the pattern observed in the training data. The problem can be attributed to a biased training set that is not representative for the predictions we attempt to make and we get the results observed above regardless of how good the model is by standard measures. 

Biases are very hard to eliminate completely when we use historical data in our models, but there are a few simple things that we as data scientist can do to reduce them: 

* **Be aware** of the biases and thoroughly think through how your models are being used. Acknowledging the shortcomings of the historical data reduces the chances of misinterpreting the results.
* Ensure the training set is as **representative as possible**. Our models are rarely universally applicable to datasets. 
* **Split your data into cohorts**. This ensures that your model is more likely to be unbiased for the range of data that it represents. 

Have an unbiased Christmas!
