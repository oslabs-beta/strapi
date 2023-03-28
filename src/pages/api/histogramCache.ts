// Next.js API route support: https://nextjs.org/docs/api-routes/introduction;
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function panels(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbUrl = path.join(process.cwd(), '/src/lib/');

  const METHOD: string = req.method;

  switch (METHOD) {
    case 'GET':
      console.log('GET REQUEST RECEIVED');
      const tracesGET = await fs.readFile(dbUrl + '/histogramCache.json', 'utf-8');
      return res.status(200).json(tracesGET);

    case 'POST':
      console.log('POST REQUEST RECEIVED');
      const { newTrace } = req.body;
      const tracesPOST = await fs.readFile(dbUrl + '/histogramCache.json', 'utf-8');
      const currentTraces = JSON.parse(tracesPOST);
      currentTraces.push(newTrace);
      await fs.writeFile(
        dbUrl + '/histogramCache.json',
        JSON.stringify(currentTraces)
      );
      return res.status(200).json({ message: 'Successfully updated graph.' });

    case 'DELETE':
      console.log('DELETE REQUEST RECEIVED');
      const { traceIndex } = req.body;
      // if traceIndex is -1, delete all traces
      if (traceIndex === -1) {
        await fs.writeFile(dbUrl + '/histogramCache.json', JSON.stringify([]));
        return res.status(200).json({ message: 'Successfully reseted graph.' });
      }
      const tracesDELETE = await fs.readFile(
        dbUrl + '/histogramCache.json',
        'utf-8'
      );
      const allTraces = JSON.parse(tracesDELETE);
      const newTraces = allTraces.filter(
        (trace: string, index: number) => traceIndex != index
      );
    //   const newTraces = [];
      await fs.writeFile(
        dbUrl + '/histogramCache.json',
        JSON.stringify(newTraces)
      )
    //   console.log(newTraces);
      return res.status(200).json({ message: 'Successfully reseted graph.' });

    default:
      console.log('COULD NOT PROCESS REQUEST');
  }
}
