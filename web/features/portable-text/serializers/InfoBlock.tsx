import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { ContentPortableText } from "../ContentPortableText";

export const InfoBlock = (props: any) => {
  const backgroundColor = useColorModeValue("green.900", "green.50");
  console.log(props);
  return (
    <Box
      as="section"
      borderRadius="lg"
      padding={4}
      maxWidth="80ch"
      mx="auto"
      backgroundColor={backgroundColor}
      css={{
        "h2, h3, h4": { fontSize: "1.75rem" },
        "& > :first-child": { marginTop: "0.5em" },
      }}
    >
      <ContentPortableText blocks={props.node?.content} />
    </Box>
  );
};
