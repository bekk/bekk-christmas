---
calendar: ux
post_year: 2019
post_day: 6
title: 'Accessibility: One web to include ''em all'
image: >-
  https://gist.githubusercontent.com/dagfs/1a9a78bd5d4d3d9dc45717cf4c44e172/raw/374256a2c1828a08d5cc151ad12cd2efb59d7131/afa.svg
ingress: >-

  <img class="dark-theme-image"
  src="https://i.ibb.co/DRBsjqq/Acessibility-for-all-dark-mode.png" />


  <img class="light-theme-image"
  src="https://i.ibb.co/yF17bKy/Acessibility-for-all-light-mode.png" />



  Designers usually strive to design user-friendly products fit for a diverse
  group of people. But how do we actually design and develop products that
  consider the needs of impaired users? This short article aims to introduce you
  to the maze of web accessibility and its related framework WCAG 2.1: How can
  we include people with disabilities on the web and how do we understand the
  numerous criteria we need to meet in order to do so?
links:
  - title: W3C's official web page
    url: 'https://www.w3.org/TR/WCAG21/'
  - title: WUHCAG
    url: 'https://www.wuhcag.com/'
  - title: Knowability
    url: 'https://knowbility.org/'
  - title: Difi (Norwegian)
    url: 'https://uu.difi.no/'
authors:
  - Ragnhild Finsveen Liven
---
## What is web accessibility?

_Web accessibility_ is an inclusive practice that aims to make digital content accessible to everyone, including those with disabilities. This does, for example, imply that people who are blind or deaf, as well as people impaired by socio-economic restrictions like low bandwidth or speed, should be able to operate the web without difficulty. Using design lingo, one could say that an accessible web page is _universally designed_.

## Why consider accessibility?

Designing accessible web pages is a good and ethical practice that should be followed at all times. Furthermore, conforming to accessibility guidelines usually improves the general user experience for everyone. Universal design avoids discrimination, broadens your user base, and improves the user experience. It’s a win-win situation! 

Another reason to design accessible web pages is for economic reasons. Over the past decades, many countries and regions have established laws to ensure that providers of digital content include disabled people to the best for their abilities. The European Union (EU) has, for example, developed a Web Accessibility Directive (WAD) that guides the national laws of many European countries. If a web page fails to conform to these laws, its infringing provider can face fines or lawsuits. 

## How can you design accessible web pages?

Enter the Web Content Accessibility Guidelines 2.1 (WCAG 2.1): a humongous set of guidelines that helps you make the web more accessible for people with visual, auditory, physical, speech, learning, neurological, and cognitive disabilities. If you’ve ever visited [the official web page of these guidelines](https://www.w3.org/TR/WCAG21/) and felt overwhelmed by its extensive content - you’re not alone! To make your life a little bit easier, here is an introduction to WCAG 2.1, accompanied by four small tips for how to practice accessibility:

##### What is WCAG 2.1?

To directly quote the official webpage:

> _“WCAG 2.1 is developed through the W3C process in cooperation with individuals and organizations around the world, with a goal of providing a shared standard for Web content accessibility that meets the needs of individuals, organizations, and governments internationally.”_

WCAG 2.1 consists of four main principles, which contain a total of 13 guidelines. Each guideline provides at least one success criterion:

<br>
<br>

<img class="dark-theme-image" src="https://i.ibb.co/4gnYPjR/WCAG-2-1-structure-dark-mode.png" />

<img class="light-theme-image" src="https://i.ibb.co/P6WcQ2y/WCAG-2-1-structure-light-mode.png" />

<br>
<br>

The numerous success criteria mainly address three concerns - content (e.g. text and images), design (e.g. layout, colors and contrast), and technology (e.g. the code structure). These are concrete, testable measures of your web page’s level of accessibility. Success criterion “2.1.1 - Keyboard” says, for instance, that all content must be operable through a keyboard interface. 

##### How to practice accessibility and use WCAG 2.1?

**_1. Make WCAG/accessibility a natural part of the insight and development process_**

Bother spending some time learning about accessibility and the WCAG success criteria. If you make yourself familiar with WCAG 2.1 and the overarching principles of accessibility, you can both consciously and unconsciously design content that is adapted to disabled users’ needs. This understanding makes it possible to consider accessibility _while_ you develop a web page, rather than _after_ it is finished. The following three tips are focused on how you can achieve this understanding.

<br>

**_2. Seek supporting sources_**

Some success criteria in WCAG 2.1 are written in a language that demands a Ph.D. in astrophysics to interpret. Or at least, that’s what it felt like to me - a mere designer - the first time I accessed the WCAG web page. For this reason, I highly recommend you use other materials to support your understanding. Personally, I’ve used [WUHCAG](https://www.wuhcag.com/) and [Knowability](https://knowbility.org/) frequently to search for specific success criteria that needed some down-to-earth explanation. Google is your friend!

For Norwegian readers, I also recommend [Difi’s online course in universal design](https://laeringsplattformen.difi.no/kurs/991825827/universell-utforming-e-laeringskurs-nettredaktorer-og-skribenter) and [their list of WCAG success criteria in Norwegian](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden).

<br>

**_3. Use supporting tools to assess your website_**

Numerous tools exist out there specifically (and indirectly) developed to help you discover content on your web page that does not conform to WCAG 2.1. For instance, the organization behind the guidelines - W3C - provides [an extensive list of evaluation tools](https://www.w3.org/WAI/ER/tools/). I have used these a lot myself:

* [WAVE’s plugin](https://wave.webaim.org/extension/) for Chrome and Firefox and [W3C’s validator](https://validator.w3.org/), which helps you discover lines of HTML code that should be corrected or improved. 
* This [color contrast checker](https://color.a11y.com/?wc3), where you can fill in your web page's URL or color hex-codes to see whether they conform to three different success criteria.
* VoiceOver - my Mac’s built-in screen reader - which helps me test content from the perspective of blind or visually impaired users.
* This [line-height adjuster](https://chrome.google.com/webstore/detail/line-height-adjuster/nggicopcmcgpnpjbibppkjadniipeppa?hl=en-GB) for Chrome that specifically helps you test success criterion “1.4.12 - Text Spacing”.

<br>

**_4. Seek to empathize with your disabled users_**

Empathy - the ability to understand another person's feelings and subjective experiences - is usually a crucial part of user insight. During a busy project with limited time and resources, it can be difficult to locate users who represent the diversity of disabilities you need to account for when practicing accessible design. However, you can try to put yourself in their shoes through some simple measures. To empathize with your blind or visually impaired users, you can, for instance, try to access and operate your web page while blindfolded and solely using a screen-reader and keyboard to navigate; at 200% magnification; or in black-and-white mode.

The essence of these examples is that you should try to put yourself in the position of others unlike yourself. If some content on your web page is inoperable, incomprehensible, or inaccessible when you do so, your web page is not universally designed. And if that’s the case, your newly gained empathy will make it apparent how frustrating it can be to operate a web page that is not adapted to your needs.

## Some final words

Stay strong, fellow UXer. Accessibility and WCAG 2.1 may seem overwhelming, but essentially, it helps you become a better designer. You don’t need to become an expert in the field, but by understanding the main principles of web accessibility, you can advocate the inclusion of universal design in your day to day work life. Good luck and have a lovely December!

<br>
<br>
