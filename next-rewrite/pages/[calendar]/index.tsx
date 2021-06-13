import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Calendar } from "../../features/calendar/Calendar";
import { Layout } from "../../features/layout/Layout";
import { calendarInfo } from "../../utils/calendars";
import { Article, getAllCalendars, getCalendarData } from "../../utils/data";

type CalendarPageProps = {
  articles: Article[];
  otherYears: number[];
  calendarName: string;
  year: number;
};
export default function CalendarPage({
  articles,
  otherYears,
  calendarName,
  year,
}: CalendarPageProps) {
  const { displayName, ...info } = calendarInfo[calendarName];
  return (
    <Layout
      title={`${displayName} ${year} - bekk.christmas`}
      description={`Articles about ${displayName}`}
      {...info}
    >
      <Calendar
        articles={articles}
        otherYears={otherYears}
        name={calendarName}
        year={year}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: getCalendarData({ name: context.params.calendar as string }),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const calendars = getAllCalendars();

  return {
    paths: calendars.map((calendar) => `/${calendar}`),
    fallback: "blocking",
  };
};
