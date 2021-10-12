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
          { title: "Email", name: "email" },
          { title: "GitHub", name: "gitHub" },
          { title: "Medium", name: "medium" },
          { title: "Twitter", name: "twitter" },
          { title: "Website", name: "website" },
          { title: "LinkedIn", name: "linkedIn" },
          { title: "Instagram", name: "instagram" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default socialMediaLink;
