---
calendar: ml
post_year: 2019
post_day: 9
title: 'Lies, damned lies and statistics'
image: >-
  https://images.unsplash.com/photo-1532604146921-0e8bd9ab0891?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  Is it straight forward to collect unbiased data for the average spending on
  Christmas gifts in Oslo? Did Nicolas Cage cause swimming pool drownings in US
  in 1999 to 2009? And how can your understanding of Bayesian probability help
  to prevent your doctor from erroneously removing your breasts? Read on to find
  out.
links:
  - title: More spurious correlations
    url: 'http://tylervigen.com/spurious-correlations'
  - title: Do doctors understand testresults
    url: 'https://www.bbc.com/news/magazine-28166019'
  - title: Bayes' probability
    url: 'http://pi.math.cornell.edu/~mec/2008-2009/TianyiZheng/Bayes.html'
---
Statistics are the foundation for machine learning algorithms. In a world where we are bombarded by apparently conceivable statistics, being able to see through the faults that some of the facts and figures that statistics represent is more essential than ever.



###What is the average spending on Christmas gifts in Oslo?

Before performing any statistical analysis, it is essential to collect data from a sample of the population – as gathering data from the whole population in most cases would be impractical or too costly. However, it might be more difficult than we think to ensure that our sample is unbiased and representative.

![](/assets/ml_9_pic1.png)



Let’s say we want to conduct a survey on the spending on Christmas gifts in Oslo by using random passers-by outside Oslo Central Station. Are these people a representative sample for Oslo’s population? What about the people that are not passing by Oslo Central Station that day? What about the people that avoids your survey? What about the people that answers what he/she thinks you, as an interviewer, would like to hear? What about the people that adapt their answers to minimize the time spent answering the survey as they are in a hurry? What about those who modify their responses to give a better impression of themselves? Asking critical questions to the data underlying any statistical analysis – or machine learning model - are important. If you put _garbage in_ your statistical model or machine learning algorithm, you will likely receive _garbage out_ of the model.

###Is Nicolas Cage responsible for people drowning?

![](/assets/ml_9_pic2.png)



A common public misunderstood concept within statistics is that correlation imply causality – which is not true. As an example, there is a positive correlation between the number of films Nicolas Cage appeared in and the number of people who drowned by falling into a swimming-pool from 1999 to 2009. Does this mean that if Nicolas Cage in 2009 decided not to appear in any movies, fewer people would have drowned? Or is there a third confounding variable that is responsible for this correlation? Obviously, there is no causality in this case despite the evident correlation. In less clear situations, it might be a handy rule to think twice when presented with causal arguments that apply correlation as a part of the rationale.



###Why might understanding Bayesian probability prevent your doctor from removing your breasts?

Doctors’ conceivable confusion about statistics might lead catastrophic consequences – unless you, as a patient, have some insight in Bayesian probability.



Let’s take an example. Assume the following: You are a woman testing positive for breast cancer and want your doctor to tell you the probability. Your doctor finds the following facts:

1. The probability that a woman has breast cancer is 1%
2. If a woman has breast cancer, the probability that she tests positive is 90%
3. If a woman does not have breast cancer, the probability that she still tests positive is 9%



What answer does your doctor give you, and is it the correct one? 



According to BBC, with a test conducted on 1000 practicing gynecologists in 2007, almost half of the responses from these doctors erroneously responded that you would have a 90% chance of having breast cancer. In effect, these answers implied that the doctors believed that the probability for having breast cancer if you test positive is the same as the probability for testing positive if you have breast cancer – which is not the case.



However, using Bayesian probability, the actual probability for a woman with a positive result from a mammogram having breast cancer is about 10%. The formula for computing this is as follows:



Let PT = "probability to get a positive test result" and let BC = "the probability that a woman has breast cancer". Then, the probability that you have breast cancer given that you have a positive result is:

![](/assets/ml_9_pic3.png)



Next time, if your doctor recommends you to remove your breasts due to this positive test result, perhaps you should ask for more details on the reasoning behind the result.

![](/assets/ml_9_pic4.png)



###Be aware 

Living in a time where everyone can be an expert at the click of a button, facts are too often biased, misinterpreted, or pure disinformation. Hopefully, these examples will trigger you to pause and think critically next time you are presented with conclusions based on statistics.
