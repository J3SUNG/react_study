const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");
const { User } = require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  console.log("req.body: ", req.body);

  try {
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("에러: ", err);
    return res.status(400).json({ success: false, err });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
