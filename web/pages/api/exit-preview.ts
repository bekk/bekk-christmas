import { NextApiHandler } from "next";

const exitPreviewHandler: NextApiHandler = (req, res) => {
  res.clearPreviewData();

  res.writeHead(307, { Location: req?.query?.slug ?? `/` });
};

export default exitPreviewHandler;
