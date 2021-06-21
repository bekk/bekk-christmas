---
calendar: functional
post_year: 2019
post_day: 10
title: Introduce functional languages to your production stack
authors:
  - Håkon Haga
---
In this blog post, we will share some experiences on how we got to use functional languages in production. We will also provide some tips on how to convince others that functional programming (FP) is the way to go. No functional language, or any other tool for that matter, can be regarded as a silver bullet for every problem, so it is important to consider carefully what will be the right tool for the job.

Personally, I have been involved twice with introducing a functional programming language to my customer. First time, the original technology stack could not handle the complexity of our customer's expectations. The second time was also due to some challenges with the existing technology and we experienced that we used a disproportionately long time to change things that should be easily done. This led to a longer process where we could figure what suit us best. In this case we were able to use enough time to slowly learn both what would be the better way to go and also the technology itself.

## Step 1: Scala
The first time more in detail, we had stuck in a dead end with the standard J2EE stack back in 2011. There were not too many attractive Javascript (JS) frameworks at the time and we found it challenging to develop frontend in JSF and pure JS. On the team, we had two developers who had Scala experiences, and they were also familiar with a web framework that could help us solve many of our problems. Everyone agreed that the development was to slowly and something had to be done. Based on the current situation and a team of developers which were trusted advisors in the organization it was decided to move away from the standard J2EE stack. This allowed us to work full time with Scala. In the very beginning some of the developers, myself included, were somewhat skeptical of departing from the common and trusted syntax we were used to in Java. This soon proved to be needless worries. Scala gave us the tools we needed, and we quickly became productive in our new language.

### Share your ideas
In this case, we had a specific problem which we did not see how to get out of without replacing some of the frameworks. In turn, this also led to the use of a functional language. Of course, we cannot go around hoping to end up in such big trouble that the only way out is to replace the whole tech stack, but nevertheless there are plenty of challenges facing which might be solved in a better manner if we take the time to step back. Often the team needs an experienced trusted advisor to convince the business side that such changes are needed. The same trusted advisor might also be biased by earlier discussions and by how things are as is. Therefore I think it is important that trusted advisors also are able to see the possible changes that might have been thought of as unreachable. Since this is not always the truth less experienced developers are often the ones who come up with the ideas for change. Regardless of who suggested the change it is important that the team has an open arena where ideas like this can be shared and discussed. It is important that every team member feel the trust in the team so no one hesitates to share their ideas. After discussing with the team there has to be an agreement before it is advisable to approach the business side. Sharing knowledge within the team will lead to better ownership and it will be crucial for the viability of the new technology. It is not necessary that everyone in the team knows the language fully, but it is important that everyone in the team is comfortable with the change and that there are enough developers in the team to rely on for those with less experience.

## Step 2: Elm
My second experience introducing FP was in early 2017 and now we actually saw that the framework we introduced in 2011 did not provide the flexibility we needed. One of the main problems was the lack of separation between frontend and backend in our code. We decided that we had to move away from this framework and find a better way of writing frontend and backend more decoupled. But! The first good news is that we have no intention of walk away from Scala. Scala works perfectly well for us as a backend language, although we first got to use it due to introducing a web framework in 2011. As opposed to the first time we had a thorough review within the team and had a broad consensus that we wanted a new frontend technology. The team had Scala.js foremost among the options until we got a better understanding of what Elm could give us. It became clear to everyone that here they got something more stable than what we had previously seen among "languages" that compile to JS. What also became the nail in the coffin for the positive vibe around Scala.js was that no one else in Bekk uses this framework. Therefore, it would be more difficult for the team to seek help locally. We had already experienced this situation, as the framework we wanted to remove had the same lack of use within Bekk and not widely used elsewhere either. 

### Start small, learn fast
Although the main reason for introducing new frontend technology was a legacy application, we did not start introducing Elm here. We started with some smaller new applications to learn as much as possible so that we had more experience when meeting the larger and more complex challenges. This is also a good way to lower the risk when introducing new technology. Since spring 2017 we have arranged three summer internships with several students participating each summer. Elm has been involved every year and we have been equally amazed every year how quickly new developers learn to use Elm. This also negates the concern that new developers are unable to adapt to new languages.

## Step 3: Profit(?)
So, do you want to introduce a functional language in your project? Well, introducing just another language will in most cases not fix your problems by itself. What you might need is another library or framework. If you want to convince someone in your team, or even the business side, that functional programming is the way to go, you might not want to sell them the language directly, but find a framework that suits the problem and that accidentally happen to be written for a functional language. On that way you definetly have to fight some battles. Remember to also fight the ones you have lost before! And for the third time: Syntax does not define the difficulty in our field. Developers do know how to adopt new languages!