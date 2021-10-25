const post = {
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    {
      title: "Title",
      description: "Make it snappy!",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      description:
        "The slug is used in the URL. The complete URL will be `/post/{year}/{day}/{slug}`",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      title: "Description",
      description:
        "This is the excerpt, shown at the top of the article, as well as when shared on social media. Keep it short!",
      name: "description",
      type: "text",
    },
    {
      title: "Authors",
      description: "Remember to add yourself as an author as well!",
      name: "authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
    },
    {
      title: "Cover image",
      name: "coverImage",
      type: "image",
      fields: [
        {
          title: "Image source",
          name: "src",
          type: "string",
        },
      ],
    },
    {
      title: "Available from",
      name: "availableFrom",
      description: "The date the post was or will be posted",
      type: "date",
      validation: (Rule) => Rule.required(),
      initialValue: `${new Date().getUTCFullYear()}-12-01`,
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
    },
    {
      title: "Related links",
      name: "relatedLinks",
      description: "Recommended reading or links from the post",
      type: "array",
      of: [
        {
          title: "Related link",
          name: "relatedLink",
          type: "object",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
              title: "Description",
              name: "description",
              type: "string",
            },
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
      ],
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
      tag: "tags.0.name",
      author: "authors.0.fullName",
      extraAuthor: "authors.1.fullName",
      media: "coverImage",
    },
    prepare({ title, tag, author, extraAuthor, media }) {
      const authors = extraAuthor ? `${author}, ${extraAuthor}` : author;
      return {
        title: title,
        subtitle: `${authors} – ${tag || "No category 🤷"}`,
        media: media,
      };
    },
  },
};

export default post;
