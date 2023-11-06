export default {
  type: "object",
  name: "codePen",
  title: "CodePen embed",
  fields: [
    {
      name: "url",
      type: "url",
      description: "The CodePen url",
      validation: (Rule) => Rule.required(),
    },
  ],
};
