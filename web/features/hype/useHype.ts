import { useRouter } from "next/router";
import React, { useState } from "react";
import { slugify } from "../../utils/slug";

export const useHype = () => {
  const router = useRouter();
  const slug = slugify(router.asPath.split("?")[0]);
  const [serverHype, setServerHype] = useState(0);

  const fetchHype = React.useCallback(async () => {
    const response = await fetch(`/api/${slug}/hype`);
    const { hype } = await response.json();
    setServerHype(hype);
  }, [slug]);

  // Automatically refetch the hype everytime the slug changes
  React.useEffect(() => {
    fetchHype();
  }, [fetchHype]);

  const addHype = async (hypeToAdd: number) => {
    try {
      await fetch(`/api/${slug}/hype`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hype: hypeToAdd }),
      });
      await fetchHype();
    } catch (e) {
      console.error("Could not save hype", e);
    }
  };

  return { serverHype, addHype };
};
