---
calendar: opensource
post_year: 2019
post_day: 10
title: Interview with Christian Alfoni
ingress: >-
  Today's interview is with
  [@christianalfoni](https://twitter.com/christianalfoni). Christian is a
  developer and creator of [overmindjs.org](https://overmindjs.org/) and
  [cerebraljs.com](https://cerebraljs.com/), and works at
  [@codesandbox](https://twitter.com/codesandbox).
---
The questions below came from a simple question we asked ourselves: 

> if you had the chance, what would you ask an Open source maintainer/person/community member.

Here we go!

## What are your biggest challenges in working with Open source today and how do you handle them?

As an open source maintainer, the biggest challenge is managing time and emotions. Since the open source work is typically done beyond working hours that actually gives income, you have to balance that time with everything else going on in your life. Things like family, friends and other things that is way healthier for you than crunching code. 

Emotions plays a big role on this as well. Maintaining open source work becomes very personal. You put more pressure on yourself and take feedback more personally. How you feel about your open source work bleeds into your time outside open source work. Again, family, friends etc. 

Handling this has taken me a long time, and still there are times I do not handle it very well. In my experience it is important to set a small scope and have some clear core principles for your project. The scope determines the amount of time needed to write code, but also it reduces the discussions around API surface... as there is less of it. 

With core principles you can minimize the discussions around the API choices as well. This is very useful in issues and other channels where questions about decisions and new suggestions pop up. "This is not within the scope", or "A prioritized principle was to have lower level APIs and allow people to build on it". Stuff like that. Also getting to the point of "there is really no rush" is very important. Developers are smart. They hack around solutions, forks the project etc. if some bug blocks them or similar. You do not have to fix things right away.

## Are there any useful tools you use to make your GitHub-life easier to manage, and if so, could you share a few of them with us?

Hm, good question. Personally I just use Git in the terminal, though the Github desktop app is really good now. If you contribute to open source I would suggest looking into "rebasing" and "interactive rebasing". These are necessary tools to keep your PRs clean and up to date with master. Different projects has different preferences on how to merge your PR, but keeping your commits clean requires wielding some rebasing.

As a maintainer you can get help on structuring the commits. A project called [Commitizen](https://www.npmjs.com/package/commitizen) runs a script that asks you questions on the type of change etc. This can be used to create release notes and bump the project with the correct version number (breaking etc.). You also have [Husky](https://www.npmjs.com/package/husky) which can add git hooks. It can for example run linting, prettier, typechecking etc. to make sure that the commit is valid, before even creating the commit. 

I also find it beneficial to test PRs effectively and help contributors on their own branch. [This is a script](https://gist.github.com/christianalfoni/393b00ccabe128b44ce52025f3c7ab5a) we use at Codesandbox to quickly test a PR. It allows us to write "yarn test:pr 1234" and it sets up a branch updated with current master, ready for testing. On this branch you can create new commits. This allows you to set up a pull request to the contributors original PR. Now the contributor becomes a maintainer and stays in control of the PR. It gives a feeling of collaboration instead of you overriding the contributor.

## How can repository-owners facilitate contributions from newcomers in Open source?

You know, I think there is far too much focus on code contributions in open source projects. There are so many other things that open source needs in terms of contributions. Here are some examples:

- **Say "thank you"**: When you use a project that solves a problem for you, go on twitter and say thank you to the maintainer. Recognition and the feeling of producing value for others is "the fuel" of open source. You do not have to donate money... just say thank you

- **Give support**: If a project you know well has a community, join that community. It being slack, discord or just Github issues. Help answer questions and help create a culture of understanding, patience with beginners and handling "bad players"... cause there are some of them, who just does not understand what open source is all about

- **Documentation**: Documentation is the biggest challenge for a maintainer. And I am not talking about typos here. A maintainer should ideally not write any documentation because they typically have too many assumptions. So adding paragraphs to improve the flow, create better examples or maybe maintain some Codesandboxes that helps beginners get going is incredibly valuable

- **Write an article**: Most projects are never recognized because the maintainer does not have time or a wish to "put themselves out there". An article is very often the one and only reason a project even gets noticed. If you find a project that you think is amazing, write an article about how you used it and what it solved for you

So basically I would highlight these points in the documentation of the project. It is way more helpful than actual code PRs, as those typically has very little code... code you could easily write yourself with a good reproducible example of an issue. All these other points is way harder for a maintainer to manage. I am not saying code PRs and bug fixes are worthless..On the contrary, they are very welcome, but the points here are way more pressing :-)

## If you could time-travel to when you first started, what advice would you give yourself as an Open source rookie?

To becoming a maintainer I would say: "Stop! Do not go down this path". It is way more valuable to help other projects than wielding your own. I just can not help myself because I am constantly popping with ideas and I always think they are really good, even if they are not. It is a curse :-D Then I would argue that I would be way better off focusing on the points in the previous question. Keep writing articles, make videos, educate and help people use existing libraries. What libraries to choose. Compare them. Etc. Way more valuable.

## Can you describe how you see the future of Open source, what new directions or paths do you think it will take?

You know, I am super hopeful. I think "the open source way" is how most of us will work. Many fields are moving into async global collaboration. With national borders diminishing and remote work becoming more and more common, the "open source way" is a set of principles and processes that fits very well with that world... it appeared in that world. 

Also more companies are realizing that open source is actually why they are in business at all. If the company uses open source, especially for profit, it also has a responsibility to move open source forward. Making "open source" a part of the company strategy and branding is basically a way to say: "Our profit is based on open source. We use some of that profit to give back. It is the right thing to do". We will see a lot more of that I think.

Thanks for taking the time to talk with us Christian! 💪
