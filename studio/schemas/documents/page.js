const post = {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    },
    {
      title: "Description",
      description:
        "This is the excerpt, shown at the top of the page, as well as when shared on social media.",
      name: "description",
      type: "text",
    },
    {
      title: "Content",
      name: "content",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default post;
