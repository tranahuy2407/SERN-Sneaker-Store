const express = require("express");
const brandRouter = express.Router();
const admin = require("../middleware/admin")
const { Brand } = require('../models');
// Lấy tất cả brands
brandRouter.get("/brands", async (req, res) => {
    try {
      const brands = await Brand.findAll({ where: { status: "Active" } });
      res.status(200).json({ success: true, data: brands });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch brands", error: error.message });
    }
  });
  
  // Lấy brand theo slug
  brandRouter.get("/brands/:slug", async (req, res) => {
    const { slug } = req.params;
    try {
      const brand = await Brand.findOne({ where: { slug, status: "Active" } });
      if (brand) {
        res.status(200).json({ success: true, data: brand });
      } else {
        res.status(404).json({ success: false, message: "Brand not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch brand", error: error.message });
    }
  });
  
  // Thêm brand
  brandRouter.post("/brands", admin, async (req, res) => {
    try {
      const brand = await Brand.create(req.body);
      res.status(201).json({ success: true, data: brand });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create brand", error: error.message });
    }
  });
  
  // Sửa brand
  brandRouter.put("/brands/:id", admin, async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Brand.update(req.body, { where: { id } });
      if (updated) {
        const updatedBrand = await Brand.findByPk(id);
        res.status(200).json({ success: true, data: updatedBrand });
      } else {
        res.status(404).json({ success: false, message: "Brand not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update brand", error: error.message });
    }
  });
  
  // Xóa brand
  brandRouter.delete("/brands/:id", admin, async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Brand.destroy({ where: { id } });
      if (deleted) {
        res.status(200).json({ success: true, message: "Brand deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Brand not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete brand", error: error.message });
    }
  });

module.exports = brandRouter;
