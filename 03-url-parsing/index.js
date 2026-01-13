const http = require("node:http");

let port = 3000;
const server = http.createServer((req, res) => {
  let newUrl = new URL(req.url, `http://localhost/${port}`);

  if (req.method != "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    return res.end("Method Not Allowed");
  }

  if (newUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }

  if (newUrl.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("HEALTHY");
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
