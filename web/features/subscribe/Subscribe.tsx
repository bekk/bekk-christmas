import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaEnvelope, FaSnowman } from "react-icons/fa";

const Subscribe = (props: BoxProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSignupAction({ state: "pending" });
      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement)
      );
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSignupAction({ state: "success" });
      } else {
        const body = await response.json();
        setSignupAction({ state: "error", errors: body.errors });
      }
    } catch (e: any) {
      console.error(e);
      setSignupAction({
        state: "error",
        errors: { email: "Something didn't work as expected. Try again!" },
      });
    } finally {
    }
  };
  const [signupAction, setSignupAction] = React.useState<
    | { state: "idle" }
    | { state: "pending" }
    | { state: "success" }
    | {
        state: "error";
        errors: Partial<Record<"email" | "name", string>> | null;
      }
  >({ state: "idle" });

  if (signupAction.state === "success") {
    return (
      <Box
        border="2px solid black"
        borderRadius="1rem"
        background="white"
        padding={5}
        maxWidth="lg"
        {...props}
      >
        <Heading as="h2" mb={4}>
          🎅 Thanks for signing up!
        </Heading>
        <Text>
          You'll get an email from us when we have something to share. Until
          then, you can check out the rest of the site!
        </Text>
      </Box>
    );
  }
  return (
    <Box
      border="2px solid black"
      borderRadius="1rem"
      background="white"
      padding={5}
      margin={4}
      maxWidth="lg"
      {...props}
    >
      <Heading>Get Christmas spirit right in your mailbox</Heading>
      <Text>
        Want to get a daily drip of articles, podcasts and videos in your inbox
        from December 1st to 24th? <strong>Sign up here 👇</strong>
      </Text>
      <Stack as="form" onSubmit={handleSubmit} mt={4}>
        <FormControl
          isInvalid={
            signupAction.state === "error" && Boolean(signupAction.errors?.name)
          }
        >
          <FormLabel>What's your name?</FormLabel>
          <InputGroup>
            <InputLeftAddon>
              <FaSnowman />
            </InputLeftAddon>
            <Input name="name" autoComplete="given-name" required />
          </InputGroup>
          <FormErrorMessage>
            {signupAction.state === "error" && signupAction.errors.name}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            signupAction.state === "error" &&
            Boolean(signupAction.errors?.email)
          }
        >
          <FormLabel>E-mail</FormLabel>
          <InputGroup>
            <InputLeftAddon>
              <FaEnvelope />
            </InputLeftAddon>
            <Input name="email" type="email" required autoComplete="email" />
          </InputGroup>
          <FormErrorMessage>
            {signupAction.state === "error" && signupAction.errors.email}
          </FormErrorMessage>
        </FormControl>
        <Text as="small">
          We will never sell or abuse your email for anything other than sending
          your original Christmas cheer and content from bekk.christmas during
          December.
        </Text>
        <Box textAlign="right">
          <Button
            variant="solid"
            colorScheme="green"
            type="submit"
            isLoading={signupAction.state === "pending"}
            loadingText="Signing you up! 🛷"
          >
            Subscribe 🎅
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Subscribe;
