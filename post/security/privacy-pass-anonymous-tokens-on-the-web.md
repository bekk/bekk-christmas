---
calendar: security
post_year: 2020
post_day: 21
title: "Privacy Pass: Anonymous Tokens on the Web"
image: https://i.ibb.co/XCdLWgY/huzeyfe-turan-2i-K6-KNVwc-Y-unsplash.jpg
ingress: We discussed elliptic curves [earlier this
  month](https://security.christmas/2020/5). Today, we look at how to use those
  to make the internet a bit more user friendly.
links:
  - url: https://www.ietf.org/archive/id/draft-davidson-pp-architecture-01.txt
    title: "Privacy Pass: Architectural Framework"
authors:
  - Henrik Walker Moe
  - Tjerand Silde
  - Martin Strand
---
[Privacy Pass](https://www.ietf.org/archive/id/draft-davidson-pp-architecture-01.txt) was [introduced in 2018](https://www.petsymposium.org/2018/files/papers/issue3/popets-2018-0026.pdf) by Alex Davidson, Ian Goldberg, Nick Sullivan, George Tankersley, and Filippo Valsorda in order to reduce the number of CAPTCHA challenges human users would meet online. The basic idea is to allow the user to submit a number of tokens to a server ahead of time. The server will sign these, equivalent to issuing notes with the text "The holder of this token should be considered human, not a bot.". Every time the user visits a website that would have asked for a CAPTCHA, the browser can hand over one of the tokens instead, hence not bothering the user with reading garbled letters or clicking on images of road signs.

To avoid token replication and reuse by bots, one can assign these tokens serial numbers; however, these serial numbers could violate privacy by tracking users across the internet. The authors of Privacy Pass have an elegant solution to this.

By using the [Privacy Pass browser extension](https://privacypass.github.io/) users can be both authenticated and remain anonymous. Usability is also improved when existing CAPTCHA solutions can be replaced, as the user is already authenticated and doesn't need another verification challenge.

## How it works

The Privacy Pass protocol works the following way:

1. First, the server side generates an elliptic curve `E` with a distinguished point `G`, secret key `k` and a public key `K = kG`.
2. The browser chooses a random number `t`, and generates a point `T` on the curve from `t` using a hash function. It then creates a masked point `P = rT`, which it submits to the token issuer.
3. The token issuer signs the token by computing a new point `Q = kP`. It also provides a Chaum-Pedersen [zero-knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) to prove that it was indeed `k` what was used to sign `P`, but without revealing `k`.
4. The original point `T` is now masked by both `r` and `k`. The browser can remove `r`, so that it is left with the token `W = kT`.
5. In order to redeem the token, the browser can submit `(t, W)` to the website the user wants to visit. The website generates `T` from `t`, computes `kT`, and verifies that it equals `W`. The seed `t` is stored in order to prevent the token being used twice.

![](/assets/privacypass.png)

*From: https://blog.cloudflare.com*

## Security of Privacy Pass

We give some intuition-based arguments for why this protocol achieves its goals:

1. In order to manufacture tokens that could be used more than once, the browser would need to generate values `t`, `t'` such that they both generated the point `T`. Hence, the hash function needs to be collision resistant and second preimage resistant. The SHA2 family of hash functions is believed to satisfy these requirements.
2. Since `r` is chosen uniformly at random, the point `P = rT` carries no meaningful information. Likewise, if the discrete log problem is hard on the chosen elliptic curve, then it is infeasible to extract the secret key `k` from the point `kT`. The Chaum-Pedersen proof guarantees that `Q` is well-formed. The browser is therefore none the wiser regarding generating tokens.
3. Since the points `P` and `Q` are masked with `r`, and `W` is independent of these points, the issuing service and the verification service will not be able to trace when a specific token was used, and so the anonymity of the user is guaranteed

Content delivery networks such as Cloudflare or Akamai may record misbehaving IP-addresses to mitigate attacks. However, if you use anonymity tools such as onion routing, your visible IP address may be shared with less honest users, which will in turn make you have to go through the hassle of responding to frequent CAPTCHA requests. Privacy Pass enables you to avoid those without compromising your anonymity. 

Tomorrow, we will look at a seemingly different way of using the exact same cryptography, which may also benefit you in 2021.