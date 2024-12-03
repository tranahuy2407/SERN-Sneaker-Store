const express = require("express");
const productRouter = express.Router();
const { Product, Brand, Category } = require("../models");
const { Op } = require("sequelize");

// Lấy tất cả sản phẩm
productRouter.get("/all-products", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { status: "Active" },
      include: [
        {
          model: Brand,
          as: "brand", 
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy sản phẩm" });
  }
});


// Lấy sản phẩm theo slug
productRouter.get("/product/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      where: { slug, status: "Active" }, 
      include: [
        {
          model: Brand,
          as: "brand", 
        },
        {
          model: Category,
          as: "category", 
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by slug:", err);
    return res.status(500).json({ message: "Lỗi khi lấy sản phẩm!" });
  }
});

// API tìm kiếm sản phẩm
productRouter.get("/search-products", async (req, res) => {
  try {
    const { keyword } = req.query;
    let whereCondition = {
      status: "Active", 
    };
    if (keyword) {
      whereCondition = {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } }, 
          { "$brand.name$": { [Op.like]: `%${keyword}%` } }, 
          { "$category.name$": { [Op.like]: `%${keyword}%` } }, 
        ],
      };
    }
    const products = await Product.findAll({
      where: whereCondition,
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name"],
          required: false, 
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
          required: false, 
        },
      ],
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm nào liên quan!" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi tìm kiếm sản phẩm!" });
  }
});

module.exports = productRouter;
