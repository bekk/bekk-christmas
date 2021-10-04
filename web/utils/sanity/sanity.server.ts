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
