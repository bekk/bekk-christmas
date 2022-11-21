const infoBlock = {
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
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default infoBlock;
