---
calendar: security
post_year: 2019
post_day: 2
title: Secure Quick Reliable Login (SQRL)
image: >-
  https://images.unsplash.com/photo-1504006833117-8886a355efbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80
ingress: >-
  In case you haven't noticed: [Passwords
  suck](https://security.christmas/2018/19). Fortunately alternatives to that
  age-old authentication scheme are finally becoming practical. Today we will
  look at SQRL (Secure Quick Reliable Login), which aspires to become _the_
  simple and secure solution for your every-day authentication needs.
links:
  - title: SQRL documentation
    url: 'https://www.grc.com/sqrl/sqrl.htm'
  - title: SQRL forums
    url: 'https://sqrl.grc.com/'
  - title: 'Steve Gibson''s SQRL presentation at OWASP Dublin (Oct 2019):'
    url: 'https://www.youtube.com/watch?v=uU1fY_xm9BE'
authors:
  - Øystein Grande Jaren
---
SQRL was originally invented in 2013 by Steve Gibson (these days best known as host of the podcast [_Security Now!_](https://twit.tv/shows/security-now)). Over the past few years a lot of work has gone into making SQRL ready for the world. The specification was recently finalized, and several client and server implementations have been developed, making now a good time for curious developers to start experimenting with this promising technology.

SQRL uses public key cryptography to securely authenticate a user to a web site with minimal fuss, and without the user having to memorize or manage a multitude of passwords. It is based around the central premise of using a single master identity - the user's _SQRL Identity_ -  to predictably generate unique identities for every web site that the user authenticates to. 

This is how logging in with SQRL works from a high level:

1. The user's web browser requests the web site's login page.
2. The web site presents a "Log in with SQRL" link on its login page, pointing to a SQRL URL like this: `sqrl://www.example.com?nut=X7Kyfz9xr8jLt4aB9xQF`. That "nut" parameter is a nonce, uniquely generated every time the login page loads.
3. The user clicks/presses that link on her PC/phone. This launches the local SQRL client app (or browser plugin), which receives the SQRL URL, including the nonce.
4. The client app takes the domain of the URL and runs it through an HMAC function, keyed by the user's 256-bit _Master Key_, to produce a site specific public/private key pair. Given the same domain, this procedure will always produce the same key pair. The public key serves as the user's identity for the site. It is how the site will know the user.
5. The client app uses the site specific private key to cryptographically sign the SQRL URL (including the nonce). The client then sends that signature to the web site server, along with the public key, ie. the user's site specific identity.
6. The server identifies the user by the provided public key, and uses this public key to verify the provided signature. A valid signature proves that the client is in possession of the associated private key. This securely authenticates the user's identity to the site.
7. The web server establishes a signed in session for the user and sends the URL for that session to the user's SQRL client.
8. The SQRL client receives the session URL and redirects the user's browser to the signed-in session.

![SQRL synthesis of site specific identity](https://i.ibb.co/SRgGhk8/sqrl.png)

The above image borrowed from the [SQRL documentation](https://www.grc.com/sqrl/sqrl.htm) nicely illustrates how SQRL generates site specific identities from the site domain name and the user's Master Key.

This relatively simple concept provides us with many desireable characteristics, most notable of which are:

* **No secrets to lose:** Since the web site knows the user only by the site specific public key, which can in no way be used to infer the matching private key (let alone the Master Key), SQRL gives web sites no secrets to keep. Unlike a username and password, the public key alone can only _identify_ a user to the particular site, not _authenticate_. So if a site gets breached and all it's data is exposed, there is nothing there that will allow an attacker to impersonate a legitimate user.
* **Powerful anti-spoofing:** Unlike traditional browser sign-in, the web site does not authenticate the browser session which initiated the sign-in process. Instead a URL to the new signed-in session is returned securely to the user's SQRL client app, which then redirects the user's browser. This effectively prevents man-in-the-middle and web-site spoofing attacks.
* **Privacy:** Like password based authentication, but unlike federated authentication (such as "sign in with Google"), SQRL is strictly two party. No need to let Google and Facebook know which web sites you have registered an account with. Additionally SQRL produces a unique identity for each site the user authenticates with, which is in no way traceable back to the user's main SQRL Identity, nor any other site specific identity for another site.
* **No password management hell:** Since each site specific identity is synthesized from the web site domain and the user's Master Key, the user only needs to remember one strong _master password_, which is used to locally unlock the SQRL client app and decrypt the Master Key, which resides in encrypted storage within the client app. Also a SQRL client app could use the device's TPM module to encrypt/decrypt the Master Key, allowing for the use of fingerprint readers and the like to make unlocking the SQRL client app even more frictionless.

All these benefits also put some responsibility on the user. Since the Master Key resides in the SQRL client app on the user's phone or PC, the user must take appropriate precautions to protect the SQRL client app on her device. If the user's chosen master password (which is used to encrypt and decrypt the Master Key) is not sufficiently strong, this of course weakens the overall security of the system. Also since there is no third party to turn to for help, the user must make sure to backup her SQRL Identity in case she loses her device. Fortunately this is easy to do. The SQRL Identity (ie. the 256-bit Master Key) can simply be printed in encrypted form as a QR code and/or human readable text on a piece of paper for offline storage. Importing the SQRL Identity into the SQRL client app on a new device is as simple as scanning a QR code or entering a bit of text. Encryption by the master password is preserved. But what if you forget the master password? Well, for this case you have the _Rescue Code_, which is generated when you first create your SQRL Identity. It absolutely must be stored in a safe place, as it can rescue you from pretty much [any bad situation imaginable](https://sqrl.grc.com/pages/whatif/).

Now I hear you say: What about [FIDO2/WebAuthn and hardware security keys](https://paulstamatiou.com/getting-started-with-security-keys/)? Some web sites have started to offer support for passwordless authentication using FIDO2 hardware keys. This offers similar security properties to SQRL (in some ways arguably better), while also being very simple to use. A major downside is difficulty of backup. The private keys are locked inside the hardware and cannot be accessed in any way. Thus the only way to do backup is to add multiple security keys to every web site you use. This can quickly become a maintenance nightmare. Locking up the keys inside the hardware does provide superior security at face value, but at a considerable cost of convenience. This cost may be too high for most users, which means that they must keep alternate (and less secure) authentication methods active as fallbacks, arguably negating the most important benefits of using security keys in the first place. It may be that SQRL strikes the security/convenience balance better.

It remains to be seen if SQRL will get enough traction to make a dent in the dominance of passwords, but its security properties and ease of use are certainly compelling, and importantly: It is completely free and unencumbered by patents and intellectual rights. It is simple to implement SQRL support on the server side, in no small part due to the [excellent documentation](https://www.grc.com/sqrl/sqrl.htm). Additionally SQRL authentication will happily coexist with traditional authentication methods on your web site. You can trivially allow existing users to add a SQRL identity which will be linked to their account, making for a smooth transition into a more secure future.

SQRL Client apps are available and in development for Windows, Mac, Linux, Android, iOS, as well as browser plugins. Server libraries exist for .NET Core, Java, Go and more. There is even a Wordpress plugin.

To learn more and try out SQRL for yourself, check out the links below. The documentation actually makes for a surprisingly engaging read!
