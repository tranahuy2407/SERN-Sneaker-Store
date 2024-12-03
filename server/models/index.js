const sequelize = require('../db/db');
const Product = require('./product');
const Brand = require('./brand');
const Category = require('./category');
const User = require("./user");
const Order = require("./order");
const OrderDetail = require("./order_detail");
const News = require('./new');
const Admin = require('./admin');
const Review = require('./review');
const Promotion = require('./promotion');
const Invoice = require('./invoice');
const ShippingCost = require('./shipping_cost');

// Thiết lập quan hệ cho brand
Brand.hasMany(Product, {
  foreignKey: {
    name: 'brand_id',
    allowNull: false, // Chặn dữ liệu không hợp lệ
  },
  as: 'products',
});

Product.belongsTo(Brand, {
  foreignKey: {
    name: 'brand_id',
    allowNull: false,
  },
  as: 'brand',
});

// Thiết lập quan hệ cho categories
Category.hasMany(Product, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
  as: 'products',
});
Product.belongsTo(Category, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
  as: 'category',
});

// Thiết lập quan hệ cho order
User.hasMany(Order, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: 'orders',
});

Order.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: 'user',
});

// Một đơn hàng (order) có nhiều chi tiết (order details)
Order.hasMany(OrderDetail, {
  foreignKey: {
    name: 'order_id',
    allowNull: false,
  },
  as: 'details',
});

OrderDetail.belongsTo(Order, {
  foreignKey: {
    name: 'order_id',
    allowNull: false,
  },
  as: 'order',
});

// Một sản phẩm (product) có thể thuộc nhiều chi tiết đơn hàng (order details)
Product.hasMany(OrderDetail, {
  foreignKey: {
    name: 'product_id',
    allowNull: false,
  },
  as: 'orderDetails',
});

OrderDetail.belongsTo(Product, {
  foreignKey: {
    name: 'product_id',
    allowNull: false,
  },
  as: 'product',
});

// Một người dùng có thể có nhiều đánh giá
User.hasMany(Review, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: 'reviews',
});

Review.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: 'user',
});

// Một sản phẩm có thể có nhiều đánh giá
Product.hasMany(Review, {
  foreignKey: {
    name: 'product_id',
    allowNull: false,
  },
  as: 'reviews',
});

Review.belongsTo(Product, {
  foreignKey: {
    name: 'product_id',
    allowNull: false,
  },
  as: 'product',
});

// Tạo mối quan hệ nhiều-nhiều giữa Promotion và Product
Promotion.belongsToMany(Product, {
  through: "promotion_product",
  foreignKey: {
    name: 'promotion_id',
    allowNull: false,
  },
  as: "products",
});

Product.belongsToMany(Promotion, {
  through: "promotion_product",
  foreignKey: {
    name: 'product_id',
    allowNull: false,
  },
  as: "promotions",
});

// Tạo mối quan hệ nhiều-nhiều giữa Promotion và User
Promotion.belongsToMany(User, {
  through: "promotion_user",
  foreignKey: {
    name: 'promotion_id',
    allowNull: false,
  },
  as: "users",
});

User.belongsToMany(Promotion, {
  through: "promotion_user",
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: "promotions",
});

// Quan hệ 1-1 giữa `Order` và `Invoice`
Invoice.belongsTo(Order, {
  foreignKey: {
    name: 'order_id',
    allowNull: false,
  },
  as: "order",
});

Order.hasOne(Invoice, {
  foreignKey: {
    name: 'order_id',
    allowNull: false,
  },
  as: "invoice",
});

// Quan hệ giữa `Order` và `ShippingCost`
Order.belongsTo(ShippingCost, {
  foreignKey: {
    name: 'shipping_cost_id',
    allowNull: true, // Shipping cost có thể null
  },
  as: "shippingCost",
});

ShippingCost.hasMany(Order, {
  foreignKey: {
    name: 'shipping_cost_id',
    allowNull: true,
  },
  as: "orders",
});

module.exports = {
  sequelize,
  Product,
  Brand,
  User,
  Category,
  Order,
  OrderDetail,
  News,
  Admin,
  Review,
  Promotion,
  Invoice,
  ShippingCost,
};
