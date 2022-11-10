import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

type FormFields = { email: string; interval: "daily" | "weekly" };

const Subscribe = (props: BoxProps & { onClose?: () => void }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSignupAction({ state: "pending" });
      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement)
      ) as FormFields;

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
        errors: Partial<Record<"email" | "interval", string>> | null;
      }
  >({ state: "idle" });
  const [isDismissed, setDismissed] = React.useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <Box
      border="2px solid black"
      borderRadius="1rem"
      background="white"
      padding={[4, 8, 12]}
      margin={4}
      maxWidth="lg"
      position="relative"
      {...props}
    >
      <CloseButton
        position="absolute"
        top={[2, 5]}
        right={[2, 5]}
        size="lg"
        onClick={() => {
          setDismissed(true);
          if (props.onClose) {
            props.onClose();
          }
        }}
      />
      {signupAction.state === "success" ? (
        <>
          <Heading
            as="h2"
            mb={4}
            fontWeight="400"
            fontSize="1.8rem"
            color="brand.darkGreen"
          >
            🎅 Cheers!
          </Heading>
          <Text>You'll hear from us soon 🎁</Text>
        </>
      ) : (
        <>
          <Heading color="brand.darkGreen" fontWeight="400" fontSize="1.8rem">
            Join in the holiday cheer and count down to Christmas with us!
          </Heading>
          <Stack as="form" onSubmit={handleSubmit} mt={4} spacing={4}>
            <FormControl
              as="fieldset"
              isInvalid={
                signupAction.state === "error" &&
                Boolean(signupAction.errors?.interval)
              }
            >
              <FormLabel as="legend">I would like updates:</FormLabel>
              <RadioGroup
                name="interval"
                defaultValue="daily"
                colorScheme="green"
              >
                <Stack>
                  <Radio value="daily">For each calendar window</Radio>
                  <Radio value="weekly">Weekly summaries</Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {signupAction.state === "error" && signupAction.errors.interval}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                signupAction.state === "error" &&
                Boolean(signupAction.errors?.email)
              }
            >
              <FormLabel>E-mail</FormLabel>
              <Flex>
                <Input
                  flex="1"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  borderRightRadius={0}
                  placeholder="Type your email…"
                  borderColor="black"
                />
                <Button
                  borderLeftRadius={0}
                  fontFamily="DIN OT"
                  fontWeight="350"
                  backgroundColor="black"
                  variant="solid"
                  colorScheme="blackAlpha"
                  type="submit"
                  isLoading={signupAction.state === "pending"}
                  loadingText="Subscribing…"
                >
                  Subscribe
                </Button>
              </Flex>
              <FormErrorMessage>
                {signupAction.state === "error" && signupAction.errors.email}
              </FormErrorMessage>
            </FormControl>
            <Text as="small" color="brand.darkGrey">
              Your email will only be used for these advent calendar updates
              during the holiday season. They will never be sold or shared with
              third parties.
            </Text>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Subscribe;
