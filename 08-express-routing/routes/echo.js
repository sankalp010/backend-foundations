const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let ct = req.headers["content-type"] + "";
  if (!ct.startsWith("application/json")) {
    return res.status(415).send("Unsupported Media Type");
  }
  return res.json(req.body);
});

module.exports = router;
