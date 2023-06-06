const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProdcuct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newPrduct = await Product.create(req.body);
    res.json(newPrduct);
  } catch (error) {
    throw new Error(error);
  }
});
const getAProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findSinglePrduct = await Product.findById(id);
    res.json(findSinglePrduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProdcucts = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v ");
      //http://localhost:3001/api/product?fields=-title,-price,category
    }
    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    console.log(page, limit, skip);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page does not exist ");
      }
    }
    const prodcut = await query;
    res.json(prodcut);

    //http://localhost:3001/api/product?brand=HP&color=Black
    // const getAllProduct = await Product.find(req.query);
    // const getAllProduct = await Product.find(queryObj);

    // res.json(getAllProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("updatedProduct", updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    console.log("fff", await Product.find({ id }));
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log("updateProdcut", deletedProduct);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProdcuct,
  getAProduct,
  getAllProdcucts,
  updateProduct,
  deleteProduct,
};
