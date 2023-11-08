import { PreviewLink } from "@opengraphninja/react";
import "@opengraphninja/react/styles.css?raw";
import { PreviewProps, defineType } from "sanity";

type CastPreviewProps = PreviewProps & { href?: string };

const Preview = (props: PreviewProps) => {
  const { href } = props as CastPreviewProps;
  if (!href) return null;
  try {
    new URL(href);
    return <PreviewLink href={href} />;
  } catch (e) {
    // not a valid URL, render nothing
    return null;
  }
};

const unfurledUrl = defineType({
  type: "object",
  name: "unfurledUrl",
  title: "Unfurled URL",
  fields: [
    {
      name: "url",
      type: "url",
      description: "The URL to unfurl",
      validation: (rule) => rule.required(),
    },
  ],
  components: {
    preview: Preview,
  },
  preview: {
    select: {
      href: "url",
    },
  },
});

export default unfurledUrl;
