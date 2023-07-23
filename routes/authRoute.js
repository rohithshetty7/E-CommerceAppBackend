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
  forGotPasswordToken,
  resetPassword,
  loginAdmin, getWishList, saveAddress
} = require("../controller/userController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddlleware");
const router = express.Router();
router.post("/register", createUser);
router.put("/password", authMiddleWare, updatePassword);
router.put("/save-address", authMiddleWare, saveAddress);

router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);

router.post("/forgot-password-token", forGotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.get("/all-users", getUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleWare, getWishList);
router.get("/:id", authMiddleWare, isAdmin, getSingleUser);

router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);
router.put("/edit-user", authMiddleWare, updateUser);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unBlockUser);

module.exports = router; 
