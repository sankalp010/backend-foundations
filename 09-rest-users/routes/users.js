const express = require("express");
const router = express.Router();

let usrs = [];

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

router.get("/", (req, res) => {
  return res.send(usrs);
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  let num = Number(id);
  for (let usr of usrs) {
    if (num === usr.id) {
      return res.send(usr.name);
    }
  }
  return res.status(404).send("Not Found");
});

router.post("/", (req, res) => {
  let { id, name, email } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).send("Enter a valid Name");
  }
  if (!email || !email.includes("@")) {
    return res.status(400).send("Enter a valid email");
  }
  usrs.push(new User(id, name, email));
  return res.send(`${name} created`);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let num = Number(id);
  for (let i = 0; i < usrs.length; i++) {
    if (num === usrs[i].id) {
      usrs.splice(i, 1);
      return res.send("User Deleted");
    }
  }
  return res.status(404).send("Not Found");
});

module.exports = router;
