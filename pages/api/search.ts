import { NextApiRequest, NextApiResponse } from "next";
import { getFuse } from "../../utils/data";

type Data = {
  results: string[];
};

const fuse = getFuse();

const search = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const results = fuse.search(req.query.q as string, { limit: 10 });
  res.end(JSON.stringify({ results }));
};

export default search;
