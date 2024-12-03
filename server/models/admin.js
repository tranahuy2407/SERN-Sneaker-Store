const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/db');
const bcrypt = require('bcrypt');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: "admins",
  timestamps: false, 
});

const createDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.count(); 
    if (adminCount === 0) {
      const defaultAdmin = await Admin.create({
        name: 'Admin Default',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10), 
        phone: '0123456789',
        address: 'Admin address',
        status: 'active',
        type: 'admin'
      });

      console.log('Tạo tài khoản admin mặc định thành công!', defaultAdmin);
    }
  } catch (error) {
    console.error('Lỗi khi tạo admin mặc định:', error);
  }
};

createDefaultAdmin();

module.exports = Admin;
