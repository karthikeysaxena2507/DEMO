const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const User = sequelize.define("users", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  password: {
      type: Sequelize.STRING(255),
      allowNull: false
  }
});

module.exports = User;