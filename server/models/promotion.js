const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Promotion = sequelize.define(
  "Promotion",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("percent", "amount", "free_shipping"),
      allowNull: false,
      defaultValue: "percent",
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    min_price: {
      type: DataTypes.FLOAT, 
      allowNull: true,
      defaultValue: 0.0,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_ids: {
      type: DataTypes.JSON, 
      allowNull: true,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
      defaultValue: "Active",
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
    tableName: "promotions",
    timestamps: false,
  }
);

module.exports = Promotion;
