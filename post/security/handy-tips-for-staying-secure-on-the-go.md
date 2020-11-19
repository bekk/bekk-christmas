---
calendar: security
post_year: 2020
post_day: 6
title: Handy tips for staying secure on the go
image: https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80
ingress: >-
  We wrote about ["Safe travels for the road
  warrior"](https://security.christmas/2019/21) last year. This year we offer
  one more trick, and expand our list for staying safe and secure on the road.


  Watch out for shoulder surfers, and protect your equipment if you have to leave it in for example your hotel room.
description: "HOWTO: Protect your equiptment when you are traveling, and learn
  how to fend off shoulder surfers"
links:
  - url: https://resources.infosecinstitute.com/topic/30-cybersecurity-tips-for-travelers/
    title: 30 Cybersecurity tips for travelers
  - url: https://us.norton.com/internetsecurity-mobile-8-cyber-security-tips-for-business-travelers.html
    title: 8 Cyber Security Tips For Business Travelers
  - url: https://en.wikipedia.org/wiki/Shoulder_surfing_(computer_security)
    title: Shoulder surfing (Wikipedia)
authors:
  - Didrik Sæther
---
*PANDEMIC WARNING: Stay at home if you can. A virus has for the better part of 2020 attacked physical infrastructure (people). We have no patch or hotfix, so while that is being worked out, we advice you to travel as little as possible.* 

## Shoulder surfers:

Be aware of your surroundings and reduce the risk of shoulder surfers. A shoulder surfer is someone who is peaking over your shoulder to get information. We can spot people prone to this type of social engineering attack all the time. When people are visiting a cafee, are on public transport, or on air planes they will use their laptop for work stuff. And they don’t notice, or care if someone is looking.

To protect your information, you can, and should invest in a privacy shield for you screen. They cost next to nothing, but reduce/limit the viewing angle of your display.

![privacy screen protector](https://cdn57.androidauthority.net/wp-content/uploads/2019/04/privacy-screen-protector-angle-2.jpg)

Reduce the number of apps visible on your computer. On a Mac I recommend that you use [Bartender](https://www.macbartender.com/), but there are Windows and *Nix options as well. The point of this application is that it hides all the running apps from the menu bar, so that it looks like this: 

![a neat menu bar](https://i.imgur.com/QsbNjHu.png)

rather than this abomination of a menu bar: 

![an untidy and talkative menue bar](https://eshop.macsales.com/blog/wp-content/uploads/2019/05/1password1280.jpg)

The reason for hiding this information from shoulder surfers is that it reveals many of your attack vector. If someone knows what applications you are running, they know a lot about you. Developer tools, Automator scripts, and a password manager? You presumably work in IT. Bluetooth enabled, an old version of Outlook and a TorrentClient? The bad guys already have tools for these applications.  

## Mikado security

The other tip is to not leave your computer laying around. This may seem obvious, but there are times when this is impossible. There will be events where you have super secret stuff on your computer, and must step away for a period of time. For instance in a hotel room while you are away for an hour, or go to a resturant.

If an adversary has physical access to your device, they can do all sort of damage. [A poker player had this happen to him](https://www.theregister.com/2013/12/11/poker_pros_call_shenanigans_over_hotel_malware_infections/), where someone broke into his hotel room to install malware on his laptop. This is only one of the cases, but we suspect there are many more based on  the fact that hotel room locks are [ridiculously insecure](https://youtu.be/-Bazy3Ew6D4), and [easy to bypass](https://youtu.be/RX-O4XuCW1Y).\
So to combat this problem, we have devised a nice little trick to help you stay safe if you have to leave your device behind.

![](https://live.staticflickr.com/5475/9350249910_6aeb4b5d85_h.jpg)
[Mikado](https://flic.kr/p/ffftxm) by [Balazs Koren](https://www.flickr.com/photos/kobakpontorg/), on Flickr

Mikado (also known as “pick-up sticks game”) is a game where players drop a bundle of sticks as a loose bunch onto a table top. Each player in turn tries to remove a stick from the pile without disturbing any of the others.

MikadoSecurity is where you spread the sticks over the object that you want to protect. You then take a picture of it, and when you return, you can verify that no one has tampered with your device. 
In the event that the sticks are not as you left them, you can escalate the problem. Either to do forensics, or discard the computer if you need to.

This trick relies on the same principles as we rely on for computer security. Prime number factoring, traveling salesman problem and SAT are hard to solve if P != NP, but easy to verify. 
An example of this is a sudoku board. It is hard for both humans and computers to solve, but if I hand you a board, it is easy for you to verify if I did it correct. 

![](https://i.imgur.com/fibOzob.png "Hard to solve / Easy to verify")