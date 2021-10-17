import React from "react";
import readingTime from "reading-time";
import { toPlainText } from "../../utils/sanity/utils";
import { ArticleBody } from "./ArticleBody";
import { ArticleContainer } from "./ArticleContainer";
import { ArticleHeader } from "./ArticleHeader";
type ArticleProps = {
  /** The category shown at the top of the article, like "Article", "Podcast", "Information" etc */
  category: string;
  title?: string;
  description?: string;
  content: unknown[];
  authors?: { fullName: string }[];
  publishedAt?: Date;
  showReadingTime?: boolean;
};
export const Article = ({
  category,
  title = "",
  description = "",
  content,
  authors,
  publishedAt,
  showReadingTime = false,
}: ArticleProps) => {
  return (
    <ArticleContainer>
      <ArticleHeader
        title={title}
        category={category}
        readingTime={
          showReadingTime ? readingTime(toPlainText(content)).text : undefined
        }
      />
      <ArticleBody
        description={description}
        authors={authors}
        publishedAt={publishedAt?.toLocaleDateString("nb-NO")}
        content={content}
      />
    </ArticleContainer>
  );
};
