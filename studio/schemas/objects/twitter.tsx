import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { PreviewProps, SchemaTypeDefinition, defineType } from "sanity";

const getTweetId = (url?: string) => {
  if (!url) {
    return "";
  }
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split("/").pop();
};

type CastPreviewProps = PreviewProps & { url?: string };

const Preview = (props: PreviewProps) => {
  const { url } = props as CastPreviewProps;
  const id = getTweetId(url);
  if (!id) {
    return null;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TwitterTweetEmbed tweetId={id} />
    </div>
  );
};

const twitter = defineType({
  name: "twitter",
  type: "object",
  title: "Twitter Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Tweet URL",
      validation: (Rule) => Rule.required(),
    },
  ],
  components: { preview: Preview },
  preview: {
    select: {
      url: "url",
    },
  },
});

export default twitter;
