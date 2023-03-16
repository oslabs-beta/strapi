requests = {}

request1 = function()
  headers = {}
  headers["Content-Type"] = "undefined"
  body = ""
  return wrk.format("GET", "/", headers, body)
  end

requests[0] = request1

request2 = function()
  headers = {}
  headers["Content-Type"] = "application/x-www-form-urlencoded"
  body = "item=tom+cat"
return wrk.format("POST", "/addTask", headers, body)
  end

requests[1] = request2
requests[2] = request2

request = function()
  return requests[math.random(0, 2)]()
end

response = function(status, headers, body)
  if status ~= 200 then
    io.write("------------------------------\n")
    io.write("Response with status: ".. status .."\n")
    io.write("------------------------------\n")
    io.write("[response] Body:\n")
    io.write(body .. "\n")
  end
end