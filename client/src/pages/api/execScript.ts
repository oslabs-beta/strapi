// Next.js API route support: https://nextjs.org/docs/api-routes/introduction;
import type { NextApiRequest, NextApiResponse } from 'next';
import runScript from '../../../../wrk_lua/run_script';

export default async function scripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    runScript(req, res);
    // res.status(200).send('Script executing...')
  } else {
    res.status(400).send('Invalid request method');
  }
}
