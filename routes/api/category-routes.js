const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  ///////// GET all categories ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  try { 
  const categories = await Category.findAll({ include: [{model: Product }] });
  res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'No Joy!'});
  }
  
});

 ///////// GET one category by its `id` value //////////////////////////////////////////////////////////////////////////////////////////////// 
router.get('/:id', async (req, res) => {
  try { 
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'No Joy!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'No Joy!'});
  }
});

/////////// CREATE a new category //////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  try { 
    const newCategory = await Category.create(req.body);
    res.status (200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'No Joy!'});
  }
  
});

/////////// UPDATE a category by its `id` value ////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id } });
    
    !updated[0] ? res.status(404).json({ message: 'No Joy!' }) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'No Joy!'});
  }
  
});

/////////// DELETE a category by its `id` value ////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
  try { 
   const deleted = await Category.destroy({ where: { id: req.params.id } });

   !deleted ? res.status(404).json({ message: 'No Joy!' }) : res.status(200).json(deleted);
  }
  catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;

// [great and helpful source:] https://ankitmaheshwariin.medium.com/create-rest-api-web-services-using-node-js-and-express-js-with-crud-operations-ff790d6ae030

// [Status Codes:](https://restfulapi.net/http-status-codes/)