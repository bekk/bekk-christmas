import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { PreviewProps, defineType } from "sanity";

type CastPreviewProps = PreviewProps & { url?: string };

const Preview = (props: PreviewProps) => {
  const { url } = props as CastPreviewProps;
  const id = getYouTubeId(url ?? "");
  if (id) return <YouTube videoId={id} />;
  else return null;
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
  components: {
    preview: Preview,
  },
  preview: {
    select: {
      url: "url",
    },
  },
});

export default youtube;
