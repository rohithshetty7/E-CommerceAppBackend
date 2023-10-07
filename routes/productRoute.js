const express = require("express");
const { createProdcuct, getAProduct, getAllProdcucts, updateProduct, deleteProduct, addToWishList, rating, uploadImages, deleteImages } = require("../controller/productController");
const router = express.Router();
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddlleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
router.post("/", authMiddleWare, isAdmin, createProdcuct)
router.put("/upload/", authMiddleWare, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages)
router.get("/:id", getAProduct)
router.put("/wishlist", authMiddleWare, addToWishList)
router.put("/rating", authMiddleWare, rating)

router.put("/:id", authMiddleWare, isAdmin, updateProduct)
router.get("/", getAllProdcucts)
router.delete("/:id", authMiddleWare, isAdmin, deleteProduct)
router.delete("/delete-img/:id", authMiddleWare, isAdmin, deleteImages)




module.exports = router;