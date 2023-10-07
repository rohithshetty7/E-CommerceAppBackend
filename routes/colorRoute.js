const express = require("express");
const router = express.Router();
const {isAdmin,authMiddleWare}=require("../middlewares/authMiddlleware");
const { createColor, updateColor, deleteColor, getAColor, getAllColor } = require("../controller/colorCtrl");
router.post("/",authMiddleWare,isAdmin,createColor)
router.put("/:id",authMiddleWare,isAdmin,updateColor)
router.delete("/:id",authMiddleWare,isAdmin,deleteColor)
router.get("/:id",getAColor)
router.get("/",getAllColor)

module.exports=router;