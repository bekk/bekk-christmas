import React from "react";
import readingTime from "reading-time";
import { toPlainText } from "../../utils/sanity/utils";
import { HypeButton } from "../hype/HypeButton";
import { ArticleBody } from "./ArticleBody";
import { ArticleHeader } from "./ArticleHeader";

type ArticleProps = {
  /** The category shown at the top of the article, like "Article", "Podcast", "Information" etc */
  category: string;
  title?: string;
  description?: unknown[];
  content: unknown[];
  authors?: { fullName: string }[];
  publishedAt?: Date;
  coverImage?: string;
  showReadingTime?: boolean;
  showHype?: boolean;
};
export const Article = ({
  category,
  title = "",
  description = [],
  content,
  authors,
  publishedAt,
  coverImage,
  showReadingTime = false,
  showHype = false,
}: ArticleProps) => {
  const year = publishedAt?.getFullYear();
  const month =publishedAt?.getMonth() + 1;
  const day = publishedAt?.getDate();

  const publishedAtDate = publishedAt ? `${day}. ${month} ${year}` : undefined;
  return (
    <>
      <ArticleHeader />
      <ArticleBody
        title={title}
        category={category}
        readingTime={
          showReadingTime ? readingTime(toPlainText(content)).text : undefined
        }
        description={description}
        authors={authors}
        publishedAt={publishedAtDate}
        content={content}
        coverImage={coverImage ?? ""}
      />
      {showHype && <HypeButton position="fixed" bottom="1rem" left="1rem" />}
    </>
  );
};
