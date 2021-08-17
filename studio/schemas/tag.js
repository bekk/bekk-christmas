const tag = {
  title: "Tag",
  name: "tag",
  type: "document",
  fields: [
    {
      title: "Slug",
      name: "slug",
      type: "string",
    },
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Synonyms",
      name: "synonyms",
      description: "Different spellings or alternative terms",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
};

export default tag;
