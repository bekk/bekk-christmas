---
calendar: javascript
post_year: 2019
post_day: 4
title: Audit your app
image: >-
  https://images.unsplash.com/photo-1571397457816-3b250bd660a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80
ingress: >-
  Do you wake up at night fearing your app's dependencies might have scary
  vulnerabilities?
links:
  - title: NPM Security Advisories
    url: 'https://www.npmjs.com/advisories'
  - title: NPM docs on auditing package dependencies
    url: >-
      https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities
authors:
  - Kristine Steine
---
Should you be scared? For sure. [I know lots of people who would love to hack my app.](https://security.christmas/) Sure, we've taken care to secure our site from the risks described in the [OWASP Top Ten Project](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project). But I'm still kind of worried about the integrity of the 1113634 (:scream:) packages our frontend app depends upon.

Each time I see the number of transitive dependencies in our app I get a little chill down my spine. Mostly because I don't _really_ know how those packages are maintained. Who controls them? Are they maintained actively? NPMs package registry is centralized and privately controlled, which is not without its controversies. If you're interested in more about this, C J Silverio gave a talk about [the economics of open source](https://2019.jsconf.eu/c-j-silverio/the-economics-of-open-source.html) at this year's JSConfEU.

Luckily there are small steps we can take to at least be able to sleep at night! One of them is using `npm audit`.

## What's that?

`npm audit` is a CLI command for NPM which scans your project for vulnerabilities and warns you if it finds something you should look into. If everything looks okay, you should get something like this:

```sh
        === npm audit security report ===

found 0 vulnerabilities
 in 1113634 scanned packages
```

Whew! :sweat_smile:

## Well, what if it doesn't look okay?

If the vulnerability scan finds something dodgy, it will tell you what, where, and how to fix it:

```sh
        === npm audit security report ===                        

# Run  npm update handlebars --depth 7  to resolve 1 vulnerability

High            Arbitrary Code Execution                                      

Package         handlebars                                                    

Dependency of   jest [dev]                                                    

Path            jest > jest-cli > @jest/core > @jest/reporters >              
      istanbul-api > istanbul-reports > handlebars                  

More info       https://nodesecurity.io/advisories/1316                       



found 1 high severity vulnerability in 1113634 scanned packages
run `npm audit fix` to fix 1 of them.
```

The script has found a vulnerability in a package which is imported at a depth level of 7, which means that it is a dependency of a dependency of a dependency of a dependency of a dependency of a dependency of a dependency of our app :eyes:. To fix it manually we can run `npm update` and tell it the name of the package as well as the tree depth at which the package is found. To fix the vulnerability automagically, run `npm audit fix`.

Sometimes the warning makes you realize you have a dependency you don't actually need. We've definitely pruned a few unnecessary dependencies from our app this way that we weren't completely aware of having :grimacing:

### What if it _really_ doesn't look okay?

If your codebase hasn't been audited for a while you might be met by something that looks more like this:

```sh
found 160 vulnerabilities (14 low, 146 high) in 951689 scanned packages
  run `npm audit fix` to fix 146 of them.
  14 vulnerabilities require manual review. See the full report for details.
```

Yeah. Not as nice. Most times these vulnerabilities are fixed in the next patch of the packages, but if it's been a while you might have to bump a minor or even major version. Your mileage may vary - and I would recommend that you run the audit script often, to avoid having to bump major versions of several packages at the same time. You might also be lucky and find that 130 of these vulnerabilities point to the same package and are solved by the same patch bump.

## What more can it do?

There's more! You can make the script output JSON if you want to:

```sh
$ npm audit --json
```

Or you could decide a threshold for the vulnerability level you want to be warned about:

```sh
$ npm audit --audit-level=high
```

There's a `--parseable` option as well, which is handy if you want to pipe the output along to another script.

## Add auditing to your workflow :eyes:

If the audit finishes and has found vulnerable packages, the script will fail and exit. That's really neat, because it means that we can add `npm audit` to our app verification script, along with tests and [linting](https://javascript.christmas/2018/7). That way, we are forced to give attention to the warnings each time we want to make changes to our app. We've had this as part of our workflow for the past year and it _does_ help us sleep at night. I hope you find it helpful too! :raised_hands:

Photo by [Annie Spratt](https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/)
