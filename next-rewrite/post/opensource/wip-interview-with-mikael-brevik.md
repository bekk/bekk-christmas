---
calendar: opensource
post_year: 2019
post_day: 12
title: Interview with Mikael Brevik
ingress: "Today's interview is with [@mikaelbrevik](https://twitter.com/mikaelbrevik). Mikael is an Open source maintainer, the organizer of [@_bartjs\r](https://twitter.com/_bartjs), host of the podcast [@kortslutningpod](https://twitter.com/kortslutningpod), video-blog [@kodesnutt](https://twitter.com/kodesnutt) and works at [@variant_as](https://twitter.com/variant_as)."
authors:
  - Henrik Walker Moe
---
The questions below came from a simple question we asked ourselves: 

> if you had the chance, what would you ask an Open source maintainer/person/community member.

Here we go!

## What are your biggest challenges in working with Open source today and how do you handle them?

There are different challenges with different parts of Open Source. One challenge is Open Source sustainability in hectic everyday situations. We are often under constant pressure to produce features and progress, and especially as a consultant, it can be difficult to take time to contribute to projects. This also ties in challenges with funding Open Source projects. We can't rely on people doing free work and taking advantage of this. Another challenge is respecting licensing. We are way too focused on the ability to use something and not enough on legality. Just because I can install something from a package manager, doesn't mean I'm allowed to. 

We need to be more aware of different licenses, compatibility, and limitations. If I had 10 NOK every time I heard "it was open on the internet" or even "I don't know" when asking "what is the license", I could have funded several Open Source projects. One way to raise awareness for this in your project is to add license whitelisting as a CI step.

On a personal level, the biggest challenge I have is having energy and time to maintain projects. It doesn't matter if you have a lot of time when starting a project if you don't have the time when it gains traction. It can take a short, intense, time to create a project, but several years to maintain it. As it often is, life occurrences come in bulk. I can promise you that if you have several Open Source projects, there will be times when all of them get issues at the same time. At some point, you get so many issues that you get behind on them. From there, it is a bad spiral of stress and guilt. 

Coming to terms with the fact that some people will be frustrated, and some times angry with you, can be tough. There are different ways to handle this, both technical, and personnel changes. Getting used to the feeling that sometimes you just have to let it be, even if other people have issues, is the biggest one for me. Also, closing stale issues can have a huge impact. The absolute biggest impact is to get other people involved to share the workload. This cannot be underestimated. Both for the quality of the project, but also for your wellbeing. I have had good success with just adding people showing interest in the project as collaborators, and give them the access and input they need to feel included.

## Are there any useful tools you use to make your GitHub-life easier to manage, and if so, could you share a few of them with us?

I find myself using fewer and fewer tools. I'm guessing there are several things I could do to improve my Open Source life and especially maintaining, such as bots (auto-close stale, code quality checks, etc), but there is also some work tuning them to work in your favor and not create more work than it relieves. The most important part for me is notifications and email-client. Having the "inbox zero" approach and snoozing emails as tasks is mostly how I structure Github Issue work. It is also probably the biggest cause of guilt. 

## How can repository-owners facilitate contributions from newcomers in Open source?

As I mentioned earlier, I think it all starts with including people. Adding them as collaborators and making them feel their input and work is valuable. Having automation steps with tests and feedback to pull requests is always a quick win, even though it can take some time to set it up. Make sure tests actually pass and that there are tests, to begin with. 

Put some work into minimizing the development setup. And of course have up to date documentation for how to contribute, architectural choices and how the project works. Having automation for formatting (e.g. prettier and other code formatters) goes a long way to guide new contributors for code style without having to seem nitpicky and pedantic. Guide people through pull requests instead of acting as a gatekeeper. This doesn't mean you should accept every PR, but it says something about how you should communicate. The most important thing of all, of course, is: Be kind.

## If you could time-travel to when you first started, what advice would you give yourself as an Open source rookie?

Oh, where to start. And where to stop. A lot of this ties in with what I talked about in previous questions also. I think developers, myself included, often look at Open Source as a way to be prominent. It's kind of a popularity contest, where we idolize people of prominent projects, and projects from prominent people. I think one thing I would say is: Not all contribution needs to be grand or at "high impact projects". There are a lot of different levels on how to contribute, and adding big features isn't the most important one. Don't be possessive of the projects you create. Stars, downloads, and likes to feel good, initially, but having a healthy project over time which has value feels better. 

This isn't advice solely for me in the past, but just as much for the present and future me. But of course, this doesn't mean you should experiment with Open Source and release whatever makes you happy. And Open Source can be amazing. Both for achieving things and for learning. But include other people early, rather than later.

## Can you describe how you see the future of Open source, what new directions or paths do you think it will take?

The future of Open Source is like Will Smith and his trusted dog walking alone down the main street. You have all the time in the world, though somewhat lonely. But midway you find that the world exists of hungry zombie vampires chasing you, and the story takes a whole different direction. Mostly just a funny analogy, and I don't really think Open Source will be dystopian. But I think some challenges will be more and more apparent. Mostly funding. 

In the front end world, we see more and more ads, sponsored content, and donation pleas with Open Source. And there is a reason for this: Open Source should not and cannot be free work. We are seeing the more formalized way to handle this (Github Sponsorship, Open Collective, Tidelift, etc), and I think this will continue to create different models for doing Open Source. I think Open Source is more a way of thinking and a methodology rather than a technical thing. And as such, I think Open Source will continue to spread to different parts of our field. Not only for code but for practices and information. E.g. at Variant we have Open Source customer and employee contracts, which honestly I think is a huge leap masked as a small step. The thought that actual business contracts used regularly are available as MIT license, open for reuse by others and open for change, I think it is very interesting. 

In my mind, this is representative of what Open Source is and can be. A fundamental protocol and precedence for collectively, across companies, to improve as an industry. I've also often spoken about a lack of design (in all shapes and forms) in Open Source. There are many products, libraries and third party projects we use that should have different perspectives. Both for universal design and general design. This also goes for diversity in contributors. And I think as with the rest of the industry, this is and will be more and more important.

Thanks for taking the time to talk with us Mikael! 💪
