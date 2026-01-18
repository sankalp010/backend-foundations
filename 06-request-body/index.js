const http = require("node:http");
const fs = require("fs");

let port = 3000;

function send(res, status, body) {
  if (res.writableEnded) return;
  res.writeHead(status, { "content-type": "text/plain" });
  res.end(body);
}

function loggerMiddleware(req, res, next) {
  let log = `${req.method} ${req.url}\n`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.log("Error", err);
    }
  });
  next();
}

function reqBodyParserMiddleware(req, res, next) {
  if (req.method !== "POST") return next();

  let data = req.headers["content-type"] + "";
  if (!data.startsWith("application/json")) {
    send(res, 415, "Unsupported Media Type");
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
      return;
    }
  });
}

function routerMiddleware(req, res, next) {
  const protocol = "http://";
  const url = `${protocol}${req.headers.host}`;
  const parsedUrl = new URL(req.url, url);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/health") {
      send(res, 200, "HEALTHY");
      return;
    }
    if (parsedUrl.pathname === "/") {
      send(res, 200, "OK");
      return;
    }
    send(res, 404, "Not Found");
  }

  if (req.method === "POST") {
    if (parsedUrl.pathname === "/echo") {
      send(res, 200, JSON.stringify(req.body));
      return;
    }
    send(res, 405, "Method Not Allowed");
  }
}

const middlewares = [
  loggerMiddleware,
  reqBodyParserMiddleware,
  routerMiddleware,
];

function runMiddleware(req, res, middlewares) {
  let index = 0;

  function next() {
    let middleware = middlewares[index++];
    if (!middleware) return;
    middleware(req, res, next);
  }
  next();
}
const server = http.createServer((req, res) => {
  try {
    runMiddleware(req, res, middlewares);
  } catch {
    send(res, 500, "Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
