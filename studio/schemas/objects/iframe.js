const iframe = {
  title: "Inline frame",
  name: "iframe",
  type: "object",
  fields: [
    {
      title: "Source URL",
      name: "src",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default iframe;
