import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabase.client";
export default async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await supabaseClient.rpc("increment_hype", {
      page_slug: req.query.slug,
      additional_hype: req.body.hype,
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
