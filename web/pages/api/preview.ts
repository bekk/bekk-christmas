import { NextApiHandler } from "next";

const previewApiHandler: NextApiHandler = (req, res) => {
  if (!req || !req.query) {
    return res
      .status(500)
      .json({ message: "Could not access request params. Internal error" });
  }

  const { secret, id, slug, type } = req.query as Record<
    string,
    string | undefined
  >;

  if (!secret) {
    return res.status(401).json({ message: "No secret token" });
  }

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret token" });
  }

  if (!id || !slug) {
    return res.status(401).json({ message: "No id or slug provided" });
  }

  if (!type) {
    return res.status(400).json({ message: "No type provided" });
  }

  if (!["post", "page"].includes(type)) {
    return res.status(400).json({
      message: "Posts and pages are the only things that supports preview yet",
    });
  }

  res.setPreviewData({});

  switch (type) {
    case "post": {
      res.redirect(307, `/posts/${id}`);
      break;
    }
    case "page": {
      res.redirect(307, `/${slug}`);
      break;
    }
    default: {
      res.status(400).json({ message: "Invalid type" });
      break;
    }
  }
};

export default previewApiHandler;
