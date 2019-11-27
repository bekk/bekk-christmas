---
calendar: security
post_year: 2019
post_day: 6
title: 'Here, have my biometric data, I don´t care. '
image: 'https://hackernoon.com/hn-images/1*vOddkv-UUjL5VO5eYnSsHg.jpeg'
ingress: "Some grocery stores in Norway use fingerprints for verifying the users age when buying an item that has age-restrictions. The security of this solution gets a thumb up \U0001F44D"
authors:
  - Didrik Sæther
---
Every week we read about a new breach of personal information. Strong, unique passwords have become a necessity because the companies we trust keep losing them all the time. In contrast to the way mobile devices use biometrics for faster access to a phone, some retail stores in Norway has found a refreshing new way to use fingerprints as identification.  

In Norway the self-checkout option at grocery stores are favoured by the younger generation, often seen in a rush, and not buying more than a few things. But when buying items restricted by age, such as alcohol, non-prescription drugs, and tobacco there is a need for verification of the customers age.  

The way to use a self-checkout system to buy age restricted items are as follows:  

1. The customer scan all their groceries.
2. The user is prompted if he/she wish to store their fingerprint for convenience for the next time.  
3. If the system detects an item that has an age restriction the customer is prompted for verification.

    *  If the user has a fingerprint stored at that store, he or she can scan their fingerprint to verify their age.
    *	Else a cashier will rush over to manually verify their ID.
        -	The user is prompted if he/she wish to store their fingerprint for convenience for the next time.
4.	The user pays the total sum to complete their purchase

In most cases I would be extremely critical to letting a grocery store collect my personal information, let alone store my biometric data. As early as in 2012 they asked the Norwegian body for digital privacy (Datatilsynet) for permission to store [biometric data about their customers](https://www.digi.no/artikler/sier-nei-til-fingeravtrykk-i-butikk/205969 "Digi.no"). The answer back then was a hard nope.  


So how did they get approval? They do not store any personal information alongside the fingerprint. The fingerprint is only stored in the database if the person is over 18 years, and verified by a cashier. The fingerprint is unique to that store, and not usable in other stores, even though they are part of the same chain.  

If the system storing the biometric data is hacked, and someone gets away with the database containing the digital representation of fingerprints, they can’t link that fingerprint to an individual, which is what we want from a security perspective.  

One thing you should check before signing up for this service is however that the store does not connect your fingerprint to the card you payed with. Because that would defeat the whole purpose of the architecture. 
