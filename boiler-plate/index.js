const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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
    return res.status(500).json({ success: false, err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, async (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
      }

      try {
        const token = await user.generateToken();
        res.cookie("x_auth", token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      } catch (err) {
        console.log("토큰 생성 실패: ", err);
        return res.status(500).json({ err });
      }
    });
  } catch (err) {
    console.log("로그인 실패: ", err);
    return res.status(500).json({ loginSuccess: false, err });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
