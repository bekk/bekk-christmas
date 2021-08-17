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
          { title: "GitHub", name: "gitHub" },
          { title: "Twitter", name: "twitter" },
          { title: "Website", name: "website" },
          { title: "Facebook", name: "facebook" },
          { title: "LinkedIn", name: "linkedIn" },
          { title: "Instagram", name: "instagram" },
        ],
      },
    },
    {
      title: "URL",
      name: "url",
      type: "url",
    },
  ],
};

export default socialMediaLink;
