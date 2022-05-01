const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const currency = require('./currency');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const change = sequelize.define('change', {
    taxa: {
       allowNull: false,
       type: Sequelize.FLOAT
    }
  });


  change.associate = (models) => {
    change.belongsTo(models.currency, {foreignKey: "currency1_id"})
    change.belongsTo(models.currency, {foreignKey: "currency2_id"})
  }
  return change;
};