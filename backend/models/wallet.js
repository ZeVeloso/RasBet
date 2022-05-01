const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const user = require('./user');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const wallet = sequelize.define('wallet', {
    amount: {
      allowNull: false,
      type: Sequelize.FLOAT
    }
  });


  wallet.associate = (models) => {
    wallet.hasOne(models.user, {foreignKey: "user_id"})
    wallet.belongsTo(models.currency, {foreignKey: "currency_id"})
  }
  

  return wallet;
};