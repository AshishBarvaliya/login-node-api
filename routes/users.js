const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.find({
      id: req.body.id,
      password: req.body.password,
    });
    if (user.length) {
      res.status(200).json({ message: "Logged in" });
    } else {
      res.status(400).json({ message: "Invalid user" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
