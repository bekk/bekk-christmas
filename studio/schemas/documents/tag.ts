import { defineType } from "sanity";

const tag = defineType({
  title: "Tag",
  name: "tag",
  type: "document",
  fields: [
    {
      title: "Slug",
      name: "slug",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
      },
    },
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      title: "Synonyms",
      name: "synonyms",
      description: "Different spellings or alternative terms",
      type: "array",
      options: { layout: "tags" },
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
});

export default tag;
