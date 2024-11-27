const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Từ chối truy cập!" });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Mã thông báo không hợp lệ!" });
    }
    const user = await User.findOne({ where: { remember_token: token } });
    if (!user) {
      return res.status(401).json({ message: "Người dùng không hợp lệ!" });
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
    };

    next(); 
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xác thực, vui lòng thử lại!" });
  }
};


module.exports = auth;
