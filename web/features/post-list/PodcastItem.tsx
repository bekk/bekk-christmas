import React from "react";
import { BasePostItemType, PostItem } from "./PostItem";

export interface PodcastItemType extends BasePostItemType {
  type: "podcast";
  embedUrl: string;
}

export const PodcastItem = (props: PodcastItemType) => {
  return (
    <PostItem
      availableFrom={props.availableFrom}
      readingTime="Podcast"
      title={props.title}
      slug={props.slug}
      tags={props.tags}
      coverImage={props.coverImage}
      description={props.description}
    />
  );
};
