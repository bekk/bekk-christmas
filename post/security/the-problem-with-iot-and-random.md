---
calendar: security
post_year: 2019
post_day: 17
title: The problem with IoT and random
image: >-
  https://www.theartist.me/wp-content/uploads/2018/07/jackson-pollock-convergence-famous-paintings-1.jpg
ingress: >-
  “The _s_ in IoT stands for security” is a joke as old as the shared code base
  used in your IoT web-camera. Usually we mock IoT for having little or bad
  security, but the real issue is perhaps that IoT can't have good security.
description: ''
links:
  - title: NIST EaaS
    url: >-
      https://csrc.nist.gov/CSRC/media/Projects/Entropy-as-a-Service/documents/pres_handout_final.pdf
  - title: Cloudflare LavaRand in production
    url: >-
      https://blog.cloudflare.com/lavarand-in-production-the-nitty-gritty-technical-details/
  - title: Tom Scott - The Lava Lamps That Help Keep The Internet Secure
    url: 'https://www.youtube.com/watch?v=1cUUfMeOijg'
authors:
  - Didrik Sæther
---
The problem however is that even if we solve the following headaces of IoT: shared codebases, dependency insecurities, and somehow find a way to keep devices up to date; we still face an even bigger problem! The architecture is flawed, as the devices are not computationaly strong enough to provide randomness.

This means that the devices that make your home or offices smart, is the weakest point of your network, and the easiest way for an intruder to get access to the network.  

Before we dive into why we need randomness, let's look at what random is. Jackson Pollock, the artist that painted the picture on top of this article has a seemingly random way of generating his art. It is however the opposite! There is a lot of non-ranomness to it, Pollock [takes advatage of fluid dynamics](https://www.wired.com/2011/07/pollock-physics/), and some even states that the pictures reflect fractal geometry that shows up in clouds and coast lines. So what is random? Javas implementation of `Random()`? or perhaps `SecureRandom()`? \
Can anything as predictable as a computer be random?\
Without diving into chaos theory and discussing the plilosophy of randomness, lets jump back up to what we need randomness for in computers.

What do we use this randomness for? The short answer is for cryptography. More in detail it is how we generate secrets used for encryption. The link between random and entropy is that entropy is the randomness collected by applications and the operating system.\
In the ye olden days, entropy was calculated from the clock of the computer. So, if you knew the exact time of the computer, it was possible to statistically reduce the number of attempts needed to break the encryption. Today we (hopefully) rely on well tested and hardened libraries for cryptography. These libraries use all sorts of mechanisms for generating entropy. Keyboard timings, or mouse movements, some even use fan noises to generate entropy well. We need something that is random, speaking from a philosophical point; computers are not.. IoT struggles more as it is hard to computationally achieve randomness with cheap and underpowered cpu’s, often no keyboard timings, or mouse movements, that are used to generate randomness. 

NIST perhaps has a solution: Entrypy-as-a-Service, but should we trust a centralized authority for a service of such fundamental importance?

I highly recomend you checkout the link to [NIST](https://csrc.nist.gov/CSRC/media/Projects/Entropy-as-a-Service/documents/pres_handout_final.pdf) proposition for a new service, and [Cloudflares LavaRand](https://blog.cloudflare.com/lavarand-in-production-the-nitty-gritty-technical-details/). If you are the lazy type, you should checkout [Tom Scott's video](https://www.youtube.com/watch?v=1cUUfMeOijg) on LavaRand.
