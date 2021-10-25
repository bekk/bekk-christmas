import { NextApiHandler } from "next";

const previewApiHandler: NextApiHandler = (req, res) => {
  if (!req || !req.query) {
    return res
      .status(500)
      .json({ message: "Could not access request params. Internal error" });
  }

  const { secret, url } = req.query as Record<string, string | undefined>;

  if (!secret) {
    return res.status(401).json({ message: "No secret token" });
  }

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret token" });
  }

  if (!url) {
    return res.status(401).json({ message: "No URL provided" });
  }

  res.setPreviewData({});

  res.redirect(307, url);
};

export default previewApiHandler;
