import getYouTubeId from "get-youtube-id";
import React from "react";
import YouTube from "react-youtube";

const Preview = ({ value }) => {
  const { url } = value;
  const id = getYouTubeId(url);
  return <YouTube videoId={id} />;
};

export default {
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: Preview,
  },
};
