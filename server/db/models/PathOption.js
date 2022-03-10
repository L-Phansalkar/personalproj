const Sequelize = require('sequelize');
const db = require('../db');

const PathOption = db.define('PathOption', {
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    cost: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    unlocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    addedMotivation: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });
  module.exports = PathOption;