const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routes/users");

require("custom-env").env('dev');

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

app.use("/", usersRouter);
