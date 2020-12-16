---
calendar: security
post_year: 2020
post_day: 21
title: "Privacy Pass: Anonymous Tokens on the Web"
ingress: We discussed elliptic curves [earlier this
  month](https://security.christmas/2020/5). Today, we look at a way to use
  those to make the internet a bit more user friendly.
links:
  - url: https://www.ietf.org/archive/id/draft-davidson-pp-architecture-01.txt
    title: "Privacy Pass: Architectural Framework"
authors:
  - Henrik Walker Moe
  - Tjerand Silde
  - Martin Strand
---
[Privacy Pass](https://privacypass.github.io) was[ introduced by Alex Davidson, Ian Goldberg, Nick Sullivan, George Tankersley, and Filippo Valsorda in 2018](https://www.petsymposium.org/2018/files/papers/issue3/popets-2018-0026.pdf) in order to reduce the number of CAPTCHA challenges human users would meet online. The basic idea is to allow the user to submit a number of tokes to a server ahead of time. The server will sign these, equivalent to issuing notes with the text "The holder of this token should be considered human, not a bot". Every time the user visits a website that would otherwise have asked for a CAPTCHA, the browser can hand over one of the tokes instead, hence not bothering the user with reading garbled letters or clicking on images of road signs.

However, if each of these notes had a serial number (which we should assume; otherwise one could just make several copies and hand out to a bot friend), those serial numbers could be used to track users across the internet, which is obviously a privacy issue. The authors of Privacy Pass have therefore come up with an elegant solution to this.

By using the Privacy Pass browser extension users can be both authenticated and remain anonymous. There can also be an opportunity to make usability-improvements where existing CAPTCHA solutions can be replaced, as the user is already authenticated and don’t need a CAPTCHA challenge to verify themselves.