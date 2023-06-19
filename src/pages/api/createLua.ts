import type { NextApiRequest, NextApiResponse } from 'next';
// import { createLua } from './luaFileGenerator';
import { promises as fs } from 'fs';

export default async function luaScript(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const params = req.body;
    let luaFile = ['requests = {}\n\n'];
    let reqCounter = 0;
    let sumOfRatio = -1;
    for (let i = 0; i < params.length; i++) {
      luaFile.push(
      `request${i} = function()
      headers = {}
      headers["Content-Type"] = "${params[i].contentType}"
      `
      );
    if (params[i].body) {
      luaFile.push(`body = ${JSON.stringify(params[i].body)}\n`);
    }
    luaFile.push(`return wrk.format("${params[i].method}", "${params[i].route}", headers, body)
  end\n\n`);

    let r = params[i].ratio;

    while (r > 0) {
      luaFile.push(`requests[${reqCounter++}] = request${i}\n`);
      r--;
      sumOfRatio++;
    }

    luaFile.push('\n');
  }

  luaFile.push(`request = function()
  return requests[math.random(0, ${sumOfRatio})]()
end

response = function(status, headers, body)
  if status ~= 200 then
    io.write("------------------------------\\n")
    io.write("Response with status: ".. status .."\\n")
    io.write("------------------------------\\n")
    io.write("[response] Body:\\n")
    io.write(body .. "\\n")
  end
end`);
  let stringifyArr = luaFile.join('');
  fs.writeFile('wrkScript.lua', `${stringifyArr}`);
  res.status(200).send('lua file created successfully!');
  }  
  else {
    res.status(400).send('Invalid request method');
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
}
