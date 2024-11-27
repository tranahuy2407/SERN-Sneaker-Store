const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/user")

require("dotenv").config();
authRouter.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
//Đằng ký
authRouter.post("/register", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Tên, email và mật khẩu là bắt buộc!" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      address: address || null,
      status: "Active",
    });

    res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau!" });
  }
});

//Đăng nhập
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc!" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", 
    });
    await User.update({ remember_token: token }, { where: { id: user.id } });

    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau!" });
  }
});

// API lấy thông tin hồ sơ cá nhân
authRouter.get("/profile", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "name", "email", "phone", "address", "status"],
    });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }
    res.json({
      message: "Lấy thông tin hồ sơ thành công!",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin hồ sơ!" });
  }
});

module.exports = authRouter;
