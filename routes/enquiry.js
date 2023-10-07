const express = require("express");
const router = express.Router();
const {isAdmin,authMiddleWare}=require("../middlewares/authMiddlleware");
const { createEnquiry, updateEnquiry, deleteEnquiry, getAEnquiry, getAllEnquiry } = require("../controller/enquiryCtrl");
router.post("/",authMiddleWare,isAdmin,createEnquiry)
router.put("/:id",authMiddleWare,isAdmin,updateEnquiry)
router.delete("/:id",authMiddleWare,isAdmin,deleteEnquiry)
router.get("/:id",getAEnquiry)
router.get("/",getAllEnquiry)

module.exports=router;