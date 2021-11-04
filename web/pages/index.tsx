import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";
import Calendar from "../features/calendar/Calendar";
import { SiteMetadata } from "../features/layout/SiteMetadata";
import { SiteFooter } from "../features/site-footer/SiteFooter";
import { TeaserLandingPage } from "../features/teaser/TeaserLandingPage";
import { generateRss } from "../utils/rss";

type LandingPageProps = {
  showTeaser: boolean;
  year: number;
};
const LandingPage = (props: LandingPageProps) => {
  if (props.showTeaser) {
    return (
      <Box>
        <SiteMetadata
          title="Bekk Christmas - advent calendars about technology, design and strategy"
          description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
        />
        <TeaserLandingPage />
      </Box>
    );
  }
  return (
    <Box>
      <SiteMetadata
        title="Bekk Christmas - advent calendars about technology, design and strategy"
        description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
      />
      <Calendar year={props.year} />
      <SiteFooter />
    </Box>
  );
};

export default LandingPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (process.env.NODE_ENV === "production") {
    try {
      // We generate a new RSS feed every time the index page is built.
      // This creates a new public/rss.xml file with the latest articles.
      await generateRss();
    } catch (e) {}
  }

  const now = new Date();
  const isAfterJuly = now.getMonth() > 6;
  const isBeforeChristmas = now.getMonth() < 11;
  console.log({ isAfterJuly, isBeforeChristmas });

  return {
    props: {
      showTeaser: isAfterJuly && isBeforeChristmas,
      year: isAfterJuly ? now.getFullYear() : now.getFullYear() - 1,
    },
    revalidate: 60,
  };
};
