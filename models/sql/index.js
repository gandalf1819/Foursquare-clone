const Sequelize = require('sequelize')

const sequelize = new Sequelize('db_project', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const db = {};
db.sequelize = sequelize;

module.exports = db;
