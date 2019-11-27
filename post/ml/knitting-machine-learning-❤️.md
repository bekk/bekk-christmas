---
calendar: ml
post_year: 2019
post_day: 22
title: Knitting + Machine learning = ❤️
image: >-
  https://images.unsplash.com/photo-1475053134893-08eb5944b956?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80
ingress: 'When knitting met machine learning, an untold love story.'
description: ''
links:
  - title: Article
    url: 'https://arxiv.org/pdf/1902.02752.pdf'
  - title: Homepage of Deep Knitting
    url: 'http://deepknitting.csail.mit.edu/'
  - title: Homepage of Knitting Skeletons
    url: 'http://knitskel.csail.mit.edu/'
authors:
  - Henrik Aasen Kjeldsberg
---
You heard it here first: machine learning and knitting are officially in a relationship! Yes, knitting, the act of transforming yarn into textile and fabric.

Thanks to a group of researchers at the Massachusetts Institute of Technology, there now exists software which when fed a picture of a garnet, produces instructions for that exact pattern, used by automated knitting machines – they call it _Inverse knitting_. While on the subject, they are also the brains behind the project _Knitting skeletons,_ a software which lets you design your own knitwear, without any knitting or coding experience required. Amazing!

Let's take a look at _Inverse knitting!_  

Today's standard is using advanced knitting machines for mass production of garnets and textiles. However, these require pre designed recipes, and are maintained by low-level programming code, hence requiring a certain expertise to develop and maintain. This was the motivation behind the development of _Neural Inverse Knitting_; the intersection between machine learning and knitting. 

So how does one combine machine learning and knitting? You might consider this an unlikely combination, however, there is a logical approach behind the problem. In essence, this is a problem within pattern recognition - a common problem in the world of machine learning.

The solution presented in the article employs methods such as _generative adversarial networks_ (GAN), and _convolutional neural networks_ (CNN) to automate the generation of knitting patterns for industrial use. In particular, GAN was applied to generate artificial textile samples used for training the network, whereas CNN is used to generate the main _image-to-recipe_-model, named _Img2Prog_. We will proceed by looking at the steps to solving this unconventional combination of fields. 

![Knitting language](https://i.ibb.co/THbgRB8/knit0.png)

* First, a knitting language is defined, describing knitting patterns. This knitting language consists of 17 operations, and is possibly recognisable by knitting enthusiasts. Here we find operations such as **k**nit, **p**url, **t**uck, and **m**iss to name a few. The rest of the operations are listed in the figure above.
* Second, we need training data. For this particular case, the training data consisted of several pictures of patterned clothing. However, after collecting over 2,000 real photographs of patterns from clothing and textiles, the authors realised they had to resort to artificial data. In combination with real data, artificial data plays a strong role in data science and machine learning, and is both quick and inexpensive to produce. To overcome the current challenge, the real data was melded with the synthetic images, to create regularised synthetic images of knitting patterns, using GAN. This way there was a consistency between the real and artificial data. 
* Finally, the model, a prediction network, was trained using CNN. For reference, the entire process is visualised in the figure below. The resulting predictor, named _Img2Prog_, could now be fed an image of a pattern as input, producing the recipe for the corresponding pattern as output. Amazing!

<img src="https://i.ibb.co/wgxqHzD/knit1.jpg" width=600px align="middle" />
