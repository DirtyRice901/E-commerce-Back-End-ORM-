const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

/////////// GET all products ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "No Joy! Products Not Found.."});
  }
  
});

//////////// GET one product ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    !product
      ? res.status(404).json({ message: "No Joy! Product Not Found.."})
      : res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "No Joy! Product Not Found.."});
  }
});

//////////////// CREATE new product ////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', (req, res) => {  
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

/////////// update product /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    if (req.body.tagIds && req.body.tagIds.length > 0) {
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      //////// filter new product tags and create new ones /////////////////////////////////////////////////////////////////////////////////////
      const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });            

///////// figure out which ones to remove /////////////////////////////////////////////////////////////////////////////////////////////////////
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
///////// run both actions /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          await Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
      }
      const product = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
});  

 ///////// delete one product by its `id` value ////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "No Joy! Id not found.."})
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Deletion error!", error: err });
  }
 
});

module.exports = router;
