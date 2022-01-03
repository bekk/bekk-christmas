import React from "react";
import { BasePostItemType, PostItem } from "./PostItem";

export interface VideoItemType extends BasePostItemType {
  type: "video";
  embedUrl: string;
}

export const VideoItem = (props: VideoItemType) => {
  return (
    <PostItem
      availableFrom={props.availableFrom}
      consumptionTime="Video"
      title={props.title}
      slug={props.slug}
      tags={props.tags}
      coverImage={props.coverImage}
      description={props.description}
    />
  );
};
