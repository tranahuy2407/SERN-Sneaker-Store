const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Review = sequelize.define(
  "Review",
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
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unsigned: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TINYINT,
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
    tableName: "reviews", 
    timestamps: false, 
  }
);

module.exports = Review;
