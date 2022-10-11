const Sequelize = require('sequelize');

const logging = process.env.DB_LOGS === 'true' ? console.log : (..._) => {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: logging
    }
);

module.exports = sequelize;
