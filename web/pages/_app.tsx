import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import { useAnalytics } from "../features/analytics/useAnalytics";
import { theme } from "../utils/theme";

function App({ Component, pageProps }: AppProps) {
  useAnalytics();
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default App;
