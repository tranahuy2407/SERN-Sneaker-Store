const express = require("express");
const categoryRouter = express.Router();
const admin = require("../middleware/admin");
const { Category } = require('../models'); // Import model Category

// Lấy tất cả categories
categoryRouter.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { status: "Active" } });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch categories", error: error.message });
  }
});

// Lấy category theo slug
categoryRouter.get("/categories/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ where: { slug, status: "Active" } });
    if (category) {
      res.status(200).json({ success: true, data: category });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch category", error: error.message });
  }
});

// Thêm category
categoryRouter.post("/categories", admin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create category", error: error.message });
  }
});

// Sửa category
categoryRouter.put("/categories/:id", admin, async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Category.update(req.body, { where: { id } });
    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      res.status(200).json({ success: true, data: updatedCategory });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update category", error: error.message });
  }
});

// Xóa category
categoryRouter.delete("/categories/:id", admin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Category.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ success: true, message: "Category deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete category", error: error.message });
  }
});

module.exports = categoryRouter;
