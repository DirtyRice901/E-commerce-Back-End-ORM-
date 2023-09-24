const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      //////////Set data type to interger////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      type: DataTypes.INTEGER,
      //////////Set Non Null values//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      allowNull: false,
      //////////Set the primary key//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      primaryKey: true,
      /////////Set the auto incremental//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      autoIncrement: true,

    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
