---
calendar: security
post_year: 2020
post_day: 11
title: Ransomware - a Devastating Form of Digital Extortion
image: https://cdn.pixabay.com/photo/2020/11/09/14/24/security-5726869_1280.jpg
ingress: We live in a digital era where the most precious commodity no longer is
  oil or gold, but data. But what if this data, including personal files,
  customer lists and company data, flight traffic information, or even sensitive
  hospital records were stolen? What would you do, or pay, to get it back?
authors:
  - Kristina Skåtun
---
Ransomware has been on the rise the past years, where criminals effectively take all the data on your computer hostage and demand a ransom to give it back to you. Refusing to pay may result in your data being lost permanently. 

Everyone is a potential target for ransomware, including single individuals, small to large companies, and even public institutions. A disconcerting trend is the targeting of hospitals and the public sector. Only last year the Hollywood Presbyterian Medical Center in Los Angeles was [attacked by ransomware](https://sanfrancisco.cbslocal.com/2016/02/18/california-hospital-ransomware-attack-hackers/), blocking the company’s access to their own network and crucial patient data for 10 whole days. The hospital ended up paying the ransom of $17 000 in bitcoin to decrypt the data. 

The demands have also increased drastically the last few years, where the [average ransom payment](https://www.coveware.com/blog/q2-2020-ransomware-marketplace-report) having increased to an exorbitant $178 000 in Q2 of 2020. Some bigger companies also receive very high demands. For instance, Garmin was attacked in 2020 with an initial ransom demand of $10 million, which some [sources](https://www.bleepingcomputer.com/news/security/confirmed-garmin-received-decryptor-for-wastedlocker-ransomware/) claim they chose to pay. And this does not include the costs of other factors such as downtime, loss of revenue, mistrust from consumers, and resources used to get everything up and running again. 

Clearly, ransomware is a growing problem with an increase in both attacks and in the ransom demands themselves, as well as the targeting of sectors with the possible consequence of directly endangering lives. 

But how to the criminals make their attacks so successful, either forcing a victim to pay or having to accept the loss of their data? The main principle of ransomware is that attackers will encrypt all the files rendering them unreadable, and only by buying the key to decrypt the files will they be accessible again. The first step to achieve this, is to obtain access to a computer or network in order to install the ransomware. 

## How does ransomware get installed on my computer?

Ransomware is a type of malware, which is a malicious piece of software that installs itself without permission on someone’s computer or even an organization’s whole system. The most common ways the attackers get access to your computer are:

1. Phishing – a cyber-attack imitating a trusted source, where an employee or private person is tricked into installing the malware without knowing it. This can be through clicking a link or downloading an attachment in a seemingly legit email.
2. Drive by downloads – visiting compromised websites that then installs the malware on your computer.
3. Security vulnerabilities – if systems are not up to date and are known to have weaknesses, then attackers will exploit these to install their malware. 

## How does ransomware encrypt my files?

Once the ransomware is installed, it encrypts all the data on your computer. Unfortunately, the encryption methods used now are so complex that it is unfeasible to decrypt the files without the decryption key, which is known only to the attackers. To achieve a secure encryption of your data, the attackers use a combination of symmetric and asymmetric encryption. 

#### Symmetric encryption

One of the oldest ciphers in history is the Caesar’s cipher, which shifts each letter a set number of times back or forth in the alphabet. Knowing this set number, also referred to as the “key”, is therefore enough to both encrypt and decrypt a text. This is one of the simplest examples of a symmetric encryption. 
Today, there are more advanced versions, which can be broadly categorized as block ciphers (encrypts in byte-sized blocks) or stream ciphers (encrypts single digits). These methods are fast and only require the same key to encrypt and decrypt, though some argue it is less secure than asymmetric encryption as the same key is used. 

#### Asymmetric encryption

Asymmetric encryption is slower but is considered more secure. It uses two keys instead of one: one public and one private. The private key is only in the possession of the key pair owner, whereas the public one is widely distributed. When using the public key to encrypt a message it can only be decrypted using the private key, and vice versa.  

#### Ransomware take advantage of both encryption methods.

One of the most common ways a ransomware takes over your computer, is through the following steps:

1. When the ransomware is installed on a computer, it comes with an asymmetric public key, which it used to establish contact with the attackers’ server. All communication is encrypted using this asymmetric encryption, making it impossible to intercept and interpret the communication between the affected computer and the server. 
2. The ransomware will then request a new asymmetric public key from the server, which is specific for the victim’s computer (making it impossible to share a key with other victims). 
3. Once received, the ransomware also creates a symmetric key, which quickly encrypts all the files. 
4. The symmetric key is then encrypted using the asymmetric key specific to the victim. This means that only the private key on the attackers’ server can be used to unlock the symmetric key, which again will decrypt all the files. 

This makes the whole process fast and yet very secure, and almost impossible to decrypt without paying the ransom. 

## Victims of ransomware

Originally, ransomware was used to target individuals, with a low enough ransom so most people would choose to pay. While individuals are still affected, organizations are targeted on a more regular basis, and can offer a more lucrative pay-off if successful. In fact, [one study](https://news.sophos.com/en-us/2020/05/12/the-state-of-ransomware-2020/) showed that over half of the companies had been subjected to a ransomware attack in the past year, and that 73% of these attacks were successful. A recent trend also shows an increase in attacks targeting [government institutions and hospitals](https://edition.cnn.com/2020/10/28/politics/hospitals-targeted-ransomware-attacks/index.html).  

## Costs and solutions

An estimate shows that total ransom demands will reach a staggering [20 billion USD by 2021](https://cybersecurityventures.com/global-ransomware-damage-costs-predicted-to-reach-20-billion-usd-by-2021/). 

While paying the ransom is strongly discouraged as it helps create a marked for extorting money in this manner, some still chose to pay the ransom to retrieve their data. One recent [study](https://news.sophos.com/en-us/2020/05/12/the-state-of-ransomware-2020/) of 5000 IT people showed that about 26% chose to pay and that of these, 95% did actually get the decryption key needed to unlock their files again. Over half chose not to pay and instead used backups of their data, while the rest used other methods.

However, even though paying up may seem like the best way to get things restored again, it may actually double the costs of being affected. All organizations attacked by ransomware had a high cost due to downtime, network costs, lost opportunity etc. even without paying the ransom. In fact, the authors of this [study](https://news.sophos.com/en-us/2020/05/12/the-state-of-ransomware-2020/) argue that the organizations that chose to pay  had the same costs as those who did not with getting their systems back online, except they also had the cost of removing the encryption in addition to their other expenses.

As most attacks are successful and as it is nearly impossible to decrypt your files after an attack, it’s best to try and prevent an attack in the first place. Good strategies include expecting to get hit, have regular and off-site backup of data, make sure you have a ransomware insurance, and install anti-ransomware on your system. Stay tuned for more on this and other good preventative measure in our next article.