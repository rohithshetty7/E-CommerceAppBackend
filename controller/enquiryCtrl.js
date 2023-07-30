const Enquiry = require("../models/enquiryModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)

  try {
    const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)
  try {
    const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deleteEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getAEnquiry = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getAEnquiry = await Enquiry.findById(id);
    res.json(getAEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getAllEnquiry = await Enquiry.find();
    res.json(getAllEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createEnquiry, updateEnquiry,deleteEnquiry,getAEnquiry,getAllEnquiry };
