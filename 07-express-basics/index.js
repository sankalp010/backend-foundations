const express = require("express");
const app = express();

const fs = require("fs");

let port = 3000;

//Logger Middleware
app.use((req, res, next) => {
  let log = `${req.method} ${req.path}\n`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
  next();
});

//Body Parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
  return;
});

app.get("/health", (req, res) => {
  res.send("HEALTHY");
  return;
});

app.post("/echo", (req, res) => {
  let ct = req.headers["content-type"] + "";
  if (!ct.startsWith("application/json")) {
    return res.status(415).send("Unsupported Media Type");
  }
  return res.json(req.body);
});

// Centralized Error Handling
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send("Bad Request");
  }
  return res.status(500).send("Internal Server Error");
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
