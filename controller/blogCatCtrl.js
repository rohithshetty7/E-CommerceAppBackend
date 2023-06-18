const Category = require("../models/blogCatModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)

  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getACategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getACategory = await Category.findById(id);
    res.json(getACategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createCategory, updateCategory,deleteCategory,getACategory,getAllCategory };
