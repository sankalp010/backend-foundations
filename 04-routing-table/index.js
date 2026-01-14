const http = require("node:http");
const fs = require("fs");

let port = 3000;

const routingTable = {
  "GET /": (req, res) => {
    send(res, 200, "OK");
  },
  "GET /health": (req, res) => {
    send(res, 200, "HEALTHY");
  },
};

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const protocol = "http://";
  const parsedUrl = new URL(req.url, `${protocol}${req.headers.host}`);
  fs.appendFile(
    "./log.txt",
    `${Date.now()}: ${parsedUrl.pathname} New Request Received \n`,
    (err) => {
      console.log(`Error: ${err}`);
    }
  );

  let data = `${req.method} ${parsedUrl.pathname}`;
  let key = routingTable[data];
  if (key) {
    return key(req, res);
  }

  if (req.method !== "GET") {
    return send(res, 405, "Method Not Allowed");
  }

  return send(res, 404, "Not Found");
});

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
