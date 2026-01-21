const express = require("express");
const router = express.Router();

let usrs = [];
let idx = 1;

router.get("/", (req, res) => {
  return res.json(usrs);
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  let num = Number(id);
  for (let usr of usrs) {
    if (num === usr.id) {
      return res.json(usr);
    }
  }
  return res.status(404).json({ error: "Not Found" });
});

router.post("/", (req, res) => {
  let { name, email } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  const user = {
    id: idx++,
    name: name,
    email: email,
  };
  usrs.push(user);
  return res.status(201).json(user);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let num = Number(id);
  for (let i = 0; i < usrs.length; i++) {
    if (num === usrs[i].id) {
      let deletedUser = usrs.splice(i, 1);
      return res.json(deletedUser[0]);
    }
  }
  return res.status(404).json({ error: "Not Found" });
});

module.exports = router;
