---
calendar: ux
post_year: 2020
post_day: 21
title: This article emits 0.28g of CO2 every time it’s viewed...
ingress: ...whereas [this article](https://ux.christmas/2020/4) only emits
  0.27grams CO2 per page view. But oh [this one](https://ux.christmas/2020/6)…
  1.56grams CO2 for each view 😬
description: "The internet and websites require a lot of energy, and thus also
  have an impactful carbon footprint. As digital product designers and
  developers, we have a responsibility to design and develop more sustainable
  websites.  "
authors:
  - Håkon L'orange
---
## So what?

Well, I’m not particularly concerned about the environmental impact of these articles specifically. However, the internet consumes about 416.2TWh of electricity every year – that’s more than the entire United Kingdom. And with more people and devices getting connected to the web every day, the energy consumption is rapidly growing.

As digital product designers and developers, we make tiny decisions every day. Decisions that affect the amount of energy required by data centers, networks, and devices to run what we design and build. Some of us are designing websites with hundreds of thousands or even millions of page views every year. Or even more. This means we’re in a position to make a lot of harm if we’re unconscious about the consequences of these everyday decisions. On the other hand, it also means we can have a great impact if we’re doing it the right way!

By reading this article you’ll hopefully get a better understanding and become more conscious about the carbon footprint of websites and digital products. And fear not. It’s not all carbon shaming. I’ll also provide some tips to design and develop more sustainable products and websites. More often than not, these tweaks will also improve your user's experiences.

## So what makes these articles so different?

Well, they run on the same technical setup, so I’m pretty sure it’s the content that explains the difference here. But just to be clear. What I refer to as the technical setup is the hosting service, code frameworks/templates, scripts, logos, fonts, and probably some other stuff. This technical rig requires 24 network requests to get access to the necessary (hopefully) information for the page to work and look as intended. This also affects energy consumption and thus the carbon footprint.

Anyway. Let’s look at the difference in content between those articles. 

The article, *"So you’ve opened Figma, now what?"* (the Figma article from now on), Is a short and precise introduction to an awesome Figma tutorial carefully crafted to make you a Figma ninja in no time. Figma itself also has a (probably quite large) carbon footprint. But let’s focus only on the article for this case.

Secondly, the article, *"What I Learned About UX Writing From a British Prog Drummer and David Lynch"* (the UX writing article from now on), is a very interesting and well-written piece. It demonstrates how words are incredibly powerful and can improve the user experience of whatever you’re designing if used right. 

Here is a breakdown of the content and how it affects the web page.

|                           | Figma                | UX writing           |
| ------------------------- | -------------------- | -------------------- |
| Words                     | 441                  | 2021                 |
| Images                    | 1                    | 8                    |
| Network requests          | 25 (24 + 1 image)    | 32 (24 + 8 images)   |
| Total page size           | 474 kb               | 2600 kb              |
| Avg load time             | 0.26 s (from the UK) | 1.46 s (from the UK) |
| g CO2 / page view         | 0.27                 | 1.56                 |
| Compared to average sites | 81 % cleaner         | 68 % dirtier         |

As you can see, there's quite a large difference in both words and images in these articles. From checking the network tab in the browser developer we can see that the images make the main difference between these articles. Actually, one of the images in the UX writing article is 1.2MB and makes up half the total page size of the. I don’t think the author was aware of this image’s size. And I don’t think he’s alone in not being aware of the size of images, videos, and other files that get added to the web. 

Plain markup and text hosted on the same server as the rest of the page require minimal amounts of additional energy needed to load the page. Whereas media, custom font files, javascript packages, and scripts that are hosted outside can quickly add up and make your page large and thus require a lot of energy to load slowly to the user.

## So what about the consequences?

Imagine these articles getting attention from the UX scene in various scales and parts of the world which brings the following page views and CO2 emissions.

|                           |                | TOTAL KILOGRAMS OF CO2 |                |
| ------------------------- | -------------- | ---------------------- | -------------- |
| **Reach**                 | **Page views** | **Figma**              | **UX writing** |
| Colleagues 🙋‍♀️🙋‍♂️     | 50             | 0.0135                 | 0.078          |
| Norway 🇳🇴               | 1000           | 0.27                   | 1.56           |
| Scandinavia 🇳🇴🇩🇰🇸🇪  | 50000          | 13.5                   | 78             |
| Europe 🌍                 | 100000         | 27                     | 156            |
| Global 🌍🌎🌏             | 550000         | 148.5                  | 858            |
| Compared to average sites |                | 81 % cleaner           | 68 % dirtier   |

If these articles went completely viral across the globe with 550 000 pageviews each it would roughly add up to 1 ton of emitted CO2. One ton of CO2 compares to producing 250 hamburgers or flying one passenger about 4500 km – that’s roughly Oslo - Sardinia roundtrip. Considering these emissions are just for 2 pages below average size and quite few page views compared to other websites, you can see how this quickly adds up. 

And by the way. The total time people (if they were in the UK) would wait to access these articles would be 21.9 days. Better make that content worth it!

## All right, I get it. I’ll remove all images from our website... 😟

No, that’s not the point. Images, videos, and visualizations can be great to transform complex information into easily digestible content for our users. And without a doubt help to build strong and unique brands.

This quote is from the UX-writing article:\
“What I’m saying is being creative for creativity’s sake is not enough. It has to add meaning or value.”

And guess what, it doesn’t just apply to creativity. It applies to content and media too. What is the best way we can communicate what we want and need the people interacting with our product to deliver a valuable user experience? Cause that’s the ultimate goal, right?

I have added many images and videos to make web pages look beautiful and pretty. For the sake of looking beautiful and pretty (which can be right sometimes). Without blinking. Or considering the file size. If you have done so too, you’re not alone and I don’t blame you. 

That’s exactly why I’m writing this – to shed some light on how awareness of these tiny decisions and the things we talk about can make a difference. Both for your product, the people using your product, and the environment.

## Soo.. What can we do?

There are a lot of ways to contribute. No one can do everything. But we all have to take responsibility and do our part. As product designers, we often work closely with developers, copywriters, marketers, and decision-makers. This means we are in a great position to spread the message and impact different parts of the product. But we don't have to do all the work ourselves. So here are some tips to get you started on the journey to design more sustainable digital products and websites (and better user experiences):

### Speed test and optimize your website

Neither the people using your product or the globe like slow websites. [Google’s page speed insights](https://developers.google.com/speed/pagespeed/insights/) and [Pingdom speed test](https://tools.pingdom.com/) analyzes your site and suggests actions you can take to optimize and make it load faster. Google also satisfies this and will rank your site higher in search results as a reward 🥇

### Make sure all content adds value to your users

How much of the internet’s content is outdated? I have no idea, but I bet it’s a fair share. This content also needs to live somewhere, and this somewhere also uses energy. Probably not renewable. So make sure your content is easy to find and add value to your users. 

### Focus on SEO

It may not seem obvious, but by improving your SEO, users will find what they were looking for quicker, with fewer clicks, which in turn means less time spent on the internet in general. Bonus! You will also get more users to your site and product.

### Choose media for communication wisely

Again... Do you need that image or video? Maybe you can deliver the same or even a better and more accessible user experience with clear and concise language, or with an SVG illustration. If you do need an image or video, make sure to scale and optimize it properly before shipping it. I use [Imageoptim](https://imageoptim.com/mac) and the [Tinyimage plugin for Figma](https://www.figmaticapp.com/tinyimage/)

### Use emails sparingly

Guess what. Emails [also have carbon footprints](https://www.statista.com/chart/20189/the-carbon-footprint-of-thank-you-emails/). Ask yourself if your users need that status update email right away. Maybe they can wait and get a summary of status updates tomorrow? Only use email notifications if you have to, and the user will benefit from getting the information immediately. And yes, you should also unsubscribe all those newsletters you never read anyway 🚮

### Spread the word and raise awareness

Just talk about it. Tell developers, colleagues, and clients. Yes! Even friends, moms, granddads and everyone else needs should be aware of this. Websites, streaming services, and the internet in general has a real CO2 footprint and requires huge amounts of electricity through transfer networks, data centers, and devices.  

### Choose a green hosting service

Use a green hosting service when starting a new project. The location of the data centers and their energy sources will have a huge impact on the CO2 emissions from your site/product. You can check what energy source your current hosting service uses on [websitecarbon.com](https://www.websitecarbon.com/) and see if you should switch. 

By the way, Kristofer Selbekk you don’t have to check. I already did. It doesn’t look good. Since you use every occasion to brag about how much traffic these calendars drive, I think it’s time we do our part and use green hosting for these calendars right away 😉 Hope you’re up for the challenge! In this article, you can learn about [how to choose a green hosting provider](https://www.wholegraindigital.com/blog/choose-a-green-web-host/). 

There are sooo many other things you and your team can do. If you’re interested, Wholegrain Digital takes this topic seriously and provides many [additional tips for developing greener websites](https://www.wholegraindigital.com/blog/website-energy-efficiency/).

## Let’s make the world wide web green again 🌱

Some nice (and green) websites and resources for you to check out:

· [Y Oslo](https://www.y-oslo.com/) - Turn on green mode - Shoutout to Netlife for spreading the word!

· [Sustainable web manifesto](https://www.websitecarbon.com/website/sustainablewebmanifesto-com/) - Sign if you agree

· [Wholegrain digital](https://www.wholegraindigital.com/) - The creators of [Website carbon](https://www.websitecarbon.com/)

· [Dot York](https://dotyork.com/)

<p>&nbsp;</p>

- - -

Sources:

<https://www.custommade.com/blog/carbon-footprint-of-internet/>

<https://www.websitecarbon.com/>

<https://www.wholegraindigital.com/blog/website-energy-efficiency/>

<https://www.datacenterknowledge.com/industry-perspectives/data-center-dilemma-our-data-destroying-environment>

Designing for Sustainability by Tim Frick