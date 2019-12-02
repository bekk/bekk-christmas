---
calendar: ml
post_year: 2019
post_day: 17
title: How to talk like a machine
image: >-
  https://images.unsplash.com/photo-1414389754010-8cf70521937b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  When I decided to write a blog post called "How to talk like a machine", I
  discovered that the question of how to write a simple blog post had a lot of
  deep implications. The follow-up question was "How can I make my blog post
  read like a machine-made blog post?".

  It turns out that there is a difference between writing a single paragraph of
  prose and a long essay in a natural language. There are a few things you need
  to be aware of when you write a machine-made blog post.
links:
  - title: Word2Vec
    url: 'https://en.wikipedia.org/wiki/Word2vec'
  - title: GloVe
    url: 'https://nlp.stanford.edu/projects/glove/'
  - title: BERT
    url: 'https://github.com/google-research/bert'
  - title: GPT-2
    url: 'https://openai.com/blog/better-language-models/'
authors:
  - Jørgen Wilhelmsen
  - Michael Nordmo
---
Did something feel a bit off about the paragraph above? That may be because it was written by an artificial neural network. The neural network is called GPT-2 and is a state of the art text generator. GPT-2 was given the sentence _When I decided to write a blog post called "How to talk like a machine"_ as a starting point and came up with the rest of the paragraph by itself. In the following sections we will go through some fundamental theory regarding text generators.

Simply put, a text generator is a computer algorithm that generates text. There are different approaches, but we will focus on approaches based on neural networks in this post. The core goal for a text generator can be defined as _"Given the text I have seen, what is the text most likely to follow?"_ and this goal can easily be translated into a prediction task for a neural network.

In order to train a network to perform this task, we have to represent words as numbers in some way. Luckily, some smart people have figured out a great way to do this through a concept know as word vectors. A word vector is a numeric vector representation of a word. These vector representations are often learned from a gigantic text corpus and captures relationships between words in the language. Some common algorithms for generating word vectors include Word2Vec, GloVe and BERT. Transforming a sentence into a sequence of vectors is the first step of a text generator.

Neural networks for text generation are usually designed to take a sequence of words (represented as vectors) as input, and output probabilities for the next word. The network is trained on sentences from a corpus of text we want it to mimic. We feed the network with sequences of words from the training corpus and the network tries to predict the word that follows. The more correct words the network predicts, the better it will be at mimicking the training text.

After the network is trained it has learned which words are most likely to follow each other in the training data. We can then generate text as follows:

1. Feed a seed to the network. This can be a sentence we want the network to work on from or just an empty string.
2. Make the network predict the probabilities for the next word.
3. Choose one of the words with the highest probability and add it to the end of the current sentence.
4. Feed the augmented sentence back to the network and repeat the process from step two.

Steps 2-4 can be repeated as many times as wanted to generate a text sequence of the length we need. The image below illustrates how the sequence of words are propagated through the neural network to produce the next word in the sentence.

![Illustration of how a neural network can generate a text sequence](/assets/ml_17_pic1.gif)

You now have a basic understanding of how a text generator works. If you want to play with the text generator used to generate the first paragraph in this post you can visit <https://talktotransformer.com> and feed it a seed of your own. Have fun!
