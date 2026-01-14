const http = require("node:http");
const fs = require("fs");

let port = 3000;

const routingTable = {
  "GET /": (req, res) => {
    res.end("OK");
  },
  "GET /health": (req, res) => {
    res.end("HEALTHY");
  },
};

function statusHandler(res, status) {
  res.writeHead(status, { "Content-Type": "text/plain" });
}

const server = http.createServer((req, res) => {
  const protocol = "http://";
  const parsedUrl = new URL(req.url, `${protocol}${req.headers.host}`);
  fs.appendFile(
    "./log.txt",
    `${Date.now()}: ${parsedUrl.pathname} New Request Received \n`,
    (err) => {
      err;
    }
  );

  let data = `${req.method} ${parsedUrl.pathname}`;
  let key = routingTable[data];
  if (key) {
    statusHandler(res, 200);
    return key(req, res);
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
