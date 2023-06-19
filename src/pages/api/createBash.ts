import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

export default async function bashScripts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const constants = req.body;
    const bashFile = `#!/bin/bash
    ulimit -n 65535
    wrk2 -t${constants.numOfThreads} -c${constants.numOfUsers} -d${constants.testDuration} -s wrkScript.lua -L -R${constants.throughput} ${constants.rootUrl} > result.txt`;
      fs.writeFile('execWrk2Script.sh', `${bashFile}`);
    res.status(200).send('bash file created successfully!');
  } else {
    res.status(400).send('Invalid request method');
  }
}
