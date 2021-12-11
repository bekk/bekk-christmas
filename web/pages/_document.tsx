import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { FontLoader } from "../features/design-system/FontLoader";
import { theme } from "../utils/theme";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bekk.christmas"
    : "http://localhost:3000";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for Bekk Christmas"
            href={`${baseUrl}/rss.xml`}
          />
          <FontLoader />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
