const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Resturant = sequelize.define("resturants", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  state: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  pincode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pureVeg: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  cuisine: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  opensAt: {
    type: Sequelize.TIME,
    allowNull: false
  },
  closesAt: {
    type: Sequelize.TIME,
    allowNull: false
  }
});

module.exports = Resturant;