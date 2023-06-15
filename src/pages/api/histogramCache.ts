// Next.js API route support: https://nextjs.org/docs/api-routes/introduction;
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function panels(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // shortcut to the database folder
  const dbUrl = path.join(process.cwd(), '/src/lib/');
  // get the request method
  const METHOD: string = req.method;
  // process the request based on the method
  switch (METHOD) {
    // if the request is a GET request, return the current traces from the database, which is a JSON file
    case 'GET':
      // read the file and return the JSON
      const tracesGET = await fs.readFile(
        dbUrl + '/histogramCache.json',
        'utf-8'
      );
      return res.status(200).json(tracesGET);
    // if the request is a POST request, add the new trace to the database
    case 'POST':
      // get the new trace from the request body
      const { newTrace } = req.body;
      // read the current traces from the database
      const tracesPOST = await fs.readFile(
        dbUrl + '/histogramCache.json',
        'utf-8'
      );
      const currentTraces = JSON.parse(tracesPOST);
      // add the new trace to the current traces
      currentTraces.push(newTrace);
      // write the new traces to the database
      await fs.writeFile(
        dbUrl + '/histogramCache.json',
        JSON.stringify(currentTraces)
      );
      // return a success message
      return res.status(200).json({ message: 'Successfully updated graph.' });
    // if the request is a DELETE request, delete the trace from the database
    case 'DELETE':
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
        (_: string, index: number) => traceIndex != index
      );

      await fs.writeFile(
        dbUrl + '/histogramCache.json',
        JSON.stringify(newTraces)
      );
      
      return res.status(200).json({ message: 'Successfully reseted graph.' });

    default:
  }
}
