---
calendar: security
post_year: 2020
post_day: 22
title: Anonymous Tokens for Private Contact Tracing
image: https://i.ibb.co/yh2pPgY/paul-js-a-G12cv5gtk-M-unsplash.jpg
ingress: "This year we've seen how the call for efficient contact tracing during
  the pandemic has spurred debates on citizens' rights for privacy. There are
  many aspects to this debate, this blog post is dedicated to how one can submit
  data anonymously, while still providing a verifiably authentic upload
  token.\r"
authors:
  - Henrik Walker Moe
  - Tjerand Silde
  - Martin Strand
---
In a chaotic, pandemic-ridden 2020, governments, academia and industry rushed to action, introducing a number of contact tracing solutions based on smartphone capabilities. While all tried to make contact tracing as efficient as possible, a varying degree of attention was given to the privacy and anonymity of their citizens. In the Norwegian case, the authorities also aimed to generate insights on how the regulatory measures influenced contact, hoping to know what was most effective.

As the summer of 2020 started, most solutions converged on using the Google/Apple Exposure Notification System, which enabled access to Bluetooth Low Energy even when the phone was inactive, but only on firm privacy requirements. Today, we explore how we introduce recent cryptographic techniques to improve the anonymity of the users in the newly released version of the Norwegian contact tracing app Smittestopp. This work is inspired by the Privacy Pass protocol which we discussed yesterday.

## Anonymous Token in Smittestopp

Health authorities are trying to respond to the COVID-19 pandemic in multiple ways, among which is using smartphones to trace close contacts. The idea is that one could alert contacts in case of possible risk of infection. The dominant solution is the Google/Apple Exposure Notification System (ENS), which in turn is largely based on the [DP^3T initiative](https://github.com/DP-3T). In ENS, phones within range exchange short codes. In case of infection, the health authorities can provide a person with an upload code, which enables the patients to upload seeds for all codes sent from their handset anonymously.

As the [Norwegian Institute for Public Health (FHI) announced their initial plans](https://www.fhi.no/om/smittestopp/digital_smittesporing/#torsdag-15-oktober-2020-status-for-uka) for a new version of Smittestopp (litt. translation: "Infection stop"), [Eivind Arvesen](https://github.com/EivindArvesen) raised the question of whether the suggested token system would make it possible to trace users. After having verified that this indeed could be the case, [Tjerand Silde](https://tjerandsilde.no/) and [Martin Strand](https://github.com/martstr) wrote a note ([Norwegian text only](https://github.com/HenrikWM/anonymous-tokens/tree/main/docs/privacy-note)) describing how anonymous tokens could be used to improve privacy while providing the same functionality as the suggested token system. The improved version is inspired by Privacy Pass, designed for anonymous web-browsing. Based on the above note, FHI encouraged a pull request to the official project. [Henrik Walker Moe](https://github.com/HenrikWM) then joined the team in order to write a Privacy Pass implementation as an [Open Source project](https://github.com/HenrikWM/anonymous-tokens).

Several others got involved in finally implementing this in Smittstopp, and while it did not make the deadlines to get included in the first release, there is good hope that it may come to a phone near you shortly.

Using the roles of Smittestopp and our notation for Privacy Pass, this is how one could use anonymous tokens in order to ensure that uploads are private. Note that tokens could still be correlated using timings, so authorities should refrain from extensive logging of requests.

The sequence of anonymous tokens in Smittestopp will be:

1. FHI generates public and private keys, and distributes the private key `k` to [Fhi.Smittestopp.Backend](https://github.com/folkehelseinstituttet/Fhi.Smittestopp.Backend) and [Fhi.Smittestopp.Verification](https://github.com/folkehelseinstituttet/Fhi.Smittestopp.Verification). The app only gets the public key.
2. [Fhi.Smittestopp.App](https://github.com/folkehelseinstituttet/Fhi.Smittestopp.App) generates a request `P`, and lets the user identify itself against Fhi.Smittestopp.Verification.
3. Fhi.Smittestopp.Verification verifies the infection status, and generates the response `(Q, c, z)`, where the latter two constitute the transcript of the zero-knowledge proof of correctness.
4. Fhi.Smittestopp.App verifies the proof, generates the tuple `(t, W)` and submits it to Fhi.Smittestopp.Backend.
5. 5. Fhi.Smittestopp.Backend verifies that `W` is generated from `t` and signed with the secret key `k`. It then stores `t` for as long as `k` is valid.

[A previous blog post](https://security.christmas/2020/9) discussed how privacy was handled in the first version of Smittestopp. We are happy to report that privacy has been a central aspect of the new app, with excellent response from the Norwegian Institute of Public Health. We believe that this work should be readily available for other countries' COVID-19 apps as well, and hope that this process also serves as a demonstration of how an open approach can bring in non-trivial contributions and expertise.