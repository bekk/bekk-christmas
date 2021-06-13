---
calendar: thecloud
post_year: 2020
post_day: 2
title: Statens Datasentral 2.0
image: /assets/sdslogo.png
ingress: NSM er bekymret for den samlede nasjonale avhengigheten av utenlandske
  skytjenesteleverandører. De mener Norge bør [vurdere å etablere en offentlig
  sky på norsk jord, for å sikre nasjonal
  kontroll](https://www.nrk.no/norge/nsm-atvarar-om-utanlandske-skytenester_-vil-sikre-nasjonal-kontroll-1.15173582).
  Er dette en god idé?
links:
  - title: "NSM åtvarar om utanlandske skytenester: Vil sikre nasjonal kontroll"
    url: https://www.nrk.no/norge/nsm-atvarar-om-utanlandske-skytenester_-vil-sikre-nasjonal-kontroll-1.15173582
  - title: "NSM - Helhetlig digitalt risikobilde 2020: Skytjenester og
      tjenesteutsetting – muligheter og utfordringer"
    url: https://nsm.no/regelverk-og-hjelp/rapporter/helhetlig-digitalt-risikobilde-2020/skytjenester-og-tjenesteutsetting-muligheter-og-utfordringer/
  - title: Nå får tyskerne sin egen skytjeneste for lagring av all offentlig
      informasjon
    url: https://frifagbevegelse.no/aktuell/na-far-tyskerne-sin-egen-skytjeneste-for-lagring-av-all-offentlig-informasjon-6.158.678855.cdeb734c7a
  - title: Microsoft is discontinuing the German data trustee model
    url: https://mspoweruser.com/microsoft-is-discontinuing-the-german-data-trustee-model/
  - title: Microsoft announces the end of the Germany Cloud
    url: https://hackernoon.com/microsoft-announces-the-end-of-the-germany-cloud-431bbe407b94
  - title: Nasjonal strategi for bruk av skytenester
    url: https://www.regjeringen.no/contentassets/4e30afec51734d458596e723c0bdea0e/nasjonal_strategi_for_bruk_av_skytenester.pdf
  - title: "Nasjonal sky: I etterretningsverdenen finnes ingen venner"
    url: https://www.digi.no/artikler/debatt-nasjonal-sky-i-etterretningsverdenen-finnes-ingen-venner/500826
authors:
  - Trond Arve Wasskog
---
NSM er i utgangspunktet positive til skytjenester, forutsatt at det blir gjennomført gode og riktige vurderinger i forkant. Det som nå bekymrer NSM mest er at virksomheter som er avgjørende for at samfunnet skal fungere, spesielt i krisesituasjoner, har gjort seg avhengige av tjenester som er drifta fra utlandet.

Datasystemer underlagt sikkerhetsloven må kjøre i Norge. Sett bort fra disse, har offentlige virksomheter de siste årene langt på vei kunnet velge om de vil skysette sine applikasjoner. Brorparten har imidlertid intern drift eller kjøper driftstjenester av en norsk driftsleverandør. Enkelte, som NAV og Lånekassen, har vært tidlig ute og kommet et godt stykke. Det må være disse som NSM er bekymret for.

Det finnes ikke et enkelt svar på om en nasjonal sky er en god idé, men her er noen betraktninger.

## Tilbake til steinalderen?

Statens Datasentral har røtter tilbake til 1972, og EDB Fellesdata enda et tiår tidligere. Dette er selskaper som har gått gjennom privatisering, oppkjøp og sammenslåinger. Vi kjenner dem i dag som TietoEVRY, der EVRY er den norske delen av selskapet.

TietoEVRY tilbyr skytjenester, men blir ikke nevnt sammen med Azure, AWS og GCP. Tradisjonelle driftsselskap har aldri klart å ta steget opp i den øverste divisjonen. De tilbyr stadig bedre automatiserte og virtualiserte driftstjenester, men kan ikke konkurrere med de store på tjenestebredde, innovasjon, sikkerhet, skalerbarhet, selvbetjening, automatisering osv. Konkurransefortrinnet til de tradisjonelle driftsselskapene er at de har datasentre og tilstedeværelse i Norge.

## Statens Datasentral 2.0

Det er åpenbart mulig å tenke seg en moderne nasjonal PaaS-platform. [Offentlig PaaS Norge](https://offentlig-paas.no/) er et fagnettverk for offentlige etater og halv-offentlige selskaper som lager nye og moderne IT-plattformer basert på PaaS. Typisk er dette basert på Kubernetes-økosystemet. Det finnes et rikt og modent utvalg åpen-kildekode-produkter som kan gi plattformen en fin tjenestebredde.

En variant som diskuteres er å konsolidere de interne driftsmiljøene i offentlige virksomheter til en felles driftsorganisasjon. Teoretisk kan dette gi mening; hvorfor sitte på hver sin tue med folk og infrastruktur? Utfordringen her er nok bagasjen av etablerte systemer, være seg stormaskiner, databaser, skreddersydde kjernesystemer og liknende. Disse vil ikke kunne gaffeltruckes over på en moderne PaaS uten vesentlig modernisering. Slike legacysystemer er det mange av der ute.

Jeg har vanskelig for å se for meg at en nyetablert nasjonal driftsleverandør skal kunne levere vesentlig bedre driftstjenester sammenliknet med dagens norske driftsleverandører og intern drift. Hvis det var enkelt og mulig, hvorfor finnes det ikke allerede i dagens marked?

Den største utfordringen vil nok være styringen av et sånt samarbeid. Når var sist man hørte om et vellykket, mange-milliarders, toppstyrt samarbeidsprosjekt mellom mange titalls offentlige virksomheter? Hvordan og hvorfor kan dette lykkes bedre enn det man har klart hittil?

Etablering av en nasjonal sky vil nok også måtte skubbe seg på lover og regler for anskaffelse og konkurranse. 

Hvis Norge velger å etablere en nasjonal sky, får vi krysse fingeren for at resultatet blir vesentlig bedre enn dagens interne driftsplattformer. De fleste som jobber med moderne softwareutvikling hadde satt stor pris på en automatisert, sikker, skalerbar og selvbetjent PaaS. Spørsmålet er bare hvor mye vi kan håpe på, ut fra historikken og forutsetningene for å lykkes.

## Farvel, sky?

Vi som driver med moderne softwareutvikling har grått, lengtet og ønsket oss skytjenester i mange år. Mange offentlige virksomheter har utsatt skysetting lenge, og dette signalet fra NSM kan nok være kjærkomment for alle som ønsker fortsatt intern drift.

Et ikke helt utenkelig scenario:

* Offentlige virksomheter stanser sine planer om skysetting i påvente av nasjonal sky.
* Etableringen av nasjonal sky tar 2-4 år.
* Nasjonal sky er klar for bruk. Får vi et A-lag av private virksomheter som benytter skytjenester fra AWS/GCP/Azure, og et B-lag av offentlige aktører på nasjonal sky?

Er det dette vi ønsker oss?

P.S. Denne artikkelen diskuterer ikke konsekvensene av SchremsII, som også vil påvirke hvordan offentlige og private virksomheter benytter skytjenester. Mer om det i en annen luke.