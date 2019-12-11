---
calendar: ml
post_year: 2019
post_day: 24
title: The 8th Christmas cookie
image: >-
  https://images.unsplash.com/photo-1480215529400-2995f91ddb96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60
authors:
  - Magnus Johansen
  - Bendik Witzøe
---
So, you have finally arrived at the end of our modest “tutorial” to machine learning, and may continue on the road of illumination all by yourself.

..But that doesn’t mean that you won’t have help along the way from other contributors to this vast field of knowledge, as we shall show you today: As our last act of magic, we are going to use an online, free-to-use and pre-trained model to create _The 8th Christmas cookie_

You may need some background information about this, as we may very well understand. _The seven Christmas cookies_ is based upon a Norwegian Christmas tradition. Traditionally, all Norwegian households bakes these 7 different types of cakes for Christmas. These cakes therefore has a special place in the Norwegian Christmas soul. The seven Christmas cookies consists of:

* Sand cake (Sandkake)
* Ginger bread (Pepperkake)
* Poor mans cake (Fattigmann)
* Goro (Goro)
* Berlin wreaths (Berlinerkranser)
* Wafer biscuits (Krumkaker)
* Norwegian butter cookies (Serinakaker)

Although these cakes have long traditions and has been refined for decades, we are getting tired of them and have come to the conclusion that they are rather _boring_ (even though cookies are always yummy). We decided that as the Christmas celebration has changed a lot during the last centuries, that the cookies should follow suit: We needed a new cookie to “renew” this long tradition of Christmas cookies…And what could be more modern than using ML to create it? 😊

So, the plan is simple: based upon the existing types of Christmas cookies, let’s use machine learning to create a new one. To do this, we are going to use an open source neural network called textgenrnn.

If you want to understand the model to perfection, you should read our blog post about recurrent neural networks here and we are using this model to make use of transfer learning (here). The beauty of this model is that it is both pretrained and (even more important) it runs on Google Colab, which has more computer power than you could probably muster, which makes re-training much less time consuming. 

The details surrounding this particular neural network, you are free to look up yourselves. The most important things for you to know, is that the model is pretrained on a substantial amount of text from all over the internet (generalized text) and, by transfer learning, it needs specialized text as input to alter it’s weights for our purpose. So: first of all, we need text.

Even though we have seven types of cake we could use as input. This is probably to sparse for the model to make some sense, and there are probably other types of ingredients that would fit in a Christmas cake. We (the entire team) therefore decided that everyone should contribute with the most “christmassy” cookies they knew of. The final list consisted of 25 cakes. This is probably also less data than what we ideally would like to have, but let’s see if we get some results. 

The textgenrnn is quite easy to use, also for non-ml-pioneers. You can set some of the hyper-parameters for the model yourself (with some helpful advice given from the creators). And upload files with the information you want the model to train on. In our case: The 25 recipes. 

Oh! One important tip from us: In this case, you would like the model to be word-level model. Instead of a character-level model. The main reason for this is that the word-level model is way easier to train, given that the predictions is based upon words in a sentence, and not the total amount of characters in the sentence. There are several other differences, but we leave it for you to discover them 😉

Setting hyper-parameters is an art, but we have done what all decent machine-learning enthusiasts usually do: We have experimented!

After some time experimenting, we set the rnn size to 256, and the number of epocs to 1000.

In the beginning, after a few number of epocs. Things look like this.

!\[Weird](https://ibb.co/CML0V60)

If you have used the textgenrnn yourself, you have probably noticed the temperature-schedule. This is telling us how much randomness the model adds. A low number means little randomness. If we have a small number of randomness, the model just says “2 teaspoons of cardamom” all the time – this is probably due to there being much cardamom in the cookies in our recipe-list…I guess that gives us some information at least! 😊

The recipes keep getting better, and after a whole 1000 epocs, things look promising.

Pic

The documentation for the textgenrnn clearly states that the model doesn't create perfect texts all the time, and that we may have to do some manual alteration afterwards. With that in mind, we did approximately 10 runs, and picked the cake we believed the most in. The cookie consists of

1. ```
   300 g of flour
   ```
2. ```
   0,5 dl milk
   ```
3. ```
   0,5 dl heavy of cream
   ```
4. ```
   150 g raisins
   ```
5. ```
   2 teaspoons cardamom
   ```
6. ```
   1 lemon
   ```
7. ```
   175 grams sugar
   ```
8. ```
   100 g butter , melted
   ```
9. ```
   2 tablespoons brandy
   ```
10. ```
    1 egg
    ```

We chose this recipe, because it has a substantial amount of dry matter (flour and sugar) fluid (milk, heavy cream, butter) and interesting (...yet special) taste components (raisins, nutmeg, lemon and brandy). We might have to alter the amounts somewhat, but this is great base for creating a christmas cake!

We decided to see what kind of role our ingredients usually have in their recipes, and base our instructions upon that:

* Flour is usually the base, and is blended with the rest of the dry ingredients, in this case sugar and cardamom, before blending with the liquids
* Melted butter is typically blended with sugar before it cools. This is usually step 1.
* Cream, milk and eggs are blended together with butter and sugar.
* Lemon is usually added for it's peel, and the peel is added to the flour/dry ingredients
* Brandy is also added together with the rest of the liquids

So, based on this information, we have decided on these instructions:

1. Melt butter, and blend it with the sugar. Let the mixture cool
2. Cream, milk, eggs and brandy is blended with the cool mixture of butter and sugar.
3. Peel lemons, grate the nutmeg, and mix in flour, sugar and raisins.

Without baking powder or baking soda, this is probably going to be a a non-rasing cake, like gingerbread. We therefore prepare a long which we can fill with this (hopefully) amazing dough, and cook, before cutting them with a knife when is done.
