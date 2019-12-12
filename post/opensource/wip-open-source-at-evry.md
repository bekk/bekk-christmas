---
calendar: opensource
post_year: 2019
post_day: 13
title: From Node.js to io.js and back again...
ingress: |
  This is the story of how we built the Node.js foundation.
authors:
  - Hans Kristian Flaatten
---
Node.js started as any other open source project. One person had an idea and
decided to share it with the rest of the world. This was back in 2009 and has
since grown to become the largest software ecosystems with over 1 million open
source packages in 2019 and some of the largest software companies in the world
like IBM, LinkedIn, Microsoft, Netflix, PayuPal are betting on Node.js to power
their business critical applications! We even have sent Node.js applications
into space 🚀

As the creator of Node.js Ryan Dahl lead the development which was later
sponsored by a Silicon Valley based Enterprise Infrastructure Company named
Joyent. In 2012 Ryan stepped aside promoting coworker and _npm_ creator Isaac
Schlueter to manage the project. Schlueter announced that Timothy J. Fontaine,
another employee of Joyent, would lead the project.

This is type of open source governance is typically referred to as **Benevolent
dictator for life**\[1], or BDFL, a title given to a small number of open-source
software development leaders, typically project founders who retain the final
say in disputes or arguments within the community. The title is often passed
onto the next benevolent dictator by anointment as opposed to through democratic
means.

At the same time that Node.js was seeing an all time growth in adoption the
development had ground to a halt with an all time low in September of 2014.
Contributors was becoming more and more frustrated with the stringent process
imposed by Joyent. A coordinated effort through the node-forward\[2] initiative
in order to work with Joyent to move the project to a structure where the
community could contribute effectively lead nowhere.

A private fork of Node.js had already existed for some time amongst some of the
most active contributors but due to a trademark issue and legal threats they
could not make it public under that name. The decision was then made to open
source the fork under a new name – io.js.

The goal of io.js was to create a new and inclusive organisation for Node.js
using an Open Governance model\[3] or OPEN Open Source. The new organisation
should be owned by the community and not one person or corporation.

> Individuals making significant and valuable contributions are given
> commit-access to the project to contribute as they see fit. This project is
> more like an open wiki than a standard guarded open source project.

The io.js organisation was set up several autonomous working groups that had a
specific responsibility. Each group was soley responsible for their work and
only as a last resort when a consensus could not be reached within the group
would the top level Technical Steering Committee (TSC) act as a final arbiter.

The Docker working group were responsible for maintaining the official Docker
image for io.js, the Build working group were responsible for setting up and
maintaining the test and build infrastructure servers from DigitalOcean,
Rackspace, ARM and Voxer as well as from the community managed to get the
infrastructure up and running just in time for the first release of io.js.

io.js also changed the even-odd version numbering that no-one understood and
that Node.js had been following since it was first created by Ryan, and io.js
adopted Semantic Versioning\[4] instead with the first release being v1.0.0. The
reason was that Node.js had already been proven stable enough in production for
several years and releasing anything short of v1 would not get the same
addoption and thus defeating the purpose of releasing a version at all.

In June of 2015, only a short year after io.js, it was made public that Joyent
was transferring the ownership of the Node.js trademark to a new Node.js
foundation which would be a part of the Linux Foundation\[5] and governed by the
open governance structure already established by io.js. The work that io.js had
done would be the basis of the project going forward and remaining changes in
Node.js was merged into io.js and version 4.0.0 of Node.js was released.

* \[1] https://en.wikipedia.org/wiki/Benevolent_dictator_for_life
* \[2] https://github.com/node-forward
* \[3] https://en.wikipedia.org/wiki/Open-source_governance
* \[4] https://semver.org
* \[5] https://www.linuxfoundation.org/
