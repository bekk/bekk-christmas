---
calendar: ml
post_year: 2019
post_day: 10
title: Neural Networks
image: >-
  https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  If you have paid some attention to the artificial intelligence community the
  latest years, you’re bound to have heard of neural networks. These kinds of
  computational algorithms have pushed the boundaries of machine learning in
  pretty much every sub field there is. But what are they really?
links:
  - title: Gradient Descent
    url: >-
      https://towardsdatascience.com/understanding-the-mathematics-behind-gradient-descent-dde5dc9be06e
  - title: Neural Networks and Deep Learning on Coursera
    url: 'https://www.coursera.org/learn/neural-networks-deep-learning'
authors:
  - Jørgen Wilhelmsen
---
Neural networks are computer algorithms that are loosely modelled after the human brain. Our brain can do what it can because of interconnected _neurons_. Simply put, neurons are entities that receive information through a set of synapses, perform some sort of calculation, and pass the result to other neurons through its outgoing synapses.

![](https://i.ibb.co/9tgycJ6/1-e-BMwp-BBbo-AXgqsaww-OKk-Pw.png)

Artificial Neural Networks are computational algorithms that try to mimic this behaviour. As neurons are fundamental in our brain, artificial neurons are central in artificial neural networks. They work the same way; each neuron receives a set of input signals, combines them in some way, and passes the information along. The real power of artificial neural networks emerges when you connect layers of neurons together to form a network.

![](https://i.ibb.co/QpbZYC3/ANN1.jpg)

Traditional artificial neural networks are structured in layers. Each neuron combines its input signals and passes it along to the neurons in the next layer. The output of the last layer is the output of the network. The shape and form of the output depends on what you want the network to do. If you want it to recognize cats - a simple digit, signifying a cat or not, would suffice. 

These neural networks are trained to do specific tasks. If we want our network to tell whether an image depicts a cat or dog, we have to train it to do so. This is done by first feeding an image of a cat or a dog to the network. The network then does its internal computations, before an output is produced. This output is compared with the truth. If the network thinks it was given a picture of a dog when in reality the picture was of a cat, it will alter the behaviour of its neurons slightly in order to make a better prediction of a cat in the future. The network uses an algorithm called _gradient descent_ to modify the behavior of its neurons. The specifics of gradient descent is beyond the scope of this article, but I'll include a link below if you want to learn more. 

![](/assets/ml_10_pic4.gif)

In order to reach near-human performance, the network needs to be presented with a lot of labelled pictures of cats and dogs. Each time the network makes a wrong prediction, the neurons are modified slightly. After a lot of modifications, the neurons are able to work together to identify whether or not the given image is of a cat or dog. 

These networks can be used for much more complicated tasks than differentiating between cats and dogs. Artificial Neural Networks have pushed the boundaries of pretty much every sub-field within machine learning, from self-driven cars, voice assistants, automatic video-game playing, content recommendation - perhaps this article was recommended to you based on predictions from a neural network. 

I hope this gave you a quick introduction to neural networks. By itself, each neuron is not very complicated. But stacking them together really proves how the whole can be greater than the sum of its parts. If you want to delve further into the world of artificial neural networks along with practical knowledge of how to implement them, I recommend [this Coursera course](https://www.coursera.org/learn/neural-networks-deep-learning) by Andrew Ng.

Thank your for reading, and merry Christmas!
