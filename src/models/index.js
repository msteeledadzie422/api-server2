'use strict';

require('dotenv').config();
const {Sequelize, DataTypes } = require('sequelize');
const clothesSchema = require('./clothes');
const foodSchema = require('./food');
const ModelInterface = require('./collection-class');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory' :
  process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const clothesModel = clothesSchema(sequelizeDatabase, DataTypes);
const foodModel = foodSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  clothesInterface: new ModelInterface(clothesModel),
  foodInterface: new ModelInterface(foodModel),
};