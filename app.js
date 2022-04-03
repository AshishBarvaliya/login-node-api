const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`server has started at port ${process.env.PORT}`);
});

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
      res.status(400).json({ message: "Invalid user"});
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.use("/users", router);
