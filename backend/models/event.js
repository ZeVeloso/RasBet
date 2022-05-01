/* jshint indent: 2 */
const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    sport: {
      allowNull: false,
      type: Sequelize.STRING
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING
    },
    team1: {
      allowNull: false,
      type: Sequelize.STRING
    },
    team2: {
      allowNull: false,
      type: Sequelize.STRING
    },
    odd1: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    odd2: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    odd3: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    status: {
      allowNull: false,
      type : Sequelize.STRING
    },
    result:{
      allowNull: true,
      type: Sequelize.STRING
    }
  });

  return event;
};