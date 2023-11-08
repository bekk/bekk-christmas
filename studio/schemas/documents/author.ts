import { defineType } from "sanity";

const author = defineType({
  title: "Author",
  name: "author",
  type: "document",
  fields: [
    {
      title: "Full name",
      name: "fullName",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "fullName",
      },
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
});

export default author;
