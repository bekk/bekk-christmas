import { Box } from "@chakra-ui/react";
import React from "react";
import readingTime from "reading-time";
import { toPlainText } from "../../utils/sanity/utils";
import { HypeButton } from "../hype/HypeButton";
import { ArticleBody } from "./ArticleBody";
import { ArticleHeader } from "./ArticleHeader";

const formatter = Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

type ArticleProps = {
  /** The category shown at the top of the article, like "Article", "Podcast", "Information" etc */
  category?: string;
  type?: "article" | "podcast" | "video";
  embedUrl?: string;
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
  type = "article",
  embedUrl,
  title = "",
  description = [],
  content,
  authors,
  publishedAt,
  coverImage,
  showReadingTime = false,
  showHype = false,
}: ArticleProps) => {
  const publishedAtDate = formatter.format(publishedAt);

  const [isScrolledToTop, setScrolledToTop] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      color="brand.black"
      backgroundColor={isScrolledToTop ? "brand.pink" : "white"}
      transition="background-color .5s ease-out"
    >
      <ArticleHeader />
      <ArticleBody
        type={type}
        embedUrl={embedUrl}
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
    </Box>
  );
};
