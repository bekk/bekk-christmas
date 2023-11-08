import { defineType } from "sanity";

const codeSandbox = defineType({
  type: "object",
  name: "codeSandbox",
  title: "Code Sandbox embed",
  fields: [
    {
      name: "url",
      type: "url",
      description: "The Code Sandbox url",
      validation: (rule) => rule.required(),
    },
  ],
});

export default codeSandbox;
