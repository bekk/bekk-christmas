---
calendar: security
post_year: 2019
post_day: 11
title: FIDO2 - the Answer to the World's Password Problem
links:
  - title: When can we finally get rid of passwords?
    url: >-
      https://www.theverge.com/2019/4/24/18514225/passwords-fido2-authentication-webauthn-security-key-cybersecurity-online-browser-web
authors:
  - Emil Øien Lunde
---
Most authentication solutions end users are exposed to on the web these days are password based. Unfortunately, there are a number of reasons why we shouldn’t use passwords to protect access to web accounts: 
* The passwords have to be shared with the sites we register with. We have no control over how the password is stored or who has access to it.  The result is that passwords end up being exposed all the time, through data breaches or even [system logs](https://blog.twitter.com/en_us/topics/company/2018/keeping-your-account-secure.html).  Currently there are over 9 billion leaked accounts on [haveibeenpwned.com](https://haveibeenpwned.com).
* It is the user’s responsibility to generate and remember passwords. Therefore they often end up being easy to guess and reused across multiple sites.
* Users are easily tricked to give away their passwords. [Verizon's Data Breach Investigations Report for 2019](https://enterprise.verizon.com/resources/reports/dbir/) showed that 3% of phishing attempts were successful.

Knowing all this, why do we still use password based authentication methods? For the most part it’s due to the lack of good alternatives. Different attempts have been made to rectify the issues mentioned above. Two factor authentication protects you, to some extent, if your password is leaked, while password managers help you generate strong passwords that are unique across your accounts. Used in combination they alleviate some of the issues, but unfortunately [most people don't use them](https://hackernoon.com/why-do-most-people-ignore-two-factor-authentication-1bbc49671b8e) indicating that they aren’t user friendly enough for your average Jane or Joe. 

The FIDO (Fast Identity Online) Alliance has set out to solve the world’s password problem by creating an authentication method that is both secure and user friendly. The alliance consists of some of the most influential companies on the web, like Google, Amazon and Microsoft, and have created an open authentication standard called FIDO2. In simple terms FIDO2 replaces the need of a shared secret, i.e. the password, with public key cryptography. The standard consists of a W3C approved API called [WebAuthn](https://www.w3.org/TR/webauthn/) and a client to authenticator protocol called [CTAP](https://fidoalliance.org/specs/fido-v2.0-id-20180227/fido-client-to-authenticator-protocol-v2.0-id-20180227.html). Before diving into the details, let’s walk through how this will work in practice (use cases taken from the WebAuthn specification):

#### Registration (using a phone)
1. The user navigates to example.com in a browser and clicks a button to create an account
2. The phone prompts, “Do you want to register with example.com?”
3. To accept, the user provides some previously configured authentication mechanism such as a PIN code or fingerprint
4. Once authenticated, the registration is complete

#### Authentication (using a laptop)
1. The user navigates to example.com in a browser and clicks a button to sign in
2. The browser displays a message saying, “Please complete this action on your phone”
3. The phone receives a notification saying, “Sign in to example.com”
4. The user taps on the notification and authenticates using their preferred authentication mechanism
5. The sign in completes

Let’s take a closer look at what’s happening under the hood. The central component in FIDO2 is a cryptographic entity called the authenticator. In the examples above, the authenticator is running on the user’s phone. The authenticator’s job is to generate public key credentials for relying parties, authenticate the user and cryptographically sign challenges presented to it by relying parties. When the user clicks the button to create an account, the website (referred to as the relying party) uses the WebAuthn API in the browser to initiate the registration process illustrated in Figure 1. First the authenticator prompts the user to authenticate. Then public key credentials are generated, given that the authentication was successful. The private key is stored on the device together with information about the relying party. The public key is sent back to the relying party which associates the public key with the newly created account.

![FIDO2 Registration Process](https://1nmqmp2u9dgf3jo9centu6rq-wpengine.netdna-ssl.com/wp-content/uploads/2014/12/graphic_Registration.png)

Figure 1 (source: https://fidoalliance.org/how-fido-works/)

When signing in, the website uses WebAuthn to send a randomly generated string of characters called a challenge to the authenticator. The authenticator verifies the origin of the request, unlocks access to the private key by prompting the user for authentication, signs the challenge with the private key and returns the signed challenge back to the relying party. The website, knowing the original value of the challenge, verifies the signature by using the public key associated with the account. If the signature is verified, the sign in is complete. The process is illustrated in Figure 2. 

![FIDO2 Login Process](https://1nmqmp2u9dgf3jo9centu6rq-wpengine.netdna-ssl.com/wp-content/uploads/2014/12/graphic_Login.png)

Figure 2 (source: https://fidoalliance.org/how-fido-works/)

In the authentication scenario the authenticator is not running on the same device as the browser. These authenticators are referred to as roaming authenticators and communicate with the client platform through the CTAP protocol. We won’t go into details about the protocol here, but it describes how external devices running authenticators communicate with client platforms through underlying transport protocols like USB, NFC and Bluetooth.

So what exactly makes FIDO2 better than using passwords? First of all, the secret, which in this case is the private key, never leaves the device. It is also locked behind some authentication mechanism on the device itself. This makes it a lot less likely that someone will be able to steal your secret. If some website is breached, only the public key, which can not be used to impersonate a legitimate user, will be available to the attacker. Additionally, FIDO2 has built-in phishing protection. The private key is scoped to a specific domain, meaning it can only be used to authenticate on the same domain for which the key was generated. FIDO2 also protects against replay attacks. The challenge that has to be signed is randomly generated each time a login is initiated and can only be used once. If someone attempts to reuse a signed challenge, no access will be granted.

FIDO2 support is increasing. Most major web browsers already [support WebAuthn](https://caniuse.com/#search=webauthn), whilst devices running Android 7+ or Windows 10 can be used as FIDO2 authenticators. Now it’s mostly up to websites to start offering FIDO2 authentication to end users. Companies like Google and Github currently allow you to use your FIDO2 security key as a second factor of authentication, whilst Microsoft has gone all the way allowing you to use is it as a single factor of authentication, providing a true passwordless experience. If you’re using a WebAuthn compatible browser on one of the devices mentioned earlier, you can try out FIDO2 yourself at [webauthn.io](https://webauthn.io). 

This is all good, but what happens if you lose the device holding all the security keys? Perhaps the biggest obstacle to reaching widespread FIDO2 adoption at the moment is coming up with a recovery mechanism that is both secure and user friendly. The current recommendation is to register a second authenticator with each relying party. If you lose one of your devices, you can still get access to your account with the other authenticator. Having to set up multiple security keys for all your web accounts is definitely not very user friendly and is hopefully something that will be solved in the future.

If you're interested in reading about an alternative to FIDO2 that is also based on public key cryptography, check out this post about [SQRL](https://security.christmas/2019/2). Or if you want to learn more about WebAuthn, [click here](https://security.christmas/2019/16) (available from December 16).
