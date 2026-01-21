const express = require("express");
const app = express();

const fs = require("fs");
const usersRouter = require("./routes/users");

app.use((req, res, next) => {
  let log = `${req.method} ${req.path}\n`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
  next();
});

app.use(express.json());

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send("Bad Request");
  }
  return res.status(500).send("Internal Server Error");
});

let port = 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
