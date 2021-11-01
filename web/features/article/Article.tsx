import React from "react";
import readingTime from "reading-time";
import { toPlainText } from "../../utils/sanity/utils";
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
}: ArticleProps) => {
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
        publishedAt={publishedAt?.toLocaleDateString("nb-NO")}
        content={content}
        coverImage={coverImage ?? ""}
      />
    </>
  );
};
