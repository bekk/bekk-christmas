import { Stack, Text } from "@chakra-ui/react";
import groq from "groq";
import React from "react";
import useSWR from "swr";
import { sanityClient } from "../../../utils/sanity/sanity.server";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

type DagensArtiklerLukeProps = {
  day: number;
};
export const DagensArtiklerLuke = ({ day }: DagensArtiklerLukeProps) => {
  const articles = useArticlesForDay(day);
  return useSlideshow([
    <TitleSlide key={1}>Dagens artikler</TitleSlide>,
    <TextSlide key={1}>
      <Stack spacing={6}>
        <Text fontSize="5xl">Dagens artikler fra Bekk.christmas</Text>
        {articles?.map(({ _id, title, authors }) => (
          <Text key={_id} fontSize="3xl">
            <strong>&quot;{title}&quot;</strong>
            <br />
            {authors?.join(", ") ?? "…"}
          </Text>
        )) ?? <Text>Ingen artikler publisert i dag</Text>}
      </Stack>
    </TextSlide>,
  ]);
};

const useArticlesForDay = (day: number) => {
  type Article = {
    _id: string;
    title: string;
    authors: { fullName: string }[] | null;
  };
  const { data } = useSWR<Article[]>(["article-slide", day], (_, day) =>
    sanityClient.fetch(
      groq`*[
        _type == "post" 
        && availableFrom >= "2021-12-$day"
        && availableFrom > "2021-12-$dayAfter"
      ] { 
        _id,
        title, 
        "authors": authors[]->fullName
      }`,
      { day, dayAfter: day + 1 }
    )
  );
  return data;
};
