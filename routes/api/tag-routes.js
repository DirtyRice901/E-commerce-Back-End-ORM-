const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 ////////// GET all tags ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/',  async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "No Joy!"});
  } 
});

/////////// GET single tag by its `id` /////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if(!tagData) {
      res.status(404).json({ message: "No Joy! Tag not found with this id.."});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "No Joy! Tag not found.." });
  }    
});

/////////// create a new tag ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "No Joy! Unable to create Tag.."})
  }
  
});

/////////// UPDATE a tag's name by its `id` value //////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "No Joy! No tag with this id.."})
      : res.status(200).json({ message: "Updated!"});
  } catch (err) {
    res.status(500).json({ message: "No Joy! Update Error.."})
  }  
});

////////// DELETE on tag by its `id` value /////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id }});
    !deleted  
      ? res.status(404).json({ message: "No Joy! Tag not found with this id.."})
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "No Joy! Deletion Error"});
  }
});

module.exports = router;

// [Status Codes:](https://restfulapi.net/http-status-codes/) //