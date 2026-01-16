const http = require("node:http");
const fs = require("fs");

let port = 3000;

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(body);
}

function loggerMiddleware(req, res, next) {
  let log = `${req.method} ${req.url}`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
  next();
}

function reqBodyParserMiddleware(req, res, next) {
  if (req.method !== "POST") return next();

  if (req.headers["content-type"] !== "application/json") {
    send(res, 415, "Unsupported Media Type");
    return;
  }

  let raw = "";

  req.on("data", (chunk) => {
    raw += chunk;
  });

  req.on("end", () => {
    try {
      req.body = JSON.parse(raw);
      next();
    } catch {
      send(res, 400, "Bad Request");
    }
  });
}

function routerMiddleware(req, res, next) {
  const protocol = "http://";
  const portHost = `${protocol}${req.headers.host}`;
  const parsedUrl = new URL(req.url, portHost);
  const handler = `${req.method} ${parsedUrl.pathname}`;

  if (handler === "GET /health") {
    send(res, 200, "HEALTHY");
    return;
  }

  if (handler === "POST /echo") {
    send(res, 200, JSON.stringify(req.body));
    return;
  }
  send(res, 404, "Not Found");
}

const middlewares = [
  loggerMiddleware,
  reqBodyParserMiddleware,
  routerMiddleware,
];

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
