import { NextApiRequest, NextApiResponse } from "next";
import { getBoundedNumber } from "../../../utils/number";
import { slugify } from "../../../utils/slug";
import { supabaseClient } from "../../../utils/supabase.client";
export default async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const slug = slugify(req.query.slug as string);

    await supabaseClient.rpc("increment_hype", {
      page_slug: slug,
      additional_hype: getBoundedNumber(1, 50, req.body.hype),
    });
    return res.status(200).json({
      message: `Successfully incremented hype: ${req.query.slug}`,
    });
  }

  if (req.method === "GET") {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await supabaseClient
      .from("pages")
      .select("hype")
      .filter("slug", "eq", req.query.slug)
      .maybeSingle();

    return res.status(200).json({
      hype: data?.hype ?? 0,
    });
  }

  return res.status(400).json({
    message: "Unsupported Request",
  });
}
