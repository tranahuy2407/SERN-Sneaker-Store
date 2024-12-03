const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin , Product } = require('../models');
const admin = require("../middleware/admin")

require("dotenv").config();
adminRouter.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET;

// Đăng nhập Admin  
adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email và mật khẩu là bắt buộc!" });
    }
  
    try {
      const admin = await Admin.findOne({ where: { email } });
  
      if (!admin) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
      }
  
      if (admin.status !== "Active") {
        return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa!" });
      }
  
      const token = jwt.sign(
        { id: admin.id, email: admin.email, type: admin.type },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      await Admin.update({ remember_token: token }, { where: { id: admin.id } });
  
      res.json({
        message: "Đăng nhập thành công!",
        token
      });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau!" });
    }
  });
  
  // API lấy thông tin hồ sơ Admin
  adminRouter.get("/profile", admin, async (req, res) => {
    try {
      const adminId = req.user.id;
  
      // Chỉ cho phép Admin truy cập
      if (req.user.type !== "Admin") {
        return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
      }
  
      const admin = await Admin.findOne({
        where: { id: adminId },
        attributes: ["id", "name", "email", "phone", "address", "type", "status"],
      });
  
      if (!admin) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" });
      }
  
      res.json({
        message: "Lấy thông tin hồ sơ thành công!",
        admin,
      });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin hồ sơ!" });
    }
  });
  
  // Tạo mới sản phẩm
adminRouter.post('/products', admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
});

// Cập nhật sản phẩm
adminRouter.put('/products/:id', admin, async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json({ success: true, data: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
});

// Xóa sản phẩm
adminRouter.delete('/products/:id', admin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
});


module.exports = adminRouter;