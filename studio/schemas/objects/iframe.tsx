import { SchemaTypeDefinition } from "sanity";

const iframe: SchemaTypeDefinition = {
  title: "Inline frame",
  name: "iframe",
  type: "object",
  fields: [
    {
      title: "Source URL",
      name: "src",
      type: "url",
      validation: (rule) => rule.required(),
    },
    {
      title: "Height",
      description: "Set the height you want in pixels",
      name: "height",
      type: "number",
    },
  ],
};

export default iframe;
