---
calendar: thecloud
post_year: 2019
post_day: 15
title: How clouds impact environment
image: >-
  https://images.unsplash.com/photo-1461733467189-bdbea5525075?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: >-
  We are generating astounding amounts of data. Estimates show that the amount
  of data worldwide will reach 175 zettabytes by 2025. Roughly half of it will
  be stored in public clouds and the rest in other types of data centers. What
  kind of impact does this have on the environment? And is there anything you
  can do about it?
links: []
authors:
  - Safurudin Mahic
---
## The digital economy requires a massive infrastructure

In today's digital economy, storing, processing and transporting information in all digital services we employ is a massive undertaking. Imagine only the amount of documents, emails, snaps, Spotify and Netflix steams, Google searches the world does during a single day. The amount of data stored and processed inceases by more than 60% per year, and will reach 175 ZB in 2025 by [some estimates](https://www.forbes.com/sites/tomcoughlin/2018/11/27/175-zettabytes-by-2025/#5d9ed0354597), up fom 33 ZB in 2018.

To be able to manage and process this vast sea of data requires some pretty heavy infrastructure. We often use the term cloud, but the cloud in reality is nothing more than huge amounts of data centers scattered around the world covering millions of square meters of real estate which in sum operate millions of servers. 

![test](/assets/tc-15-centres.jpg "Image of data center (Source: https://classmayte.wordpress.com/2016/02/06/what-is-data-center-what-are-the-top-5-largest-data-centers-around-the-world/)")

_Aerial view of a large scale data center in San Diego (Source: Wordpress)_

The data centers powering the cloud have become as essential as water and electricity to the public. When cloud services [go down](http://nymag.com/intelligencer/2018/03/when-amazon-web-services-goes-down-so-does-a-lot-of-the-web.html), the world halts. We've become dependant on cloud services both at work and at home. 

We depend on it at work to be able to send and receive email, share and collaborate on documents, code, schematics and files. We use it to buy shoes and other merchandise online, and we communicate with our colleagues, friends and family both near and far via the services build on the cloud.

The need to store all of our data together with the shift to cloud has lead to a golden period of development in the data center industry, and the number of hyperscale datacenters in the world powering the cloud has experienced a 100% increase the last 5 years alone. Today there are over [500 hyperscale datacenters in the world](https://www.datacenterknowledge.com/cloud/analysts-there-are-now-more-500-hyperscale-data-centers-world), and 150 more are under development. And there is a total of [8 million datacenters 
worldwide](https://www.statista.com/statistics/500458/worldwide-datacenter-and-it-sites/).

![](/assets/tc-15-growth.png "Growth of hyperscale data centers")

## What is the problem?

Building data centers has become a large industry with an expected value of [$57 bn by 2025](https://www.cbinsights.com/research/future-of-data-centers/#storage), and the rapid increase in number of hyperscale data centers the last few years accompanied with an expectation of even faster growth towards 2025 begs for a number of questions with regards to environmental impact.

In addition to the actual housing of the data centers, you need to fill the data centers with lots and lots of hardware, hundreds of miles of cable, refrigerant and water for cooling, batteries and diesel generators to mitigate power outages, and last but not least - an enormous amount of energy to operate the hardware. 

**Hardware**

It is hard to imagine how much data 175 ZB represent, but if you were able to store that onto BluRay discs, then you’d have a stack of discs that can get you to the moon 23 times. To store it on hard drives, you would need approximately 11 billion drives(!) (the largest hard drive in production as of writing is 16TB). Imagine the resources necessary to manufacture only the disk drives, and you will begin to realize that data center consumes a lot of resources.

Since data centers require so much hardware, it is natural to assess the lifecycle impact of the hardware used in the data centers. For data center operations, hardware needs to be manufactured, shipped, installed, operated and decommissioned. Each of these processes requires resources. The manufacturing process for computer electronics for instance requires the mining and extraction of metal ore and in some instances rare earth metals such as neodymium which is used in traditional hard drives and terbium which is used in solid state electronics. Although rare earth metals is a somewhat [misleading term](https://www.scientificamerican.com/article/dont-panic-about-rare-earth-elements/), the extraction and processing of ore to produce concentrates usually involves usage of lots of heavy machinery and chemicals and leaves [significant impacts](https://www.researchgate.net/publication/227332044_Environmental_impact_assessment_of_open_pit_mining_in_Iran) on the environment via the open pits the mines [imprint on the geography](v). 

Hardware also usually has a fairly limited life span. Usually hardware is replaced every 3-5 years to keep up with performance requirements and reliability concerns for operations. [Decomissioning ](https://www.networkworld.com/article/3439917/how-to-decommission-a-data-center.html)hardware might entail both hazardous materials such as refrigerant used in cooling systems, electronic waste and recycling electronics. Especially recycling electronics will have a big impact on the life cycle assessment of the hardware. 

**Real estate**

Data centers require a lot of space. Hyperscale datacenters require hundreds of acres of land in order to accomodate the hardware. One of the issues are that cloud providers usually want data centers to be as close as possible to most end users, in order to provide best performance and lowest latency. This has lead to a competition for real estate between data centers and humans, and in Amsterdam, which houses 30% of all hyperscale data centers in Europe, it led to a [temporary ban on building new ones](https://www.datacenterknowledge.com/regulation/why-amsterdam-halted-data-center-construction). 

**Energy**

Servers in data centers are on 24/7/365. Scaling to hundreds of thousands of servers, they naturally consume vast amounts of energy. According to estimates from the International Energy Agency, data centers in the world account for [approximately 200 TWh/year energy consumption](https://www.iea.org/reports/tracking-buildings/data-centres-and-data-transmission-networks). This is approximately 1% of the total worldwide energy consumption. 1% might not sound like a big deal, but that is the equivalent of the [total energy consumption of Indonesia](https://www.worlddata.info/asia/indonesia/energy-consumption.php), a country of 250 million citizens and the 4th most populated country in the world. What is more important, the source of this energy might come from fossil fuels such as coal. If all this energy were produced by coal plants, it would result in an annual emission of [1.2 billion metrics tonnes of CO2](https://www.sourcewatch.org/index.php/Estimating_carbon_dioxide_emissions_from_coal_plants). In comparison, the total aviation industry emits roughly [0.9 billion metric tonnes of CO2](https://theicct.org/publications/co2-emissions-commercial-aviation-2018). Although many cloud providers have pledged to decarbonize their data centers, none have ditched fossil fuels entirely, and most of them rely on renewable energy credits rather than directly utilizing renewable energy sources such as solar or wind power. Greenpeace has been [following up](https://www.greenpeace.org/usa/news/greenpeace-finds-amazon-breaking-commitment-to-power-cloud-with-100-renewable-energy/) on the cloud providers pledges, and there are big differences, as laid out in [this recent](https://www.wired.com/story/amazon-google-microsoft-green-clouds-and-hyperscale-data-centers/#) Wired article.

Some [alarmist predictions](https://www.nature.com/articles/d41586-018-06610-y) indicate that the total energy consumption of data centers could rise to as much as 8% of total world energy consumption by 2030.

That's why environmental impact of the cloud is first and foremost dictated by the amount and source of its energy.

## Is there some light at the end of the tunnel?

Maybe

**Increased energy efficiency on component level**

Although various sources report an increased energy consumption due to the increased demand for computation, and in particular an increased number of data centers, the International Energy Agency [refutes this](https://www.iea.org/reports/tracking-buildings/data-centres-and-data-transmission-networks), claiming the energy consumption will be stable for at least the next three years despite a projected 80% increase in data centre traffic and 50% increase in data centre workloads.

This needs some explanation. For the last 50 years, we have been able to cram an exponential number of transistors in a single processor. Mainly driven by manufacturing process improvements, reducing the size of each transistor has in addition to giving an exponential improvement in computing power, enabled a reduction in power consumption. So, even though we've seen a rapid increase in number of data centers, the technology improvement has been reducing power consumption by an equal amount. 

However, these efforts have lately come to a halt. We are getting close to physical boundaries with regards to how small each transistor can get before experiencing quantum effects, rendering computations non-deterministic. Therefore, instead of focusing on reducing transistor size, the processor industry has focused on providing the opportunity to increase the number of cores, and improve computation by parallelization.  Today, you can find processors with up to 64 cores, and GPUs with hundreds of cores, enabling parallellization of specific tasks. But not all computations are parallelizable, and this too will hit a rooftop in the future. 

A third technology improvement has been dynamic scaling based on demand. Most processors and servers nowadays have the ability to idle or throttle down when not in use, consuming only a fraction of  energy.

Lastly, replacing older hard drives with SSD drives reduces the energy consumption by half.

**Increased energy efficiency on data center level**

Energy is the single largest expense for a data center operation, this is in particular true for hyperscale operators of public clouds. These companies have invested heavily in improving their infrastructure. A standard measure used in industry is power usage effectiveness (PUE) - the ratio of total power required to run an entire facility versus the direct power involved in compute and storage. Over the past 10 years public cloud vendors have decreased this value considerably. While smaller data centers are still being measured with PUE values greater than 2, large hyperscale cloud data centers are beginning to record [PUE value of 1.1](http://eta-publications.lbl.gov/sites/default/files/lbnl-1005775_v2.pdf) or less, which is very close to the theoretically perfect PUE of 1.0. 

**What will the future bring?**

In the past decade, processor scaling and general improvement in energy efficiency on both component level and data center level, via reductions in PUE, has been ensuring us an efficient offset in total energy consumption in data centers, even due to strong growth of both hyperscale and regular data centers.

However, now that we are starting to hit some physical and theoretical limitations, these low-hanging fruits are gone. The shift away from small, inefficient data centres towards much larger cloud and hyperscale data centres seems evident. The Lawrence Berkeley National Laboratory [estimated](https://newscenter.lbl.gov/2016/06/27/data-centers-continue-proliferate-energy-use-plateaus/) that if 80 percent of servers in the U.S. were moved over to optimized hyperscale facilities, this would result in a 25 percent drop in their energy usage. A prediction by the IAE is that this trend is already on its way, as illustrated in the chart below.

![](/assets/tc-15-hyperscale.png "IEA, \\"Global data centre energy demand by data centre type\\", IEA, Paris https://www.iea.org/data-and-statistics/charts/global-data-centre-energy-demand-by-data-centre-type")

_IEA, "Global data centre energy demand by data centre type", IEA, Paris https://www.iea.org/data-and-statistics/charts/global-data-centre-energy-demand-by-data-centre-type_

Meanwhile, these hyperscale operators continue to innovate. Google for instance entered into a collaboration with DeepMind to [improve data center cooling](https://www.bloomberg.com/opinion/articles/2019-12-13/energy-efficiency-a-hot-problem-for-big-tech-data-centers?srnd=opinion) via Machine Learning and just recently launched a fully automated solution for their data centers, rendering a PUE of 1.06 on certain facilities.

![](/assets/tc-15-ml.jpg "https://www.cbinsights.com/research/future-of-data-centers/#energy")

_A typical day of PUE (power usage effectiveness) with ML turned on and off. Source: DeepMind_

The cloud vendors also continue to improve on runtimes, virtualization, compression and software that runs on top of this hardware. For instance, Google [recently launched](https://cloud.google.com/blog/products/compute/understanding-dynamic-resource-management-in-e2-vms) a new task scheduler which assigns resources dynamically, hence increasing hardware utilization in massive-multiparallell environments. Microsoft has done substatial work to improve performance in their .NET Core libraries for the same reasons. 

But the biggest signal, says Fox, will come from us, the digital consumers. Increasingly, he says, “they understand that every cloud lives inside a data center. And each has a different footprint.” We will, he believes, soon all demand to know the carbon footprint of our video streams and internet searches. The more far-sighted of the big data companies are gearing up for that day. “I fully expect we may see green labelling for digital sources as routine within five years.” 

Data center energy consumption first came under heavy scrutiny in the early 2000s, when experts warned that the rapid growth of the Internet would drive a rise in worldwide fossil fuel emissions. Thankfully, energy efficiency improvements and innovation in renewable energy has substantially lowered the increase of the industry’s power consumption – despite the fact that the hunger for data has accelerated.

Furthermore, improved hardware efficiency, server virtualization and the advent of hyper-scale data centers, has driven economies of scale for the likes of Microsoft and Amazon. These IT behemoths have mastered the art of maximizing data center efficiency and server utilization, as well as improving their power systems and cooling equipment.

## Why is this important and what is there to be done?

Resistance to both the cloud and the Borg is futile. Limiting viral videos, Google searches and users from using online services is obviously to no purpose. 

However, for us in the industry of making such services, there lies a responsibility to inform and acquaint our bosses, customers and decisionmakers about environmental impacts of their decisions.

As a part of this advent calendar, our CTO wrote an article about private PaaS [being considered harmful](https://thecloud.christmas/2019/2). He was mainly arguing the benefits of public clouds versus private clouds and data centers. I hope this article has contributed to illuminate a new perspective. Not only are private clouds considered harmful from an innovation perspective, but from an environmental aspect as well, where hyperscale clouds continue to innovate not only on the breath of services, but also on energy efficiency on a scale. 

Disruptive innovation on the compute side will inevitably come to market soon, giving us faster compute engines and architectures that deliver more computational density per watt. We are currently stuck with architectures developed some 40 years ago that are not going to satisfy humanity’s insatiable thirst for a lot more processing, much faster processing and much more energy-efficient processing.
