// const fs = require('fs');
import { promises as fs } from 'fs';

export function createLua(params) {
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
  fs.writeFile('example.lua', `${stringifyArr}`, (err) => {
    if (err) throw err;
    console.log('The Lua file has been saved!');
  });
}

export function createBash(constants) {
  console.log(constants);
  const bashFile = `#!/bin/bash
ulimit -n 65535
wrk -t${constants.numOfThreads} -c${constants.numOfUsers} -d${constants.testDuration} -s example.lua ${constants.rootUrl}`;
  fs.writeFile('my_script.sh', `${bashFile}`, (err) => {
    if (err) throw err;
    console.log('The Bash file has been saved!');
  });
}
