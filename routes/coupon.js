const express = require("express");
const router = express.Router();
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getSingleCoupon } = require("../controller/couponCtrl");
const {isAdmin,authMiddleWare}=require("../middlewares/authMiddlleware");
const { route } = require("./coupon");
router.post("/",authMiddleWare,isAdmin,createCoupon)
router.get("/",authMiddleWare,isAdmin,getAllCoupon)
router.put("/:id",authMiddleWare,isAdmin,updateCoupon)
router.delete("/:id",authMiddleWare,isAdmin,deleteCoupon)
router.get("/:id",authMiddleWare,isAdmin,getSingleCoupon)

module.exports=router;