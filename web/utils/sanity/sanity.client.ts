import {
  createCurrentUserHook,
  createPreviewSubscriptionHook,
} from "next-sanity";
import { sanityConfig } from "./config";

/** Use the usePreviewSubscription hook to get preview details */
export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);

/** Gets the logged in Sanity user (if any) */
export const useCurrentUser = createCurrentUserHook(sanityConfig);
