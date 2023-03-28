// Next.js API route support: https://nextjs.org/docs/api-routes/introduction;
import type { NextApiRequest, NextApiResponse } from 'next';
import runScript from '../../../wrk_lua/execScripts';

export default async function scripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runScript(req, res);
  res.status(200).send('running script');
}
