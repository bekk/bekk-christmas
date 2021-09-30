import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const getTweetId = (url?: string) => {
  if (!url) {
    return "";
  }
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split("/").pop();
};

export const TwitterBlock = ({ node }: any) => {
  const id = getTweetId(node?.url ?? null);
  if (!id) return null;
  return <TwitterTweetEmbed tweetId={id} />;
};
