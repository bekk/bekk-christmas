const socialMediaLink = {
  title: "Social media link",
  name: "socialMediaLink",
  type: "object",
  fields: [
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "GitHub", value: "gitHub" },
          { title: "Medium", value: "medium" },
          { title: "Twitter", value: "twitter" },
          { title: "Website", value: "website" },
          { title: "LinkedIn", value: "linkedIn" },
          { title: "Instagram", value: "instagram" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "URL",
      name: "url",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default socialMediaLink;
