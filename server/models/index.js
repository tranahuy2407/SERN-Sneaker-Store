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

// Thiết lập quan hệ cho brand
Brand.hasMany(Product, {
  foreignKey: 'brand_id',
  as: 'products',
});

Product.belongsTo(Brand, {
  foreignKey: 'brand_id',
  as: 'brand',
});

// Thiết lập quan hệ cho categories
Category.hasMany(Product,{
    foreignKey: 'category_id',
    as: 'products',
})
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
  });
  // Thiết lập quan hệ cho order
  User.hasMany(Order, {
    foreignKey: "user_id",
    as: "orders",
  });
  
  Order.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // Một đơn hàng (order) có nhiều chi tiết (order details)
Order.hasMany(OrderDetail, {
    foreignKey: "order_id",
    as: "details",
  });
  
  OrderDetail.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
  });
  
  // Một sản phẩm (product) có thể thuộc nhiều chi tiết đơn hàng (order details)
  Product.hasMany(OrderDetail, {
    foreignKey: "product_id",
    as: "orderDetails",
  });
  
  OrderDetail.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });


  // Một người dùng có thể có nhiều đánh giá
User.hasMany(Review, {
    foreignKey: "user_id",
    as: "reviews",
  });
  
  Review.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });
  
  // Một sản phẩm có thể có nhiều đánh giá
  Product.hasMany(Review, {
    foreignKey: "product_id",
    as: "reviews",
  });
  
  Review.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
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
  Admin,
};
