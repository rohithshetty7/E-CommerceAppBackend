const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const userModel = require("../models/userModel")
const cloudinaryUploadImage = require("../utils/cloudinary");
const fs=require("fs")
const validateMongoDbId = require("../utils/validateMongodbid");
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
const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { prodId } = req.body
  try {
    const user = await userModel.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await userModel.findByIdAndUpdate(_id, {
        $pull: { wishlist: prodId }
      }, { new: true });
      res.json(user)

    } else {
      let user = await userModel.findByIdAndUpdate(_id, {
        $push: { wishlist: prodId }
      }, { new: true });
      res.json(user)

    }

  } catch (error) {
    throw new Error(error)
  }

})

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (rating) => rating.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      alreadyRated.star = star;
      alreadyRated.comment = comment;

      await product.save();

    } else {
      product.ratings.push({ star, comment, postedBy: _id });
      await product.save();

    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings.map(item => item.star).reduce((prev, cur) => prev + cur, 0);
    let actualRating = Math.round(ratingSum / totalRating)
    let finalProduct = await Product.findByIdAndUpdate(prodId, { totalrating: actualRating }, { new: true })
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const uploadImages = asyncHandler(async (req, res) => {
  console.log(req.files);
  const { id } = req.params
  validateMongoDbId(id)
  
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    let urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path);
    }
    const findProduct=await Product.findByIdAndUpdate(id,{
      images:urls.map(file=>file)
    },{new:true});
    res.json(findProduct);
  } catch (error) {
    throw new Error(error)
  }

})


module.exports = {
  createProdcuct,
  getAProduct,
  getAllProdcucts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages
};
