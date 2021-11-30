import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useArticlesForDay } from "../../features/stand/luker";
import { TextSlide } from "../../features/stand/views/TextSlide";

export default function PostsScheduledForDecember25th() {
  const articles = useArticlesForDay(25);
  return (
    <TextSlide>
      <Stack spacing={6}>
        <Text fontSize="5xl" fontWeight="bold">
          Uplasserte artikler for Bekk.christmas
        </Text>
        {articles?.map(({ _id, title, authors }) => (
          <Text key={_id} fontSize="3xl">
            <strong>&quot;{title}&quot;</strong>
            <br />
            {authors?.join(", ") ?? "…"}
          </Text>
        ))}
        {articles && articles.length === 0 && (
          <Text>Ingen artikler ligger til publisering den 25. desember 🤩</Text>
        )}
      </Stack>
    </TextSlide>
  );
}
