import type { NextApiRequest, NextApiResponse } from 'next';
import { createBash } from '../../../../wrk_lua/test';

export default async function scripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.body)
    const bashCreated = createBash(req.body);
    res.status(200).send('bash file created successfully!')
  } else {
    res.status(400).send('Invalid request method');
  }
}