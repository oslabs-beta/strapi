// Next.js API route support: https://nextjs.org/docs/api-routes/introduction;
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function panels(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbUrl = path.join(process.cwd(), '/src/lib/');

  const METHOD: string | undefined = req.method;

  switch (METHOD) {
    case 'GET':
      const urlsGET = await fs.readFile(dbUrl + '/grafanaUrls.json', 'utf-8');
      return res.status(200).json(urlsGET);

    case 'POST':
      const { newUrl } = req.body;
      const urlsPOST = await fs.readFile(dbUrl + '/grafanaUrls.json', 'utf-8');
      const currentUrls = JSON.parse(urlsPOST);
      currentUrls.push(newUrl);
      await fs.writeFile(
        dbUrl + '/grafanaUrls.json',
        JSON.stringify(currentUrls)
      );
      return res.status(200).json({ message: 'Successfully added panel.' });

    case 'DELETE':
      const { urlIndex } = req.body;
      const urlsDELETE = await fs.readFile(
        dbUrl + '/grafanaUrls.json',
        'utf-8'
      );

      const allUrls = JSON.parse(urlsDELETE);

      const newUrls = allUrls.filter(
        (url: string, index: number) => urlIndex != index
      );

      // save newUrls to file
      await fs.writeFile(dbUrl + '/grafanaUrls.json', JSON.stringify(newUrls));
      return res.status(200).json({ message: 'Successfully deleted panel.' });

    default:
  }
}
