---
calendar: security
post_year: 2019
post_day: 10
title: Responsible disclosure
image: 'https://images.unsplash.com/photo-1471877325906-aee7c2240b5f'
ingress: >-
  You double checked, triple checked, even quadruple checked, and it is really
  there! You have just found a vulnerability in someone else's system. Maybe you
  just got access to something you shouldn't have, you can prove that an
  attacker could easily take down the system, or you found your way around the
  payment process in a shop. Whatever the bug, you now need to disclose it, but
  in a responsible manner.
links:
  - title: Responsible disclosure - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Responsible_disclosure'
authors:
  - Hans Kristian Henriksen
---
Responsible disclosure is an important step in security testing. It is meant to provide the owner of the system with the information necessary to fix the issue, and give them a reasonable amount of time to implement a fix. This means that you will have to treat your findings as confidential, until they are fixed. Only then can you write your cool blog post explaining how you hacked the local sushi shop and got 25 kilos of maki delivered to the mayor's office.

We practice responsible disclosure because we think it is important to give fair warning about a vulnerability. While it is possible that the bug might currently be exploited by others, this is quite unlikely, and given that the vendor fixes their system quite fast, we are actually protecting their users by not going public with what we know. Had we performed irresponsible disclosure, and written up a blogpost the minute we found our bug, there is a high risk that others would exploit it before a fix was in place, maybe forcing the site to be taken down, to avoid even more raw fish at the doorstep of the town hall. 

## Best practice for RD

If you found the vulnerability through participating in a [bug bounty](https://bekk.christmas/security/2019/3), there are clear (and strict) rules for how you are to disclose your findings. In most cases, the bounty program guaranties that you will not meet any legal issues if you follow their disclosure regime. You should make every attempt to follow this procedure. Should you however find a vulnerability on a site not covered by a bug bounty program, the following steps should generally be followed.

The first thing you need to do is find someone to contact, that is in a position to both understand, verify and fix the issue at hand. If you are lucky, the site has set up a `security.txt`-file at `/.well-known/security.txt`. This file should contain all contact information necessary.

More likely than not, the site does not have any such contact information. You will have to start sending emails to random people. I would suggest using any generic contact email, contact form on the site (unless you believe this to be compromised), but also look up people who work at the company and attempt contacting them directly. If you have no luck yourself, you could reach out on social media, asking if anyone knows someone at the company that can get in touch with you.

In your contact with the company, you should outline the vulnerability you have found, describe what you consider to be its likely impact, and set a timeframe for when you would expect a patch to be available. This timeframe would also be the time you must keep the vulnerability a secret. As the company researches the issue, and attempts to make a fix, you may be asked to delay disclosure. As long as the terms are reasonable, and there does not appear to be any increased risk for the users of the service, it would be polite to accept this. Should you however feel that there is little progress, and the delays are only used to push the issue further out, you may consider if full disclosure is needed to pressure the vendor.

## What if there is only silence?

You may experience some issues with reporting your findings. Maybe you can't find contact information for anyone in the company, maybe there is no response, or maybe you get an initial response, but then hear nothing more. Unfortunately, this is not too uncommon. Not all companies are prepared to deal with a situation like this. You should do your best to get in touch with someone who can help, and follow up with the vendor if they stop responding. However, should all your attempts fail, you may be forced to go public with your findings, without a fix being implemented. This should always be a last resort, and you should have given warning about this in all your communication with the vendor. Many researchers operate with around 90 days after initial contact as their limit, including Google Project Zero, but there may be circumstances where this can be substantially shortened. If you suspect that the vulnerability is being actively exploited, can impact a large number of users, or other circumstances that in your opinion would shorten the acceptable timeframe for disclosure, this might be the right thing to do.

## Legal risks

There are certain legal risks with disclosing security vulnerabilities to a vendor. If the company is not well educated on the subject of security, they may attempt to turn on you, and accuse you of hacking with an evil intent. If the issue is made public, you may receive threats of lawsuits. This can be done in the hope that the company will look strong going after the "evil hackers". You should also investigate any laws in your jurisdiction that might impact you when disclosing a vulnerability. If you are unsure about the legal risks you are facing, you may opt to report the vulnerability anonymously, or contacting a lawyer to have your liability assessed. 

With this said, more and more companies are joining bug bounties, and publicly announcing that anyone coming forward with a vulnerability in good faith, will not be subject to any legal action.
