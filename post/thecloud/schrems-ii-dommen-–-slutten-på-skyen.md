---
calendar: thecloud
post_year: 2020
post_day: 4
title: Schrems-II – Slutten på skyen?
image: https://images.unsplash.com/photo-1574781481375-74a09eba71e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: I juli falt en dom i den europeiske domstolen som vil få store
  konsekvenser for bruken av skytjenester i Europa. Max Schrems vant frem i sitt
  søksmål mot Facebook, hvor han mente at overføring av hans personopplysninger
  til USA var ulovlig. Denne avgjørelsen endrer ikke bare hvordan Facebook
  opererer, men kan potensielt forby bruk av de amerikanske skyleverandørene,
  samt leverandører i andre land som ikke har godt nok personvern.
description: Hvordan vil Schrems-II-dommen påvirke muligheten til å benytte
  skytjenester for europeiske selskaper? Den mest ytterliggående tolkningen
  tilsier full stans, men det er ikke hele bildet.
links:
  - title: Anbefalingene fra det europeiske personvernrådet (EDPB)
    url: https://www.notion.so/hanskhe/Schrems-II-f39c7f10965446a7a4c4ec830da2b192#e8b3959183494383bfd4440a02a5c87c
  - title: Veiledning fra det norske Datatilsynet
    url: https://www.notion.so/hanskhe/Schrems-II-f39c7f10965446a7a4c4ec830da2b192#836e2910ab6643e18a56eb8a6fb9f889
authors:
  - Trond Arve Wasskog
---
**Disclaimer**: Undertegnede er ikke jurist, og innholdet i denne artikkelen er en tolkning av situasjonen slik den står pr 4. desember 2020. Det er mye usikkerhet knyttet til konsekvensene av denne dommen, og betydningen av den veiledningen EU har publisert. **Du bør kontakte juridisk bistand for å vurdere hvordan dette påvirker ditt selskap.**

## Bakgrunn

Dommen som vi omtaler som Schrems-II er en domsavsigelse i EU-domstolen som omfatter Facebooks overføring av personopplysninger for en europeisk bruker til USA. Dommen gjør i korte trekk en vurdering av hvorvidt en overføring til USA kan ivareta de grunnleggende rettigheter europeiske borgere har. De vanligste overføringsgrunnlagene til USA har vært *Privacy Shield* og *Standard Contractual Clauses* (SCC).

Schrems-II-dommen gjør det klart at amerikansk lovgivning, spesielt FISA 702, gjør det umulig for amerikanske selskaper å tilby den nødvendige beskyttelsen for europeiske borgere. Dette går på tvers av Privacy Shield, og denne avtalen ble dermed ugyldiggjort av retten.

## Amerikansk lovgivning

Amerikanske overvåkningslover er svært omfattende. Det er i utgangspunktet ikke noe uvanlig i det, men det er noen utfordringer med FISA 702 som gjør at den ikke er mulig å svelge for europeiske personvernmyndigheter. Loven pålegger enhver "electronic communications provider" å etterkomme krav om utlevering fra FISA-domstolen. 

For det første er loven uten geografisk avgrensning. Det spiller ingen rolle hvor dataene er lagret. Et amerikansk selskap må hente dem ut uavhengig av lokalisering. Her vil man kunne se likheter til lovgivning i andre land. Selv om et norsk selskap oppbevarer dataene sine i Sverige, kan selskapet fortsatt bli pålagt å overlevere data til norske myndigheter. 

Problemene blir større når vi ser på hemmeligholdet rundt FISA-dommer. Dommene er i det store og hele hemmelige, og man kan pålegges taushetsplikt ved utlevering. Dette betyr at den som får sine data utlevert ikke kan forsvare sine rettigheter på en effektiv måte.

Dette medfører at det i praksis er blitt nesten umulig å overføre persondata fra EU til USA. Med Privacy Shield ugyldig vil man måtte basere seg på SCC som overføringsgrunnlag. Men også her er det et krav til at man gjør vurderinger av hvorvidt rettighetene til EU-borgere vil kunne bli ivaretatt. Og domstolen har jo langt på vei sagt i klartekst at det ikke er tilfellet i USA. Dermed skal man gjøre grundige vurderinger før man velger å overføre persondata til USA.

## Bruk av tjenester fra amerikanske selskaper

En langt større utfordring er at det gjennom denne dommen stilles spørsmålstegn ved hva som vil skje dersom et amerikansk morselskap får en utleveringsbegjæring rettet mot et datterselskap som er etablert i Europa og underlagt europeisk regelverk. De fleste skyleverandørene bruker denne selskapsstrukturen for å oppfylle kravene i GDPR. Eksempelvis har Microsoft Corporation opprettet selskapet Microsoft Azure Irland Limited i Irland, og det er dette selskapet som utfører alle tjenester for europeiske kunder.

Her mener dommen at det er en risiko for at selskapet vil komme i en skvis hvor de må velge mellom å ikke oppfylle kravene amerikanske myndigheter stiller, og å bryte europeisk personvernlovgivning. I denne situasjonen er man redd for at de vil velge det siste. Straffene for å bryte lovene på amerikansk side er strenge, og siden de kan være pålagt å holde slike henvendelser hemmelige kan det være fristende å bryte europeisk lovgivning i stillhet.

I slike tilfeller vil det ikke være tilstrekkelig at selskapet man har avtale med er europeisk, og at dataene behandles og oppbevares innefor EU/EØS. Det er fortsatt tenkelig at amerikanske myndigheter får tilgang, og dermed bryter man med GDPR.

Hvis denne tolkningen legges til grunn, **betyr det at all bruk av tjenester med et amerikansk selskap i eierkjeden er forbudt**. Dette er en ekstrem konsekvens av Schrems-II-dommen som i praksis vil ramme mange europeiske selskaper hardt i en lengre periode. Man ser antydninger til at flere forsøker å tolke kjennelsen dithen. Dette er nok også en av grunnene til at det europeiske personvernrådet har kommet med veiledning for å fortsatt sikre trygg overføring til tredjeland, som også kan brukes i denne typen tilfeller.

## Anbefalinger fra det europeiske personvernrådet

Det europeiske personvernrådet (EDPB) har kommet med et sett anbefalinger for hvordan man skal gå frem om man ønsker å overføre data til tredjeland. I denne sammenhengen er det viktig å være klar over at all tilgang regnes som overføring. Hvis driftsleverandøren har ansatte utenfor EU som har tilgang til dataene, så regnes det som en overføring ut av EU. I tillegg regnes utlevering uten den behandlingsansvarliges kjennskap til tredjelands myndigheter som et scenario man må ta høyde for.

EDPB har kommet med en anbefaling for hvordan man skal gå frem for å vurdere om man er rammet av Schrems-avgjørelsen, og setter her også frem forslag til tiltak.

1. Kjenn overføringene dine
2. Verifiser overføringsverktøyene
3. Vurder aktuelle tredjelands lover
4. Iverksett avhjelpende tiltak
5. Iverksett formelle prosedyrer
6. Re-evaluer og overvåk løpende

Punkt 1 er allerede en del av GDPR. Alle selskaper er pliktige til å føre protokoll over sin behandling av personopplysninger. Dette steget skal derfor bare være å sjekke protokollen for overføringer til tredjeland, eller til selskaper der utenlandske eierinteresser gjør det aktuelt å vurdere tredjelandslovverk ytterligere. Tilsvarende er punkt 6, at man løpende skal overvåke situasjonen med tanke på endringer som påvirker personvernet, noe GDPR allerede legger opp til - personvern er en kontinuerlig prosess, ikke en engangsøvelse.

De to mest krevende punktene her er 3 og 4. Som [Jan Sandtrø skriver](https://www.linkedin.com/pulse/overf%25C3%25B8ring-av-personopplysninger-utenfor-e%25C3%25B8s-omr%25C3%25A5det-hva-jan-sandtr%25C3%25B8/):

> *Også det at den enkelte behandlingsansvarlig skal gjøre en tilstrekkelig vurdering av lovgivningen i tredjelandet som overføringen skal skje til, herunder overvåkningslovgivning, samt å vurdere hvilke tiltak som kan iverksettes for å sikre behandlingen av personopplysninger til et nivå som er i det vesentlige på nivå med EU-retten, er en utopi.* 

Avhjelpende tiltak sier EDPB at kan komme i flere former, avtalemessige organisatoriske og tekniske. Det kan dermed høres ut som man har mange muligheter til å fikse problemet på et teoretisk nivå. Her er imidlertid EDBP klare på at det i mange tilfeller kun vil være tekniske tiltak som er godt nok, fordi avtalemessige og organisatoriske tiltak kan omgås av fremmede staters lovverk og hemmelige tjenester. Vi står dermed igjen med tekniske tiltak, og da helt spesifikt kryptering som det mest troverdige alternativet for å oppfylle dette punktet. Dersom man krypterer dataene på en slik måte at skyleverandøren ikke behandler dataene i klartekst, så regnes man i stor grad for å være sikker. 

Det er allikevel åpne spørsmål rundt hvorvidt man må sikre at krypteringsnøklene aldri er i skyleverandørens besittelse, og hvor langt man må gå i å vurdere krypteringens levetid, fremmede makters evne til å knekke krypteringer og lignende scenarier.

## Veien videre

Det er vanskelig å se for seg at EU kan leve med worst-case-utfallet av denne dommen, i alle fall på kort sikt. Det er heller ikke klart at det er denne ytterliggående tolkningen som er den riktige. Skulle det være tilfelle vil det også være overveiende sannsynlig at en domstol vil gripe inn og begrense omfanget av tolkningen. Om det ikke skjer vil mer eller mindre alle større selskaper i EU måtte haste-flytte sine data til nasjonale eller rent europeiske leverandører. Husk at det ved denne tolkningen ikke er tilstrekkelig at dataene lagres i EU eller ditt eget land, det er eierstrukturen i morselskapet som anses som avgjørende.

Domstoler er normalt sett mer pragmatiske enn datatilsyn. Dette ser man i [den relaterte dommen](https://www.privacy-ticker.com/first-judicial-application-of-schrems-ii-in-france/) i det franske rettssystemet hvor det franske datatilsynet forsøkte å bruke Schrems-II-dommen til å stanse den franske sentraliserte helseplattformen Health Data Hub (HDH) å bruke Microsoft Azure. Den høyeste administrative domstolen i Frankrike har avvist dette på flere grunnlag:

* Schrems-II tar ikke direkte stilling til data som behandles i EU av et europeisk foretak, kun til faktisk intensjonell overføring til tredjeland.
* Domstolen mente at amerikanske myndigheters interesse for dataene i HDH var rent hypotetisk.
* Dataene som sendes til HDH er pseudonymiserte, og er også kryptert av Azure.

Dommen pålegger allikevel HDH å - i samarbeid med Microsoft - styrke personvernbeskyttelsen i løsningen ytterligere.

Denne dommen kom imidlertid før veiledningen til EDPB, og her bør man merke seg at EDPB ikke mener en subjektiv vurdering av interessen til en tredjestats myndighet er relevant.

## EuroCloud

Et langsiktig alternativ kan være fremveksten av flere rent europeiske skyleverandører, som vi samlet kan omtale som "EuroCloud". Om den mest ytterliggående tolkningen av Schrems-II blir stående vil den danne et solid grunnlag for rent europeiske skyløsninger, uten eierinteresser utenfor EU-området. Det finnes i dag en rekke slike leverandører, men ingen som er i nærheten av de tre store amerikanske leverandørene. 

Det er også en rekke utfordringer med EuroCloud. 24/7-support krever fulle skift med ansatte som jobber hele døgnet. Dette gir høyere kostnader. Vil det bli tilstrekkelig satsning på en slik løsning om det eneste som holder liv i den er en tolkningsdom? Leverandørene vil være sårbare for at vinden snur, og at EU plutselig tillater utenlandske skyløsninger å bruke dagens eierstruktur, eller godkjenner andre former for organisatoriske løsninger. 

## Hva gjør Datatilsynet

Dette er kanskje det spørsmålet flest stiller seg akkurat nå. På et [nylig seminar om Schrems II](https://europarett.no/2020/11/10/apent-seminar-om-schrems-ii/) holdt Tobias Judin fra Datatilsynet en presentasjon. Han var tydelig på flere ting. 

For det første understreker Schrems-II-dommen datatilsynene (DPAene) sin plikt til å håndheve konsekvensene av dommen, og behandle de klager de får inn. Dette sikrer at DPAene ikke kan bruke skjønnsmessige vurderinger til å se bort fra denne dommen, eller utsette saker. Sterkt knyttet til dette: **Det er ingen amnestiperiode**. Overføringer med overføringsgrunnlag i Privacy Shield ble ulovlig med umiddelbar virkning da dommen falt, og alle andre konsekvenser av dommen er også tredd i kraft. Datatilsynet mener at det nå er så lenge siden dommen kom at vinduet for å forsøke å hevde uvitenhet er lukket. Det planlegges allerede tilsyn for 2021, og det vil være utenkelig at ikke Schrems-II står på agendaen her.

Max Schrems sin organisasjon NOYB har sendt inn 101 varsler til datatilsyn over hele europa for brudd på loven om overføring av personopplysninger til USA ved bruk av Google Analytics og Facebook Connect. I Norge har de klaget inn Sbanken, samt selskapene bak gamer.no og at.no. DPAene i Europa behandler nå disse klagene i fellesskap.

Datatilsynet anerkjenner at selskaper som drifter IT-løsningner i offentlig sky nå er i en krevende situasjon, men er tydelige på at det ikke fritar dem fra å måtte følge til enhver tid gjeldende lovgivning. 

## Hva blir utfallet av alt dette bråket?

Den mest ytterliggående tolkningen vil skape store utfordringer i Europa, og det virker ikke sannsynlig at denne får stå uimotsagt. Et mer realistisk utfall er at EU på det nåværende tidspunkt ikke forbyr bruk av skyplattformer med eierinteresser utenfor EU, men heller formulerer unntak som naturlig vil innskrenkes etterhvert som "EuroCloud" blir mer konkurransedyktig. Det vil skape insentiver til å bygge ut denne typen tjenester i Europa, noe som gir arbeidsplasser, kompetanse og inntekter, samtidig som det over tid styrker personvernet til EU-borgere. 

Når det er sagt har EU de siste årene vist at de er en seriøs pådriver for personvern, og ikke er villige til å bøye av for press fra store kommersielle interesser. Det kan tenkes at EU ønsker å bruke denne saken til å statuere et eksempel som viser hvor viktig personvernet er i EU, og at man kan stole på at dette ikke vil bli svekket.

Det blir også interessant å se hva Amazon, Google og Microsoft foretar seg framover. Det er sannsynligvis hektisk aktivitet på flere nivåer i disse selskapene for tida. Eksempelvis er ikke Max Schrems [spesielt imponert over et utspill fra Microsoft for å betrygge kundene](https://twitter.com/maxschrems/status/1329802283341770752) i denne sammenhengen.

Og uansett hvilken vei det går kan vi nok slå fast en ting med 100% sikkerhet. I 2021 kommer Datatilsynet på tilsyn til en behandlingsansvarlig nær deg!