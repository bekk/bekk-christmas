const tag = {
  title: "Tag",
  name: "tag",
  type: "document",
  fields: [
    {
      title: "Slug",
      name: "slug",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
};

export default tag;
