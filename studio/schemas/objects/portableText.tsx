import {
  FiCodepen,
  FiCodesandbox,
  FiInfo,
  FiLink2,
  FiSquare,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { defineType } from "sanity";

const portableText = defineType({
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
          { title: "Bash", value: "bash" },
          { title: "Clojure", value: "clojure" },
          { title: "Common Lisp", value: "lisp" },
          { title: "CSS", value: "css" },
          { title: "Diff", value: "diff" },
          { title: "Elm", value: "elm" },
          { title: "C#", value: "csharp" },
          { title: "F#", value: "fsharp" },
          { title: "Haskell", value: "haskell" },
          { title: "HTML", value: "html" },
          { title: "LESS", value: "less" },
          { title: "Java", value: "java" },
          { title: "JS / JSX", value: "jsx" },
          { title: "JSON", value: "json" },
          { title: "Kotlin", value: "kotlin" },
          { title: "NIX", value: "nix" },
          { title: "Plain text", value: "text" },
          { title: "Python", value: "python" },
          { title: "Rust", value: "rust" },
          { title: "Scala", value: "scala" },
          { title: "SCSS", value: "scss" },
          { title: "Swift", value: "swift" },
          { title: "TS / TSX", value: "tsx" },
        ],
      },
    },
    { type: "codeSandbox", icon: FiCodesandbox },
    { type: "codePen", icon: FiCodepen },
    { type: "youtube", icon: FiYoutube },
    { type: "twitter", icon: FiTwitter },
    { type: "iframe", icon: FiSquare },
    { type: "infoBlock", icon: FiInfo },
    { type: "unfurledUrl", icon: FiLink2 },
  ],
});

export default portableText;
