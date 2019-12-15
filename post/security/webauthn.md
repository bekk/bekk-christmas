---
calendar: security
post_year: 2019
post_day: 16
title: WebAuthn
ingress: >-
  We've covered FIDO2 in this year's [eleventh calendar
  post](https://security.christmas/2019/11), and with FIDO2 available the
  internet has all the tools need to lighten the load of the password. One of
  its results is the Web Authentication(WebAuthn) API, simplifying FIDO2
  authentication for web browsers. Here are the basics to get started with a
  wide range of authenticators on your website.
links:
  - title: Webauthn.guide
    url: 'https://webauthn.guide/'
authors:
  - Mats Jonassen
---
The FIDO Alliance has since 2013 worked towards simpler online authentication and a weaker reliance on passwords. A strong alternative to password authentication is becoming generally available: the cryptographic authenticator. The authenticator covers the "Something you have" authenticator factor.
To strengthen the adaption of authenticators W3C released its Web Authentication API at their "Recommended" level this March.

WebAuthn moves the burden of authenticator interaction to the user's browser agent. The API reduces both authenticator selection and communication to the two JS methods `create()` and `get()`.
`create()` is used to register new authenticators, and `get()` to authenticate users.
Both methods accept their separate option objects to provide some level of control to implementers as well as providing the required security measures. One of these measures is the challenge. Challenges are required for all authenticator communication and serve as a nonce value that must always be signed over by the authenticator. This proves the authenticator's involvement and prevents replay attacks. The back-end services must generate and validate the challenges for it to achieve its purpose.

#### Registering a new authenticator:

To register a new authenticator WebAuthn exposes `create()`. During the registration process, the authenticator will be provided with identifiers for a relying party(the domain/server), user entity, and public-key preferences. Authenticators generate a new key-pair for every new domain it registers with, preventing a login for domain A to be valid for domain B.

#### Authenticating a user

When it comes to authenticating a user the process becomes even simpler. The relying party information is by default handled by the browser and the only required parameter is the challenge, again created by the relying party.

The authenticator will look up the specific private key used to register for the relying party and produce a signature for its id and challenge.
To verify the authenticator the server must get the public key for the user, and check that the returned data is as expected with a valid signature.

#### Trusting Authenticators

In what we've covered so far, there is no verification that the communication has occurred with an authenticator and there is no verification that the authenticator plays by the FIDO2 rules. A web browser can fake the result of WebAuthn using any unsecured techniques. To improve authenticator trust there are specified rules for attestation. Authenticator attestation utilizes techniques such as X.509 certificates to build trust paths to the origin of the authenticator.

We hope this article may inspire you to try out WebAuthn
If you would like to know more and see code examples check out https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API or the official recommendation at https://www.w3.org/TR/webauthn/.
