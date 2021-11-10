import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabase.client";

export default async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await supabaseClient.rpc("increment_page_view", {
      page_slug: req.query.slug,
    });
    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`,
    });
  }

  if (req.method === "GET") {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await supabaseClient.from("pages")
      .select("view_count")
      .filter("slug", "eq", req.query.slug);

    if (data) {
      return res.status(200).json({
        total: data[0]?.view_count || null,
      });
    }
  }

  return res.status(400).json({
    message: "Unsupported Request",
  });
}
