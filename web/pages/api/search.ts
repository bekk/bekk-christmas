import { NextApiHandler } from "next";
import sanity from "../../utils/sanity";
type Data = {
  results: string[];
};

const search: NextApiHandler<Data> = async (req, res) => {
  const searchString = req.query.q as string;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const results = await sanity.fetch()
  res.end(JSON.stringify({ results }));
};

const query = groq

export default search;
