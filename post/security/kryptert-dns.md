---
calendar: security
post_year: 2019
post_day: 5
title: Kryptert DNS
ingress: >-
  Når vi surfer på nettet i dag er det meste av trafikken kryptert.
  [Bruksstatistikk fra
  Google](https://transparencyreport.google.com/https/overview?hl=en) viser at
  ca. 90 prosent av nettstedene som lastes i nettleseren Chrome lastes over
  HTTPS. Selv om mye av innholdet vi laster opp og ned over internett er
  beskyttet er det fortsatt mye annen informasjon om internettaktiviteten vår
  som er tilgjengelig for uvedkommende.
links: []
authors:
  - Emil Øien Lunde
---
Så og si all aktivitet på internett starter med et DNS-oppslag. Formålet med DNS er å oversette lesbare domenenavn, f.eks. bekk.no, til en IP-adresse som brukes til å opprette en forbindelse til en annen datamaskin. Disse oppslagene sendes som standard i klartekst, noe som betyr at andre enkelt kan lese og endre denne trafikken. Det betyr blant annet at:
- Regimer som ønsker å begrense innbyggernes tilgang til informasjon bruker det til å blokkere DNS-oppslag på utvalgte domener.
- NSA og andre etterretningstjenester rundt om i verden utnytter dette i sine [angreps- og overvåkningsverktøy](https://www.wired.com/2014/03/quantum/). 
- Amerikanske internettleverandører kan logge DNS-oppslag og [selge informasjonen til tredjeparter](https://arstechnica.com/information-technology/2017/03/how-isps-can-sell-your-web-history-and-how-to-stop-them/). 
- En angriper kan returnere en annen IP-adresse enn den faktiske for å sende brukere til en side kontrollert av angriperen, kjent som DNS-kapring. [I 2011 ble iranske innbyggere sendt til en falsk versjon av Gmail](https://slate.com/technology/2016/12/how-the-2011-hack-of-diginotar-changed-the-internets-infrastructure.html) som antakeligvis ble brukt til å overvåke e-postene deres.

Hvordan kan vi beskytte oss mot disse problemene? Internet Engineering Task Force har standardisert to protokoller for sikker transport av DNS, nemlig [DNS-over-TLS](https://tools.ietf.org/html/rfc7858) (DoT) og [DNS-over-HTTPS](https://tools.ietf.org/html/rfc8484) (DoH). Begge protokollene baserer seg på offentlig-nøkkel-kryptografi for sikker kommunikasjon, men opererer på forskjellig nivå i nettverksstakken. DoT baserer seg på at man oppretter en sikker tilkobling mellom klient og tjener vha. TLS på en kjent port, 853 som standard, og sender vanlige DNS-meldinger over denne tilkoblingen. DoH bruker HTTPS for å kryptere kommunikasjonen og benytter en egen mediatype for å sende DNS-oppslag og -responser. Et typisk DoH-oppslag ser slik ut: 
```
curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=bekk.no"
```
Standarden spesifiserer ikke hvordan man finner IP-adressen til DoH-tilbyderen (cloudflare-dns.com i dette tilfellet), men den kan f.eks. inkluderes som en del av konfigurasjonen eller hentes vha. et tradisjonelt DNS-oppslag.

Den viktigste forskjellen mellom protokollene er at DoT separerer de krypterte DNS-forespørslene til en egen port, mens DoH-trafikk ikke er mulig å skille fra annen HTTPS-trafikk. De som er mest opptatt av personvern foretrekker derfor DoH, mens de som mener at det å kunne oppdage og beskytte nettverk mot ondsinnet aktivitet er viktigere, foretrekker DoT. Du kan lese mer om dette [her](https://www.theregister.co.uk/2018/10/30/dns_over_https_controversy/).

Stadig flere DNS-klienter og -tilbydere implementerer disse standardene, men i skrivende stund er man fortsatt avhengig av å aktivt konfigurere kryptert DNS på enhetene sine selv. Det er i ferd med å endre seg. Firefox har allerede begynt å rulle ut DoH som standard for amerikanske brukere, mens Opera og Chrome har annonsert eksperimentell støtte for DoH i kommende versjoner av nettleserene.

Utrullingen av kryptert DNS som standard er kontroversiell. Nettleserene kommer til å benytte en innebygget liste av DoH-tilbydere og dermed ignorere de vanlige DNS-innstillingene i operativsystemet. Det betyr at internettleverandørers foreldrekontroll omgås og bedrifters mulighet til å detektere og hindre uønsket nettverkstrafikk begrenses. En annen bekymring er at DNS-trafikken sentraliseres hos kommersielle selskaper i USA, noe som hverken er bra for personvernet eller robustheten til systemet.

De som forsvarer DoH sier at «DNS-verden» kan takke seg selv fordi de så langt har mislyktes i å tilby kryptert DNS. Nettleserene har dermed ikke noe annet valg dersom de skal gi brukerene sine sikre domenenavnoppslag innen rimelig tid. Electronic Frontier Foundation deler bekymringene angående sentraliseringen av DNS, men sier samtidig at [fordelene utveier ulempene](https://www.eff.org/deeplinks/2019/09/encrypted-dns-could-help-close-biggest-privacy-gap-internet-why-are-some-groups) og at sentraliseringseffekten kan reduseres ved at nettverksoperatørene selv tilbyr kryptert DNS.  

Til tross for kontroversene blir begge standardene stadig mer utbredt. Noen av de mest brukte nettleserene tester som nevnt ut DoH, mens DoT ble inkludert i Android 9. En oversikt over implementasjoner blir løpende oppdatert [her](https://dnsprivacy.org/wiki/display/DP/DNS+Privacy+Implementation+Status). Selv om det er uenighet om hvilken standard som er best, virker det i hvert fall som om det er bred enighet om at kryptert DNS er et viktig steg i retning av en tryggere internetthverdag.
