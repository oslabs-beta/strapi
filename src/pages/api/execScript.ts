import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default async function scripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  exec('ls', (err) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
  });
  exec('chmod +x execWrk2Script.sh', (err) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
  });
  exec('./execWrk2Script.sh', (err) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
  });
  res.status(200).send('running script');
}
