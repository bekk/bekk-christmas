---
calendar: thecloud
post_year: 2020
post_day: 5
title: Who needs Docker anyway?
image: https://images.unsplash.com/photo-1523351964962-1ee5847816c3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80
ingress: >
  If you're anything like me, you run all your code in managed services. But
  believe it or not, you might come across a problem that you can't solve with
  fully managed cloud services, and that's why Kelsey Hightower made
  Kubernetes... right?
description: ""
links:
  - title: Example code
    url: https://github.com/heim/myod
authors:
  - Andreas Heim
---
Well, that was at least my world view until about a year ago, until I tried to stuff a Kafka cluster in Kubernetes. Yes, I know. Confluent reccomends running Kafka in Kubernetes, and it is possible, and maybe even a good idea! However, we had some very specific requirements that made it unviable to use Kubernetes. This isn't a blog post where I'll try to justify *not* using Kubernetes, but if you find yourself in a position where you need more control over your runtime environment, and you want to get closer to a Docker-like workflow, please read on. 

One of the things I absolutely love aboud Docker, is that it gives you a really great way to package your applications. It certainly has alot of other things going for it as well, in terms of build speed and reusing layers, but I really like to be able to package and deploy an immutable package of my app. 

When we started thinking about how to deploy our Kafka cluster we wanted to get as close as possible to this type of workflow. We wanted to have an immutable package that we could roll out, so that we could roll out new versions to our cluster without worrying about random errors when our virtual machines booted.

We knew that we wanted to rely as much as possible on Infrastructure as Code, and not depend on manual config, ssh-ing into virtual machines etc. Given the complexity of Kafka by itself, we also wanted a solution that did not introduce too many new variables.
That gave us a few options.

1. Bake the images with e.g. Packer
2. Let Ansible or similar config management tools setup the machines for us
3. A combo of the above

While we acknowledged that using something like Packer in combination with Ansible would be really good for a problem like this, none of the team members working on this had any experience with neither. On the other side, we had plenty experience with Terraform and good old shell scripts, so we wanted to solve the problem with those tools.

Skip forward a few weeks and we have a pretty solid rig set up.

It goes a little something like this:

1. Terraform creates a virtual machine
2. Virtual machine has a startup-script that installs all required software
3. Virtual machine is stopped, and a machine image is created.
4. Script tags the image with git-hash

After the last step is completed we have a versioned pre-baked image that we can start.

When we boot our Kafka machines, we just point them to the newest image we have created, and supply them with a slim startup script. This startup-script has one main task, and that is to pull runtime-config from metadata-storage and interpolate this into the config files. Poor man's Docker!

One of the main benefits of this approach, is that you negate the need for hefty downloads and install procedures when you boot the virtual machine. This also reduces the risk of something going sideways because of network timeouts or other random events. Secondly, you can be confident that you're running the same version on all instances, and there will be no version- or config drift.

If you want to see an example on how to solve this on GCP, please check out the[ Github repository](https://github.com/heim/myod)!