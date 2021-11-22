import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import { SiteFooter } from "../features/site-footer/SiteFooter";
import { slugify } from "../utils/slug";
import { theme } from "../utils/theme";

function App({ Component, pageProps }: AppProps) {
  usePageViewTracking();
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <SiteFooter />
    </ChakraProvider>
  );
}

export default App;

export const usePageViewTracking = () => {
  const router = useRouter();
  const trackPageView = (url: string) => {
    const safeUrl = slugify(url);
    if (process.env.NODE_ENV === "production") {
      fetch(`/api/${safeUrl}/views`, {
        method: "POST",
      });
    }
  };
  React.useEffect(() => {
    trackPageView(router.asPath);
  }, [router.asPath]);
};
