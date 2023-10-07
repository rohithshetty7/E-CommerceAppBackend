const Color = require("../models/colorModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)

  try {
    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateColor);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteColor = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)
  try {
    const deleteColor = await Color.findByIdAndDelete(id);
    res.json(deleteColor);
  } catch (error) {
    throw new Error(error);
  }
});
const getAColor = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getAColor = await Color.findById(id);
    res.json(getAColor);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getAllColor = await Color.find();
    res.json(getAllColor);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createColor, updateColor,deleteColor,getAColor,getAllColor };
