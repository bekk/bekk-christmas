---
calendar: ml
post_year: 2019
post_day: 4
title: 'It’s the economy, stupid!'
image: >-
  https://images.unsplash.com/photo-1521828847175-b6d80fc5a7fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  Up until now we have learnt what machine learning is and looked at some
  initial examples. But before we move on with more details of _how_ to do
  machine learning we must first talk about _why_. In this blog post we‘ll
  present a high-level overview of practical application before diving into a
  real-life example from our work at the Center for Service Innovation (CSI) in
  Norway. The basic concept? It‘s all about business value!
links:
  - title: Center for Service Innovation
    url: 'https://www.nhh.no/en/research-centres/csi/aboutold/'
authors:
  - Stian Daazenko
---
###The business value of machine learning
When people talk about the practical application of machine learning (ML) we often hear about the major events and the extremes. A lot of articles revolve around the history of machine learning and AI, from the [turing test](https://searchenterpriseai.techtarget.com/definition/Turing-test) created in the wake of the WW2 codebreaking revolution, via computers [beating grand masters at chess](https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)), to the creation of the self-driving cars of today. Interesting and cool stuff indeed, but most companies don‘t break codes, play chess or build inteligent cars. So when looking at practical application in this blog post we‘ll be targeting some more mainstream business challenges (Sorry, Tesla).

We‘ll start our story with the adoption of machine learning for the purpose of cost reduction and operational efficiency. Some of the first industries to find good use of machine learning were companies responsible for maintenance of physical objects, like elevators and wind turbines. In these early cases, sensor data was used to read patterns on well-functioning machine parts and replace them when this pattern was broken, so-called predictive maintenance. This as opposed to preventive maintenance, where critical parts are replaced at pre-defined intervals. The financial gains from this new way of thinking were massive, and other ways of using ML for operational analysis were soon developed, like demand forecasting, delay prediction and various types of process automation.

Gradually marketers and business developers also opened their eyes to ML, and new areas of application were born. In these use cases there are generally less focus on physical objects and more focus on the fuzzy, intangible asset called customers. Better value propositions to customers can be developed through for example automated a/b testing, personalized news feeds and market basket analysis (You know, that Netflix/Amazon recommendation thing everyone used to talk about). For those concerned with customer sales and revenue, well-known examples include churn detection, predict purchase and discrete choice analysis for price optimization. 

Each of these use cases are in themselves pretty interesting, and we could easily go on and on to describe them more in detail. But that would require an unreasonable long blog post. So we‘ll instead leave you with a summary of some of the application areas we find most interesting, categorized according to the business value they provide (kind of), before providing a short example. 

![](/assets/ml_4_pic1-white-background.png)

###Example: Using machine learning to increase customer profitability

One of the application areas described in the illustration above is to calculate Customer Lifetime Value or [CLV](https://en.wikipedia.org/wiki/Customer_lifetime_value). CLV can be defined as the future cash flow from a given customer relationship. The sum of CLVs for all current and future customers is called Customer Equity and represents the total value of a company’s customer base. CLV has several fields of application, including:

* Identify the right customers to spend money on and where the potential for increased profitability is largest
* Deliver personalized customer service and marketing to improve customer experience and boost sales
* Create a business cases for investments, where ROI is represented as the change in Customer Equity
* Estimate a company’s financial value (For service-oriented companies Customer Equity is considered to be a good proxy)

The importance of CLVs was one of the key factors in the work Bekk did for the [Center for Service Innovation (CSI)](https://www.nhh.no/en/research-centres/csi/aboutold/) at the Norwegian School of Economics (NHH) that recently finalized its work. Bekk had the main responsibility for one of the research themes at CSI (Service Innovation Economics), with the aim of developing methods to measure the financial effects of service innovations. 

To summarize, our research required us to develop profitability models with customer-based logic, where CLV and Customer Equity are established as the basic measurements of profitability. However, the data needed to calculate CLV does not come for free. Even in its simplest form CLV requires estimation of future contribution margins (the yearly future profit from a customer) and retention rates (probability that a customer stays with us for another period), as well as a discount rate to create a cash flow, illustrated by the typical CLV definition below: 

![](/assets/ml_4_pic2-white-background.png)

In practice we often also need more fine-grained representations of CLV to do real-life calculations. Hence, CLV is not a trivial number to estimate, and requires relatively complex modeling and calculation. Even though CLV is a well-established concept, we believe this is an important reason why CLV has had limited practical implementation. 

Stuck with what seemed to be too complex calculations in our research; in came machine learning in white and shining amour. Without going into all the details: Based on available customer information, computers can identify patterns, build models and estimate CLV values – much faster and with more complexity than a human can handle. The model can also self-improve as more data becomes available. This represents a new way of working with CLV-calculations, where the model and key parameters are defined as we go along:

![](/assets/ml_4_pic3-white-background.png)

Too difficult and expensive, you say? Contrary to some beliefs such a model can be created and set up relatively easy, with low investment costs. In our research we also encountered Norwegian companies that already have a fully functional CLV-model running, with very promising results. And even better: When you have a ML model using customer data running, you have a good foundation for expanding your model to support other areas of application, as seen in the illustration further up. 

That seems like an excellent platform for generating business value, wouldn’t you agree?
