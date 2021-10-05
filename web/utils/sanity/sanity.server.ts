import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

/** The Sanity client
 *
 * Note - should only be used server side!
 */
export const sanityClient = createClient(sanityConfig);

/** The Sanity preview mode client
 *
 * Note - should only be used server side!
 */
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  withCredentials: true,
  token: process.env.SANITY_READ_API_TOKEN,
});

export const writeClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_API_TOKEN,
});

export const authClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_SESSION_API_TOKEN,
});

/** Returns the correct client for preview or "regular" mode */
export const getClient = (isPreview: boolean = false) => (isPreview ? previewClient : sanityClient);

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
export const filterDataToSingleItem = (items: unknown, preview: boolean) => {
  if (!Array.isArray(items)) {
    return items;
  }

  console.log("items length", items.length);

  const lastIndex = items.length - 1;

  return items.length > 1 && preview
    ? items.filter((item) => item._id.startsWith(`drafts.`))[lastIndex]
    : items[lastIndex];
};
