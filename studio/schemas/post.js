const post = {
  title: "Post",
  name: "post",
  type: "document",
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
      title: "Authors",
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
      type: "array",
      of: [
        { type: "block" },
        { type: "iframe" },
        { type: "code" },
        {
          type: "image",
          fields: [
            {
              title: "Alternative text",
              name: "alt",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};

export default post;
