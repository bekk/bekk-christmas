---
calendar: ml
post_year: 2019
post_day: 18
title: Reinforcement learning
image: >-
  https://images.unsplash.com/photo-1563209259-2819dbb22d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
ingress: >-
  From the moment they’re born, animals _learn_ by interacting with their
  surrounding environment. The basic question in the field of reinforcement
  learning is: can machines do the same?
links:
  - title: Deep Reinforcement Learning by DeepMind
    url: 'https://deepmind.com/blog/article/deep-reinforcement-learning'
  - title: Deep Q-Networks by DeepMind
    url: >-
      https://deepmind.com/research/publications/playing-atari-deep-reinforcement-learning
  - title: Spinning Up in Deep RL by OpenAI
    url: 'https://spinningup.openai.com/en/latest/'
authors:
  - Tharald Jørgen Stray
---
Machine learning is often divided into three basic paradigms: supervised learning, unsupervised learning, and reinforcement learning (RL).

In reinforcement learning, software agents are left to fend for themselves in environments with unknown dynamics, and must learn how to behave by observing how the environment changes as a result of previous states and actions taken. To be able to distinguish between good or bad behaviour, the agent receives rewards and punishments based on the state of the environment, and its own actions.

The _policy_ dictates the behaviour of an agent. The ultimate goal in reinforcement learning is for the agent to learn a policy which will maximize some objective function, often the total reward gained. A _value function_ is often used to keep track of the expected values of certain states, or state-actions pairs. The value function can often be used to derive optimal actions directly.

During training, the agent interacts with the environment, and subsequently updates its policy based on the interaction.

![An illustration of the agent/environment interaction.](https://i.ibb.co/qkwCmBR/agent-environment.png)

In some cases, an agent can interact with the environment for multiple steps and episodes at a time, collecting the experiences in what's called a replay buffer. Then, these experiences can be used in training later. This allows training to be completed in batches, which can be much more effective, especially when neural networks are used as function approximators.

A complete environment run from its initial state until the end is called an _episode_. Episodes contain some number of time steps, and at each time step the agent receives an observation from the environment, containing the new state and a reward value, and chooses an action, which is then executed in the environment. This repeats until some end condition is met.

Recently, the field of _deep_ reinforcement learning (DRL) has seen a surge of interest in the academic world. Deep reinforcement learning simply refers to reinforcement learning algorithms which use deep neural networks as function approximators, mostly to represent the policies and value function discussed above.

The field of reinforcement learning has been around for a long time, but has had a limited set of practical applications. Maintaining state was often done by having a lookup table for all states, which is infeasible for large observation spaces. Using neural networks as function approximators was possible, but learning was unstable, and was considered to be computationally infeasible for complex problems. 

These were the main obstacles overcome in the Google DeepMind DQN paper (see relevant links), which is said to have sparked this wave of interest in the field of deep reinforcement learning.

![Different Atari games.](https://i.ibb.co/3Fq28gn/atari.png)

The paper, first published in 2013, showcased an approach which utilized deep neural networks as functions approximators at scale, in a popular RL algorithm known as Q-learning. They named the networks Deep Q-Networks (DQN). You can read more about the practical applications of reinforcement learning in tomorrow's blog post. Stay tuned!

This blog post is aimed at people with little to no experience with machine learning. Therefore, it is fairly superficial, and devoid of any scary mathematics. If you have a technical background and are looking for more in-depth resources, I strongly recommend checking out Spinning Up by OpenAI (link below). It includes theory, exercises, well documented implementations of cutting edge algorithms, and references to relevant papers and other resources. I would also like to recommend two great books: “Reinforcement Learning: An Introduction” by Sutton & Barto, and “Deep Reinforcement Learning: An Overview” by Yuxi Li. 

Thanks for reading!
