import { BoxProps, Box, Heading, Text } from "@chakra-ui/react";
import SubscribeModal from "../subscribe/SubscribeModal";

export const SignupForNewsletterItem = (props: BoxProps) => (
  <Box
    position="relative"
    flexDirection="column"
    background="brand.white"
    padding={["24px 16px", "24px 16px", "32px", "32px"]}
    width={["220px", "220px", "300px", "300px"]}
    height={["300px", "300px", "430px", "430px"]}
    color="brand.darkGreen"
    boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
    transition="all 0.2s"
    border="0.5rem solid transparent"
    outline="0 solid #fff"
    flexShrink={0}
    _focus={{
      background: "brand.pink",
      border: "0.5rem solid #fff",
    }}
    {...props}
  >
    <Heading
      as="h2"
      fontWeight="400"
      fontSize={["24px", "24px", "30px", "34px"]}
    >
      Sign up for our newsletter
    </Heading>
    <Text mb={12}>Get every day's articles delivered to your inbox.</Text>
    <SubscribeModal />
  </Box>
);
