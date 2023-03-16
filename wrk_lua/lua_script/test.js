const fs = require('fs');

const jsonCode = [
  {
    threads: 4,
    test_duration: 10,
    HTTP_request_density: 500,
    connections: 5,
    HTTP_root_URL: 'http://localhost:3333',
  },
  {
    HTTP_Request_URL: 'https://google.com',
    method: 'GET',
    route: '/',
    ratio: 1,
  },
  {
    HTTP_Request_URL: 'https://google.com',
    method: 'POST',
    content_type: 'application/x-www-form-urlencoded',
    body: 'item=tom+cat',
    route: '/addTask',
    ratio: 2,
  },
];
export function createLua(jsonArr) {
  let luaFile = ['requests = {}\n\n'];
  let reqCounter = 0;
  let sumOfRatio = -1;
  for (let i = 0; i < jsonArr.length; i++) {
    luaFile.push(
      `request${i} = function()
  headers = {}
  headers["Content-Type"] = "${jsonArr[i].content_type}"
  `
    );
    if (jsonArr[i].body) {
      luaFile.push(`body = "${jsonArr[i].body}"\n`);
    }
    luaFile.push(`return wrk.format("${jsonArr[i].method}", "${jsonArr[i].route}", headers, body)
  end\n\n`);

    let r = jsonArr[i].ratio;

    while (r > 0) {
      luaFile.push(`requests[${reqCounter++}] = request${i}\n`);
      r--;
    }

    sumOfRatio += jsonArr[i].ratio;
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

  luaFile = luaFile.join('');
  fs.writeFile('example.lua', `${luaFile}`, (err) => {
    if (err) throw err;
    console.log('The Lua file has been saved!');
  });
}

createLua(jsonCode);

export function createBash(wrkScriptContents) {
  const bashFile = `#!/bin/bash
wrk -t${jsonArr.threads} -c${jsonArr.connections} -d${jsonArr.test_duration} -s example.lua ${jsonArr.HTTP_root_URL}

# Set executable permission for this script
chmod +x "$0"`;
  fs.writeFile('my_script.sh', `${bashFile}`, (err) => {
    if (err) throw err;
    console.log('The Bash file has been saved!');
  });
}
