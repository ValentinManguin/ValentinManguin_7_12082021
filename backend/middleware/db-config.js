const Sequelize = require('sequelize');

const db = new Sequelize(process.env.db_name, process.env.db_login, process.env.db_password, {
    host: process.env.db_host,
    dialect: 'mysql',
    port: 3306
});

module.exports = db;