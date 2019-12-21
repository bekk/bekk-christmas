---
calendar: security
post_year: 2019
post_day: 23
title: 'Ransomware, an introduction'
image: >-
  https://images.unsplash.com/photo-1527788263495-3518a5c1c42d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3783&q=80
ingress: >-
  If you haven't lived under a rock the last couple of years, the term
  Ransomware isn't something new. It grinds the largest corporations to a
  complete halt and can take months to recover from. But how does it really
  work? And how should you protect yourself?
links:
  - title: The story of the NotPetya attack
    url: >-
      https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/
  - title: How the Norsk Hydro attack unfolded
    url: >-
      https://www.amm.com/Article/3890250/How-the-Norsk-Hydro-cyberattack-unfolded.html
authors:
  - Hans Kristian Henriksen
---
## The anatomy of ransomware
As with any malicious software, there are no one size fits all description of ransomware. But many of the more famous, and more devastating ones have generally had these traits:

### Exploitation of existing weakness
The first problem for the attacker is of course getting into the target system. This is usually accomplished by exploiting an existing vulnerability. This might be a published and known weakness in the system, or an unknown bug. In the latter case the exploit is known as a zero-day vulnerability, and these are obviously preferred, as any victim will be defenseless. On the other side, they are rare, difficult to find, and expensive to buy, making known vulnerabilities far more common to exploit.
The weakness used can vary greatly. There may be there is a flaw in a service running on a publicly accessible port, making direct entry into the system possible. Or a flaw in an email reader causing malicious code in certain attachments to automatically execute when the message is loaded. Or another application is fitted with a backdoor that is used to deliver the payload of the malware. The only limitations here are probably the imagination (and endurance) of the attacker.

### Encrypting files
The thing that distinguishes ransomware from other malware is that it does not intend to destroy its target system permanently, nor is its main intent to steal data. Instead, it seeks to make _reversible_ damage. This is usually done by encrypting parts of the contents of the infected machine. Naively encrypting all files would most likely encrypt some files required by the operating system, causing the system to be unrecoverable. Instead, the ransomware targets files based on type and location. Some search for all files of type `.docx`, others may target all files contained within the `My Documents` or `User` directories. It also searches the network for other machines to infect and attempts to encrypt files on network disks.
To be able to efficiently encrypt (and later decrypt) a large number of files, most ransomware uses a hybrid combination of symmetric and asymmetric encryption. The attacker generates an asymmetric key-pair and bundles the public key with the ransomware. When the ransomware needs to encrypt data, it randomly generates a symmetric encryption key, uses this to encrypt all the files, and encrypts the key with the public key of the asymmetric encryption key. The encrypted key can now be sent to the attacker for decryption when payment is made. This method makes sure that the attacker does not have to decrypt all the files themselves, while also making sure that one person paying the ransom cannot share their decryption key with anyone else.

### Asking for ransom
Yeah, that's kind of obvious from the name. Ransomware asks for ransom! In exchange for money, the bad actors behind the ransomware promises you to decrypt all your files and hand your systems back to you. The price varies, but in large scale attacks aimed at the general population the price is usually not that high. The WannaCry ransomware asked for between $300 and $600. The goal is to set a sum that is likely to be paid by enough people. If the ransomware on the other hand targets a more specific target, say an international organisation, the ransom could be much higher.
Ransomed is usually asked to be paid in some form of crypto currency to make it difficult to trace the money. Gift cards for different web shops are also used, but probably by less experienced attackers, as you would face significant risk buying 200 TVs on Amazon should your ransomware suddenly be very successful. On the other hand, most people have no understanding of how to buy and send crypto currency, so this is a tradeoff for the attacker.

### Unlocking your files (if you are lucky)
After paying the attacker, all you can do is wait, hoping that the evil person who encrypted your files to extort you for money will hold up their end of the bargain. This might not be the best prospect. While you could argue that an attacker has the incentive to prove willing to unlock people’s files, there is little stopping them from taking your money without unlocking the files. In addition to this, paying will provide a market for more ransomware. This entails that for the greater good, you should refrain from paying. We will look into alternatives to paying later.

## Examples
Let's look at some examples. All these attacks have of course been described in much greater detail before, but this can give you a glimpse into what happens to a company when ransomware attacks.

### WannaCry
Perhaps the best publicly known ransomware attack, WannaCry was launched in May 2017, and exploited a vulnerability in the SMB protocol for Windows systems. The exploit had been identified by the NSA, but not reported to Microsoft, leaving it unpatched for a long time. A fix was made available by Microsoft in March 2017, meaning that any well patched system was at the time of the attack protected. The attack followed the standard method as described above but had an interesting feature that was used to limit the attack. Before encrypting the files, the ransomware checked for the existence of randomly generated domain name the authors could be sure was _not_ registered (www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com). Including this feature may seem counterintuitive at first but was done for a good reason. When malware is examined in a laboratory setting, all network requests are usually simulated as successful. If a request to a known bad domain was answered, the malware could be certain that it was being prodded by researchers and would stop working to make analysis more difficult. The attack was greatly limited when a security researcher purchased the domain in question just hours after the attack had started. This however did not stop the attack from having massive consequences, especially for the British health services, which had to cancel operations and revert to emergency procedures with pen and paper.

### Hydro attack
Norsk Hydro is one of the world’s largest producers of aluminium, as well as other metal products. In March 2019 they were hit by a ransomware called LockerGoga. This was seen as a directed attack against Hydro, as LockerGoga is not usually self-replicating, meaning that its spread has to be intentionally controlled. The malware was sent to Hydro as part of what seemed like a legitimate email from a known customer. The biggest danger for Hydro was the possibility of a shutdown of the metal melting furnaces. This could cause the metal to set inside the furnace, possibly destroying it. Luckily, these operations were able to continue with manual operations. The rest of the company also attempted to revert to manual procedures, though this slowed down production significantly. 
The Hydro attack was special because it was extremely targeted, but also because it was handled very well by the company. The decision to not pay ransom was made early, as was the decision to publicly state that they were under attack. A full system restore was conducted within about a month, with downtime causing significant economic impact, however information loss appears to have been mitigated by good backups. Because of their openness about the attack, the Norwegian National Security Authority (NSM) was able to stop similar attacks on other companies in Norway, though none of these companies have been willing to come forward.

### Maersk
Maersk is an international shipping giant, handling a large portion of the worlds freight. In 2017, they were struck by the NotPetya ransomware. While not very different from the previous attacks, there are two noteworthy points about the attack on Maersk. First, it was not an attack directly aimed at Maersk, but was instead released to spread and cause maximal damage. Maersk was not the only company to be hit, but it did suffer greatly. The second noteworthy thing is that Maersk mapped their entire organisation in their domain controllers. These communicated each other worldwide, making it possible for the ransomware to spread to every controller in the world. The problem was that Maersk was unable to find a backup of the domain controller. They were saved by the most amazing coincidence. The Maersk office in Ghana had lost power before the attack and had not been able to come back online. This meant that their copy of the domain controller was not infected and could be used to restore the network. An employee flew the backup directly to London, as the bandwidth was to slow to effectively transfer it over the internet. This one offline copy of the domain controller saved Maersk from total disaster. 

## Advice
What lessons should we take from this? I have a few takeaways, though there may be more, and these may be contested.
 
### Do not pay the ransom
This is perhaps the most controversial advice I will give you. The FBI has in several cases publicly encouraged people to [just pay the ransom](https://securityledger.com/2015/10/fbis-advice-on-cryptolocker-just-pay-the-ransom/) when there is no possibility to recover from backups. But this may not be the best solution. You will be contributing to keeping ransomware a lucrative business for criminals. There is also no guarantee that your files will be unlocked, nor that the perpetrators are actually able to decrypt your files. There have been cases where only parts of the data have been decrypted after payment, and a new ransom has been made for the rest of the data. Paying also makes you a prime target for a new attack, as it is now known that you are willing to pay this kind of ransom. You should consider carefully whether paying is the best option you have.

### Keep offline backups
While many earlier ransomwares only encrypted files on the system they infected, most of the more serious attacks have actively sought out backups to ensure that you have no choice but to pay the ransom. You need to ensure that you have valid, up-to-date backups in offline storage at all times. This will enable you to do a full system restore, however clever the ransomware you were hit with was. And while we are on the topic of backups, you should regularly attempt to do a system restore. This not only validates the backup, but also ensures that you know how to restore your system. There is not a lot of value in backups if you are not able to restore from them.

### Patch everything always
Most ransomware use some kind of known vulnerability to enter its target systems. You can stay ahead by having an efficient regime for patching all parts of your system. Running services in the cloud will of course limit your exposure, as most cloud providers will patch as soon as patches are released. The WannaCry attack was based on a SMB vulnerability for which a patch had existed for 2 months. This was totally avoidable by simply applying the patch in time, but thousands of systems evidently were not up to date.

### Have detection systems in place
Aside from having up to date virus protection, you can also put into place some detection systems specifically aimed at ransomware. Since we know that the ransomware will most likely encrypt your files, we can monitor for file extensions that are associated with encrypted files. Some ransomware even chooses to use their own file extension, making it much easier to spot. You can also monitor the amount of file renames, or general activity on your disks. If this spikes beyond normal rates, it could be a sign of ransomware.
