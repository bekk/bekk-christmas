import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  results: string[],
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results: ['lorem', 'ipsum'] }));
}
