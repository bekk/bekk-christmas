import { defineType } from "sanity";

const infoBlock = defineType({
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
});

export default infoBlock;
