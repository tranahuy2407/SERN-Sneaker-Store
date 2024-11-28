const jwt = require("jsonwebtoken");
const { Admin } = require("../models"); 

const admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Từ chối truy cập!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Mã thông báo không hợp lệ!" });
    }
    const admin = await Admin.findOne({ where: { remember_token: token } });
    if (!admin) {
      return res.status(401).json({ message: "Quản trị viên không hợp lệ!" });
    }

    req.user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      status: admin.status,
      type: admin.type,
    };

    next();  
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi xác thực quản trị viên!" });
  }
};

module.exports = admin;
