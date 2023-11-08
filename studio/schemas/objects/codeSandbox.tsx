import { SchemaTypeDefinition } from "sanity";

const codeSandbox: SchemaTypeDefinition = {
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
};

export default codeSandbox;
