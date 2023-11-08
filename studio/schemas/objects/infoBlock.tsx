import { SchemaTypeDefinition } from "sanity";

const infoBlock: SchemaTypeDefinition = {
  title: "Info block",
  description: "A light green block",
  name: "infoBlock",
  type: "object",
  fields: [
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    },
  ],
};

export default infoBlock;
