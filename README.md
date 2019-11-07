# Bekk Christmas

God jul 🎅, og velkommen til **verdens råeste julekalender-satsning**!

Dette repoet er kildekoden til disse sidene:

-   [bekk.christmas](https://bekk.christmas) (samlesiden)
-   [preview.bekk.christmas](https://bekk.christmas) (forhåndsvisningssiden)
-   [functional.christmas](https://functional.christmas)
-   [java.christmas](https://java.christmas)
-   [javascript.christmas](https://javascript.christmas)
-   [kotlin.christmas](https://kotlin.christmas)
-   [ml.christmas](https://ml.christmas)
-   [opensource.christmas](https://opensource.christmas)
-   [product.christmas](https://product.christmas)
-   [react.christmas](https://react.christmas)
-   [security.christmas](https://security.christmas)
-   [thecloud.christmas](https://thecloud.christmas)
-   [ux.christmas](https://ux.christmas)

## Jeg vil legge til innhold!

Så bra, da skal vi få deg i gang.

For å legge til innhold, så må du være logget inn på GitHub, og brukeren din må være lagt til gruppen "[Julenissens hjelpere](https://github.com/orgs/bekk/teams/julenissens-hjelpere)". Ta kontakt med Svein Petter Gjøby ([@sveinpg](https://github.com/sveinpg)) om du trenger slik tilgang, eller om du vil legge til noen andre.

Gå inn i CMSet vårt på [preview.bekk.christmas/admin/](https://preview.bekk.christmas/admin/). Passordet er "sniktitt".

Første gang du logger inn må du trykke "Log in with GitHub", for å autentisere deg.

Når du er logget inn riktig, vil du se denne oversiktssiden:

![Bilde av oversiktssiden](https://i.ibb.co/YDbMf7t/Screenshot-2019-11-07-at-1-06-39-PM.png)

Aller først må du registrere deg som forfatter. Det gjør du ved å trykke på "Authors" i det venstre panelet, og så trykke "New Authors", og fyll ut informasjon om deg selv. Vi trenger bare navnet ditt og en lenke for å kontakte deg (Twitter-profil eller eposten din f.eks.). Når du er ferdig trykker du "Publish now" øverst i høyre hjørnet.

Gå tilbake til forsiden, trykk på kalenderen du vil skrive for i det venstre panelet, og trykk "New Post:"-knappen øverst i høyre hjørnet etter det. Du vil da komme til siden for å endre en artikkel:

![Bilde av artikkel-endringssiden](https://i.ibb.co/mNm7QCt/Screenshot-2019-11-07-at-1-11-40-PM.png)

Her er det bare å fylle ut feltene så godt du kan. Her er en beskrivelse av hva hvert betyr:

-   `Year` er året julekalenderen er for. Dette trenger du nok ikke endre.
-   `Date` er hvilken luke din artikkel skal gjemme seg bak. Sjekk dette med lederen for din kalender, men i utgangspunktet er det bare å velge fritt.
-   `Title` er tittelen på artikkelen din
-   `Link to image` er URLen til hovedbildet til artikkelen din. Her anbefaler vi at du finner et bilde på [unsplash.com](https://unsplash.com). Finn et bilde, høyreklikk på det, og kopier bilde-URLen. Lim inn URLen her, og så er du i mål!
-   `Ingress` er ingressen til artikkelen din. Hold den kort - 2-3 setninger - og gjør leseren interessert i hva du skal skrive om!
-   `Body` er artikkelteksten. Her kan du enten bruke den rike teksteditoren, eller skrive i [Markdown-format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
-   `Relevant links` er en måte å legge til relevante lenker til andre artikler, tutorials osv. Du må ikke legge til noen, men vi anbefaler 2-3 stykker. Dette er så leseren kan dykke videre ned i emnet du har skrevet om. Trykk på "Add relevant links", og legg til tittel, URL og en kort beskrivelse.
-   `Authors` er hvor du legger til deg selv. Søk opp navnet ditt, så skal du dukke opp.

### Jeg vil legge til bilder i artikkelen min!

Vi anbefaler at du laster opp bilder på en ekstern service, som [imgbb](https://imgbb.com/) eller hvor som helst ellers. Du kan legge til bilder ved å gå inn i `markdown`-formatet, og lime inn følgende code-snippet:

```md
![alt-tekst til bilde](https://url-til-bildet.no)
```

### Jeg er klar for å publisere!

Når du er ferdig, trykker du "Publish now" oppe i hjørnet, og lener deg tilbake.

Hvis din kalender har et Trello-board med ideen din på, så er det på tide å flytte det kortet til "ferdig"-seksjonen.

Du kan se artikkelen din på `preview.bekk.christmas/<kalendernavn>/2019/<lukenummer>`.

Gratulerer, du har nå skrevet din første artikkel for bekk.christmas! 🎅 Tusen tusen takk for innsatsen.

## Jeg vil endre noe i koden på websiden!

Utrolig kult! Da bør du begynne med å klone ned repoet:

```sh
git clone git@github.com:bekk/bekk-christmas.git
```

Naviger til mappen, og installer alle avhengigheter:

```sh
cd bekk-christmas
npm install
```

Så kan du starte en lokal utviklingsserver med en av følgende kommandos:

```sh
npm start # start bekk.christmas
npm run start:preview # start preview.bekk.christmas
npm run start:<kalendernavn> # start <kalendernavn>.christmas
```

Det finnes masse andre kule scripts i scripts-lista vår også, og de kan du se ved å kjøre `npm run`.

### Hva er hvor?

Artiklene ligger i `post`-mappa, gruppert etter hvilken kalender den tilhører. Informasjon om hver forfatter ligger i `author`.

Koden som rendrer siden vår ligger i `src`, som igjen er delt opp i `components`, `constants` og `templates`. Dette finner du sikkert ut av på null komma niks´.

Konfigurasjonsfiler og statiske ressurser ligger i `static`-mappen

### Fortell meg om CMSet

bekk.christmas bruker noe som heter Netlife CMS for å administrere innhold. Du kan logge deg inn på [bekk.christmas/admin](https://bekk.christmas/admin/).
