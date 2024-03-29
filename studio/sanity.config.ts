import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import deskStructure, { defaultDocumentNode } from "./deskStructure";
import schemas from "./schemas/schema";
import { media } from "sanity-plugin-media";
import resolveProductionUrl from "./resolveProductionUrl";

export default defineConfig({
  title: "bekk-christmas",
  projectId: "ah2n1vfr",
  dataset: "production",
  plugins: [
    deskTool({
      defaultDocumentNode,
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    codeInput(),
  ],
  schema: {
    types: schemas,
  },
  document: {
    productionUrl: async (_, context) => resolveProductionUrl(context.document),
  },
  auth: {
    redirectOnSingle: true,
    mode: "replace",
    providers: [
      {
        name: "bekk-login",
        title: "Logg inn med Bekk",
        url: "https://bekk-christmas.vercel.app/api/auth/login",
        logo: "static/logo.svg",
      },
    ],
  },
});
