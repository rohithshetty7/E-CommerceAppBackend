const express = require("express");
const { createProdcuct, getAProduct, getAllProdcucts, updateProduct, deleteProduct } = require("../controller/productController");
const router = express.Router();
const {isAdmin,authMiddleWare}=require("../middlewares/authMiddlleware")
router.post("/",authMiddleWare,isAdmin,createProdcuct)
router.get("/:id",getAProduct)
router.put("/:id",authMiddleWare,isAdmin,updateProduct)
router.get("/",getAllProdcucts)
router.delete("/:id",authMiddleWare,isAdmin,deleteProduct)


module.exports=router;