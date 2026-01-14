const http = require("node:http");

let port = 3000;

const routingTable = {
  "GET /": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  },
  "GET /health": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("HEALTHY");
  },
};

const server = http.createServer((req, res) => {
  const protocol = "http://";
  const parsedUrl = new URL(req.url, `${protocol}${req.headers.host}`);
  if (`${req.method} ${parsedUrl.pathname}` === "GET /") {
    return routingTable["GET /"](req, res);
  }

  if (`${req.method} ${parsedUrl.pathname}` === "GET /health") {
    return routingTable["GET /health"](req, res);
  }

  if (req.method !== "GET") {
    res.writeHead(405);
    return res.end("Method Not Allowed");
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
