import { defineType } from "sanity";

const post = defineType({
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "title",
      },
    },
    {
      title: "Description",
      description:
        "This is the excerpt, shown at the top of the page, as well as when shared on social media.",
      name: "description",
      type: "descriptionText",
    },
    {
      title: "Content",
      name: "content",
      type: "portableText",
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

export default post;
