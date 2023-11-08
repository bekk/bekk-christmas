import { defineType } from "sanity";

const codePen = defineType({
  type: "object",
  name: "codePen",
  title: "CodePen embed",
  fields: [
    {
      name: "url",
      type: "url",
      description: "The CodePen url",
      validation: (rule) => rule.required(),
    },
  ],
});

export default codePen;
