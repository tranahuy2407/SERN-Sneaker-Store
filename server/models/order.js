const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unsigned: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Đang xử lý",
        "Xác nhận",
        "Đang vận chuyển",
        "Đã giao hàng",
        "Hủy"
      ),
      allowNull: false,
      defaultValue: "Đang xử lý",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "orders", 
    timestamps: false,
  }
);

module.exports = Order;
