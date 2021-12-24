const { DataTypes } = require('sequelize');
const db = require("../middleware/db-config");


module.exports = db.define('Post', {

  content: DataTypes.STRING,
  imageUrl: DataTypes.STRING
  
  });