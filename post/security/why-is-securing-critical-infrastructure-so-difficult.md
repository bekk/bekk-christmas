---
calendar: security
post_year: 2020
post_day: 17
title: Why is securing critical infrastructure so difficult?
image: https://www.lanner-america.com/wp-content/uploads/Critical-INfrastructure-Protection-Challenges-2018.jpg
ingress: "**Critical infrastructures are, as the name suggests, critical to
  society and have in recent years become increasingly more digitalized. Such
  infrastructures include electric power, electronic communication, transport,
  as well as water supply and sewage. They are essential for the maintenance of
  societal functions that you and I depend on in our daily lives, and a
  disruption can paralyze a society and at worst lead to loss of life. Here, we
  will try to explain why critical infrastructures are especially difficult to
  secure against cyber attacks.**"
description: ""
authors:
  - Sara Waaler Eriksen
  - Sarmilan Gunabala
---
#### Digitalization

The digitalization of critical infrastructures increases efficiency, safety and availability, and lowers costs. It does however also enable the possibility of cyber attacks, which we unfortunately have witnessed on [Ukrainian power grid](https://www.wired.com/2016/03/inside-cunning-unprecedented-hack-ukraines-power-grid/), [Saudi Aramco Oil](https://money.cnn.com/2015/08/05/technology/aramco-hack/), or [the transport company Maersk](https://www.i-cio.com/management/insight/item/maersk-springing-back-from-a-catastrophic-cyber-attack) among others. This shows that securing critical infrastructure against cyber attacks is very important and highly relevant.



#### Legacy systems

Digitization usually involves introduction of IT into existing Operational technology (OT) systems. OT systems are often legacy systems that interact with automation and mechanical equipment both locally in industrial facilities and between installations throughout regions. Hence, they are frequently used to monitor and control for instance power grids and oil platforms. OT systems have until now, usually existed within closed networks with air-gaps. An air-gap is a strong security measure where components are physically isolated from the rest of the network. However, air-gaps are considered nearly impossible to achieve in today’s interconnected systems. As a result, legacy systems that were not created to be exposed to the Internet and its accompanying threats are now connected to the Internet. Unfortunately, such systems do not necessarily have the proper security mechanisms to defend against the wide range of new attacks that the interconnectivity enables. But, to update the security measures is a complex task as legacy systems don’t always support new security mechanisms that are used in modern systems.



#### Strict availability requirements

As opposed to IT systems, OT systems often have life cycles of decades and components can run non-stop for years at a time. Downtime is usually not acceptable, so their strict availability requirements prevent frequent security patching. As availability is prioritized, confidentiality and integrity are given less priority. This may lead to time-consuming processes like encryption and decryption being omitted, thus transmitting passwords and commands in plaintext. These factors make it hard to protect the systems from sophisticated cyber attacks, and both legacy and newer systems have been exploited in several successful attacks.

#### Distributed systems

The usually distributed nature of critical infrastructures means securing many different types of devices with a large geographical distribution. This is challenging as varying methods have to be applied to components with different operational constraints. Cryptographic functions can for instance be a problem for small sensors in power grids with limited computational power, similarly to IoT devices as presented in [this](https://security.christmas/2019/17) article from last year’s calendar.

#### Cyber-physical systems

As today’s critical infrastructures are both physical and virtual, security breaches can lead to safety breaches and vice versa. This does not only increase the complexity, but also escalates the possible consequences, and means that in worst-case scenarios hackers can cause train crashes or nuclear explosions. The other way around, a physical attack on a vulnerable sensor in a power grid can be the gateway into the core functionality and can thus enable a blackout. Monitoring systems in critical infrastructures often have to depend on their sensors alone, which creates vulnerabilities and opportunities for exploitation. Physical sensors can be tampered with, making the input untrustworthy.   

#### Complex security management

Security management, the process of protecting assets and preparing for the worst-case scenario, is often more complex in critical infrastructures. This is caused by the fact that the infrastructures are distributed systems that are both virtual and physical, and they are managed by different personnel with varying priorities and expertise. These factors mean that a great deal of coordination and a wide range of knowledge is needed in security management. What complicates the security management further is the ambiguous allocation of responsibility for protecting the infrastructures. Protecting critical infrastructures is of national interest, but the operation is often led by private corporations. These corporations are usually evaluated based on their economical achievements, thus focusing on maximizing efficiency.



Securing critical infrastructure is challenging, but the escalating number of attacks and their increased sophistication as well as the possible fatal consequences illustrates the importance of proper cyber security in our critical infrastructures.