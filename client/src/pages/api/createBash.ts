import type { NextApiRequest, NextApiResponse } from 'next';
import { createBash } from '../../../../wrk_lua/luaFileGenerator';

export default async function scripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    createBash(req.body);
    res.status(200).send('bash file created successfully!');
  } else {
    res.status(400).send('Invalid request method');
  }
}
