---
calendar: functional
post_year: 2020
post_day: 7
title: Overcoming the FP hurdle
ingress: ""
description: ""
authors:
  - Kenan Mahic
---
I still remember the day I heard my first murmurs of functional programming. Just to set the mood,it was during my early days at the university. We had this one co-student who was ridiculously far ahead of the rest of us when it came to actual programming capability. He had gotten himself mixed up in a fiery debate with another student on the topic of programming paradigms. And as anyone that has at least spent some time roaming the more primitive sides of the internet can attest, there is nothing more vicious than watching two developers argue about than their pet preferences. Be it vim vs emacs, programming languages, version control systems or even source code indent style, these digital wars show no mercy. Still curious, but afraid to interject, I quietly looked up functional programming for myself. To my shock and horror, I was met by an onslaught of jargon that bounced squarely off my head. Monad, Side Effects, Lambda, Currying, Purity, etc. A half of these words even seemingly imaginary. Thoroughly put off, I slowly crawled back to my cozy and safe imperative den. It would take another two whole years before I even attempted to conquer this mountain again.

 
## What is a Pie?

My second attempt, now even being firmly handheld by the once fiery co-student was not without growing pains. Why was it I suddenly felt I needed help learning functional programming and not with other paradigms? After having given it some thought, there were a couple reasons that came to mind. They can mostly be cataloged in two separate categories: the human and the paradigm specific. One of the big paradigm specific issues is that some other paradigms just map more naturally to how we humans think. We usually perform tasks as a serious of steps. To conceptualize my point let’s imagine a recipe, say we’re making a pie. Most recipes follow the same script of listing the ingredients that we need at the top, much like we list variables at the top of classes in object-oriented programming. Then we have a step-by-step guide where we prepare and combine the ingredients, much like methods in a class. A **functional** cooking recipe however would look more like this:

>A pie is 45 minutes of 400F heat applied to 200mg of final pie dough.

>100mg of final pie dough is a mix of 99mg of pie dough stage 3 and 1mg of salt.

>99 mg of pie dough stage 3 is a mix of 79mg of wheat flour and one egg.

>(...)

That form is not very useful when we only want to bake some pie once in a while. It would be very useful if we wanted to become career bakers, or maybe even build a baking factory. That form of a pie recipe forces us to think hard about the pie and define exactly _what a pie_ is at any stage of the production(this is very zen-like). If we used a traditional imperative recipe like described earlier and tried to flesh out the pie-making details, we would probably focus on splitting the process into more and more granular tasks and it might deteriorate to irrelevant questions like "which hand do we use to add salt?".

## Jargonitis

Another big reason is the wall of jargon mentioned earlier. Haskell for example, can at times seem purposefully convoluted. It being built by academic scholars explains some of the jargon, and that would be fine if it also in many cases didn’t feel like being built purely for academics as well. While Haskell’s high abstraction allows you to write some very cool generic code, it also often makes it harder to conceptualize. Luckily for you readers there are several languages that don’t require a PhD. Some nice go-to’s not laden with jargon that helped me on my journey are Elm, Kotlin and Scala. I've also seen people recommend Scheme or other LISP derivatives, but the prefix syntax can be weird for humans. You also run the risk of getting caught in a sea of parantheses.

## Fundamentals

Besides some of the paradigm specific issues outlined, I also feel some hindrance occurs at the personal level. At the time of my second attempt I had spent the last 3 years of my intellectual spare time learning to program. After which I felt like I had at least started to gain a modicum of mastery. Boy, how wrong was I... Being faced with FP again I was back to scratch, a complete noob so to say. Now even being fully aware of my relative inexperience, I decided go in head first on concurrent threading assignment for a networking class. This is not to say FP is not equipped for concurrency, it is in many ways very suited for concurrency. Attempting it with no prior knowledge of syntax or concepts however, is an experience I would not wish on anyone. Learning to walk before you run is an expression that had completely vacated my mind at that point. This is a pitfall I in retrospect have always tried to avoid, as in the wise words of Michael J. Jordan,


>You can practice shooting eight hours a day, but if your technique is wrong, then all you become is very good at shooting the wrong way. Get the fundamentals down and the level of everything you do will rise.

## Accustomization

Another part of the issue I had was that I had in many ways been indoctrinated in the OOP way of thinking. I already had biased ideas of how certain problems should be solved and would often bang my head against wall trying to solve issues the OOP way. This was a bad approach in hindsight. Instead of mapping my thought process to what I already _knew_, I should have followed the FP method without too much comparison. Please think back to when you first learnt to program, you had no preconceived notion of how problems should be approached, you just did as you were told (metaphorically speaking). This blank slate approach let you freely digest the information without too much questioning. It's also in this blank slate approach I'd recommend you to be when approaching functional programming.



Summarized my tips for your journey into the FP world are: evade or be wary of languages suffering of jargonitis, learn to walk before you run, to keep a blank slate and finally to be open to asking yourself what a pie is.