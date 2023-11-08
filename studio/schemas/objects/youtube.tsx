import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { SchemaTypeDefinition, defineType } from "sanity";

const Preview = ({ value }: Record<string, any>) => {
  const { url } = value;
  const id = getYouTubeId(url);
  return <YouTube videoId={id ?? undefined} />;
};

const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: Preview,
  },
});

export default youtube;
