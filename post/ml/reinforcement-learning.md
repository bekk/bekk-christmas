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
  - title: Deep RL by DeepMind
    url: 'https://deepmind.com/blog/article/deep-reinforcement-learning'
  - title: Deep Q-Network by DeepMind
    url: >-
      https://deepmind.com/research/publications/playing-atari-deep-reinforcement-learning
authors:
  - Tharald Jørgen Stray
---
Machine learning is often divided into three categories: supervised learning, unsupervised learning, and reinforcement learning.

In reinforcement learning, software agents are left to fend for themselves in environments with unknown dynamics, and must learn how to behave by observing how the environment changes as a result of previous states and actions taken. To be able to distinguish between good or bad behaviour, the agent receives rewards and punishments based on the state of the environment, and its actions. 

The policy dictates the behaviour of an agent. The ultimate goal in reinforcement learning is for the agent to learn a policy which will maximize some objective function, often the total reward gained. 

During training, the agent interacts with the environment, and subsequently updates its policy based on the interaction.

![An illustration of the agent/environment interaction.](https://i.ibb.co/qkwCmBR/agent-environment.png)

In some cases, an agent can interact with the environment for multiple steps and episodes at a time, collecting the experiences in what’s called a replay buffer. Then, these experiences can be used in training later. This allows training to be completed in batches, which can be much more effective, especially when neural networks are used as function approximators.

A complete environment run from its initial state until the end is called an episode. Episodes contain some number of time steps, and at each time step the agent receives an observation from the environment, containing the new state and a reward value, and chooses an action, which is then executed in the environment. This repeats until some end condition is met.

The field of reinforcement learning has been around for a long time, but has had limited practical applications. Maintaining state was often done by having a lookup table for all states, which is infeasible for large observation spaces. Using neural networks as function approximators was possible, but learning was unstable, and was considered to be computationally infeasible. These were the main obstacles overcome in the Google DeepMind DQN paper (relevant links), which is said to have sparked this wave of interest in the field of deep reinforcement learning.

![Different Atari games.](https://i.ibb.co/3Fq28gn/atari.png)

The paper, first published in 2013, showcased an approach which utilized deep neural networks as functions approximators in a popular RL algorithm, known as Q-learning. They named the networks Deep Q-Networks (DQN).
