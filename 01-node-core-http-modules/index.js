//02
const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
  }
});

let port = 3000;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
