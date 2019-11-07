# Bekk Christmas

God jul 🎅, og velkommen til **verdens råeste julekalender-satsning**!

## Jeg vil legge til innhold!

Så bra, da skal vi få deg i gang.

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
