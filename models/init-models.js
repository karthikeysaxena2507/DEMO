var DataTypes = require("sequelize").DataTypes;
var _offers = require("./offers");

function initModels(sequelize) {
  var offers = _offers(sequelize, DataTypes);

  offers.belongsTo(resturants, { as: "resturant", foreignKey: "resturant_id"});
  resturants.hasMany(offers, { as: "offers", foreignKey: "resturant_id"});

  return {
    offers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
