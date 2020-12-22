---
calendar: functional
post_year: 2020
post_day: 23
title: Functional IoT with Elixir and Nerves
authors:
  - Harald Ringvold
---
I'm one of those people who want to learn and build stuff but has way to many things on the wish list and then most of them never happen. 😅 Trying embedded programming has been on the list for a long time, and as I got into functional programming it seemed to fall even further down on the list. From my point of view embedded programming involved C or other lower level language which did not appeal to me at all.<sup>[^rpi]</sup> Fighting for attention with FP hot shot languages as Elm and Haskell, embedded projects as I thought of it just never got far enough up on my list.

Then an event spurred some more research. By January 1, 2019, every house and aparment in Norway where reqiured to have a smart meter<sup>[^smartmeter]</sup> with the capability for the owner to read out the power usage programatically.<sup>[^ams]</sup> This data is available through a port on the smart meter called the HAN (Home Area Network) port. Power usage data is published to this port on regular intervals in a standard format that all the smart meter vendors implement.

This seemed like a great opportunity to get some embedded experience and after some research I found the [Nerves project]. Nerves is an Elixir based project, which for many probably begs the question "is a functional language like Elixir really a good fit for embedded projects?". As it turns out, with the right tooling Elixir is an excelent candidate for this.

## Why Elixir?

I will not cover Elixir in detail in this post, but check out my previous post, [The case for Elixir](https://functional.christmas/2020/4), for an introduction.

There is a few features that makes Elixir great for embedded/IoT projects:

### Binary pattern matching

Elixir has (inherited from Erlang) a syntax for pattern matching on binary data. This makes it very easy to parse binary protocols (hey there, HAN-port data!). In other languages you would have to do bit shifting which, for people not used to it (and maybe when it is not new), is much harder than just pattern matching out the different parts of the binary data.

As a simple example, lets say you have a binary protocol which represents the a date as "yearmonthday" ("20201223") and is encapsuled by a byte, 0x7E (01111110), on both side. The binary data may be represented like this: `<<0x7E, 0x32, 0x30, 0x32, 0x30, 0x31, 0x32, 0x32, 0x33, 0x7E>>`. To retrieve the date and the individual parts you could do a simple pattern matching:

```
iex(1)> <<0x7E, year::binary-size(4), month::binary-size(2), day::binary-size(2), 0x7E>> = <<0x7E, 0x32, 0x30, 0x32, 0x30,0x31, 0x32, 0x32, 0x33, 0x7E>>
"~20201223~"
iex(2)> year
"2020"
iex(3)> month
"12"
iex(4)> day
"23"
```

This retrieves the individual parts of the date into sperate variables.

### Fault tolerance

Elixirs, or rather Erlang VM/BEAMs process and supervisor model makes it easy to create fault tolerent, isolated applications that fit together and can handle the turbulent connectivity that might be present where you deploy your embeded system. Even just for internal error handeling, having the runtime there to kill a failing proccess and start it again with a known good state is better than the alternative in other languages with might in some instances be to completely crash.

### OTP releases

Nerves leverages OTP releases to create a deployable binary that is optimized and compiled for the target system. This is similar to (but not the same as) compiled languages like Go and Rust that produces a statically linked binary.


## What is Nerves?

Nerves simplifies the process of taking an Elixir application and packing it up into a firmware that can easily be deployed to almost any computer that can boot from a SD card or hard drive.

### Booting into goodness

The output of a Nerves build is a firmware which basically is a custom linux distro that boots straight into the Erlang VM. Nerves leverages the Linux kernel for drivers so most peripherals will work out of the box.

```
 Firmware partitions:
 +----------------------------+
 | MBR                        |           
 | Provisioning info          |
 | Boot                       |
 +----------------------------+
 | Root file system A         |
 +----------------------------+ 
 | Root file system B         |
 +----------------------------+
 | Application Data           |
 +----------------------------+
```

The firmware written to the SD-card has different partitions, most notably two separate root file system partitions. This is to support a blue/green deployment where on update of the firmware the new firmware will be deployed to the unused partiton. The device then reboots into this new partition. If for some reason this new version of the firmware does not work, the device will reboot back into the previous and working version. This system prevents bricking devices with bad firmware and makes the remote updating functionality that Nerves support a practical and safe feature.

All the partitions except from the application data partition are read-only. This will prevent filesystem corruption which can happen if the device writes to the filesystem while loosing power.

A newly generated, minimal Nerves project firmware size will be about 40mb.


### Hardware support

Nerves support all a lot of different hardware:

- Every Raspberry Pi ever made
- Beaglebone Black, Green, Blue and PocketBeagle
- x86_64
- GRiSP 2
- Custom hardware and most boards that can run embedded Linux (via Buildroot)

The most common for getting started is probably the Raspberry Pi line of boards but with other boards are supported and with some extra work you can make it work on hardware that kan run embedded Linux.

Nerves uses [Buildroot](https://buildroot.org/) to create a custom firmware for the device you are targeting. The common boards has premade "images" so unless you are doing some custom board or peripherals, you will not need to learn Buildroot. Just build your application and run a command to get the firmware for you target system. Buildroot takes care of cross-compilation for other architectures like ARM.

But Nerves do not stop giving there. How about a system to manage a fleet of Nerves deployments? Enter NervesHub!

## NervesHub

[NervesHub](https://www.nerves-hub.org/) is an open source firmware update server. It enables you to do over-the-air updates to the devices deployed with the platform. NervesHub can be self hosted or used as a managed version at nerves-hub.org.

Security is a primary concern of NervesHub and it has several features to secure deployments and update:

- Cryptographic signatures on firmware updates provide end-to-end authentication
- Client-side and server-side SSL provide link authentication and encryption
- Access control within organizations to firmware updates

If you enable it NervesHub can give you remote console/iex access directly to the device in the browser.


## What is use Nerves for?

So what is Nerves used for? Lets look at some different examples!

### Hobby projects

Even in small hobby projects Nerves can simplify deployment and maintenance. One of my projects is a dashboard on a Raspberry Pi touch screen, [nerves-pidash](https://github.com/ringvold/nerves-pidash). For the [first version](https://github.com/ringvold/pidash) the backend was written in Go. This worked well for a while. Go produces a staticly linked binary which makes deployments easy compared to other interpeted langugage where you need to make sure all dependencies is available. 

The hassle comes when the device loose power and I have to manually go and start the backend and open the browser to the correct url. This became tedious and of course I had the well known SD card corruption issue because of power loss.

Nerves' way of handling the filesystem and updates makes sure that power loss is not a issue and with the [nerves-web-kiosk/kiosk_system_rpi3](https://github.com/nerves-web-kiosk/kiosk_system_rpi3) the device starts a browser with a predefined url. Changes to the system is a breeze with OTA updates.

With the [Circuits library](https://elixir-circuits.github.io/) you can interact with many different sensors with support for GPIO, UART, I2C and SPI.

For my smart meter project the hard part was actually to find out how the binary protocol works. Reading the data from the device is easy with Circuits,and implemented in just a few lines of code. Admittedly this project is not in a workings state and some code has been lost. Remember to check in your code! That is something Nerves will not do for you. 😅 For the interested the project can be found at <https://github.com/ringvold/han_ams>.

But there are more serious projects out there. Some are even basing their business on devices powered by Nerves!

### The more serious projects

The Nerves project web site has several show cases where you can read about how [Le Tote used Nerves to increasing warehouse efficiency](https://www.nerves-project.org/customer-le-tote), how [Hop used Nerves to build the world's first self-serve beer kiosk powered by facial recognition technology](https://www.nerves-project.org/customer-hop) or how Nerves enables [open source smart farming through FarmBot](https://www.nerves-project.org/customer-farmbot).

One of my favorite real world cases is [Realtime Vehicle Tracking with Elixir and Phoenix by James Smith](https://www.youtube.com/watch?v=aLnSO6FQpHs) from ElixirConf 2017.

## Wrapping up

For a good introduction by one of the co-authors of Nerves I recommend checking out Justin Schnecks talk [Functional IoT with Elixir and Nerves](https://www.youtube.com/watch?v=mrpQHZcy3CI)[^fpiot]. It goes a bit more into detail in some areas and have some awesome demos at the end!

If you have a project involving a Raspberry Pi or another embedded device I would recommend you to check out Nerves. It simplifies a lot of the hard parts about embedded programming and helps you focus on solving the problem at hand and not having to build you own deployment schemes. And you can do it all with functional programming! 😄

[nerves project]: https://www.nerves-project.org/
[bitbinary]: https://medium.com/blackode/playing-with-elixir-binaries-strings-dd01a40039d5

[^rpi]: Raspberry Pi have made this more aproachable with python libaries, but that still did not tickle my fancy enough to get started.
[^smartmeter]: Smart meters, AMS (Advanced Metering System), energy meters, digital electricity meters. They have many names!
[^ams]: https://www.nve.no/norwegian-energy-regulatory-authority/retail-market/smart-metering-ams/