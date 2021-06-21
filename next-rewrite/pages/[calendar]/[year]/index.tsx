import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Calendar } from "../../../features/calendar/Calendar";
import { Layout } from "../../../features/layout/Layout";
import { calendarInfo } from "../../../utils/calendars";
import {
  Article,
  getCalendarData,
  getCalendarsWithYears
} from "../../../utils/data";

type CalendarYearPageProps = {
  articles: Article[];
  otherYears: number[];
  calendarName: string;
  year: number;
};
export default function CalendarYearPage({
  articles,
  otherYears,
  calendarName,
  year,
}: CalendarYearPageProps) {
  const { displayName, ...info } = calendarInfo[calendarName] || {};
  const name = displayName || calendarName;
  return (
    <Layout
      title={`${name} - ${year} - bekk.christmas`}
      description={`Articles about ${name} from ${year}`}
      headerLink="/"
      headerTitle={`Bekk Christmas / ${name} (${year || ""})`}
      {...info}
    >
      <Calendar
        articles={articles}
        otherYears={otherYears}
        name={calendarName}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const calendarData = getCalendarData({
    name: String(context.params.calendar),
    year: Number(context.params.year),
  });

  const calendarNotFound =
    calendarData.articles.length === 0 && calendarData.otherYears.length === 0;

  return {
    props: calendarData,
    notFound: calendarNotFound,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const calendarsWithYears = getCalendarsWithYears();

  return {
    paths: Object.entries(calendarsWithYears)
      .map(([calendar, years]) => ({ calendar, years }))
      .flatMap(({ calendar, years }) =>
        years.map((year) => `/${calendar}/${year}`)
      ),
    fallback: "blocking",
  };
};
