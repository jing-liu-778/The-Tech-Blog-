const Sequelize = require("sequelize");
require("dotenv").config();

// Heroku use this
// const sequelize = new Sequelize(
//   process.env.HR_DB,
//   process.env.HR_USER,
//   process.env.HR_PASS,
//   {
//     host: process.env.HR_HOST,
//     dialect: "mysql",
//   }
// );

// Localhost use this
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
