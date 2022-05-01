'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('event', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
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
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event');
  }
};