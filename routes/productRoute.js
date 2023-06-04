const express = require("express");
const { createProdcuct } = require("../controller/productController");
const router = express.Router();

router.post("/",createProdcuct)

module.exports=router;