---
calendar: security
post_year: 2019
post_day: 7
title: OWASP Mobile Top 10
ingress: >-
  The Open Web Application Security Project (OWASP) maintain and release the
  well-known OWASP Top 10. It is a list of the most critical security risks in
  web-applications today. When developing mobile applications, security is of no
  less importance. However, the risks and vulnerabilities may be a little
  different. Therefore, OWASP developed another top 10 list, OWASP Mobile Top
  10, which lists the 10 most critical security risks and vulnerabilities for
  applications running on a mobile platform. In 2018, NowSecure claimed that 85%
  of mobile applications available on the App Store or Google Play violated at
  lest one of the risks on the list. In this article, we will give you a brief
  summary and introduction to which risks we are talking about.
links:
  - title: OWASP Mobile Security Project
    url: 'https://www2.owasp.org/www-project-mobile-security/'
  - title: OWASP Mobile Top 10
    url: 'https://www.owasp.org/index.php/Mobile_Top_10_2016-Top_10'
authors:
  - Robert Larsen
---
## Improper platform usage

Mobile platforms offer a comprehensive set of features to their developers, e.g. for authentication or data storage. It might make your mobile app insecure if you do not use them as intended by the platform. OWASP lists three ways that mobile apps can experience this risk:

1. Violation of published guidelines
2. Violation of convention or common practive
3. Unintentional misuse

An example is that the app uses local storage instead of the iOS Keychain to store session keys or passwords. Then, this data might be available unencrypted. The mobile app needs to consume a web service or use an API in order for this vulnerability to be exploited. 

The best way to prevent this risk is to know your platform and how things work, and follow the conventions.

## Insecure data storage

Most mobile apps store data in some way. When not stored properly, in a secure way, this data might become unintentionally available if users and malware have access to the mobile device's filesystem. Examples of such data is log files, sql databases, cookie stores, etc. This data might leak due to vulnerabilities in the platform, i.e. the OS, frameworks, APIs etc. 

Again, it is essential to know your platform. You should learn how your platform handles e.g. caching, logging, application backgrounding, cookies, 3rd party analytics, data and copy/paste buffers. It is also important to know the data you have, why you need it and where you store it. When you know that, it is easier to identify where the vulnerabilities are. 

## Insecure communication

Moving data from one point to another is something that happens quite often in a mobile app. It can be from mobile-to-mobile, app-to-server, or mobile-to-something-else. When in transit, the data may be vulnerable to attacks. OWASP lists these three common scenarios:

1. Lack of certificate inspection\
   The mobile app accepts any certificate offered to it by the server. Then, there is actually no mutual authentication capability left between the mobile app and the server. It also makes the app highly vulnerable to man-in-the-middle-attacks through a proxy.
2. Weak handshake negotiation\
   The mobile app and the server might connect and negotiate a cipher as a part of the connection handshake. However, this cipher might be too weak and easy to decrypt. 
3. Privacy information leakage\
   There are many examples that only the authentication phase uses SSL/TLS, and that the
   regular traffic afterwards goes through non-secure channels. Then, personally 
   identifiable information might be transmitted in clear text between the app and the server.

## Insecure authentication

When it comes to authentication, mobile apps often differ quite a lot from web applications. Many mobile apps need to work offline, and the user is then provided with an offline authentication option. That introduces a bunch of additional things to think about regarding authentication and session handling compared to a web application where you usually assume that the user is online continously.

You should use online authentication whenever possible. And of course, the mobile app should not be able to make backend API calls without providing an access token. There is no reason not to protect your API properly, and as you would have done if it was consumed by a web application. The access token or whatever needed to access the API should not be stored locally on the device. 

You might see that some mobile applications has a weak password policy to simplify entering a password. This certainly makes this vulnerability more easy to exploit.

## Insufficient cryptography

OWASP claims the insecure use of cryptography is common in most mobile apps that leverage encryption.

The mobile app may implement an encryption algorithm that is weak or has already been broken or deprecated. Or, the algorithm or technology used may be just fine, but used wrong. E.g. if the keys are put in the same attacker-readable place as the encrypted content. Always use modern algorithms that are considered best practice by the security communities. 

And, always consider the possibility of avoiding storage of sensitive data on the device. Can you store it elsewhere?

## Insecure authorization

This is closely related with the previously mentioned "Insecure authentication risk". While the authentication step identifies who you are, this authorization step verifies that you are allowed to do what you are trying to. An authorization check should immediately follow the authentication of an icoming request from a mobile device.

Maybe the most important action to take in order to mitigate this risk is to not rely on roles or permission information that comes from the mobile device. The verification should be done independently by the backend.

Do not rely on that functionality is hidden in the app if the user does not have the right role. That does not prevent anyone from going directly to the API.

## Poor code quality

While related to the risk described in "Improper platform usage", this point refers to how the programming language is used only. Typical examples are buffer overflows, memory leaks and vulnerabilities exposed when handling strings. An attacker will typically try to exploit this by supplying some unexpected input to your app.  Follow best practices for code quality and always strive to keep your code clean, updated and well maintained. 

Try to keep things easy. Also learn how things should be done and works in the language you are using. Thus not very different from traditional web application programming.

## Code tampering

This point might be where mobile apps differs most from web applications. You have no control over the environment where the mobile code runs. This opens up a new set of attack vectors. An attacker will typically try to make your app intercept and execute foreign malicious code in order to exploit this vulnerability. This can be done by directly modifying the code, change the contents of memory, change or replace the system APIs that the application uses, or modify the application's data and resources. 

It depends on the purpose of your app how critical this risk is. Games are popular targets for code tampering attacks, the same are apps handling banking and money. To prevent it, the app must be able to detect at runtime that its code has been changed. OWASP has a separate project for this, "OWASP Reverse Engineering and Code Modification Prevention Project". This describes different ways to address this topic.  

## Reverse engineering

How critical this is highly depends on what type of application you are creating. If you have your code in an open Github repository, and does not talk with any API or database it is likely not critical. And, as previously mentioned, you should never store secrets in the source code or in the mobile device itself in the first place. However, this does not mean that you should not try to fight it. To prevent it, you must use an obfuscation tool. There are many alternatives in the market. 

## Extraneous functionality

This is the classic backdoor. "Hidden" functionality that was not intented to be part of a release to end users. Examples are that traces of code used for debugging when developing are left behind, 2-factor authentication disabled during testing and forgot to be turned on again, and so on.

It can be cumbersome to detect such functionality using only automated tools. OWASP claims it is always best to prevent these things using a manual code review. And that is rarely a bad idea anyway.

We hope you have gained a bit more insight in the security risks you must tackle when developing mobile applications. If you want to know more, the OWASP Mobile Security Project is good place to start. Also refer to the Mobile Top 10 documentation from OWASP for a more thorough explanation.
