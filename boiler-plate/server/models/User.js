const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    return bcrypt.compare(plainPassword, this.password);
  } catch (err) {
    throw new Error("비밀번호 비교 실패");
  }
};

userSchema.methods.generateToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id.toHexString() }, "secretToken");
    user.token = token;
    await user.save();
    return user;
  } catch (err) {
    throw new Error("토큰 생성 실패");
  }
};

userSchema.statics.findByToken = async function (token) {
  const user = this;

  try {
    const decoded = await jwt.verify(token, "secretToken");
    const foundUser = await user.findOne({ _id: decoded, token: token });
    return foundUser;
  } catch (err) {
    throw new Error("토큰 검증 실패");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
