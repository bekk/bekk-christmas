import { NextApiHandler } from "next";

const previewApiHandler: NextApiHandler = (req, res) => {
  if (!req || !req.query) {
    return res
      .status(500)
      .json({ message: "Could not access request params. Internal error" });
  }

  const { secret, id, type } = req.query as Record<string, string | undefined>;

  if (!secret) {
    return res.status(401).json({ message: "No secret token" });
  }

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret token" });
  }

  if (!id) {
    return res.status(401).json({ message: "No id provided" });
  }

  if (!type) {
    return res.status(400).json({ message: "No type provided" });
  }

  if (type !== "post") {
    return res
      .status(400)
      .json({ message: "Posts are the only thing that supports preview yet" });
  }

  res.setPreviewData({});

  res.redirect(307, `/post/${id}`);
};

export default previewApiHandler;
