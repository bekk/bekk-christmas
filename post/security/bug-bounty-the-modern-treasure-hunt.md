---
calendar: security
post_year: 2019
post_day: 3
title: Bug Bounty - The modern treasure hunt
image: >-
  https://images.unsplash.com/photo-1501511795728-df53825d742a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80
ingress: >-
  So, you would like to be one of the cool security researchers that find
  vulnerabilities in the most used websites in the world, saving millions from
  the bad guys, and maybe make some cash along the way? Well, this is your lucky
  day! It's time to learn about bug bounties!
links:
  - title: HackerOne
    url: 'https://www.hackerone.com/'
  - title: BugCrowd
    url: 'https://www.bugcrowd.com/'
authors:
  - Hans Kristian Henriksen
---
As you hopefully know, you can't just go to a random website and start poking around for a security hole. That would be akin to going around the neighborhood, checking the windows and doors of all the houses. At some point, someone will call the police, and with good reason. But the best way to find security problems is to actually test the site, so to make sure we are not arrested, we have to join a bug bounty.

A Bug bounty program is a program set up by the owners of a website or application to make it possible for developers to test the security of a site in a safe and legal way. By joining the program, and sticking to the rules, you can be sure that you are not exposing yourself to any legal risk, and that you won't do anything that could potentially harm the website or application you are testing. While all programs are different, there are some common traits:

* Prerequisites: You may be asked to register with the service before starting tests. This might include creating a dedicated account for the testing, or simply clicking a button or sending an email.
* Allowed systems/URLs: You will be given instructions on which part of the system you may test, and which are off limits. Some programs may provide a dedicated test environment for security testing, but it is actually most common to allow tests against the production environment.
* No automated tools/DOS: Most programs forbid the use of automated security test programs. These have a nasty tendency to bombard a system with thousands of requests, and could effectivly perform a denial of service attack. This is not very helpful.
* Non-awarded vulnerabilities: Yes, there might actually be vulnerabilities you find that the sites are not interested in reports about. That might sound strange, but some attacks are either too far fetched, not really preventable (DDOS), or pose too small a risk.
* Rules for disclosure: When you find a vulnerability, you will be asked to follow a procedure for reporting it. This will usually include a rule stating that you may not share your findings with others until the owner of the site approves of this (or a fixed time, typically 90 days) have passed. You can read more about disclosure in our post on Responsible disclosure.
* Reward: Make it rain! If you are lucky, and you are the first to find a vulnerability, you just might get paid! Some programs offer large monetary awards, while others give internet points or honor and glory.

Bug bounties may seem odd at first. Why would anyone invite hackers to their site? The rationale is that through being open to receiving reports of security issues, and compensating the work of security researchers as your self, people are more likely to actually report issues to you, rather than trying to sell the vulnerabilities to the highest bidder on the dark web.

## Tips for getting started

I won't pretend that finding security holes will be easy, but the prospects are not as grim as one might think. While many of the sites that have serious bug bounty programs are large organisations with proffesional security teams (read: Facebook, Uber etc.), there have been some spectacularly "simple" bugs found in their bug bounty programs. Facebook had forgotten to check if the person requesting do delete a photo was indeed the owner of said photo, making it possible to delete any photo. In reality, it was as easy as knowing the image ID, and the API to delete an image. Uber on the other hand got a report of a fairly easy workaround to their surge pricing. Place your location pin outside the surge area, then change the adress for pickup to an address in the surge area. 

Neither of these are difficult bugs to find. They only require some creative thinking, and simple testing to validate your theories. It's important to note that actually exploiting these vulnerabilities would be outside the rules of the bug bounties. You may have to set up a second facebook account and delete _one_ of its photos, or order a single ride with Uber, in order to verify your finding, but after that, your next step should be to file your report.

A good way to start is to select one or two types of vulnerabilities you would like to focus on. Then, you systematically start going through the application. If you want to look for missing authorization checks of an API, start by mapping out all possible API calls, then attempt them one by one. You should probably have a notetaking app handy, as you will need to keep track of a lot of attempts.

To get started, you can look for sites that have bug bounties by going to HackerOne or BugCrowd. These are two of the biggest sites gathering bug bounties from different companies. You will find clear descriptions of the rules for each program, and instructions for how to report any findings.
