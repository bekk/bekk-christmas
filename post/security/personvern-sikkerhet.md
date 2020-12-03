---
calendar: security
post_year: 2020
post_day: 9
title: Personvern != Sikkerhet
image: https://images.unsplash.com/photo-1523274620588-4c03146581a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1
ingress: >-
  > *Simula har, sammen med FHI, fra starten prioritert sikkerhet og personvern
  svært høyt i utviklingen av appen.*


  Ulike varianter av dette sitatet finner vi mange intervjuer om Smittestopp. [Politikere](https://www.stortinget.no/no/Saker-og-publikasjoner/Sporsmal/Skriftlige-sporsmal-og-svar/Skriftlig-sporsmal/?qid=80243), [helsebyråkrater](https://www.dagensmedisin.no/artikler/2020/04/02/massiv-kritikk-mot-korona-app/) og [forskere/utviklere](https://www.vg.no/nyheter/meninger/i/b5xzll/simula-smittestopp-virker) forsikrer at sikkerhet og personvern er ivaretatt. Kontrasten til Smittestopp-havariet er oppsiktsvekkende. Hvordan kan dette forstås?
links:
  - url: https://www.aftenposten.no/meninger/debatt/i/mBRlMv/personvernsverstingen-norge
    title: "Personvernsverstingen Norge? "
  - title: "Chronicling Smittestopp: Game on. Game over. Blame games."
    url: https://blogs.prio.org/2020/10/chronicling-smittestopp-game-on-game-over-blame-games/
  - url: https://www.digi.no/artikler/kommentar-personsikkerhet-og-personvern-er-ikke-det-samme/458555
    title: Personsikkerhet og personvern er ikke det samme
  - title: Regjeringen utsetter de kontroversielle delene av e-tjenesteloven
    url: https://rett24.no/articles/regjeringen-utsetter-de-kontroversielle-delene-av-e-tjenesteloven
---
### Personvern og Smittestopp

Den primære årsaken er en grunnleggende mangel på forståelse for personvern. Spørsmål og innsigelser om personvern besvares med utsagn om at sikkerheten er ivaretatt. Men personvern er noe annet - og mye mer - enn sikkerhet.

La oss se på årsakene til at Datatilsynet la ned forbud mot behandling av personopplysninger i Smittestopp

#### Forholdsmessighet og nytteverdi

Datatilsynet mente at FHI ikke hadde dokumentert appens nytteverdi. Forholdsmessighetsprinsippet sier at nytteverdien må være større enn ulempene ved inngrepet. Hvis man ikke vet nytteverdien, kan man heller ikke forsvare personverninngrepet.

Her kan det se ut som FHI og Simula hadde blind tro på at Smittestopp kunne stoppe pandemien. I flere sammenhenger refererer de til [Oxford-rapporten](https://pubmed.ncbi.nlm.nih.gov/32234805/), som hevder:

> *A contact-tracing app that builds a memory of proximity contacts and immediately notifies contacts of positive cases can achieve epidemic control if used by enough people.*

Vi kan kjenne igjen denne overoptimismen [fra et intervju med Olav Lysne i mai](https://www.dagbladet.no/nyheter/har-ikke-oppdaget-coronasmitte/72454590):

> *En vitenskapelig artikkel i Oxford viste at om vi klarer å finne fram til 60 prosent av smittebærerne, og få dem i karantene, er det nok til å holde smittetallet nede, sier Lysne og fortsetter:*
>
> *\- Om vi klarer det, kan vi gå tilbake til å ha fotballkamper, gå på festivaler og gi hverandre klemmer igjen. Appen vil være med og redusere, sier Lysne.*

Vi kan imidlertid konkludere med at mobil smittesporing langt ifra har vært en gamechanger i noen land. Rotårsaken er at smittespredning og blåtann-nærkontakter er vesensforskjellig, som mange innvendte helt fra starten.

#### Forskrift, frivillighet og formål

Smittestopp var hjemlet i egen forskrift. [Mona Naomi Lintvedt skriver i en kommentar om Smittestopp 2](https://rett24.no/articles/derfor-bor-vi-ha-hjemmel-for-smittestopp-2) at myndighetene bør ha hjemmel for slike tiltak: "*Hjemmel gir forutsigbarhet og åpenhet for borgerne, og det vil være mulig å kontrollere underveis at appen faktisk er utformet i tråd med regelverket og at FHI utøver sin myndighet i tråd med hjemler de er gitt. Og ikke minst kan det sikre den legitimitet og tillit dette tiltaket sårt trenger dersom det skal ha effekt*".

[Datatilsynet bemerket at](https://www.datatilsynet.no/contentassets/ae1905a8b88d4d869f1e059b60be35fd/Vedtak-om-midlertidig-forbud-mot-a-behandle-personopplysninger.pdf) "*I og med at behandlingen gjennom Smittestopp er hjemlet i forskrift, kan endring av formålet også skje ved forskriftsendring, og det er verdt å merke seg at forskriften ble vedtatt uten å bli sendt på høring"*.

Et sentralt poeng var at bruken av appen måtte være frivillig, og det gjentas i mange sammenhenger i [argumentasjonen fra FHI](https://www.fhi.no/contentassets/8335598fc7b84637a35752760c125b3f/~-20_11308-13-svar-pa-varsel-om-vedtak--467321_3_1.pdf). Imidlertid kan man innvende om bruken reelt sett er frivillig når Statsmininsteren oppfordrer til å laste ned Smittestopp ["*hvis vi skal få hverdagen og friheten tilbake*](https://www.vg.no/nyheter/innenriks/i/P9xGAJ/solberg-hvis-vi-skal-faa-hverdagen-tilbake-maa-flest-mulig-laste-ned-appen)*"*. Selv opplevde jeg pålegg om bruk av Smittestopp i den lokale håndballklubben, en dyrepark og flere kafeer. Dessuten var det åpenbart at Simula ikke hadde fått med seg at bruk av appen var frivillig, da de [beskyldte kritikerne for å være ubarmhjertige egoister som satte eget personvern framfor andres helse](https://medium.com/@trond.arve/grovt-overtramp-av-aslak-tveito-og-simula-431b62988f01).

Smittestopp hadde to uttalte formål: Kontaktsporing samt overvåkning på befolkningsnivå for å bidra til å følge smitteutbredelse og vurdere effekt av smitteverntiltak. [Datatilsynet bemerket](https://www.datatilsynet.no/aktuelt/aktuelle-nyheter-2020/varsel-om-palegg-til-smittestopp/) at formålene også omfattet analysearbeid og forskning. I tillegg var det problematisk at befolkningen ikke kunne velge mellom ulike formål, eksempelvis bare bidra til kontaktsporing. FHI hadde forøvrig fått [råd om å hente inn delt samtykke for Smittestopp før lansering](https://www.dagensmedisin.no/artikler/2020/06/19/fhi-fikk-rad-om-a-hente-inn-delt-samtykke-for-smittestopp-for-lansering/) fra De nasjonale forskningsetiske komiteene. Stortinget vedtok også å [be FHI å dele opp i to ulike samtykker](https://www.aftenposten.no/norge/politikk/i/vQaqvm/smittestopp-appen-deles-i-to-med-to-ulike-samtykker) i tumultene rundt havariet. 

#### Dataminimering og innebygd personvern

[Innebygd personvern](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/innebygd-personvern/programvareutvikling-med-innebygd-personvern/innebygd-personvern---hva-er-det/) er et sentralt krav i personopplysningsloven og betyr at det tas hensyn til personvern i alle utviklingsfaser av et system eller en løsning. Åpenhet er et nøkkelord i regelverket og det er også avgjørende når man bygger personvern inn i programvaren. Simula valgte å lukke kildekoden fordi ["*å tilgjengeliggjøre kildekoden fører ikke til økt personvern*](https://www.simula.no/news/digital-smittesporing-apen-kildekode)". [Dette er direkte feil](https://blogg.bekk.no/vend-i-tide-det-er-ingen-skam-%C3%A5-snu-fhi-og-simula-2bc89b850b8b). Et viktig prinsipp i innebygd personvern er at behandlingen for de registrerte fremstår som åpen og rimelig.

Prinsippet om dataminimering innebærer å begrense mengden innsamlede personopplysninger til det som er nødvendig for å realisere innsamlingsformålet. Datatilsynet påpekte at [innsamling av lokasjonsdata ikke var nødvendig for smittesporing](https://www.datatilsynet.no/contentassets/ae1905a8b88d4d869f1e059b60be35fd/Vedtak-om-midlertidig-forbud-mot-a-behandle-personopplysninger.pdf) og varsling, og dermed et brudd med dataminimeringsprinsippet. I tillegg var ble det tvilsomt om sentral innsamling av data var nødvendig gitt at det fantes desentraliserte tilnærminger der data ble lagret på mobilene.

Det er også interessant å lese [vurderingene fra FHIs personvernombud](https://drive.google.com/file/d/1wALd4qkZ4yjZ4Eoiavn_tgx-85YT4_-M/view) til DPIAen for Smittestopp. Her diskuteres dataminimering i kontekst av å slette data når de ikke lenger er i bruk. Imidlertid betyr dataminimering primært å unngå å samle inn mer info enn nødvendig til formålet i utgangspunktet.

#### Masseovervåkning og anonymisering

Smittestopp ville blitt den mest inngripende og omfattende masseovervåkningen av Norges befolkning gjennom tidene. Det er problematisk av mange grunner. I tillegg til risikoen for tyveri og lekkasje, var også formålsutglidning heftig diskutert. Data som finnes vil bli brukt. Nedkjølingseffekten er også en konsekvens, ved at befolkningen endrer adferd under overvåkning og begrenser privat og offentlig meningsbryting. På sikt er den mest alvorlige konsekvensen at vi ville endret toleransegrensen for når og hvorfor overvåkning var nødvendig. Det er ironisk at [Simulas Kyrre Lekve anerkjenner at masseovervåkningen er problematisk](https://podtail.com/no/podcast/waterhouse/-2-prat-med-kyrre-lekve-fra-simula-om-prosess-og-d/), men svarer ved å peke på sikkerhet samt oppfordre befolkningen til å stole på myndighetene: "*Det er veldig mange land jeg mener ikke bør ta i bruk den norske løsningen...*".

Et [svar fra Simulas Smittestopp Q&A](https://www.simula.no/news/digital-smittesporing-sporsmal-og-svar) sier mye om hvordan de tenkte rundt masseinnsamlingen av data. Dette er hårreisende lesing.

> ***Blir jeg sporet hele tiden?***
>
> *Nei. Programmet søker bare etter tilfeller av nærkontakt etter at en bruker er testet og bekreftet smittet. Den følger ikke individers bevegelser og heller ikke hvor de befinner seg. Den finner bare tilfeller der en bruker har vært mindre enn 2 meters avstand for mer enn 15 min fra en konstatert smittet bruker. Telefonnumrene til telefonene som har vært i nærkontakt vil brukes av helsemyndighetene til å sende ut varsling.*

Som en forutsetning for analyseløsningen skulle innsamlede data anonymiseres. Det første problemet var at FHI begynte å samle inn data før analyseløsningen var på plass. Store mengder personopplysninger ble fortløpende samlet inn, uten at FHI hadde praktisk mulighet til å gjøre bruk av dataene. [Datatilsynet fant dette særlig kritikkverdig](https://www.datatilsynet.no/contentassets/ae1905a8b88d4d869f1e059b60be35fd/Vedtak-om-midlertidig-forbud-mot-a-behandle-personopplysninger.pdf). Den andre problemstillingen, som man aldri fikk svar på, er om det faktisk er mulig å anonymisere dette datasettet. NRK viste i denne perioden [hvor enkelt det var å identifisere enkeltindivider](https://www.nrk.no/norge/xl/avslort-av-mobilen-1.14911685) ved å analysere lokasjonsdata. Sist men ikke minst viste det seg at [data ble *pseudonomisert*](https://www.tekna.no/magasinet/10-sporsmal-og-svar-om-smittestoppappen/), ikke anonymisert. Pseudonomiserte data er fremdeles personopplysninger.

## Personvern != sikkerhet

Smittestopp hadde altså en rekke personvernsproblemer. Sikkerhet er ikke relevant for brorparten av dem. Eksempelvis kan nytteverdien umulig bli bedre på grunn av sikkerhet. Problemene med forskrift, frivillighet og formål avhjelpes heller ikke med sikkerhet. Tilsvarende med dataminimering, innebygd personvern osv.

Når det er sagt, er det riktig at personvern forutsetter god sikkerhet og beskyttelse av personopplysningene som behandles. Autentisering, tilgangskontroll, innsynslogging og kryptering er viktige sikkerhetstiltak som brukes for å sikre dataene. Men selv om sikkerhet er en viktig del av personvern, er det bare en begrenset del. Sikkerhet kan bare i begrenset grad kompensere for noen av svakhetene beskrevet ovenfor.

Smittestopp hadde forøvrig også [en rekke rene sikkerhetssårbarheter og -svakheter](https://www.regjeringen.no/contentassets/88ec3360adae44a1a9635fd6c1a58fca/200520_rapport_ekspertgruppa_smittestopp.pdf):

* Permanente, enhets-spesifikke identifikatorer mellom enhetene, som åpnet for å kunne utlede andres identitet eller smittestatus. På tross av at dette var en kjent feil, valgte FHI å lansere appen til hele befolkningen.
* Manuelt oppsett av skyløsningen i Azure. Åpner for menneskelige feil ved endring og vedlikehold, infrastrukturen kan ikke gjenskapes, vanskelig å gjøre en sikkerhetsanalyse.
* Bruk av en preview-feature i Azure IoT-Hub som leverandøren selv sier man ikke skal bruke til å prosessere personopplysninger.
* Bruk av SMS for varsling medførte en risiko for svindel og forfalskning.
* Dårlig kodekvalitet som gjør det vanskelig å vedlikeholde, forstå og feilsøke.
* Manglende automatiserte tester.
* API nøkler og passord i kildekoden og Git-historikken.
* Disse funnene indikerer manglende sikkerhetskompetanse og -kultur. Det er ikke akseptabelt når man skal passe på sensitive data om store deler av befolkningen.

## Skrikende behov for personvernkompetanse

Det er underlig og skremmende å lese at personvern har vært prioritert svært høyt i utviklingen av Smittestopp. Selv med tydelige tilbakemeldinger fra Datatilsynet, Amnesty, EUs personvernsråd, ekspertgruppen samt eksperter på teknologi og personvern, fortsetter [Helseministeren](https://www.dagbladet.no/meninger/hoie-bommer-om-smittestopp/72908271) og [FHI](https://www.aftenposten.no/norge/i/mRAyz0/fhi-sletter-alle-data-fra-appen-smittestopp) å si at de er uenige i Datatilsynets vurdering. Simula prøver å redde stumpene ved å hevde at Smittestopp havarerte [fordi inngrepet ikke lenger var forholdsmessig når smittetallene hadde blitt så lave](https://www.simula.no/news/smittestopp-og-erfaringer-fra-digital-smittesporing). Dette er åpenbart ikke sant.

Det er forsåvidt greit å være uenig i Datatilsynets vedtak. Men da er man uenig i selve Personopplysningsloven. Det er forøvrig verdt å merke seg at det ikke ble innlevert klage på vedtaket fra Datatilsynet.

Smittestopp har avslørt et skrikende behov om bedre kompetanse om personvern i offentlig forvaltning. Sentrale politikere og beslutningstakere er ute av stand til å innse sin manglende kunnskap, mens de ignorerer faglig kritikk uten engang å forstå den.

Men Smittestopps prislapp på 45 millioner er et røverkjøp hvis den har ført til økt kunnskap og forståelse for personvern i offentlig forvaltning og i befolkningen generelt.