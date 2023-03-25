import type { NextApiRequest, NextApiResponse } from 'next';
import Histogram from '../../../wrk_lua/Histogram';

export default async function histogram(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data = Histogram();
    console.log(data)
    res.status(200).json(data);
  } else {
    res.status(400).send('Invalid request method');
  }
}
