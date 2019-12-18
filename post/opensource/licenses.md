---
calendar: opensource
post_year: 2019
post_day: 18
title: Open ≠ Free ≠ Gratis
ingress: >-
  Software has become an integrated part of life. It's everywhere, and the
  complexity is increasing. As developers, we're standing on the shoulders of
  giants. Most of the software running in our applications is written by someone
  else. But do you know what you're allowed to use the software for? And what
  your obligations are when using the software? All software has a license,
  which means it contains legal talk which "authorize the use, performance, or
  release of (something)."
authors:
  - Simen Endsjø
---

# Agenda

I aim to give an introduction to open source and licenses to make it
easier for you to look into the details on your own when needed.

  - Source code ≠ Freedom
  - What is freedom
  - History
  - Terminology and concepts
  - Short intro to some licenses

# I Am Not A Lawyer (IANAL)

I Am Not A Lawyer\! Don't take legal advice from strangers on the
internet\! Don't trust me\! I'm serious\! Leave now\!

# Open Source Software (OSS) ≠ Can use

The phrase "Open Source" has changed meaning over the last decade. It
somehow became a buzzword, and suddenly everything is Open Source – but
what does Open actually mean?

Open ≠ Gratis: We'll use the word gratis for "doesn't cost any money".
Open Source software doesn't have to be gratis any more than closed
source has to cost money. And gratis software doesn't have to be open
source.

Open ≠ Freedom: Even though you have access to the source code, it
doesn't mean you're actually allowed to use it as you please. You might
be sued by just looking at the software.

Freedom ≠ Gratis: Being allowed to use something as you please still
doesn't necessarily mean it has to be gratis. And being gratis doesn't
mean you're allowed to use it for your needs.

Open ≠ Can Use: In short, Open Source doesn't mean you can or are
allowed to use it

<https://www.gnu.org/philosophy/open-source-misses-the-point.html>

# Free Open Source Software (FOSS)

Because "Open Source" has been hijacked, a new term has been coined,
FOSS.

Free = Freedom: FOSS ≠ OSS. The Free talks about freedom to use as you
like, which is only possible if the code is also open.

Free ≠ Gratis: FOSS still doesn't have to be gratis.

But to confuse the matter even further, the word Free is often
misinterpreted as Gratis, and as such is sometimes used for software
which restricts your freedom.

Because of this, **yet** another term has been coined, Free **Libre**
Open Source Software (FLOSS). This haven't seen much widespread use yet,
but give it a couple of years, and it has probably gained another
meaning :)

# Freedom

We've talked a bit about Freedom, but haven't given a definition. Free
Software Foundation defines freedom as (emphasis mine):

  - The freedom to **run** the program as you wish, for **any purpose**
    (freedom 0).
  - The freedom to **study** how the program works, and **change it** so
    it does your computing **as you wish** (freedom 1).
  - The freedom to **redistribute** copies so you can help others
    (freedom 2).
  - The freedom to **distribute copies** of your **modified versions**
    to others (freedom 3).

There are many non-free licenses out there, which restricts one or more
of these freedoms. Think about what it would mean if a library you're
using restricts the rights to redistribute. Or restricts what you're
allowed to do with it.

<https://www.gnu.org/philosophy/free-sw.html>

# History and some useful links

I've referred to FSF and GNU several times already without giving a
reason for doing so, but there are good reasons. FSF and GNU are old
projects created to support freedom in software.

  - Pre 1980, nearly all software was free.

  - During the 1980s, nearly all software became proprietary, non-free,
    closed source.

  - [Gnu's Not Unix (GNU)](https://www.gnu.org/gnu) was founded 1984 by
    [Richard Stallman](https://no.wikipedia.org/wiki/Richard_Stallman)
    to create a free Unix operating system (OS).

  - [Free Software Foundation (FSF)](https://www.fsf.org/) was founded
    in 1985 to help GNU and the free software movement financially

  - The [GNU/Hurd](https://www.gnu.org/software/hurd/) kernel (core of
    the OS) is not yet ready. Linus Thorvalds released the
    [Linux](https://www.linux.org/) kernel in 1991.

  - GNU and Linux together makes a complete and free Unix-like OS

  - [Linux Libre](https://www.gnu.org/software/linux-libre/) is Linux
    without non-free code

  - [Free Software Directory](https://directory.fsf.org/wiki/Main_Page)
    lists a lot of free software

  - [Software Freedom Conservancy](https://sfconservancy.org) helps
    defend free software

# Copyright

Copyright is a central theme to licenses. It basically means the owner
of the work.

> Copyright is a form of intellectual property that **grants the
> creator** of an original creative work an **exclusive legal right** to
> determine **whether and under what conditions** this original work
> **may be copied and used by others**, usually for a limited term of
> years

No license means full copyright to those who wrote it. You cannot use it
for any purpose at all as the author(s) didn't grant you any rights to
the work. If you see something without a license, turn around and don't
look back.

You might have seen people "licensing" work under Public Domain, but not
every country accepts this definition, so using Public Domain software
might be considered a breach of copyright. Do not use "Public Domain"
licensed software.

# Copyleft

In software we're standing on the shoulders of giants. Everything we do
builds upon something someone else has already built. As such, we're
often modifying software (often by including a library in our own code),
and then distribute it as part of our own work.

> Copyleft, distinguished from copyright, is the practice of offering
> people the **right to freely distribute copies and modified versions**
> of a work with the stipulation that **the same rights be preserved in
> derivative works** created later

So while you might have been granted the rights to use something, you
might not have been granted the rights to distribute it or combine it
with other software.

# Viral licenses

There's a lot of licenses out there, and they have wildly different
purposes. As such, there are situations where parts of one license will
clash with parts of another license.

Several licenses require that you use the same license for derivative
work, which makes the license viral – it infects your own work. Luckily,
several licenses are compatible with one another, and allows you to use
one license as long as your own work is one of the compatible licenses.

If you use a GPL library, you need to use a GPL compatible license for
your own work. GPL is a viral license by design to make sure nobody
removes a users freedom.

# Multiple licenses and copyright attribution

Because of copyleft, patents etc, a lot of people might be unable to use
certain licenses. To circumvent this, much software is released under
several different licenses, also called dual licensing (in the case of
two) or multi licensing.

Remember that copyright is given in full to the author to a work. So a
contributor will have full copyright for the contributions. The project
thus cannot grant someone else access to this contribution without
explicit consent from the author.

Copyright is needed in order to change or upgrade a license, to
distribute under other licenses, and to take legal actions against
infringements. Because of this, some projects requires the authors to
sign over contributions to the project/entity owning the project.

<https://www.gnu.org/licenses/why-assign.html>

# A bit about some popular licenses

There's a lot of different licenses out there. Some are more popular
than others, and libraries released in 2019 often use a different
license than a library released in 2009. Some are good for products, and
others are good for libraries, and some licenses might be problematic to
use for commercial use or proprietary code.

The following licenses are pretty common, and you should at least look
at some bullet points describing them.

## Lots of freedom

  - AGPL (GNU Affero General Public License)
      - Like GPL, but includes software accessed over the network
  - GPL (GNU General Public License)
      - Users are allowed to run, study, share and modify the software
      - Derivative work must also include these freedoms

## For libraries

Should be quite safe, but has some demands on the user, e.g.
attribution.

  - LGPL
  - Apache 2.0
  - Expat (MIT)
  - BOOST
  - ZLIB
  - JPEG
  - BSD (3-clause / modified)

## Public Domain

"Do whatever you want, but don't sue me"

  - CC0
  - Unlicence: Rather use CC0
  - Public Domain: Might not be valid in many countries – stay away

## Non-free

GNU defines these as non-free by various reasons (like the phrase "do
good not evil", which limits use and is subjective)

  - Artistic License 1.0
  - The JSON License
  - Microsoft Shared Source License
  - Creative Commons NonCommercial
  - Creative Commons Noderivatives

## What license should I choose?

When choosing the license, you have to consider the licenses of the
software you're using. They probably have restrictions on what license
you can choose.

GNU has a nice recommendation list:

  - Small programs/code snippets (\<300 lines): Apache 2.0
  - Libraries you want to see used (same domain as non-free libraries):
    Apache 2.0
  - Other libraries wher GPL is unpractical: LGPL
  - Other libraries: GPL
  - Running on servers: AGPL
  - Longer documentation: GFDL
  - Short documentation: GNU all-permissive license

<https://www.gnu.org/licenses/license-recommendations.html>

## References

Few people read licenses from cover to cover anymore as someone has done
the dirty-work of categorizing the legal-talk, making it digestible for
the rest of us.

  - <https://www.gnu.org/licenses/license-list.html>
  - <https://tldrlegal.com/>
  - <https://choosealicense.com>
  - <https://choosealicense.com/appendix/>

# Transitive licenses

It's turtles all the way down. You're responsible for transitive
libraries. Do you know that no libraries of the libraries of the
libraries of the libraries use a license wrongly?

If they break the rules, so do you\!

Your package manager should include ways for you to find out what
licenses are in use. Search for "license checker" or similar for your
package manager.

# Stackoverflow

Now that we've learned that licenses can both grant you rights to use
something and built upon on it, what about all the snippets on the
internet where there is no explicit LICENSE along with the code. Have
you read the Terms And Conditions for all sites you are a member of?
When you publish code on their site, do you think you have copyright, or
did you check a box when signing up for the service (after reading the
long legal document of course)?

You haven't ever copied code from the internet without knowing the full
extend of the license?

…. Have you ever copied code from Stack Overflow? …

> requires you to **release all derivative works under this same
> license**. You must **give credit to the original author** of the
> work, state their name and the title of the original work, say that
> you modified the work if you did and **include the attribution logo**

Ref [Creative Commons Attribution Share
Alike](https://tldrlegal.com/license/creative-commons-attribution-share-alike-\(cc-sa\))-(cc-sa)

# Summary

  - IANAL\! Don't trust random legal advice from random strangers on the
    internet\!
  - Open Source ≠ Freedom
  - Freedom ≠ Gratis
  - Use free licenses and submit your work under free licenses
  - Make contributors sign over copyright
  - Release under more than one license if necessary
  - You're probably violating licenses\! Clean up your act.
