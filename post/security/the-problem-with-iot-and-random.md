---
calendar: security
post_year: 2019
post_day: 17
title: 'WIP: The problem with IoT and random'
image: >-
  https://www.theartist.me/wp-content/uploads/2018/07/jackson-pollock-convergence-famous-paintings-1.jpg
ingress: >
  A common joke from the security community about IoT is: Do you know what the S
  in IoT stands for? It’s for security. 
description: ''
links:
  - title: NIST EaaS
    url: >-
      https://csrc.nist.gov/CSRC/media/Projects/Entropy-as-a-Service/documents/pres_handout_final.pdf
authors:
  - Didrik Sæther
---
The problem however is that if we get rid of shared codebases, dependency insecurities and somehow find a way to keep the devices updated. And that is a big if..  //TODO 

Something about the picture by Jackson Pollock and ranodmness //TODO

The problem is that IoT-devices do not have the computational power to generate random enough numbers to provide sufficient encryption. This means that the devices that make your home or offices smart, is the easiest way for an intruder to get access to the network. 

In this case entropy is the randomness collected by applications, operating system for use in cryptography. In the ye olden days, entropy was calculated from the clock of the computer. So, if you knew the exact time of the computer, it was possible to statistically reduce the number of attempts needed to break the encryption. Today we (hopefully) rely on well tested, and hardened libraries for cryptography. These libraries use all sorts of mechanisms for generating entropy. Keyboard timings, or mouse movements, some even use fan noises.. To generate entropy well, we need something that is random, speaking from a philosophical point; computers are not.. IoT struggles more as it is hard to computationally achieve randomness with cheap and underpowered cpu’s, often no keyboard timings, or mouse movements, that are used for to generate randomness. 


NIST perhaps has a solution: EaaS (Entrypy-as-a-Service), but should we trust a centralized authority for a service of such fundamental importance? Only if it is open-source.
