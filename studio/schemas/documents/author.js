const author = {
  title: "Author",
  name: "author",
  type: "document",
  fields: [
    {
      title: "Full name",
      name: "fullName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Company name",
      name: "companyName",
      type: "string",
      initialValue: "Bekk",
    },
    {
      title: "Profile picture",
      name: "profilePicture",
      type: "string",
    },
    {
      title: "Social media links",
      name: "socialMediaLinks",
      type: "array",
      of: [{ type: "socialMediaLink" }],
    },
  ],
};

export default author;