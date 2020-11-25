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
authors:
  - Hans Kristian Henriksen
---
Først, en advarsel: Jeg er ikke advokat, og innholdet i denne posten er min oppfattelse av situasjonen slik den står pr 4. desember 2020 etter å ha lest informasjonen fra EU og en rekke andre, samt hatt samtaler og vært på foredrag med ulike advokater om temaet. Det er mye usikkerhet knyttet til konsekvensene av denne dommen, og betydningen av den veiledningen EU har publisert. Du bør kontakte juridisk bistand for å vurdere hvordan dette påvirker ditt selskap.

## Bakgrunn

Dommen som vi omtaler som Schrems-II er en domsavsigelse i EU-domstolen som omfatter Facebooks overføring av persondata for en europeisk bruker til USA. Dommen gjør i korte trekk en vurdering av hvorvidt en overføring til USA kan ivareta de grunnleggende rettigheter europeiske borgere har. For overføringer til USA har man frem til dette punktet kunne velge om man vil bruke Privacy Shield eller såkalte Standard Contractual Clauses (SCC) som det juridiske overføringsgrunnlaget til USA. 

Schrems-II-dommen gjør det klart at amerikansk lovgivning, spesielt FISA 702, gjør det umulig for amerikanske selskaper å tilby den nødvendige beskyttelsen for europeiske borgere. Dette går på tverrs av kjernen i Privacy Shield, og denne ble dermed ugyldiggjort av retten.

## Amerikansk lovgivning

Amerikanske overvåkningslover er svært omfattende. Det er i utgangspunktet ikke noe uvanlig i det, men det er noen utfordringen med FISA 702 som gjør at den ikke er mulig å svelge for europeiske personvernmyndigheter. Loven pålegger enhver "electronic communications provider" å etterkomme krav om utlevering fra FISA-domstolen. 

For det første er loven uten geografisk avgrensning. Det spiller ingen rolle hvor dataen er lagret, et amerikansk selskap må hente dem ut uavhengig av dette. Her vil man kunne se likheter til lovgivning i andre land. Selv om et norsk selskap oppbevarer dataene sine i Sverige, kan selskapet fortsatt bli pålagt å hente ut dataene. 

Problemene blir større når vi ser på hemmeligholdet rundt FISA-dommer. Dommene er i det store og hele hemmelige, og man kan pålegges taushetsplikt ved utlevering. Dette betyr at den som får sine data utlevert ikke kan forsvare sine rettigheter på en effektiv måte.

De amerikanske lovene har forrang fremfor f.eks. avtaler man har inngått med leverandøren. Det betyr at selv om du har kontraktsfestet at det er forbudt for skyleverandøren din å hente ut informasjon de behandler på deres vegne, så vil amerikansk lov være tydelig på at en dom fra FISA-domstolen vil kreve at disse avtalene brytes. Når det også er slik at man må holde hemmelig denne typen utlevering, og straffene for å ikke etterleve påleggene er alvorlige, legger EU-domstolen til grunn at selskapene vil velge å bryte kontraktene med sine kunder.

Schrems-II har _ikke_ uugyldiggjort SCC som overføringsgrunnlag, men ut fra dommen er det tydelig at det å ha en SCC på plass ikke er tilstrekkelig. Vi kommer tilbake til dette.

## Bruk av tjenester fra amerikanske selskaper

En langt større utfordring er at det gjennom denne dommen stilles spørsmålstegn ved hva som vil skje dersom et amerikansk morselskap får en utleveringsbegjæring rettet mot et datterselskap som er etablert i Europa og underlagt europeisk regelverk. De fleste skyleverandørene bruker denne selskapsstrukturen for å oppfylle kravene i GDPR. Eksempelvis har Microsoft Corporation opprettet selskapet Microsoft Azure Irland Limited i Irland, og det er dette selskapet som utfører alle tjenester for europeiske kunder.

Her mener dommen at det er en risiko for at selskapet vil komme i en skvis hvor de må velge mellom å ikke oppfylle kravene amerikanske myndigheter stiller, og å bryte europeisk personvernlovgivning. I denne situasjonen er man redd for at de vil velge det siste, da straffene for å bryte lovene på amerikansk side er store, og siden de vil være pålagt å holde slike henvendelser hemmelige kan det være fristende å bryte europeisk lovgivning i stillhet.

I slike tilfeller vil det ikke være tilstrekkelig at selskapet man har avtale med er europeisk, og at dataene oppbevares fysisk innefor EU/EØS. Det er fortsatt tenkelig at amerikanske myndigheter får tilgang, og dermed bryter man med GDPR.

En helt reell konsekvens av denne forståelsen er at **all bruk av tjenester med et amerikansk selskap i eierkjeden er forbudt**. Dette er en ekstrem konsekvens av Schrems-II-dommen som i praksis vil legge ned store deler av europeiske IT-selskaper i en lengre periode. Man ser antydninger til at flere forsøker å tolke kjennelsen dithen, og dette er nok også en av grunnene til at det europeiske personvernrådet har kommet med veiledning for å fortsatt sikre trygg overføring til tredjeland, som også kan brukes i denne typen tilfeller. 