import Head from "next/head";
import * as React from "react";

const fonts = [
  {
    src: "/fonts/Newzald-Book.otf",
    format: "opentype",
    fontFamily: "Newzald",
    fontWeight: "400",
    fontStyle: "normal",
  },
  {
    src: "/fonts/DINOT-Light.ttf",
    format: "truetype",
    fontFamily: "DINOT",
    fontWeight: "300",
    fontStyle: "normal",
  },
  {
    src: "/fonts/DINOT-LightItalic.ttf",
    format: "truetype",
    fontFamily: "DINOT",
    fontWeight: "300",
    fontStyle: "italic",
  },
  {
    src: "/fonts/DINOT.ttf",
    format: "truetype",
    fontFamily: "DINOT",
    fontWeight: "400",
    fontStyle: "normal",
  },
  {
    src: "/fonts/DINOT-Medium.ttf",
    format: "truetype",
    fontFamily: "DINOT",
    fontWeight: "700",
    fontStyle: "normal",
  },
];

/** Loads our custom fonts */
export const FontLoader = () => {
  return (
    <Head>
      {fonts.map((font) => (
        <link
          key={font.src}
          rel="preload"
          href={font.src}
          as="font"
          type={`font/${font.format}`}
          crossOrigin="anonymous"
        />
      ))}
      <style>
        {fonts.map((font, index) => (
          <React.Fragment key={index}>
            {`
            @font-face {
              src: url("${font.src}") format("${font.format}");
              font-family: ${font.fontFamily};
              font-weight: ${font.fontWeight};
              font-style: ${font.fontStyle};
          }`}
          </React.Fragment>
        ))}
      </style>
    </Head>
  );
};
