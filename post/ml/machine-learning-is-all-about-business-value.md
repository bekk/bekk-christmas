---
calendar: ml
post_year: 2019
post_day: 4
title: Machine learning is all about business value
image: >-
  https://images.unsplash.com/photo-1521828847175-b6d80fc5a7fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  We have now learnt the basics of machine learning and what it is. But before
  we look more into the details of how to do machine learning we must first talk
  briefly about why. In this blog post we will present our high-level thoughts
  about practical application before diving in to a real-life exampe from our
  work for Center for Service Innovation (CSI).
links:
  - title: Center for Service Innovation
    url: 'https://www.nhh.no/en/research-centres/csi/aboutold/'
authors:
  - Stian Daazenko
---
\##Introduction##
When talking about the practical application of machine learning and AI we often hear about the events and the extrems. A lot of articles talk about the history of machine learning, from the turing test, created in the wake of the second world war codebreaking revolution, via computers beating grand masters at chess, to the creation of the self-driving cars and autonomous robots of today. Interesting and cool stuff indeed, but most companies doesn‘t break codes, play chess or build inteligent cars. So when talking about practical application of machine learning in this blog post we‘ll be targeting some more mainstream business challenges (Sorry, Tesla!).

We‘ll start our story with the early adoption of machine learning for the purpose of cost reduction and ease of operation. Some of the first industries to find good use of machine learning were companies struggling with maintenance of physical objects like elevators and wind turbines. In these early cases, sensor data was used to read patterns on well-functioning machines, and replace them when this pattern was broken (but before it actually broke). This was opposed to replacing them at certain defined intervals, the way they previously did. The gains from this way of thinking was massive, and other ways of using similar thinking for cost reduction purposes was soon developed, like delay prediction and demand forecasting.

Gradually, economists and marketers opened their eyes to several other opportunities for using these tools for more customer facing purposes, both to identify better value propositions and to increase sales and revenue. Some relevant examples of this are..., whereof ... is especially interesting. In the illustration below we have illustrated some of the practical applications from cost reduction, value proposition and revenue generation. 

We‘ll look into some of these in more detail during the course of this calendar although we will not be able to explain them all. To exemplify we‘ll present one application we have spent quite some time with the last couple of years.

\##A practical challenge – increasing the financial value of customers
Introduce CSI – what it is and the purpose of our work

The need for better decision support for service investments was a particular requirement from CSI's business partners back in 2015. This was based on their common challenges and corresponding difficulties when applying traditional profitability models to calculate ROI. For this reason, the Service Innovation Economics research theme (SIE) was created.

Initially in our work it soon became clear that this challenge was about more than the creation of a new ROI model. To really address the problem, we first had to look at the basic mindset behind how profitability is calculated.

Traditional profitability models are based on product-based logic. For products, value creation has historically been linked to standardized deliveries of physical products through a linear process, from production to consumption. For services, value creation is much more complex. Value creation takes place in dialogue with the customer over time, and through co-creation in the customer's value network. Thus, services become more specialized and the lines between production and consumption get blurred. In this type of environment, the traditional profitability models fall short.

Our focus has been to develop profitability models with customer-based logic. In such models the value of your customer relationships, and not the value of individual services and products, are the subject for profitability analysis. A key factor in this work has been to establish Customer Lifetime Value (CLV) and Customer Equity as the basic measurements of profitability. Another key factor has been to develop models where we can segment the customer base based on future profitability potential. This is a prerequisite for doing service development targeted at customers that are most profitable over time.

CLV can be defined as the future cash flow from a given customer relationship. The sum of CLVs for all current and future customers is called Customer Equity (CE) and represents the total value of a company’s customer base.

CLV has several fields of application, including:

* Identify the right customers to spend money on and where the potential for increased profitability is largest
* Deliver personalized customer service and marketing to improve customer experience and boost sales
* Create a business case for investments. ROI is then represented as the change in Customer Equity

However, the data needed to calculate CLV does not come for free. In its simplest form CLV still requires estimation of future contribution margins and retention rates, as well as a discount rate to create the discounted cash flow, exemplified by the typical CLV definition:

In practice we often need more fine-grained representations of CLV to take proper decisions. The construct of the calculation itself also vary, depending on the business environment. 
Hence, CLV is not a trivial number to estimate, and requires relatively complex modeling and calculation. We believe this is an important reason why CLV has had limited practical implementation. Model simplification is often proposed as the solution, but is there another way?

\##Using machine learning to solve the problem
We believe CLV-calculations is an excellent case for machine learning. Based on available customer information, the computer can identify patterns, build models and estimate CLV values – much faster and with more complexity than a human can handle. The model can also self-improve as more data becomes available. This represents a new way of working with CLV-calculations, where the model and key parameters are defined along the way:

Too difficult and expensive, you say? Contrary to some beliefs such a model can be created and set up relatively easy, with low investment costs. There are examples of Norwegian companies that already have a fully functional CLV-model running, with very promising results!
