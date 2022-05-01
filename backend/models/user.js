const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const wallet = require('./wallet');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    isAdmin: {
      allowNull : false,
      type : Sequelize.STRING
    }

  });


  user.associate = (models) => {
    user.belongsTo(models.wallet,{foreignKey : 'wallet_id'})
  }
  

  return user;
};