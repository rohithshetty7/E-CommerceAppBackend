const Brand = require("../models/brandModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)

  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getABrand = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getABrand = await Brand.findById(id);
    res.json(getABrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createBrand, updateBrand,deleteBrand,getABrand,getAllBrand };
