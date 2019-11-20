---
calendar: ml
post_year: 2019
post_day: 22
title: Knitting + Machine learning = ❤️
ingress: 'About machine learning, knitting and stuff'
description: ''
authors:
  - Henrik Aasen Kjeldsberg
---
You heard it here first: machine learning and knitting are officially in a relationship! Yes, knitting, the act of transforming yarn into textile and fabric.

Thanks to a group of researchers at the Massachusetts Institute of Technology, there exists software which you can feed a picture of a garnet, and produces instructions for that exact pattern, used by automated knitting machines – they call it “Inverse knitting”. While on the subject, they also created a software which lets you design your own knitwear, without any knitting or coding experience required. Amazing!

So let's take a look at _Inverse knitting!_  

Today's standard is using advanced knitting machines for mass production of garnets and textiles. However, these require pre designed recipes, and are maintained by low-level programming code, hence requiring a certain expertise to develop and maintain. This was the motivation behind the development of Neural Inverse Knitting; the intersection between machine learning and knitting. 

So how does one combine machine learning and knitting? You might consider this an unlikely combination, however, there is a logical approach behind the problem. In essence, this is a problem in pattern recognition - a classic problem in the world of machine learning.

The solution presented in the article employs methods such as generative adversarial networks (GAN), and Convolutional Neural Networks (CNN) to automate the generation of knitting patterns for industrial use. In particular, GAN was applied to generate artificial textile samples used for training the network, whereas CNN is used to generate the main “image to recipe”-model, named Img2Prog.

The steps to solving this unconventional combination of fields is as follows. First, a knitting language was defined, describing knitting patterns. This knitting language consists of 17 operations, and is possibly recognisable by knitting enthusiasts. Here we find operations such as knit, purl, tuck, and miss to name a few. The rest of the operations are listed in the figure below.

![Knitting language](https://i.ibb.co/THbgRB8/knit0.png)

Second, we need training data. For this particular case, the training data consisted of several pictures of patterned clothing. However, after collecting 2,000 real photographs of patterns depicted from clothing and textiles, the authors realised that they had to resort to artificial data. In combination with real data, artificial data plays a strong role and is both quick and inexpensive to produce. To overcome this challenge, the real data was melded with the synthetic images, to create regularised synthetic images of knit patterns, using GAN. This way there was a consistency between the real and artificial data. 

Illustration of the application, and the pipeline for obtaining a program which translates patterns into knitting instructions. 

Finally, the model, in this case a prediction network, was trained using CNN. For reference, the entire process is visualised in the figure above. The resulting predictor, named Img2Prog, could now be fed an image of a  pattern as input, producing the recipe for the corresponding pattern as output. Amazing!

![Neural inverse knitting pipeline](https://i.ibb.co/wgxqHzD/knit1.jpg)

**References**:

Article: <https://arxiv.org/pdf/1902.02752.pdf>

Homepage of the projects: <http://deepknitting.csail.mit.edu/>
