const express = require("express");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddlleware");
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog,  liketheBlog, disLiketheBlog } = require("../controller/blogCtrl");
const router = express.Router();

router.put("/likes", authMiddleWare, liketheBlog);
router.put("/dislikes", authMiddleWare, disLiketheBlog);

router.post("/", authMiddleWare, isAdmin, createBlog);
router.put("/:id", authMiddleWare, isAdmin, updateBlog);
router.get("/:id",  getBlog);
router.get("/", getAllBlogs);
router.delete("/:id",authMiddleWare, isAdmin, deleteBlog);


module.exports = router;
