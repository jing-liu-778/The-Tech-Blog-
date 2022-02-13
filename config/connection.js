const Sequelize = require("sequelize");
require("dotenv").config();

// let sequelize;
const sequelize = new Sequelize(
  "heroku_c928792223d0cda",
  "b5aae6f64529ac",
  "0ba463fb",
  {
    host: "us-cdbr-east-05.cleardb.net",
    dialect: "mysql",
  }
);

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: "localhost",
//       dialect: "mysql",
//       port: 3306,
//     }
//   );
// }

module.exports = sequelize;

// const mysql = require("mysql");
// var connection = mysql.createPool({
//   host: "us-cdbr-east-05.cleardb.net",
//   user: "b5aae6f64529ac",
//   password: "0ba463fb",
//   database: "heroku_c928792223d0cda",
// });
// module.exports = connection;
