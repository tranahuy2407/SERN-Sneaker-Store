const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db'); 
const Brand = require('./brand');


const Product = sequelize.define('Product', {
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
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.TINYINT,
    allowNull: false,
    unsigned: true,
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  discounted_price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  discounted_percent: { 
    type: DataTypes.FLOAT,
    allowNull: true, 
    defaultValue: 0.0, 
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  male: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unsigned: true,
  },
  brand_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unsigned: true,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active',
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
}, {
  tableName: 'products', 
  timestamps: false, 
});

module.exports = Product;
