// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
  //////// define columns////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  id: {
    //////////Set data type to interger//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    type:DataTypes.INTEGER,
    //////////Set Non Null values////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    allowNull: false,
    //////////Set the primary key////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    primaryKey: true,
    //////////Set the autoIncremental////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    autoIncrement: true,
  },
  product_name: {
    //////////Set data type to string////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    type: DataTypes.STRING,
    //////////Set to Non Null values/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    allowNull: false,
  },
  price: {
    /////////Set data type to Decimal////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    type: DataTypes.DECIMAL,
    //////////Set to Non Null values/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    allowNull: false,
    //////////Valid that the value is a decimal//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    validate: {
      isDecimal: true,
    },
  },
  stock: {
    ///////////Set data type to integer//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    type: DataTypes.INTEGER,
    ///////////Set Non Null values///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    allowNull: false,
    ///////////Set default value to 10///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    defaultValue: 10,
    validate: {
      /////////Validate that the value is numeric////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      isNumeric: true,
    },
  },
  category_id: {
    //////////set data type as integer///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    type: DataTypes.INTEGER,
    references: {
      ////////reference the category model *foreign key*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      model: "category",
    },
  }, 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
