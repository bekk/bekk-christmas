---
calendar: security
post_year: 2018
post_day: 21
title: When developers disclose information
image: 'https://farm9.staticflickr.com/8549/29402709463_a29dfe6992_k.jpg'
ingress: >-
  Information sensitivity is a problem that can bring your organization to its
  knees. What do you do when disaster strikes?
links:
  - title: BFG Repo-Cleaner
    url: 'https://rtyley.github.io/bfg-repo-cleaner/'
  - title: git-filter-branch - Rewrite branches
    url: 'https://git-scm.com/docs/git-filter-branch'
  - title: 'CWE-532: Information Exposure Through Log Files'
    url: 'https://cwe.mitre.org/data/definitions/532.html'
  - title: Removing sensitive data from a repository
    url: >-
      https://help.github.com/articles/removing-sensitive-data-from-a-repository/
authors: []
---
## It's burning on the toilet
In Norway we say _"Det brenner på dass"_, can be translated to _"It's burning on the toilet"_. This is our way of saying that "shit has already hit the fan".  
Private information, that is private keys, passwords and tokens, or other type of sensitive information can end up getting spread throughout your infrastructure, or worse, on the internet. This is a case of _Det brenner på dass_.
A developer committed a password or token to the repository, or forgot to remove a logging sentence. Your application is now leaking critical information.  
What do you do when disaster strikes? The only prevention is to have routines and an infrastructure that lets you detect these forms of breaches before anyone else.

### I messed up in Git
Ok, so a password was committed to Git, what do you do now? Remove the line of code that had the password, push to the repository, grab a cup of coffee and pretend it did not happen?  
This is not the way to do it. Git will store the password, and if not correctly removed, an attacker could find it by sifting through the Git-logs.
There are two options, **git filter-branch**, that lets you rewrite Git revision, all the way down to the possibility of modifying each tree and each commit. The problem with this is that rewriting Git-history for a large project is time consuming, and the pitfalls are many.  
The second option is **BFG Repo-Cleaner**. Those of you that has played Doom knows what _BFG_ stands for, and it is exactly what this tool is, but it's simpler and faster to use for removing passwords, credentials  or other private data from Git.

### My logs are logging sensitive information
Removing sensitive information in the logs is often as simple as to purge the logs, and remove the code that is logging the information. But you will also need to check that information has not been backed up, or logged by another system monitoring the logs. Once this information spreads, it is almost impossible to remove it. Your best option is to revoke the password/token/private key, and this leads us to the next topic.

## Stop messing up
You, or someone in your organization is bound to mess up, it will happen, and there is nothing you can do that will prevent it. What you can prevent is the consequences of it.
What you should do, is to run automated scans that look for passwords, tokens and private keys in your infrastructure. And have implemented good routines for revocation and rotation of this information.

We are aware that some of this information is hard to look for. Find unique markers that make it easy to detect, or design your access information in a way that lets you search for it. We want to mention Docker Swarm's tokens, that are designed with a prefix with the intent of it being easy to search for.  
![](https://image.slidesharecdn.com/securesubstrate-170504024003/95/secure-substrate-least-privilege-container-deployment-diogo-monica-and-riyaz-faizullabhoy-docker-27-638.jpg?cb=1493917978)

Closely related to [our post](https://security.christmas/2018/17) on containers and orchestrators, [this talk](https://www.youtube.com/watch?v=apma_C24W58) that explains the tokens, and security in Docker Swarm is recommended.


Photo credit:  
Blogtrepreneur
Computer Data Hacker by [Blogtrepreneur](https://www.flickr.com/photos/143601516@N03/), under [CC 2.0](https://creativecommons.org/licenses/by/2.0/)  
Docker Inc. [Secure Substrate: Least Privilege Container Deployment - Diogo Monica](https://www.slideshare.net/Docker/secure-substrate-least-privilege-container-deployment-diogo-monica-and-riyaz-faizullabhoy-docker)  
