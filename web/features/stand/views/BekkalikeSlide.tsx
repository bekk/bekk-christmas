import { Box, BoxProps, Center, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

type BekkalikeSlideProps = {
  children: React.ReactNode;
  title?: string;
} & BoxProps;
export const BekkalikeSlide = ({
  children,
  title,
  ...props
}: BekkalikeSlideProps) => {
  return (
    <Center minHeight="100vh" background="brand.pink" color="brand.darkGreen">
      <Box>
        <SimpleGrid
          columns={Math.min(React.Children.count(children), 2)}
          gap={8}
          px={8}
          fontSize="5xl"
          lineHeight="1.3"
          alignItems="center"
          justifyContent="center"
          {...props}
        >
          {children}
        </SimpleGrid>
        {title && (
          <Text fontSize="3xl" mt={12} textAlign="center">
            {title}
          </Text>
        )}
      </Box>
    </Center>
  );
};
