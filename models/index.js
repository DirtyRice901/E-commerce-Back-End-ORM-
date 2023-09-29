// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// * execute association methods on your Sequelize models to create the following relationships between them * /////////////////////////////////

// Products belongsTo Category /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Product.belongsTo(Category, {
  foreignKey: 'category_id', 
});
// Category has many Products ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// Product belongToMany Tag Model (through ProductTag) /////////////////////////////////////////////////////////////////////////////////////////////
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});
// Tags belongToMany Products (through ProductTag) /////////////////////////////////////////////////////////////////////////////////////////////
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'Tag_id',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
