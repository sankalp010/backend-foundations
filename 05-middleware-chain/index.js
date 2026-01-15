const http = require("node:http");
const fs = require("fs");

let port = 3000;

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(body);
}

const routingTable = {
  "GET /": (req, res) => {
    send(res, 200, "OK");
  },
  "GET /health": (req, res) => {
    send(res, 200, "HEALTHY");
  },
};

function loggerMiddleware(req, res, next) {
  let log = `${req.method} ${req.url}\n`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
  next();
}

function methodMiddleware(req, res, next) {
  if (req.method !== "GET") {
    send(res, 405, "Method Not Allowed");
    return;
  }
  next();
}

function routerMiddleware(req, res, next) {
  let protocol = "https://";
  const url = `${protocol}${req.headers.host}`;
  const parsedUrl = new URL(req.url, url);
  let key = `${req.method} ${parsedUrl.pathname}`;
  let data = routingTable[key];

  if (!data) {
    send(res, 404, "Not Found");
    return;
  }
  data(req, res);
}

const middlewares = [loggerMiddleware, methodMiddleware, routerMiddleware];

function runMiddleware(req, res, middlewares) {
  let index = 0;
  function next() {
    const middleware = middlewares[index++];
    if (!middleware) return;
    middleware(req, res, next);
  }
  next();
}
const server = http.createServer((req, res) => {
  runMiddleware(req, res, middlewares);
});

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
