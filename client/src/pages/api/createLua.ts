import type { NextApiRequest, NextApiResponse } from 'next';
import { createLua } from '../../../../wrk_lua/luaFileGenerator';

export default async function scripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    createLua(req.body);
    res.status(200).send('lua file created successfully!');
  } else {
    res.status(400).send('Invalid request method');
  }
}
