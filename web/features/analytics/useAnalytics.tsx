import { useRouter } from "next/router";
import React from "react";
import { slugify } from "../../utils/slug";

export const useAnalytics = () => {
  const router = useRouter();
  const trackPageView = (url: string) => {
    const safeUrl = slugify(url);
    if (process.env.NODE_ENV === "production") {
      fetch(`/api/${safeUrl}/views`, {
        method: "POST",
      });
    }
  };
  React.useEffect(() => {
    trackPageView(router.asPath);
  }, [router.asPath]);
};
