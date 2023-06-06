const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updatedUser,
  getSingleUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
} = require("../controller/userController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddlleware");
const router = express.Router();
router.post("/register", createUser);
router.put("/password", authMiddleWare, updatePassword);

router.post("/login", loginUser);
router.get("/all-users", getUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.get("/:id", authMiddleWare, isAdmin, getSingleUser);

router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);
router.put("/edit-user", authMiddleWare, updateUser);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unBlockUser);

module.exports = router;
