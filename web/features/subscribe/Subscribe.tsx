import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Subscribe = () => {
  const [value, setValue] = React.useState("1");

  return (
    <Stack
      bg="white"
      p={12}
      maxW="36rem"
      borderRadius="1rem"
      border="2px solid black"
    >
      <Heading fontWeight="normal" color="brand.darkGreen">
        Join in the holiday cheer and count down to christmas with us!
      </Heading>
      <Text as="b">I would like updates:</Text>
      <RadioGroup onChange={setValue} value={value}>
        <Stack>
          <Radio value="1" colorScheme="green">
            For each calendar window
          </Radio>
          <Radio value="2" colorScheme="green">
            Weekly summaries
          </Radio>
        </Stack>
      </RadioGroup>
      <Flex>
        <Input
          placeholder="Type your email..."
          colorScheme="green"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
        />
        <Button
          colorScheme="green"
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        >
          Subscribe
        </Button>
      </Flex>
    </Stack>
  );
};

export default Subscribe;
