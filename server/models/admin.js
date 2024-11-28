const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const bcrypt = require("bcrypt");

const Admin = sequelize.define(
  "Admin",
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Email là duy nhất
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
      defaultValue: "Active",
    },
    type: {
      type: DataTypes.ENUM("Admin", "Staff"),
      allowNull: false,
      defaultValue: "Staff",
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
    tableName: "admins", 
    timestamps: false,
  }
);
// Tạo tài khoản admin cứng
const createAdmin = async () => {
  const adminData = {
    name: "Admin", 
    email: "admin@example.com",  
    email_verified_at: new Date(),  
    password: await bcrypt.hash("admin123", 10),  
    remember_token: null,  
    phone: "1234567890", 
    address: "123 Admin Street, Admin City", 
    status: "Active",  
    type: "Admin",
    created_at: new Date(),  
    updated_at: new Date(),  
  };

  try {
    const existingAdmin = await Admin.findOne({ where: { email: adminData.email } });
    if (!existingAdmin) {
      const admin = await Admin.create(adminData);
    } else {
      console.log("Tài khoản admin đã tồn tại!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản admin:", error);
  }
};
createAdmin();

module.exports = Admin;
