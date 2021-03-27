const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Dish = sequelize.define("dishes", {
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
  category: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  resturant_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'resturants',
      key: 'id'
    }
  }
});

module.exports = Dish;