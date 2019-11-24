---
calendar: security
post_year: 2018
post_day: 9
title: Revoking of certificates
ingress: >-
  Managing certificates, and rotating them in due time can quickly get out of
  hand.
links:
  - title: 'No, don''t enable revocation checking'
    url: 'https://www.imperialviolet.org/2014/04/19/revchecking.html'
  - title: SSL certificate revocation and how it is broken in practice
    url: >-
      https://medium.com/@alexeysamoshkin/how-ssl-certificate-revocation-is-broken-in-practice-af3b63b9cb3
  - title: Revocation still doesn't work
    url: 'https://www.imperialviolet.org/2014/04/29/revocationagain.html'
authors:
  - Didrik Sæther
---
As a follow-up to Tia Firings [article](https://security.christmas/2018/2) on certificates we present an article on how to manage the certificates when they are issued.

Managing certificates and keys is a difficult task with many pitfalls. Without proper lifecycle management it will quickly scale to something that is unmanageable. An old saying is that **_If a certificate got issued, it will have to be rotated_**. Cisco has stated that they use on average more than four hours per certificate , just maintaining and rotating it. This is on top of the fact that manual management is more prone to human error, which in turn results in security and operational risk.

So why do we need to rotate certificates? Some of the reasons can be that the certificate is nearing its expiration date, or that the private key that signed the certificate has been compromised, and has to be revoked.
Previous practices for revoking a certificate involved using a certificate revocation list (CRL) to hold a list of all revoked certificates. The nature of this list is to grow in size, and what do developers do when things grow? We cache them! So now users are making security decisions based on stale data.

There has been done attempts at fixing revocation. We have _OCSP_, _OCSP Stapling_, and _OCSP must-staple_. All of which are prone to [MITM-attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). If an attacker can block the OCSP lookup, the lookup will soft-fail, and a revoked certificate will be accepted.

As early as in 1998 elimination of certificate revocation was proposed. And if we absolutely must do revocation, we should use _OCSP must-staple_. But what is OCSP must-staple? In short terms: OCSP Stapling eliminates the need for the browser having to perform an OCSP request by piggybacking the OCSP response along with the certificate. 
The reason behind the name is the same as when the cashier staples the note from the payment terminal to the payment receipt.
In the same way the server 'staples' the OCSP Response to the certificate.

OK, so we don't want to do revocation, it's complicated and prone to errors. What should we do insted? We should use short lived certificates. A short lived certificate is a certificate that has an expiration data of < 1 year. Because expiration is revocation in it self. So what is a short lived certificate? A certificate has an expiration date, the same way as the milk in your fridge has one. Today certificates live for years, but why should they? Often are certificate problems related to a mismatch between the certificate expiration date and the clients clock. Everyone knows that fresh milk tastes better!


The solution is to automate the certificate rotation of certificates, and with it, we get short lived certificates.
[Let's Encrypt](https://certbot.eff.org/docs/using.html#automated-renewals) supports automatic renewal, and their certificates are fairly short lived at 90 days. 
