const express = require("express");
const shippingcostRouter = express.Router();

const { ShippingCost } = require('../models');


// Lấy tất cả cost
shippingcostRouter.get("/shipping-cost", async (req, res) => {
    try {
      const shippingcost = await ShippingCost.findAll();
      res.status(200).json({ success: true, data: shippingcost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch shipping cost", error: error.message });
    }
  });

module.exports = shippingcostRouter;