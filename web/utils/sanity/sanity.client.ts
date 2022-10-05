import { createPreviewSubscriptionHook } from "next-sanity";
import { sanityConfig } from "./config";

/** Use the usePreviewSubscription hook to get preview details */
export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);
