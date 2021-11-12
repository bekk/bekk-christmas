import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Calendar from "../../../features/calendar/Calendar";
import { SiteMetadata } from "../../../features/layout/SiteMetadata";
import { SiteFooter } from "../../../features/site-footer/SiteFooter";

const YearPage = () => {
  const year = useRouter().query.year as string;
  return (
    <Box>
      <SiteMetadata
        title={`Bekk Christmas ${year} - advent calendars about technology, design and strategy`}
        description={`This is the Bekk Christmas of ${year}`}
      />
      <Calendar year={year} />
      <SiteFooter />
    </Box>
  );
};

export default YearPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const year = Number(context.params.year);
  const notFound = year < 2017 || year > new Date().getFullYear();
  return {
    revalidate: 60,
    notFound,
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const yearsFrom2016 = new Date().getFullYear() - 2016;
  const calendarYears = new Array(yearsFrom2016)
    .fill(undefined)
    .map((_, i) => 2017 + i);
  return {
    paths: calendarYears.map((year) => `/post/${year}`),
    fallback: "blocking",
  };
};
