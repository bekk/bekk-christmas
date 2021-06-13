---
calendar: opensource
post_year: 2019
post_day: 23
title: Why should you open source your product?
image: >-
  https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80
ingress: >-
  Such a simple question. But does it have an easy answer? Opening up your code
  base can seem a bit scary. Everyone can see your (bad) code and commit
  messages, and it's easier for evil people to find weaknesses or make fake
  copies of your product. But there are many good reasons for open-sourcing a
  project. Let's go through some of them.
authors:
  - Mats Byrkjeland
---
## You seek contributions from the community
This is maybe the most obvious reason. If your code is open sourced, outsiders can contribute to the development of the project. This is a strong argument for libraries, frameworks and tools where the target user group is developers. But this goes also for other kinds of products. If you want users of the product to be able to find bugs, and even correct them, that's possible when the source code is open. And if you're good at publishing issues, project plans, you might get help in driving the development forward.

## Transparency
One reason for open sourcing your code is to achieve _transparency_. You might want – or are required to – give people the possibility to read the code. This is a common argument for public companies, where the tax payers should be able to have insight into what is made, and therefore, what they pay for. [NAV](https://github.com/navikt), [Digipost](https://github.com/digipost) and [Entur](https://github.com/entur) are examples of Norwegian public companies that have taken this principle to heart.

## Showcase and teaching
If you are a data or API provider or creator of a framework or library, you can create open source projects that work as a _showcase_ for your main product. This shows both what is possible to do with your APIs/data/library and developers can see how to do it.

[Norgeskart](https://norgeskart.no) is an interactive map of Norway created by Kartverket (The Norwegian Mapping Authority). It's on [GitHub](https://github.com/kartverket/norgeskart3). I asked Kartverket why they open sourced this project, and Senior Engineer Håvard Vidme at Kartverket could tell me: "Norgeskart is our so-called 'showcase' where we show some of what we have. If someone wants to create their own map client with or data, that's great, and we happily display what we have done." So Norgeskart is not Kartverket's main product – their APIs and services are. Norgeskart is more a side-project that encourages the use of the APIs and services. 

Another example is [Entur Tavla](https://github.com/entur/tavla). It serves as an example of how one can create cool things from Entur's data, and teaches developers how their SDK can be used to accomplish this.

## It's your business model
Open source does not mean _free_, as you might have read this [December 18th](https://opensource.christmas/2019/18). [_Highcharts_](https://www.highcharts.com/) is a good example of this. Highcharts is a chart library, and [it's open source](https://github.com/highcharts/highcharts). Their licensing model makes it free to use non-commercially, which has ensured wide and fast adaptation. But it's not free to use _commercially_. This has made Highsoft, the company behind it, one of Norway's [most profitable companies](https://www.bt.no/nyheter/okonomi/i/e8v5La/denne-gjengen-har-skapt-en-av-landets-aller-mest-loennsomme-bedrifter).

## Security
Remember the first paragraph in this article? Since evil persons can read the whole code base, this sounds scary. But the thing is, there are many good people out there as well. When a project is open source, there is a greater possibility that vulnerabilities are found and fixed, depending on the size of its community. 

A lot of automated processes and tools can also help in finding vulnerabilities in open source software, like [Snyk](https://snyk.io/) and [npm audit](https://docs.npmjs.com/cli/audit). Also, [GitHub Security](https://github.com/security) is a very interesting new initiative. 

## And the answer is...
Does our simple question have a simple answer? No. There are many possible reasons to open-source your project, and they depend on the characteristics of the project, and the principles and philosophy of your team and company. 
We haven't talked about any of the reasons _not_ to open-source your projects, but hopefully this article has helped enlighten some of the benefits.

Why did you open source your project? I'd like to know! Email me at mats.byrkjeland@bekk.no.
