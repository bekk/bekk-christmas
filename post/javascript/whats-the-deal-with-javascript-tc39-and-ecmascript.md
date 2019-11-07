---
calendar: javascript
post_year: 2018
post_day: 1
title: 'What''s the deal with JavaScript, TC39 and ECMAScript?'
image: >-
  https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1046925db0fb1f15417d71ad1676880&auto=format&fit=crop&w=2700&q=80
ingress: 'Let''s clear it up, once and for all.'
links:
  - title: Read one of many summaries of the full history of JavaScript
    body: Dette feltet skal fjernes fra relevant lenke men pt er det obligatorisk
    url: 'https://auth0.com/blog/a-brief-history-of-javascript/'
  - title: See the full list of current proposals
    body: Dette feltet skal fjernes fra relevant lenke men pt er det obligatorisk
    url: 'https://github.com/tc39/proposals'
  - title: >-
      See a talk about the ECMAScript process by the editor of the huge,
      2015-version of JavaScript (ES6)
    body: Dette feltet skal fjernes fra relevant lenke men pt er det obligatorisk
    url: 'https://www.youtube.com/watch?v=bzmp6KGwxWc'
authors:
  - Svein Petter Gjøby
---
## ECMA

ECMA has its origin in the 1960s and the name was at the time the "European Computer Manufacturers Association".

The initiative was started when the need for standarizations appeared because of the growing use of computers. In 1994 the name was changed to ECMA International to reflect an international interest for standarization.

Since its formation, the their mission has been to develop standards of how information systems and technology should be used. Some of these standards include the C# language specification, FAT12/FAT32 file system, Office Open XML and of course ECMAScript.

## TC-39
So TC-39 is a so-called "technical committee" (the 39th) of ECMA.

This committee is responsible for the standardization of the JavaScript language, or ECMAScript (ECMA-262 or simply ES) as the spesification of the language is formally known as.

Basically, it's a bunch of super smart JavaScript enthusiasts and language experts who get together to define how JavaScript new versions of should work and what features it should have.

The people of TC-39 represent some of the biggest companies in tech: Google, Intel, Microsoft and Facebook, to name a few.
The committee meets regularly, and the meeting notes are available online.

Here is the [agenda of the most recent meeting](https://github.com/tc39/agendas/blob/master/2018/11.md), which ended Thursday this week, hosted by Apple in Cupertino, California.

## So how do I propose my cool feature?
Anyone can suggest features and additions to JavaScript!
This process consists of 5 stages:

* **Stage 0 - Strawman:**
  This stage is for proposing features to the specification and no formal criterias are required.
  A submission to stage 0 has to come from either a member of the committee or a registered contributer.
  
* **Stage 1 - Proposal:**
  To enter stage 1 you first have to get yourself a champion. A champion is a member of TC-39 who is responsible for the proposal.
  You will also need an outline for the problem, examples of usages, a high-level API, as well as having identified challenges and cross-cutting concerns.
  The point of this stage is to make a case for why the change should be made to the langauge.
  In addition, by the time you are finished, you will have to have described a shape of a solution and identified potential challenges.
  
* **Stage 2 - Draft:**
  You will need to be ready with an intial specification text to enter stage 2.
  At Stage 2 the precise syntax and semantics are described using formal spec language.
  
* **Stage 3 - Candidate:**
  When you have the complete spec text and the designated reviewers have signed off on it you are ready for stage 3.
  As a candidate the proposal is ready for refinements and feedback from implementations and users.
  
* **Stage 4 - Finished:**
  Congrats, your proposal is now ready to be included in the ECMAScript standard!
  To get to Stage 4 you will have to defined Test262 acceptance tests.
  You will also need two compatible implementations that passes acceptance test.
  The proposal should have in-field experience with shipping and implementations.
  Lastly, a pull-request has been sent to the ecma262 repository on github with integrated spec text.
