const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sern_sneaker', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

sequelize.authenticate()
  .then(() => {
    console.log('Đã kết nối thành công đến MySQL với Sequelize');
  })
  .catch((err) => {
    console.error('Không thể kết nối đến MySQL với Sequelize:', err);
  });

module.exports = sequelize;
