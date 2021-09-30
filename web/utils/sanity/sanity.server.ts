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
  token: process.env.SANITY_API_TOKEN,
});
