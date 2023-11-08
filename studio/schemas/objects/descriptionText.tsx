import { defineType } from "sanity";

const descriptionText = defineType({
  name: "descriptionText",
  type: "array",
  title: "Description content",
  of: [
    {
      type: "block",
      title: "Block",
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
  ],
});

export default descriptionText;
