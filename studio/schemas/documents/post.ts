import { defineType } from "sanity";

const post = defineType({
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    {
      title: "Type of content",
      description: "Pick what kind of content you're creating.",
      name: "type",
      type: "string",
      initialValue: "article",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Video", value: "video" },
          { title: "Podcast", value: "podcast" },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      title: "Language",
      name: "language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en-US" },
          { title: "Norwegian (Bokmål)", value: "nb-NO" },
          { title: "Norwegian (Nynorsk)", value: "nn-NO" },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      title: "Embed URL",
      description:
        "If you're uploading a video or a podcast, you need to upload your content to somebody who knows what they're doing. Upload podcasts to anchor.fm, and videos to vimeo.com. If you need access, contact Kristofer G. Selbekk.",
      name: "embedUrl",
      type: "url",
      validation: (rule) =>
        rule.custom((url: string | undefined, context) => {
          const postType = context.document?.type as string;
          if (["podcast", "video"].includes(postType) && !url) {
            return "A URL to embed is required";
          }
          if (
            postType === "video" &&
            !url?.startsWith("https://player.vimeo.com")
          ) {
            return "Get the embed URL, not the regular URL. It should start with player.vimeo.com/video";
          }
          return true;
        }),
      hidden: ({ document }) => {
        return document?.type === "article";
      },
    },
    {
      title: "Podcast length",
      description:
        "The length of the podcast in minutes. You can find this on Anchor",
      name: "podcastLength",
      type: "number",
      validation: (rule) =>
        rule.custom((length, context) => {
          if (context.document?._type !== "podcast") {
            return true;
          }
          return length ? true : "Please specify the length of the podcast";
        }),
      hidden: ({ document }) => {
        return document?.type !== "podcast";
      },
    },
    {
      title: "Title",
      description: "Make it snappy!",
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      title: "Slug",
      description:
        "The slug is used in the URL. The complete URL will be `/post/{year}/{day}/{slug}`",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "canonicalUrl",
      type: "url",
      title: "Canonical URL",
      description:
        "If the content has been posted elsewhere originally, please specify the original (canonical) url here.",
    },
    {
      title: "Description",
      description:
        "This is the excerpt, shown at the top of the page, as well as when shared on social media.",
      name: "description",
      type: "descriptionText",
    },
    {
      title: "Authors",
      description: "Remember to add yourself as an author as well!",
      name: "authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
    },
    {
      title: "Cover image",
      name: "coverImage",
      type: "image",
      fields: [
        {
          title: "Image source",
          name: "src",
          type: "string",
        },
        {
          title: "Hide from post",
          description:
            "Check this if you only want the image to show up on the daily summary page, not in your own post",
          name: "hideFromPost",
          type: "boolean",
        },
      ],
    },
    {
      title: "Available from",
      name: "availableFrom",
      description:
        "The date the post was or will be posted. If you don't know, just let this be as is, and somebody will do this for you :)",
      type: "date",
      validation: (rule) => rule.required(),
      initialValue: `${new Date().getUTCFullYear()}-12-25`,
    },
    {
      title: "Category",
      name: "tags",
      description:
        "Choose a main category for your post. Or add a new one, if you can't find the perfect one",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
    },
    {
      title: "Searcahable keywords",
      name: "keywords",
      description:
        "These are keywords people might want to search for to find your article. By default we'll include the title and category.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Content",
      name: "content",
      type: "portableText",
      validation: (rule) => rule.required(),
    },
    {
      title: "Related links",
      name: "relatedLinks",
      description: "Recommended reading or links from the post",
      type: "array",
      of: [
        {
          title: "Related link",
          name: "relatedLink",
          type: "object",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
              title: "Description",
              name: "description",
              type: "string",
            },
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
      ],
    },
    {
      title: "Priority",
      name: "priority",
      description:
        "Defines the ordering of posts in certain lists. Higher number means higher priority",
      type: "number",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "title",
      tag: "tags.0.name",
      author: "authors.0.fullName",
      extraAuthor: "authors.1.fullName",
      media: "coverImage",
    },
    prepare({ title, tag, author, extraAuthor, media }) {
      const authors = extraAuthor ? `${author}, ${extraAuthor}` : author;
      return {
        title: title,
        subtitle: `${authors} – ${tag || "No category 🤷"}`,
        media: media,
      };
    },
  },
});

export default post;
