const express = require("express");
const { Order, OrderDetail, Product } = require("../models");
const orderRouter = express.Router();
const generateOrderCode = async () => {
  const randomCode = `DH${Math.floor(1000 + Math.random() * 9000)}`;
  const existingOrder = await Order.findOne({ where: { ordercode: randomCode } });

  if (existingOrder) {
    return generateOrderCode(); 
  }

  return randomCode;
};

orderRouter.post("/create-order", async (req, res) => {
  const {
    user_id,
    name,
    address_line,
    ward,
    district,
    province,
    phone,
    email,
    payment_method,
    status,
    products, 
  } = req.body;

  try {
    const ordercode = await generateOrderCode();
    const newOrder = await Order.create({
      user_id,
      name,
      address_line,
      ward,
      district,
      province,
      phone,
      email,
      payment_method,
      status,
      ordercode,
    });
    const orderDetails = [];
    for (const product of products) {
      const { product_id, qty } = product;
      const productDetails = await Product.findByPk(product_id);
      if (!productDetails) {
        return res.status(400).json({ message: "Sản phẩm không tồn tại" });
      }

      const price = productDetails.discounted_price || productDetails.price;
      const total = price * qty;
      orderDetails.push({
        order_id: newOrder.id,
        product_id,
        price,
        qty,
        total,
      });
    }
    await OrderDetail.bulkCreate(orderDetails);

    return res.status(201).json({
      success: true,
      message: "Đơn hàng đã được tạo thành công",
      order: newOrder,
      orderDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo đơn hàng" });
  }
});

module.exports = orderRouter;
