const express = require("express");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddlleware");
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, liketheBlog, disLiketheBlog, uploadImages } = require("../controller/blogCtrl");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.put("/likes", authMiddleWare, liketheBlog);
router.put("/dislikes", authMiddleWare, disLiketheBlog);
router.put("/upload/:id", authMiddleWare, isAdmin, uploadPhoto.array("images", 10), blogImgResize, uploadImages)

router.post("/", authMiddleWare, isAdmin, createBlog);
router.put("/:id", authMiddleWare, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleWare, isAdmin, deleteBlog);


module.exports = router;
