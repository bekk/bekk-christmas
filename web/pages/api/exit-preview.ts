import { NextApiHandler } from "next";

const exitPreviewHandler: NextApiHandler = (req, res) => {
  res.clearPreviewData();
  const { returnTo = "/" } = req.query;

  res.redirect(307, returnTo as string);
};

export default exitPreviewHandler;
