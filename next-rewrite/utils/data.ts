import fs from "fs";
import * as grayMatter from "gray-matter";
import path from "path";
import remark from "remark";
import stripMarkdownPlugin from "strip-markdown";

/** An article from the CMS */
export type Article = {
  /** The slug of the calendar the article belongs to */
  calendar: string;
  /** The year the article was posted */
  post_year: number;
  /** The day the article was posted */
  post_day: number;
  /** The title of the article */
  title: string;
  /** Optional main image */
  image?: string;
  /** List of the article's authors */
  authors: string[];
  /** Optional list of links for further reading */
  links: { title: string; url: string }[];
  /** Whether the article is available or not - that is, if its published */
  isAvailable: boolean;
  /** The unparsed markdown body */
  content: string;
  /** The unparsed markdown excerpt */
  ingress?: string;
  /** The excerpt with all markdown removed */
  ingressWithoutMarkdown?: string;
};

type GetCalendarDataProps = {
  /** The name (or slug) of the calendar */
  name: string;
  /** The year you want to get data from */
  year?: number;
};
/** Gets all relevant calendar data for a given calendar and year
 */
export const getCalendarData = ({ name, year }: GetCalendarDataProps) => {
  const allArticles = getAllArticles({ filterCalendar: name });
  const uniqueYears = unique(allArticles.map((article) => article.post_year));
  // If we don't provide a year, pick the most recent
  const yearToSearch = year ?? Math.max(...uniqueYears);
  const otherYears = uniqueYears.filter((year) => year !== yearToSearch).sort();
  const articlesToShow = allArticles
    .filter((article) => article.post_year === yearToSearch)
    .sort((a, b) => a.post_day - b.post_day);

  return {
    articles: articlesToShow,
    otherYears,
    year: yearToSearch,
    calendarName: name,
  };
};

/** Get all unique calendar slugs */
export const getAllCalendars = () => {
  return (
    fs
      .readdirSync(path.join(process.cwd(), "post"), {
        encoding: "utf8",
      })
      // Only get the calendars, not any files
      .filter((dirent) =>
        fs.statSync(path.join(process.cwd(), "post", dirent)).isDirectory()
      )
      // Filter out the dummy calendar
      .filter((dirent) => dirent !== "dummy")
  );
};

type GetAllArticlesProps = {
  /** If you want to only read a single calendar, pass in the name here */
  filterCalendar?: string;
  /** If you want to parse the content as well as the metadata, set this to true */
  parseContent?: boolean;
};
/** Get all articles
 *
 * Reads every single article from disk - should only be used during build time
 * and even then, very sparingly.
 */
export const getAllArticles = ({
  filterCalendar = "",
}: GetAllArticlesProps = {}) => {
  return getAllCalendars()
    .filter((calendar) => (filterCalendar ? calendar === filterCalendar : true))
    .flatMap((calendar) => ({
      calendar,
      files: fs.readdirSync(path.join(process.cwd(), `post/${calendar}`)),
    }))
    .flatMap(({ calendar, files }) =>
      files.map((file) =>
        grayMatter.read(path.join(process.cwd(), `post/${calendar}/${file}`), {
          eval: false,
        })
      )
    )
    .map((article) => {
      const now = new Date();
      const postDate = new Date(
        article.data.post_year,
        11,
        article.data.post_day
      );

      const isAvailable = postDate < now;
      return {
        ...article.data,
        isAvailable,
        content: article.content,
        ingressWithoutMarkdown: String(
          remark().use(stripMarkdownPlugin).processSync(article.data.ingress)
        ),
      } as Article;
    });
};

type GetArticleDataProps = {
  calendar: string;
  year: number;
  day: number;
};
export const getArticleData = ({
  calendar,
  year,
  day,
}: GetArticleDataProps) => {
  return getAllArticles({
    filterCalendar: calendar,
  }).find((article) => article.post_year === year && article.post_day === day);
};

/** Get all calendars, complete with the available years
 */
export const getCalendarsWithYears = () => {
  const allArticles = getAllArticles();
  const calendarsWithYears: { [calendarName: string]: number[] } = {};
  for (const article of allArticles) {
    calendarsWithYears[article.calendar] = unique([
      ...(calendarsWithYears[article.calendar] || []),
      article.post_year,
    ]);
  }

  return calendarsWithYears;
};

/** Returns unique members of an array */
function unique<Type>(array: Type[]) {
  return Array.from(new Set(array));
}
