const express = require("express");
const router = express.Router();
const {isAdmin,authMiddleWare}=require("../middlewares/authMiddlleware");
const { createCategory, updateCategory, deleteCategory, getACategory, getAllCategory } = require("../controller/ProductcategoryCtrl");
router.post("/",authMiddleWare,isAdmin,createCategory)
router.put("/:id",authMiddleWare,isAdmin,updateCategory)
router.delete("/:id",authMiddleWare,isAdmin,deleteCategory)
router.get("/:id",getACategory)
router.get("/",getAllCategory)

module.exports=router;