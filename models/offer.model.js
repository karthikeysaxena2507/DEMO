const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Offer = sequelize.define("dishes", {
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
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATEONLY,
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

module.exports = Offer;