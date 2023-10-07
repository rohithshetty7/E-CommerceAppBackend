const express = require("express");
const router = express.Router();
const {isAdmin,authMiddleWare}=require("../middlewares/authMiddlleware");
const { createBrand, updateBrand, deleteBrand, getABrand, getAllBrand } = require("../controller/brandCtrl");
router.post("/",authMiddleWare,isAdmin,createBrand)
router.put("/:id",authMiddleWare,isAdmin,updateBrand)
router.delete("/:id",authMiddleWare,isAdmin,deleteBrand)
router.get("/:id",getABrand)
router.get("/",getAllBrand)

module.exports=router;