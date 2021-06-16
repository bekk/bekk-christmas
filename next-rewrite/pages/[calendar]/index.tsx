import { Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Layout } from "../../features/layout/Layout";
import { getAllCalendars, getCalendarData } from "../../utils/data";

type CalendarPageProps = {
  notFound: boolean;
};
export default function CalendarPage(props: CalendarPageProps) {
  return (
    <Layout title={`Calendar not found - bekk.christmas`} description="">
      <Heading>Could not find that calendar!</Heading>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const calendarData = getCalendarData({
    name: context.params.calendar as string,
  });
  if (
    calendarData.articles.length === 0 &&
    calendarData.otherYears.length === 0
  ) {
    return {
      props: {
        notFound: true,
      },
    };
  }
  return {
    redirect: {
      destination: `/${calendarData.calendarName}/${calendarData.year}`,
      permanent: false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const calendars = getAllCalendars();

  return {
    paths: calendars.map((calendar) => `/${calendar}`),
    fallback: "blocking",
  };
};
