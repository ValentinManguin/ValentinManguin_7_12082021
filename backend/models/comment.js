const { DataTypes } = require('sequelize');
const db = require("../middleware/db-config");


module.exports = db.define('comment', {

  content: DataTypes.STRING
  });