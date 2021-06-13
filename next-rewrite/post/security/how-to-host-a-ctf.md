---
calendar: security
post_year: 2020
post_day: 18
title: How to host a CTF?
ingress: A CTF is a hacking competition. The participants compete for the
  highest score, by hacking intentionally vulnerable apps. It's a great deal of
  fun competing, but how does one host a CTF? This is the story of how I've been
  doing it, and how my CTF rig has evolved.
links:
  - title: CTFd
    url: https://github.com/CTFd/CTFd
  - title: Traefik
    url: https://doc.traefik.io/traefik/
authors:
  - Mathias Rørvik
---
## How it all began
I'm a huge proponent of Capture The Flag competitions, and I've been involved in the CTF scene since my university days. Lucky for me, there was a CTF club at the University of Oslo. I've always been curious about hacking and the club quickly caught my attention. The club formerly known as UiO CTF (now Oslo CTF) organized workshops and competitions. Soon enough I was a dedicated member of the group and was heavily involved in organizing both competitions and workshops. One of my fondest memories is when we hosted an on-campus CTF with over 80 attendees, and we called a large Norwegian pizza restaurant chain requesting pizza for 80 people. The pizza place wasn't too happy, but they delivered while the head of the security department's jaw dropped when figured out that the department had to pay for 80 peoples worth of pizza. We had an absolute blast.

## Challenges of the CTF Club
Hosting a CTF is a challenge in itself, infrastructure is hard. Especially while being an inexperienced student. The hosting infrastructure has gone through a few revisions during my time with the club. It started out very manual. Spinning up a virtual machine and deploying every task individually, configuring certificates manually with nginx. Everything hosted using the free credits you get, when signing up for a Google Cloud Platform account. It worked, but it was a pain. The next evolution of the platform was the use of containers. Every task had its own container, and it made starting the challenges easier. My friend ended up writing a bash script for starting everything. We finally had some degree of automation, and we kept working on the platform. More and more scripts were written. We had a script for pulling the challenges from GitHub, one for starting everything, and another for modifying nginx configurations files to set up TLS certificates and subdomains, and another for setting up [CTFd](https://github.com/CTFd/CTFd). In the end, we ended up with a hack job of epic proportions which consisted of several python and bash scripts. It was getting out of hand, and it became excruciatingly unmaintainable, but it did the job.

## Still in the game
I graduated with a master’s degree in Computer Science with a heavy focus on Information Security and remained involved with the CTF club post-graduation. Real life awaited me and joined Bekk as a consultant in 2019. Soon enough I became involved with the security group at Bekk. The new direction of the security group was to improve security skills and knowledge through the use of CTF-challenges and wargames. The timing could not have been better, and I felt that I could bring something valuable to the group as a whole given my CTF experience. The security group also provides internal and external services. Security consulting, workshops, and so on.

## The Pandemic 
Covid19 hit like a brick, chaos emerged, the S&P 500 tanked, and the Bekk recruitment apparatus had to pivot quickly in order. Company presentations at universities and colleges were no longer possible, thus emerged project Pangea. The goal was an online platform consisting of multiple presentations, articles, activities, and competitions. Every part of Bekk was encouraged to contribute, and I got a request for organizing a CTF. I was excited, and I grossly underestimated the time and effort needed to pull it all together. I could have just reused the stuff we had made during the time at Oslo-CTF, but it didn't feel right, since I didn't technically own it, so I started working on my own infrastructure. Oh boy, how I grossly underestimated the time and effort needed to pull this thing off.

## Chasing clouds
I dug out a few tasks I had made in the past and started working on quite a few new ones. This was the "easy" part, the challenge was the infrastructure. As I was comfortable with Google Cloud Platform, I picked GCP as my cloud provider. The first thing I looked at was Google Cloud Run, a really neat serverless service. Dockerize the challenge, deploy, and only pay when the container is processing incoming and outgoing traffic. It seemed too good to be true, and unfortunately, it was. I had this odd edge case, where quite a few challenges required interaction over raw TCP. The problem was that Cloud Run requires apps that communicate over HTTP, so back to the drawing board I went. The next obvious choice was Google Compute Engine, a virtual machine.

## Automation Nation
Since every challenge was a docker container, in addition to there being a docker image for CTFd I ended up putting it all into a docker-compose file. Now I could easily start every challenge rapidly, but I still had the issue of setting up subdomains and TLS certificates. I had used nginx in the past, but as I started configuring, I soon realized that it would be far too tedious to do manually. There had to be a better way, and there was.
After some intense research, I discovered Traefik. Traefik was a total game-changer, if only we had known about this back in my university days. It could do subdomains, service discovery, certificates, and routing. Again, it seemed almost too good to be true, but luckily for me, this time it turned out to be to be the missing piece to the puzzle.

## The Missing Piece
Traefik was a little finicky to begin with, with their documentation was somewhat lacking in examples. Especially when it came to the business of issuing certificates. I wanted to issue a wild card certificate, but there weren't good any examples in the documentation on how to do this. Secondly, my domain provider didn't even support wild card certs in with their DNS service. Cloudflare came to the rescue. It was free, and very straight forward to set up. Quite a few StackOverflow threads later, I finally figured out how to accomplish what I wanted to achieve. This was the final piece of my infrastructure puzzle. Traefik, CTFd, and the challenges all bundled together in a docker-compose file. One `docker-compose up -d` later, and I was good to go. All though I did mess things up by repeatedly deleting a folder containing certificates causing my infrastructure to request way too many certs from Let's Encrypt and having to change the subdomains of multiple challenges, it was overall a great success. I managed to pull it all together before the deadline. Hours of hard work and research finally paid off. The CTF was a success and ran without any major hiccups.

## Future Improvements
My new platform is by no means perfect, and there are some things I wish were different. Like having a proper CI/CD pipeline for deploying the challenges. I don't think my setup will scale very well, and I wish to introduce proper container orchestration with Kubernetes in the future. At least it fits my current needs and is way more modular and reusable than it has ever been. I've put down hours and hours of work, and I have learned so much about so many new things throughout the whole process. It has ultimately been a rewarding experience. This may not be the best way to host a CTF. I don't even know if it a good way to host CTF, but this has been how I host a CTF. 

## Onwards and upwards!
I started out with a total mess and ended up with something I can live with, and it suits my current needs. It's easy to set up, and it does the job. Hopefully, this may be of some use if you ever plan on host a CTF for your friends, colleagues, or CTF club. There are several improvements to be made, and I'll keep hacking at it when I find the time. The dream is to build a platform that can be set up with a click in a matter of seconds at the click of a button, but there's a long way to go, and a bumpy road ahead. The current rig probably won't survive over 9000 hackers, but it has survived 30 hackers with great ease. 