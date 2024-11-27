const express = require("express");
const productRouter = express.Router();
const Product = require('../models/prouduct'); 

// Lấy tất cả sản phẩm
productRouter.get("/all-products", async (req, res) => {
  try {
    const products = await Product.findAll(); 
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy sản phẩm" });
  }
});

module.exports = productRouter;
