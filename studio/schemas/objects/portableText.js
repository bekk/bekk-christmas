import {
  FiCodepen,
  FiCodesandbox,
  FiSquare,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
export default {
  name: "portableText",
  type: "array",
  title: "Post body",
  of: [
    {
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
    {
      type: "imageWithMetadata",
      options: { hotspot: true },
    },
    {
      type: "code",
      options: {
        languageAlternatives: [
          { title: "CSS", value: "css" },
          { title: "HTML", value: "html" },
          { title: "JSON", value: "json" },
          { title: "JSX", value: "jsx" },
          { title: "Markdown", value: "markdown" },
          { title: "Plain text", value: "text" },
          { title: "Elm", value: "elm" },
          // TODO: Her må vi legge til flere språk
        ],
      },
    },
    { type: "codeSandbox", icon: FiCodesandbox },
    { type: "codePen", icon: FiCodepen },
    { type: "youtube", icon: FiYoutube },
    { type: "twitter", icon: FiTwitter },
    { type: "iframe", icon: FiSquare },
  ],
};
