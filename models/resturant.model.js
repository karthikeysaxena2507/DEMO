const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Resturant = sequelize.define("resturants", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  about: {
    type: Sequelize.STRING(6000),
    allowNull: false
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
  resturant_type: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  cuisine: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  opensAt: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  closesAt: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  owner: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING(10000)
  }
});

module.exports = Resturant;