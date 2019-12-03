---
calendar: security
post_year: 2019
post_day: 11
title: FIDO2 - the web authentication standard of the (near) future
authors:
  - Emil Øien Lunde
---
Most authentication solutions end users are exposed to on the web these days are password based. Unfortunately, there are a number of reasons why we shouldn’t use passwords to protect access to web accounts: 
* The passwords have to be shared with the sites we register with. We have no control over how the password is stored, e.g. what hashing algorithm is used, or who has access to it.  The result is that passwords end up being exposed all the time, through data breaches or even system logs.  Currently there are over 9 billion leaked accounts on haveibeenpwned.com.
* It is the user’s responsibility to generate and remember passwords. Therefore they often end up being easy to guess and reused across multiple sites.
* Users are easily tricked to give away their passwords. A study made by Verizon in 2017 showed that 1 in 14 phishing attempts were successful.

Knowing all this, why do we still use password based authentication methods? For the most part it’s due to the lack of good alternatives. Different attempts have been made to rectify the issues mentioned above. Two factor authentication protects you, to some extent, if your password is leaked, while password managers help you generate strong passwords that are unique across your accounts. Used in combination they alleviate some of the issues, but unfortunately not all of them. Also, low usage percentages indicate that they aren’t user friendly enough for your average Jane or Joe. 

The FIDO Alliance has set out to solve the world’s password problem by creating an authentication method that is both secure and user friendly. The alliance consists of many of the most powerful web companies, like Google and Amazon, and have created an open authentication standard called FIDO2. In simple terms FIDO2 replaces the need of a shared secret (the password) with public key cryptography. The standard consists of a W3C approved API called WebAuthn and a client to authenticator protocol called CTAP. Before diving into the details, let’s walk through how this will work in practice (use cases taken from the WebAuthn specification):

Registration (using a phone)
1. The user navigates to example.com in a browser and initiates account creation
2. The phone prompts, “Do you want to register with example.com?”
3. To accept the user provides some previously configured authorization gesture like PIN code, fingerpint etc.
4. Once authenticated, the registration is complete

Authentication (using a laptop)
1. The user navigates to example.com in a browser and initiates a sign in
2. The browser displays a message saying “Please complete this action on your phone”
3. The phone received a notification saying “Sign in to example.com”
4. The user taps on the notification and provides their authorization gesture
5. The sign in completes

Let’s take a closer look at what’s happening under the hood. The central component in FIDO2 is a cryptographic entity called the authenticator. In the examples above, the authenticator is running on the user’s phone. The authenticator’s job is to generate public key credentials for relying parties, authenticate the user and cryptographically sign challenges presented to it by relying parties. When the user clicks the button to create an account, the website (referred to as the relying party) uses the WebAuthn API (typically implemented in the browser) to initiate the registration process illustrated in figure 1. First the authenticator prompts the user to authenticate, e.g. using biometry. Then public key credentials are generated, given that the authentication was successful. The private key is stored on the device together with information about the relying party. The public key is sent back to the relying party which associates the public key with the newly created account.

Figure 1

When signing in, the website uses WebAuthn to send a randomly generated string of characters called a challenge to the authenticator. The authenticator verifies the origin of the request, unlocks access to the private key by prompting the user for authentication, signs the challenge with the private key and returns the signed challenge back to the relying party. The website, knowing the original value of the challenge, can then verify the signature by using the public key associated with the account. If the signature is verified, the sign in is complete. The process is illustrated in figure 2. 

Figure 2

In the authentication scenario you may have noticed that the authenticator is not running on the same device as the browser. These authenticators are referred to as roaming authenticators and communicate with the client platform through the CTAP protocol. We won’t go into details about the protocol here, but it describes how external devices running authenticators communicate with client platforms using underlying transport protocols like USB, NFC and Bluetooth.

So what exactly makes FIDO2 better than using passwords?
* List
* of
* arguments

More to come...
