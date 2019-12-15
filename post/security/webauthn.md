---
calendar: security
post_year: 2019
post_day: 16
title: WebAuthn
ingress: >-
  With FIDO2 available the internet has all the tools available to lighten the
  load of the password. Here are the basics to get started with a wide range of
  authenticators.
authors:
  - Mats Jonassen
---
The FIDO Alliance has since 2013 worked towards simpler online authentication and a weaker reliance on passwords. A strong alternative to password authentication is becomming generally available: the cryptographic authenticator.
To strengthen the adaption of authenticators W3C released their Web Authentication(WebAuthn) API at their "Recommended" level this March.

WebAuthn moves the burden of authenticator interaction to the users web browser. The API reduces both authenticator selection and communication to the two JS methods `create()` and `get()`.
`Create()` is used to register new authenticators, and `get()` to authenticate users.
Both methods accept their own option objects to provide some level of control to implementers as well as providing the required security measures. One of these measures is the challenge. Challenges are required for all authenticator communication and serves as a nonce value that must always be signed over by the authenticator. This proves the authenticators involvement and prevents replay attacks. It is vital that the back-end services generate and validate the challenges for it to achieve its purpose.


#### Registering a new authenticator:

To register a new authenticator WebAuthn exposes `create()`. During the registration process the authenticator will be provided with identifiers for a relying party(the domain/server), user entity, and public-key preferences. Authenticators generate a new key-pair for every new domain it registers with, preveting a login for domain A to be valid for domain B.


#### Authenticating a user

When it comes to authenticating a user the process becomes even simpler. The relying party information is by default handled by the browser and the only required parameter is the challenge, again created by the relying party. 

The authenticator will look up the specific private key used to register for the relying party and produce a signature for its id and challenge.
To verify the authenticator the server must get the public key for the user, and check that the returned data is as expected with a valid signature.

#### Trusting Authenticators

In what we've explained so far, there is no verification that the communcation has infact occured with an authenticator and there is no verification that the authenticator plays by the FIDO2 rules. It is completely possible for a web browser to fake the result of WebAuthn using its own unsecured techniques. To improve authenticator trust there are specified rules for attestation. Authenticator attestation utilizes techniques such as X.509 certiciates to build trust paths to the origin of the authenticator. 

If you would like to know more, and see code examples check out https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API or the official recommendation at https://www.w3.org/TR/webauthn/.
