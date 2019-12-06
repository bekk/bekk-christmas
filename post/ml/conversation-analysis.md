---
calendar: ml
post_year: 2019
post_day: 15
title: Conversation analysis with Python
image: >-
  https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
ingress: '## Exploring NLP libraries for Norwegian'
description: ''
links:
  - title: Norwegian NLP Resources
    url: 'https://github.com/web64/norwegian-nlp-resources'
authors:
  - Tobias R. Pettrém
---
One of the many branches of machine learning is [Natural Language Processing](https://towardsdatascience.com/introduction-to-natural-language-processing-nlp-323cc007df3d) (or NLP) where computers are trained to understand and generate text and speech. However, while the machine learning universe is full of advanced, powerful and readily available resources, we realized the need to map the availability and capabilities of language processing resources for Norwegian. To explore this, we set out to do a conversation analysis [PoC](https://en.wikipedia.org/wiki/Proof_of_concept) – analyzing and presenting the contents and metadata of a conversation between two or more people talking in Norwegian. <b>This blog post will give a quick intro to some of the most useful Python libraries for Norwegian NLP, to help you get started with your own NLP project!</b>

![Meeting analysis output](/assets/echo_output_border.png "Meeting analysis output") 
<span style="color:dimgray" font-size:10><i>Analysis output from discussion revolving around NLP product development</i></span>.

Our first task was transcribing the recorded speech. After evaluating several options, the [Google Speech-to-Text API](https://cloud.google.com/speech-to-text/) emerged as the best alternative, scoring as low as 7 % normalized [Levenshtein](https://itnext.io/string-similarity-the-basic-know-your-algorithms-guide-3de3d7346227) distance and 17 % [Word Error Rate](https://medium.com/descript/challenges-in-measuring-automatic-transcription-accuracy-f322bf5994f) on test samples. This corresponds well to the results of recent tests<sup>1</sup> evaluating different speech-to-text APIs in English.

A key part of speech analysis is speaker identification, known in the field as diarization. As opposed to most NLP methods, this should theoretically be language indifferent. However, as Google only [supports diarization of English](https://cloud.google.com/speech-to-text/docs/supported-features-languages) (as of Dec 2019), we instead employed one of the many available Python libraries, [pyAudioAnalysis](https://github.com/tyiannak/pyAudioAnalysis), for diarization, achieving at best 96 % accuracy in takes with different gender speakers.

As for the summary of the text, we used the Gensim library, which offers an [extractive summarization model](https://www.geeksforgeeks.org/python-extractive-text-summarization-using-gensim/) based on the TextRank algorithm. In our experience, the function is effective when input text data is of high quality, but becomes equivalently confused by low-grade transcriptions. We experimented with abstractive summarization models for English (translating the transcribed speech back and forth), but any meaningful insight was clearly lost in translation and/or transcription.

One of the most sophisticated libraries we encountered was spaCy. It has a trained [convolutional neural network model for Norwegian](https://spacy.io/models/nb) which enables context-based [recognition of named entities](https://towardsdatascience.com/custom-named-entity-recognition-using-spacy-7140ebbb3718), [POS tagging](https://stackabuse.com/python-for-nlp-parts-of-speech-tagging-and-named-entity-recognition/) and even [dependency parsing](http://nlpprogress.com/english/dependency_parsing.html). To demonstrate its POS tagging abilities, we let spaCy analyze the following sentence:

```
i år skal bekk publisere tolv julekalendere
```

or in English, "_This year, Bekk is publishing twelve Advent calendars"._ The main challenge posed here is the fact that _bekk_, apart from being our company name, also means _brook_ or _creek_ in Norwegian. While <i>brook</i> and <i>creek</i> are clearly nouns, _bekk_, in this case, is intented as a company name – that is, a proper noun. We run the following code:

```
import spacy
nlp = spacy.load('nb_core_news_sm')

def getPOS(sentence): # returns POS class of all words in the sentence
    doc = nlp(sentence)
    pos = []
    for token in doc:
        pos.append([token.text, token.pos_])
    return pos

sentence = "i år skal bekk publisere tolv julekalendere"
for (word, pos) in getPOS(sentence):
    print(word,"|",pos,"\n-------")
```

receiving the output:

```
i | ADP 
-------
år | NOUN 
-------
skal | AUX 
-------
bekk | PROPN 
-------
publisere | VERB 
-------
tolv | NUM 
-------
julekalendere | NOUN 
-------
```

As we see, spaCy understands from the context that _bekk_ is in fact a proper noun! This is a very helpful tool in extraction of named entities, but also structural sentence analysis or at some point even abstractive approaches.

To extract key words from the transcription, we implemented a modified [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) algorithm, aided by a Norwegian Snowball stemmer provided by [NLTK](https://www.nltk.org/_modules/nltk/stem/snowball.html#NorwegianStemmer)<sup>2</sup>. With a careful optimization of the TF/IDF weights, [stopword deletion](https://en.wikipedia.org/wiki/Stop_words) and outlier removal, the program was able to extract highly relevant keywords.

This has hopefully been a useful intro to some of the many available resources for Norwegian NLP! We tackled several other challenges, including [sentiment analysis](https://en.wikipedia.org/wiki/Sentiment_analysis), speech time mapping and [sociogram](https://en.wikipedia.org/wiki/Sociogram) generation, which may be covered some other time. Feel free to drop me an email if you're interested in hearing more!

<sup>1</sup> https://www.rev.ai/blog/how-to-calculate-word-error-rate/, https://medium.com/descript/which-automatic-transcription-service-is-the-most-accurate-2018-2e859b23ed19

<sup>2</sup>When combining stemming with tf-idf, we recommend grouping words on their stem, setting the stem's TF to the sum of each word's TF, and the stem's IDF to the lowest of each word's IDF.
