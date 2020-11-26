---
calendar: thecloud
post_year: 2020
post_day: 4
title: Schrems-II-dommen – Slutten på skyen?
image: https://images.unsplash.com/photo-1574781481375-74a09eba71e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: I juli falt en dom i den europeiske domstolen som vil få store
  konsekvenser for bruken av skytjenester i Europa. Max Schrems vant frem i sitt
  søksmål mot Facebook, hvor han mente at overføring av hans persondata til USA
  var ulovlig. Denne avgjørelsen endrer ikke bare hvordan Facebook opererer, men
  kan potensielt forby bruk av de fleste store skytjenestene.
description: Hvordan vil Schrems-II-dommen påvirke muligheten til å benytte
  skytjenester for europeiske selskaper? Den mest ytterliggående tolkningen
  tilsier full stans, men det er ikke hele bildet.
links:
  - title: Anbefalingene fra det europeiske personvernrådet (EDPB)
    url: https://www.notion.so/hanskhe/Schrems-II-f39c7f10965446a7a4c4ec830da2b192#e8b3959183494383bfd4440a02a5c87c
  - title: Veiledning fra det norske Datatilsynet
    url: https://www.notion.so/hanskhe/Schrems-II-f39c7f10965446a7a4c4ec830da2b192#836e2910ab6643e18a56eb8a6fb9f889
authors:
  - Hans Kristian Henriksen
---
Først, en advarsel: Jeg er ikke advokat, og innholdet i denne posten er min oppfattelse av situasjonen slik den står pr 4. desember 2020 etter å ha lest informasjonen fra EU og en rekke andre, samt hatt samtaler og vært på foredrag med ulike advokater om temaet. Det er mye usikkerhet knyttet til konsekvensene av denne dommen, og betydningen av den veiledningen EU har publisert. **Du bør kontakte juridisk bistand for å vurdere hvordan dette påvirker ditt selskap.**

## Bakgrunn

Dommen som vi omtaler som Schrems-II er en domsavsigelse i EU-domstolen som omfatter Facebooks overføring av persondata for en europeisk bruker til USA. Dommen gjør i korte trekk en vurdering av hvorvidt en overføring til USA kan ivareta de grunnleggende rettigheter europeiske borgere har. For overføringer til USA har man frem til dette punktet kunne velge om man vil bruke Privacy Shield eller såkalte Standard Contractual Clauses (SCC) som det juridiske overføringsgrunnlaget til USA. 

Schrems-II-dommen gjør det klart at amerikansk lovgivning, spesielt FISA 702, gjør det umulig for amerikanske selskaper å tilby den nødvendige beskyttelsen for europeiske borgere. Dette går på tverrs av kjernen i Privacy Shield, og denne ble dermed ugyldiggjort av retten.

## Amerikansk lovgivning

Amerikanske overvåkningslover er svært omfattende. Det er i utgangspunktet ikke noe uvanlig i det, men det er noen utfordringen med FISA 702 som gjør at den ikke er mulig å svelge for europeiske personvernmyndigheter. Loven pålegger enhver "electronic communications provider" å etterkomme krav om utlevering fra FISA-domstolen. 

For det første er loven uten geografisk avgrensning. Det spiller ingen rolle hvor dataen er lagret, et amerikansk selskap må hente dem ut uavhengig av dette. Her vil man kunne se likheter til lovgivning i andre land. Selv om et norsk selskap oppbevarer dataene sine i Sverige, kan selskapet fortsatt bli pålagt å hente ut dataene. 

Problemene blir større når vi ser på hemmeligholdet rundt FISA-dommer. Dommene er i det store og hele hemmelige, og man kan pålegges taushetsplikt ved utlevering. Dette betyr at den som får sine data utlevert ikke kan forsvare sine rettigheter på en effektiv måte.

Schrems-II har _ikke_ uugyldiggjort SCC som overføringsgrunnlag, men ut fra dommen er det tydelig at det å ha en SCC på plass ikke er tilstrekkelig. Vi kommer tilbake til dette.

## Bruk av tjenester fra amerikanske selskaper

En langt større utfordring er at det gjennom denne dommen stilles spørsmålstegn ved hva som vil skje dersom et amerikansk morselskap får en utleveringsbegjæring rettet mot et datterselskap som er etablert i Europa og underlagt europeisk regelverk. De fleste skyleverandørene bruker denne selskapsstrukturen for å oppfylle kravene i GDPR. Eksempelvis har Microsoft Corporation opprettet selskapet Microsoft Azure Irland Limited i Irland, og det er dette selskapet som utfører alle tjenester for europeiske kunder.

Her mener dommen at det er en risiko for at selskapet vil komme i en skvis hvor de må velge mellom å ikke oppfylle kravene amerikanske myndigheter stiller, og å bryte europeisk personvernlovgivning. I denne situasjonen er man redd for at de vil velge det siste, da straffene for å bryte lovene på amerikansk side er store, og siden de vil være pålagt å holde slike henvendelser hemmelige kan det være fristende å bryte europeisk lovgivning i stillhet.

I slike tilfeller vil det ikke være tilstrekkelig at selskapet man har avtale med er europeisk, og at dataene oppbevares fysisk innefor EU/EØS. Det er fortsatt tenkelig at amerikanske myndigheter får tilgang, og dermed bryter man med GDPR.

En helt reell konsekvens av denne forståelsen er at **all bruk av tjenester med et amerikansk selskap i eierkjeden er forbudt**. Dette er en ekstrem konsekvens av Schrems-II-dommen som i praksis vil legge ned store deler av europeiske IT-selskaper i en lengre periode. Man ser antydninger til at flere forsøker å tolke kjennelsen dithen, og dette er nok også en av grunnene til at det europeiske personvernrådet har kommet med veiledning for å fortsatt sikre trygg overføring til tredjeland, som også kan brukes i denne typen tilfeller. 

## Anbefalinger fra det europeiske personvernrådet
Det europeiske personvernrådet (EDPB) har kommet med et sett anbefalinger for hvordan man skal gå frem om man ønsker å overføre data til tredjeland. I denne sammenhengen er det viktig å være klar over at all tilgang regnes som overføring. Hvis driftsleverandøren har en ansatt stasjonert utenfor EU, så regnes det som at data er overført ut av EU om denne ansatte har tilgang til dataene. Tilsvarende regnes utlevering uten dataansvarliges kjennskap til tredjelands myndigheter som et scenario man må ta høyde for.

EDPB har kommet med en anbefaling for hvordan man skal gå frem for å vurdere om man er rammet av Schrems-avgjørelsen, og setter her også frem forslag til tiltak.

1. Kjenn overføringene dine
2. Verifiser overføringsverktøyene
3. Vurder aktuelle tredjelands lover
4. Iverksett avhjelpende tiltak
5. Iverksett formelle prosedyrer
6. Re-evaluer og overvåk løpende

Punkt 1 er allerede en del av GDPR. Alle selskaper er pliktige til å føre protokoll over overføringene sine av personopplysninger. Dette steget skal derfor bare være å sjekke protokollen for overføringer til tredjeland, eller til selskaper der utenlandske eierinteresser gjør det aktuelt å vurdere tredjelandslovverk ytterligere. Tilsvarende er punkt 6, at man løpende skal overvåke situasjonen med tanke på endringer som påvirker personvernet, noe GDPR allerede legger opp til - personvern er en kontinuerlig prosess, ikke en punktøvelse.

De to mest krevende punktene her er 3 og 4. Å gjøre en vurdering av andre lands lover faller langt utenfor kompetansen til de fleste selskaper som ikke driver med juss, så her tvinges man til å leie inn advokater. Det blir påpekt at man skal gjøre denne vurderingen i samråd med leverandøren, og store leverandører vil uten tvil sette sammen standardskriv for dette så fort som mulig. 

Avhjelpende tiltak sier EDPB at kan komme i flere former, avtalemessige organisatoriske og tekniske. Det kan dermed høres ut som man har mange muligheter til å fikse problemet på et teoretisk nivå. Her er imidlertid EDBP klare på at det i mange tilfeller kun vil være tekniske tiltak som er godt nok, fordi avtalemessige og organisatoriske tiltak kan omgås av fremmede staters lovverk og hemmelige tjenester. Vi står dermed igjen med tekniske tiltak, og da helt spesifikt kryptering som det mest troverdige alternativet for å oppfylle dette punktet. Dersom man krypterer dataene på en slik måte at skyleverandøren ikke behandler dataene i klartekst, så regnes man i stor grad for å være sikker. 

Det er allikevel åpne spørsmål rundt hvorvidt man må sikre at krypteringsnøklene aldri er i skyleverandørens besittelse, og hvor langt man må gå i å vurdere krypteringens levetid, fremmede makters evne til å knekke krypteringer og lignende scenarier.

## Veien videre

Det er vanskelig å se for seg at EU kan leve med worst-case-utfallet av denne dommen, i alle fall på kort sikt. Det virker overveiende sannsynlig at en domstol må gripe inn og begrense omfanget av presedensen som nå er satt. Om det ikke skjer vil mer eller mindre alle større selskaper i EU måtte haste-flytte sine data til nasjonale eller rent europeiske leverandører. Husk at det ved denne tolkningen ikke er tilstrekkelig at dataene lagres i EU eller ditt eget land, det er eierstrukturen i morselskapet som anses som avgjørende.

Domstoler er normalt sett mer pragmatiske enn datatilsyn. Dette ser man i [den relaterte dommen](https://www.privacy-ticker.com/first-judicial-application-of-schrems-ii-in-france/) i det franske rettssystemet hvor det franske datatilsynet brukte Schrems-II-dommen til å stanse den franske sentraliserte helseplattformen Health Data Hub (HDH) i bruk av Microsoft Azure. Den høyeste administrative domstolen i Frankrike har avvist dette på flere grunnlag:

- Schrems-II tar ikke direkte stilling til data som behandles i EU av et europeisk foretak, kun til faktisk intensjonell overføring til tredjeland.
- Domstolen mente at amerikanske myndigheters interesse for dataene i HDH var rent hypotetisk.
- Dataene som sendes til HDH er pseudonymiserte, og er også kryptert av Azure.

Dommen pålegger allikevel HDH å - i samarbeid med Microsoft - styrke personvernbeskyttelsen i løsningen ytterligere.

Denne dommen kom imidlertid før veiledningen til EDPB, og her bør man merke seg at EDPB ikke mener en subjektiv vurdering av interessen til en tredjestats myndighet er relevant.

## EuroCloud

Et alternativ som stikker seg frem er fremveksten av flere rent europeiske skyleverandører, som vi samlet kan omtale som "EuroCloud". Om den mest ytterliggående tolkningen av Schrems-II blir stående vil den danne et solid grunnlag for rent europeiske skyløsninger, uten eierinteresser utenfor EU-området. Det finnes i dag en rekke slike leverandører, men ingen som er i størrelsesorden av de tre store amerikanske leverandørene. 

Det er også en rekke utfordringer med EuroCloud. Hvordan skal man drive 24/7-support uten å ha noen ansatte som fysisk befinner seg utenfor EU-land? Det vil heve kostnaden med å drive skytjenester, og det vil kreve at man har fulle skift med ansatte som jobber natt. Vil det bli tilstrekkelig satsning på en slik løsning om det eneste som holder liv i den er en tolkningsdom? Leverandørene vil være sårbare for at vinden snur, og at EU plutselig tillater utenlandske skyløsninger å bruke dagens eierstruktur, eller godkjenner andre former for organisatoriske løsninger. 

## Hva gjør Datatilsynet

Dette er kanskje det spørsmålet flest stiller seg akkurat nå. Jeg var på et seminar hvor en rådgiver i Datatilsynet var tilstede og holdt en presentasjon. Han var tydelig på flere ting. 

For det første understrekr Schrems-II-dommen datatilsynene (DPAene) sin plikt til å håndheve konsekvensene av dommen, og behandle de klager de får inn. Dette sikrer at DPAene ikke kan bruke skjønnsmessige vurderinger til å se bort fra denne dommen, eller utsette saker. Sterkt knyttet til dette: **Det er ingen amnestiperiode**. Overføringer med overføringsgrunnlag i Privacy Shield ble ulovlig med umiddelbar virkning da dommen falt, og alle andre konsekvenser av dommen er også tredd i kraft. Datatilsynet mener at det nå er så lenge siden dommen kom at vinduet for å forsøke å hevde uvitenhet er lukket. Det planlegges allerede tilsyn for 2021, og det vil være utenkelig at ikke Schrems-II står på agendaen her.

Max Schrems sin organisasjon NOYB har sendt inn 101 varsler til datatilsyn over hele europa for brudd på loven om overføring av personopplysninger til USA ved bruk av Google Analytics og Facebook Connect. I Norge har de klaget inn Sbanken, samt selskapene bak gamer.no og at.no. DPAene i Europa behandler nå disse klagene i fellesskap.

Datatilsynet annerkjenner at selskaper som drifter IT-løsnigner i offentlig sky nå er i en krevende situasjon, men er tydelige på at det ikke fritar dem fra å måtte følge til enhver tid gjeldende lovgivning. 

## Hva blir utfallet av alt dette bråket?

Den mest ytterliggående tolkningen vil skape store utfordringer i Europa, og det virker ikke sannsynlig at denne får stå uten modifikasjoner. Et mer realistisk utfall er at EU på det nåværende tidspunkt ikke forbyr bruk av skyplattformer med eierinteresser utenfor EU, men heller formulerer unntak som naturlig vil innskrenkes etterhvert som "EuroCloud" blir mer konkurransedyktig. Det vil skape insentiver til å bygge ut denne typen tjenester i Europa, noe som gir arbeidsplasser, kompetanse og inntekter, samtidig som det over tid styrker personvernet til EU-borgere. 

Når det er sagt har EU de siste årene vist at de er en seriøs pådriver for personvern, og ikke er villige til å bøye av for press fra store kommersielle interesser. Det kan tenkes at EU ønsker å bruke denne saken til å statuere et eksempel som viser hvor viktig personvernet er i EU, og at man kan stole på at dette ikke vil bli svekket.

Og uansett hvilken vei det går kan vi nok slå fast en ting med 100% sikkerhet. I 2021 kommer Datatilsynet på tilsyn til en behandlingsansvarlig nær deg!

