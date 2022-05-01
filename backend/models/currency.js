const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const user = require('./user');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const currency = sequelize.define('currency', {
    name: {
       allowNull: false,
       type: Sequelize.STRING
    }
  });


  currency.associate = (models) => {
    currency.hasOne(models.wallet, {foreignKey: "wallet_id"})
  }
  return currency;
};