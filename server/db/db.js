const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sern_sneaker', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Đồng bộ bảng thành công!");
  })
  .catch((error) => {
    console.error("Lỗi khi đồng bộ bảng:", error);
  });



sequelize.authenticate()
  .then(() => {
    console.log('Đã kết nối thành công đến MySQL với Sequelize');
  })
  .catch((err) => {
    console.error('Không thể kết nối đến MySQL với Sequelize:', err);
  });

module.exports = sequelize;
