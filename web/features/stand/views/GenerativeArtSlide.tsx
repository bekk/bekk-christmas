import { Image } from "@chakra-ui/image";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import useSWR from "swr";

type CloudinaryImage = { public_id: string };
type Response = {
  resources: CloudinaryImage[];
};

const getImages = async () => {
  const url = `https://res.cloudinary.com/bekkimg/image/list/fagdag-tag.json`;
  const res = await fetch(url);
  const body = (await res.json()) as Response;
  return body.resources;
};

export const GenerativeArtSlide = () => {
  const { data } = useSWR("generativeArt", getImages, {
    refreshInterval: 5000,
  });

  if (!data) {
    return null;
  }

  const [newestImage, ...restOfImages] = data;

  return (
    <Box>
      {newestImage && (
        <Image
          src={`https://res.cloudinary.com/bekkimg/image/upload/v1622570512/${newestImage.public_id}.png`}
          alt="Generated artwork"
          width="60vw"
          position="absolute"
          top="20vh"
          left="20vw"
          shadow="lg"
          border="1em solid white"
        />
      )}
      <SimpleGrid
        height="100vh"
        backgroundColor="brand.darkGreen"
        columns={Math.min(restOfImages.length, 4)}
        gap={6}
        p={6}
        overflow="hidden"
      >
        {restOfImages.map((image) => (
          <Image
            key={image.public_id}
            src={`https://res.cloudinary.com/bekkimg/image/upload/v1622570512/${image.public_id}.png`}
            alt="Generated artwork"
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
