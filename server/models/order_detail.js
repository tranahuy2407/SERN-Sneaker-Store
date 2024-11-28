const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unsigned: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unsigned: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    qty: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    tableName: "order_details",
    timestamps: false, 
  }
);

module.exports = OrderDetail;
