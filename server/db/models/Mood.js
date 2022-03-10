const Sequelize = require('sequelize');
const db = require('../db');

const Mood = db.define('mood', {
 
  rating: {
    type: Sequelize.INTEGER,
    max: 10,
    min: 0,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
});

module.exports = Mood;