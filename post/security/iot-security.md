---
calendar: security
post_year: 2020
post_day: 16
title: IoT Security at home
ingress: How is the IoT security in your home? Do you have any gadgets on your
  network that are vulnerable to exploitation? Maybe you have any devices you do
  not recognize? If you own an IoT device then you should be curious about how
  it talks to the internet and how security is taken care of.
authors:
  - Ole Reidar Holm
---
 
We've all heard the horror stories. Whether it's [hacked baby monitors](https://www.nbcnews.com/news/us-news/stranger-hacks-baby-monitor-tells-child-i-love-you-n1090046) or [talking toys](<https://www.theguardian.com/technology/2017/nov/14/retailers-urged-to-withdraw-toys-that-allow-hackers-to-talk-to-children >), [consumers and developers seem to agree](<https://auth0.com/blog/surprised-turns-out-consumers-dont-trust-iot-security/ >) on one thing; *don’t blindly trust your IoT devices*. This blog post tries to explain common security flaws with IoT-devices and makes a comprehensive “do-it-yourself” guide on how you can minimize the security threat. 

Before we dive into the guide, we should know that there exists some security concerns to IoT devices: 

**Default / Weak passwords**

“Box fresh” devices often have a default password. If your device has a weak or easy to guess password then it will be susceptible to guessing attacks. Default passwords is easily obtained from the Internet (https://www.routerpasswords.com/)

**Missing security updates**

IoT devices are often built on pre-existing technologies such as the Linux operating system or using HTTP services such as Apache or NGINX. Over time, flaws are discovered in all software products which should be addressed. Failure to update against known vulnerabilities in supporting software will increase the chances of a remote attacker being able to compromise the device.

**Insecure web administration**

Some devices offer some form of web application to provision and administer the device. These interfaces are vulnerable to the same risks as enterprise applications or Internet sites. 

**Use of insecure protocols**

An insecure protocol includes (but is not limited to): ftp, telnet, http or SNMP. The protocol is said to be insecure if it employs no transport layer encryption or has known security weaknesses. Those listed all fall into the first category mainly. 

It is common to offer administration functions over most of the listed protocols. The impact of using insecure protocols is that an attacker on the same network would be able to conduct a man-in-the-middle (MiTM) exploitation to compromise the device.

**Bad configuration**

All networked services are potential avenues for an attacker to target your device. A vulnerability assessment of these networked services would uncover known flaws. Most likely your device is powered by an embedded operating system. To gain defence in depth review the operating system for configuration weaknesses such as: processes with elevated privileges, file permissions etc. 

**Insecure data storage**

If your device can store data locally then you need to be aware of the risks of doing so. Are your controls robust enough to prevent trivial retrieval of sensitive information? Do you use some form of encryption to protect data while the device is powered off?

## “Do-it-yourself”-checklist

* **Change default passwords:** 

  Refer to the manual, do an online search, or contact the manufacturer for advice.
* **Check for firmware and system updates:** 

  Even a brand new device could need a security update. Refer to the manual, do an online search, or contact the manufacturer for advice.
* **Apply updates regulary:**

  Manufacturers patch bugs and flaws on an ongoing basis – and so should you.Sign up for automatic updates or software update alerts when possible.
* **Set up a guest WiFi network for IoT devices to connect to:**

  Isolate your IoT devices from your home computers to reduce risk to important data. If you need advice, start with an online search for your WiFi router model. Many devices make it easy to set up a guest network.
* **Disable Universal Plug-and-Play (UPnP) functionality on your wireless router:**

  Some IoT devices can leave your home firewall vulnerable to attack via UPnP. Unless you specifically need it for an IoT device, turn off UPnP. An online search can help you find advice for your specific model.
* **Google *{name of the device}* + CVE:**

  You should see if there exists one or more [Common Vulnerabilities and Exposures (CVE) ](https://www.cvedetails.com/) for your device. If there is, see if the manufacturer of your device has patched the CVE in one of the software updates, or consider sending them an email letting them know. If the CVE is serious, you should consider turning your IoT off until there is a fix available. 


* **Check for open ports:**

  Nmap-cheatsheet here: https://gist.github.com/rsperl/321aac3d529aa8f8c7924fd12d581b67


  First obtain the IP-adress of your device. This can be done by looking for “connected devices” on your router or do a network scan with nmap (https://nmap.org/).


  * Does your device expose any ports? 

  * What does that port do? (google port + {portnumber})

  * Can you connect to your device through the port? For example through your web browser, ftp client, ssh?


  Secondly do a full service scan on your device: 
  Grab a cup of coffee, this usually takes some time.