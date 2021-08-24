const { DataTypes } = require('sequelize');
const db = require("../middleware/db-config");


module.exports = db.define('User', {

    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        isEmail: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});