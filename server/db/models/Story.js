const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Story = db.define('story', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    
  }
});

module.exports = Story;