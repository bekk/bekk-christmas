---
calendar: security
post_year: 2020
post_day: 22
title: Anonymous Tokens for Private Contact Tracing
image: https://i.ibb.co/yh2pPgY/paul-js-a-G12cv5gtk-M-unsplash.jpg
ingress: In a chaotic, pandemic-ridden 2020, we've seen a heated debate on the
  need for efficient contact tracing that still respects privacy. There are many
  aspects to this debate — this blog post covers how one can submit data
  anonymously, while still providing a verifiably authentic upload token.
authors:
  - Henrik Walker Moe
  - Tjerand Silde
  - Martin Strand
---
This year, governments, academia and industry rushed to introduce a number of smartphone-based contact tracing solutions. While all tried to make contact tracing as efficient as possible, they paid varying degrees of attention to their citizens’ privacy and anonymity. The Norwegian authorities also aimed to generate insights on how the regulatory measures influenced contact, hoping to know what was most effective.

As the summer of 2020 started, most solutions converged on using the [Google/Apple Exposure Notification System (ENS)](https://covid19.apple.com/contacttracing), which enabled access to Bluetooth Low Energy even when the phone is inactive, but only on firm privacy requirements. Here, we explore recent cryptographic techniques to improve users’ anonymity in the newly released version of the Norwegian contact tracing app Smittestopp. This work is inspired by [the Privacy Pass protocol](https://security.christmas/2020/21) which we introduced yesterday.

## Anonymous Token in Smittestopp

Health authorities are trying to respond to the COVID-19 pandemic in multiple ways, including using smartphones to trace close contacts. The idea is that one could alert contacts in case of possible risk of infection. The dominant solution is the ENS, which in turn is largely based on the [DP^3T initiative](https://github.com/DP-3T). 

In ENS, phones within short range exchange codes, named “diagnosis keys”, and store them locally in case they maintain this distance for a certain time period. In case of infection, the health authorities can provide a person with an upload code, which enables the patients to upload all codes sent from their handset anonymously to a public bulletin board. Every other user can then access the bulletin board, and check if any of the codes corresponds to any of their locally stored ones.

As the Norwegian Institute for Public Health (FHI) [announced their initial plans](https://www.fhi.no/om/smittestopp/digital_smittesporing/#torsdag-15-oktober-2020-status-for-uka) for a new version of Smittestopp (litt. translation: "Infection stop"), [Eivind Arvesen](https://github.com/EivindArvesen) questioned whether the suggested token system could trace users. After verifying that this indeed works, [Tjerand Silde](https://tjerandsilde.no/) and [Martin Strand](https://github.com/martstr) wrote a note ([Norwegian text only](https://github.com/HenrikWM/anonymous-tokens/tree/main/docs/privacy-note)) describing how anonymous tokens can improve privacy while providing the same functionality as the suggested token system. The improved version is inspired by Privacy Pass, designed for anonymous web-browsing. Based on the above note, FHI encouraged a pull request to the official project. [Henrik Walker Moe](https://github.com/HenrikWM) then joined the team to create a library on Anonymous Token implementation as an [Open Source project](https://github.com/HenrikWM/anonymous-tokens). Several others helped integrate the library into Smittstopp. While the anonymous tokens will not be included in the app’s first version release on 21 December, we are optimistic it will come to a phone near you soon.

## How it works

Using Smittestopp’s infrastructure and our notation for Privacy Pass, one could use anonymous tokens to ensure their uploads are private. Note that tokens could still be correlated using timings, so authorities should refrain from extensively logging requests.

The sequence of anonymous tokens in Smittestopp will be:

1. FHI generates public and private keys, and distributes the private key `k` to [Fhi.Smittestopp.Backend](https://github.com/folkehelseinstituttet/Fhi.Smittestopp.Backend) and [Fhi.Smittestopp.Verification](https://github.com/folkehelseinstituttet/Fhi.Smittestopp.Verification). The app only gets the public key `K`.
2. [Fhi.Smittestopp.App](https://github.com/folkehelseinstituttet/Fhi.Smittestopp.App) generates a request `P` from `(t, r)`, and lets the user identify themselves against Fhi.Smittestopp.Verification.
3. Fhi.Smittestopp.Verification verifies the infection status, and generates the response `(Q, (c, z))` based on `k` and `P`, where the latter two constitute the transcript of the zero-knowledge proof of correctness.
4. Fhi.Smittestopp.App verifies the proof, generates the tuple `(t, W)` from `t`, `r` and `Q` and submits it to Fhi.Smittestopp.Backend.
5. Fhi.Smittestopp.Backend verifies that `W` is generated from `t` and signed with the secret key `k`. It then stores `t` for as long as `k` is valid.

![](/assets/smittestopp.png)

*From presentation (in Norwegian): <https://tjerandsilde.no/files/Anonym-Smittesporing.pdf>.*

A [previous blog post](https://security.christmas/2020/9) discussed how privacy was handled in the first version of Smittestopp. We are happy to report that privacy has been a central aspect of the new app, and was endorsed by FHI. We believe that this work should be readily available for other countries' COVID-19 apps as well, and hope that this process also serves as a demonstration of how an open approach can bring in valuable contributions and expertise.