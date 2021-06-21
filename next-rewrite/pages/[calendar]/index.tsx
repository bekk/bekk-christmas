import { GetStaticPaths, GetStaticProps } from "next";
import { getAllCalendars, getCalendarData } from "../../utils/data";

export default function CalendarPage() {
  return null;
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
      notFound: true,
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
