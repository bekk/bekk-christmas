---
calendar: security
post_year: 2020
post_day: 8
title: The secretive history of modern encryption
image: https://images.unsplash.com/photo-1455368109333-ebc686ad6c58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80
ingress: "Cryptography is the science of hiding information with algorithms
  called ciphers. When data is encrypted with a secure cipher, no one should be
  able to read it without the decryption key. However, the promise of security
  falls apart if the encryption algorithm is weak, or if someone has created a
  backdoor. In this article we’ll examine the modern history of encryption.
  We’ll learn that while the mathematical underpinnings of modern encryption is
  stronger than ever, government agencies have a history of thwarting efforts to
  reach the goal of truly secure communication. "
authors:
  - Gunvor Lemvik
---
The world’s first encryption ciphers often used algorithms that were themselves secret. The intuition that security increases if the encryption details are hidden is a misconception, and is often referred to as _security by obscurity_. The algorithms that dominate the modern era rely on full openness, in accordance with _Kerckhoffs's principle_:
> A cryptosystem should be secure even if everything about the system, except the key, is public knowledge.

This transparency allows the rest of the world to attempt to break the cipher. Every failed attempt at breaking a cipher reinforces the belief that it is secure. While there is a chance that someone breaks a cipher and does not report it, there is a far greater chance that a homemade algorithm will be broken easily.

## A big moment in cryptographic history

Up until 1972 there was no standard cipher for encrypting secret messages. The US _National Bureau of Standards_ (NBS, which later became NIST) started an initiative for finding a single secure algorithm. This was rather revolutionary. The American government had traditionally kept their knowledge of cryptography to themselves - they considered it to be crucial to national security. As a result of the NBS initiative, several ciphers were proposed as candidates for the first encryption standard.

The most promising candidate was contributed by a team of cryptographers working at IBM. They developed a refined version of an earlier encryption cipher called Lucifer, which was first developed by Horst Feistel in the late 1960s. Their candidate was a block cipher with a key size of 128 bits. A block cipher is an algorithm that encrypts several bits at a time, i.e. a _block_ of bits. A sufficiently large key size is necessary for a cipher to withstand brute force attacks, since these attacks generate all possible decryption keys. In context of a brute force attack, one would say that the larger the key size the more robust the cipher.

## Speculation of NSA backdoors

When the NBS examined the security of the cipher candidates, they reached out to the _National Security Agency (NSA)_ for assistance. At this point in time the NSA did not even admit their own existence. The involvement of the NSA lead to speculation and rumors, since the cipher went through a couple of peculiar alterations during the cooperation between NSA and IBM. 

The most worrying change was that the key size was reduced from 128 bits to 56 bits. This made the cipher considerably less resistant to brute force attacks. Concerns were raised that this change was motivated by the NSA, in order to provide themselves with a backdoor. Maybe their computers were powerful enough to brute force a key size of 56 – but not quite powerful enough to brute force a key size of 128? 

The cipher was also altered to be resistant to attacks using differential cryptanalysis. That doesn’t sound too bad, but this particular attack was not known to the public until 1990 – almost 20 years later! If the NSA were familiar with an attack the world needed 20 more years to discover, it is not too unlikely that they also had exceptionally powerful computers. On the other hand, it should be noted that none of these claims have been proven. 


In 1977 the NBS presented an altered version of the IBM cipher as the new standard, which they named the _Data Encryption Standard (DES)_. It became the first modern, public, freely available encryption algorithm. All details regarding DES were made public, which is good practice since it allows researchers to scrutinize the mathematical details. However, the motivation for the design criteria remained secret. The public never learned why the key size was reduced, and this was the main cause for suspicion regarding the involvement of the NSA.

## DES cracked by brute force attack

DES was initially meant to be the standard cipher for encryption for 10 years; from 1977 to 1987. But no serious weakness was found, and DES went on to reign as the standard algorithm for more than a decade past its due; until 1999. In the final years of DES, several attempts were made to design and build a machine to brute force it. Building such a machine would cost millions of dollars. It was speculated that only government agencies would have the necessary financial resources to build it, and by this time it was widely believed that the NSA could in fact crack DES.

As the price of hardware fell, the _Electronic Frontier Foundation (EFF)_ built the machine Deep Crack. In 1998 Deep Crack was able to brute force DES in 56 hours. This event demonstrated that it was time to select a new standard cipher for encryption.

In 1997, the _National Institute for Standards and Technology_ (NIST, previously NBS) initiated an open competition to find a new standard encryption cipher. The competition had five finalists: Rijndael, Mars, RC6, Serpent and Twofish. This time the selection process was completely transparent. In 2001, after three competitive rounds and intense cryptanalysis by the world’s foremost experts, the decision was made. The cipher Rijndael, designed by the Belgian cryptographers Joan Daemen and Vincent Rijmen, was declared as the new standard. It was given the name _Advanced Encryption Standard (AES)_. This cipher has three possible key sizes: 128 bit, 192 bit and 256 bit. All these key sizes were sufficiently large to withstand brute force attacks.

AES is widely regarded as the most secure encryption cipher invented. It has been battle-tested for decades and is expected to remain the standard cipher for many years to come. So far there are neither any known critical weaknesses, nor suspicion of backdoors.

## Attempts at legalizing government backdoors

Algorithms have matured to be practically unbreakable, but current legislative measures attempt to undermine the basic purpose of cryptography. There are recurrent proposals for allowing government backdoors. For instance, the proposed _Lawful Access to Encrypted Data Act_ aims to force technology companies to implement backdoors. Such a law will shift the responsibility of facilitating private communication and basic privacy, suggesting consumers put their faith in closed government processes instead of open algorithms. The right to privacy ends when the government institutions deem it useful to their own agenda. If such a law were to pass, the consequences would be immediate and severe. It would grant immense power to the government, and if a key is leaked or stolen, all encrypted communications are out in the open. Lawmakers argue that having a backdoor would help fight crime and terrorism, but this view assumes that criminals play by the rules and communicate through services using government issued encryption. 

In the modern era the goal of private digital communication is, from a technological standpoint, a solved problem. It remains to see if future citizens will be able to enjoy digital privacy in their lives. It’s a question of balancing power between the government and the people – and problems of that nature are not solved as elegantly as cryptographic puzzles.