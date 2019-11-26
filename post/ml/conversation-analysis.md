---
calendar: ml
post_year: 2019
post_day: 15
title: Conversation analysis
ingress: '### _Exploring NLP libraries for Norwegian_'
description: ''
links:
  - title: Norwegian NLP Resources
    url: 'https://github.com/web64/norwegian-nlp-resources'
authors:
  - Tobias R. Pettrém
---
The machine learning universe is full of advanced, powerful and readily available resources for all kinds of analyses. There are modules, libraries, trained models and repositories open for anyone to use, utilizing state-of-the-art algorithms to discover complex patterns in our data. One of the many branches of machine learning is NLP – Natural Language Processing – where computers are trained to understand and generate text and speech.

However, during a discussion on potential use cases for NLP, we realized that a large uncertainty was the availability and capabilities of language processing resources for Norwegian. To explore this, we set out to do a conversation analysis [PoC](https://en.wikipedia.org/wiki/Proof_of_concept) – analyzing and presenting the contents and metadata of a conversation between two or more people speaking in Norwegian. Our desired output was:

* Summary
* Key topics
* [Sentiment](https://en.wikipedia.org/wiki/Sentiment_analysis) (in practice, a positivity score for each speaker)
* Speech time for each speaker
* Conversation [sociogram](https://en.wikipedia.org/wiki/Sociogram)

Our first task is transcribing the recorded speech. After evaluating several options, the [Google Speech-to-Text API](https://cloud.google.com/speech-to-text/) emerged as the best option, scoring as low as 7 % normalized [Levenshtein](https://itnext.io/string-similarity-the-basic-know-your-algorithms-guide-3de3d7346227) distance, and 17 % [Word Error Rate](https://medium.com/descript/challenges-in-measuring-automatic-transcription-accuracy-f322bf5994f) – corresponding to the results of recent tests<sup>1</sup> evaluating different speech-to-text APIs in English.

A key part of speech analysis is diarization – or speaker identification. As opposed to most NLP methods, this should theoretically be language indifferent. However, as Google only [supports diarization of English](https://cloud.google.com/speech-to-text/docs/supported-features-languages) (as of Nov 2019), we used one of many available Python libraries, pyAudioAnalysis, for diarization, achieving at best 96 % accuracy in takes with different gender participants.

As for the summary of the text, we used the Gensim library, which offers an [extractive summarization model](https://www.geeksforgeeks.org/python-extractive-text-summarization-using-gensim/) based on the TextRank algorithm. In our experience, the function is effective when input text data is of high quality, but becomes equivalently confused by low-grade transcriptions. We experimented with abstractive summarization models for English (translating the transcribed speech back and forth), but meaningful results were clearly lost in translation/transcription.

One of the most sophisticated libraries we encountered was spaCy. It has a trained [convolutional neural network model for Norwegian](https://spacy.io/models/nb) which enables context-based [recognition of named entities](https://towardsdatascience.com/custom-named-entity-recognition-using-spacy-7140ebbb3718), [POS tagging](https://stackabuse.com/python-for-nlp-parts-of-speech-tagging-and-named-entity-recognition/) and even [dependency parsing](http://nlpprogress.com/english/dependency_parsing.html). As an example, we let spaCy analyze the following sentence:

```
i år skal bekk publisere 12 julekalendere
```

or in English, "_This year, Bekk is publishing 12 Advent calendars"._ The main challenge posed here is the fact that _bekk_, apart from being our company name, also means _creek_ in Norwegian. _Creek_ is clearly a noun, while _bekk_, in this case, is intented as a proper noun. We run the following code:

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

receiving the following output:

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

As we see, spaCy understands from the context that _bekk_ is in fact a proper noun! This is a very helpful tool in extraction of named entities, but also structural analysis or at some point even abstractive approaches.

To extract key words from the transcription, we implemented a modified [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) algorithm, aided by a Norwegian snowball stemmer provided by [NLTK](https://www.nltk.org/_modules/nltk/stem/snowball.html#NorwegianStemmer).

<sup>1</sup> https://www.rev.ai/blog/how-to-calculate-word-error-rate/, https://medium.com/descript/which-automatic-transcription-service-is-the-most-accurate-2018-2e859b23ed19
