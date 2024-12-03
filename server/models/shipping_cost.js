const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const ShippingCost = sequelize.define(
  "ShippingCost",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: false, 
    },
    cost: {
      type: DataTypes.FLOAT, 
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
    tableName: "shipping_costs", 
    timestamps: false,
  }
);

module.exports = ShippingCost;
