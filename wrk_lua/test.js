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
      luaFile.push(`body = "${params[i].body}"\n`);
    }
    luaFile.push(`return wrk.format("${params[i].method}", "${params[i].route}", headers, body)
  end\n\n`);

    let r = params[i].ratio;

    while (r > 0) {
      luaFile.push(`requests[${reqCounter++}] = request${i}\n`);
      r--;
    }

    sumOfRatio += params[i].ratio;
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
  const bashFile = `#!/bin/bash
ulimit -n 65535
wrk -t${constants.threads} -c${constants.connections} -d${constants.test_duration} -s example.lua ${constants.rootUrl}

# Set executable permission for this script
chmod +x "$0"`;
  fs.writeFile('my_script.sh', `${bashFile}`, (err) => {
    if (err) throw err;
    console.log('The Bash file has been saved!');
  });
}

// const jsonCode = [
//   {
//     threads: 4,
//     test_duration: 10,
//     HTTP_request_density: 500,
//     connections: 5,
//     HTTP_root_URL: 'http://localhost:3333',
//   },
//   {
//     HTTP_Request_URL: 'https://google.com',
//     method: 'GET',
//     route: '/',
//     ratio: 1,
//   },
//   {
//     HTTP_Request_URL: 'https://google.com',
//     method: 'POST',
//     content_type: 'application/x-www-form-urlencoded',
//     body: 'item=tom+cat',
//     route: '/addTask',
//     ratio: 2,
//   },
// ];
