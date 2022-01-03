import React from "react";
import readingTime from "reading-time";
import { BasePostItemType, PostItem } from "./PostItem";

export interface ArticleItemType extends BasePostItemType {
  type?: "article";
  embedUrl: string;
  plaintextContent: string;
}

export const ArticleItem = (props: ArticleItemType) => {
  return (
    <PostItem
      availableFrom={props.availableFrom}
      consumptionTime={readingTime(props.plaintextContent || "").text}
      title={props.title}
      slug={props.slug}
      tags={props.tags}
      coverImage={props.coverImage}
      description={props.description}
    />
  );
};
