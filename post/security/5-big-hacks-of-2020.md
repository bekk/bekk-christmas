---
calendar: security
post_year: 2020
post_day: 4
title: Five big hacks of 2020
image: https://cdn.pixabay.com/photo/2017/10/24/07/12/hacker-2883632_960_720.jpg
ingress: "Today we are going to explore five big hacks that took place in 2020.
  First we'll cover two hacks that targeted Norwegian companies Sykehuspartner
  and NHH. Then we'll take a look at a hack that targeted the Danish company
  ISS. To wrap things of we'll cover what is probably the two most high profile
  hacks of 2020: the Twitter phish and the CWT ransom."
description: Twitter, phish, CWT, ransom, Sykehuspartner, ISS, CWT, hack
links: []
authors:
  - Yrjan Fraschetti
---
## Sykehuspartner

![Sykehuspartner logo](https://i.ibb.co/hyMVdWh/Skjermbilde-2020-11-20-kl-07-30-21.png "Sykehuspartner")

Sykehuspartner deliver IT, HR, project and logistics services to all hospitals in the Norwegian health region Helse Sør-Øst (Health South East). It manages vital IT systems for the hospitals, both clinical and administrative applications, as well as infrastructure and networks.

On august 22 2020 several of Sykehuspartners applications became the target of an unknown malicious actor. Only one hospital (Sykehuset Innlandet) was targeted in this attack. Not much is known by the type and scope of the attack, except for what type of data might possibly have been stolen. The potentially stolen data might include:

* Information about the deceased
* Health information about patients from research projects
* Personal information about employees
* Name and social security number (fødselsnummer) of students

From reports about the incident, we know that 25 patients and several employees has been notified that personal information have been stolen. Following the attack, the hospital has carried out a forced password change for all employees.

**Sources**

* [Sykehuspartner announcing attack](https://sykehuspartner.no/nyheter/dataangrep-mot-sykehuset-innlandet-hf)
* [Sykehuspartners analysis of attack](https://sykehuspartner.no/nyheter/analysearbeidet-etter-dataangrepet-mot-sykehuset-innlandet-er-avsluttet)

## NHH

![NHH logo](https://i.ibb.co/sjQnhNF/imageedit-10-3684463812.png "NHH logo")

In august this year, Norges handelshøgskole (NHH, English: Norwegian School of Economics), experienced a data heist. The school is one of the leading business schools in Europe and is located in the city of Bergen. 

Usernames and passwords of both students and employees was compromised. The break in was discovered when the stolen credentials were uploaded to a “hacker” forum. The attack targeted a known vulnerability in an old version of the VPN service called Pulse Secure. An updated version that patches this vulnerability has been available since April 2019. But NHH is decommissioning the service and has thus been neglecting to update it. All students and employees were asked to change their passwords after the incident.

**Sources**

* [Norwegian news article about NHH attack](https://www.dn.no/utdannelse/nhh/datakriminalitet/nhh-oppdaterte-ikke-sikkerhetshull-kjent-siden-april-2019-na-er-handelshoyskolen-rammet-av-internasjonalt-dataangrep/2-1-853329)

## ISS

![ISS logo](https://i.ibb.co/XDJVmgQ/imageedit-12-3910494650.png "ISS logo")

In the middle of February this year, ISS was hit by a ransomware attack. ISS is global facility services company, founded in Copenhagen, Denmark. The company has 450,000 employees.

The ransomware was a massive malware attack across IT-systems and networks. Immediately after the attack was discovered, IT-access was removed to isolate the indicent. As reported by the company. Regardless of the actions taken, the company had to write down and change big parts of the IT-infrastructure. It is estimated that the attack will cost the company between 750 and 1340 million Norwegian kroner (NOK).

It was reported that customer data was not stolen.

**Sources**

* [Norwegian news article about ISS attack](https://www.digi.no/artikler/dansk-servicegigant-rammet-etter-skadevareangrep/485762)
* [Norwegian news article about aftermath of ISS attack](https://www.digi.no/artikler/iss-venter-milliardsmell-etter-cyberangrepet-i-februar/488264)

## Twitter

Twitter, you know, the social media platform? Yes, that one. In July this year, it was hit with a phishing campaign that was used to target high-profile individuals, like Barack Obama, Joe Biden and Bill Gates.

Twitter stated that "This attack relied on a significant and concerted attempt to mislead certain employees and exploit human vulnerabilities to gain access to our internal systems".

The phish was used to get access to certain high-profile accounts. The compromised accounts were used to promote a bitcoin scam.

![Tweets from Joe Biden and Barack Obama promoting a bitcoin scam](https://i.ibb.co/sPXDZK7/external-content-duckduckgo-com.png "Biden and Obamas twitter profiles were hacked to promote a bitcoin scam")

**Sources**

* [News article about Twitter hack](https://edition.cnn.com/2020/07/15/tech/twitter-hack-elon-musk-bill-gates/index.html)
* [News article about Twitter hack - two weeks later](https://edition.cnn.com/2020/07/30/tech/twitter-hack-update/index.html)

## CWT

CWT is a travel management company that manages business travel, meetings and so on. The 27 of July this year, the company was hit by a massive ransomware attack that knocked 30,000 computers offline. The hackers claimed to have stolen two terabytes of files, including financial reports, security documents and employees’ personal data. CWT paid $4.5 million to the hackers to restore their systems. 

One of the fascinating things about this hack was that the negotiation chat, where the company and the hackers met to talk, was left open to the public after the negotiations ended. This gives us a never before seen insight into how the negotiations between hacker and hacked works. As many others have noted after the chat became public, it is rearly advised to actually pay the hackers like CWT did. That us because of the precedence it sets and that the chance of getting scamed is very high.

![Screenshot of chat between hackers and CWT](https://i.ibb.co/QC7f7MJ/cwt-chat.jpg "Screenshot of the negotiation chat between hackers and CWT")

**Sources**

* [News article about CWT attack](https://www.reuters.com/article/us-cyber-cwt-ransom-idUSKCN24W25W)

# In conclusion

This is of course not a complete list of all the major hacks that were reported in 2020. It sure has been a very active year in this regard. As you can see, there are many ways of being vulnerable on the internet. If you want to better understand how to prevent some of these things happening to you, take a look at the previous three posts:

1. [Application security check list](https://security.christmas/2020/1)
2. [Github Security: Getting started with Dependabot](https://security.christmas/2020/2)
3. [How secure is your build pipeline?](https://security.christmas/2020/3)

Also, be sure to follow this advent calendar for even more articles leading up to Christmas day!