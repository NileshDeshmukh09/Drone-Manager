const Category = require('../models/category.model');


// Create a new Category
const createCategory = async (req, res) => {

  try {

    const { name, color, tagName } = req.body;

    const category = new Category({ name, color, tagName });
    const newCategory = await category.save();

    res.status(200).json({
        success : true ,
        message : `${newCategory.name }  Created Successfully `,
        newCategory
    });

  } catch (err) {
    console.log(err );
    res.status(500).json({ error: err.message });
  }
};

// Update a Category by ID
const updateCategory = async (req, res) => {

  try {
    const { name, color, tagName } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name != undefined ? name : category.name ;
    category.color = color != undefined ? color : category.color ;
    category.tagName = tagName != undefined ? tagName : category.tagName ;

    const updateCategory = await category.save();

    res.json({
        success : true,
        message : `${updateCategory.name} updated Successfully `,
        updateCategory
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a Category by ID
const deleteCategory = async (req, res) => {

  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({
        success : true,
        message: 'Category deleted successfully' 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all Categorys
const getAllCategories = async (req, res) => {

  try {
    const categories = await Category.find();
    res.status(200).json({
        success : true ,
        message : categories.length > 0 ? `Fetched All Categories.` : `No Categories Available`,
        totalCategories : categories.length ,
        categories
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get a specific Category by ID
const getOneCategory = async (req, res) => {

  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

      res.status(200).json({
        success : true,
        message : `${category.name } , Fetched Successfully !`,
        category
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


module.exports = { 
    createCategory , 
    getOneCategory , 
    getAllCategories ,
    deleteCategory ,
    updateCategory
 }