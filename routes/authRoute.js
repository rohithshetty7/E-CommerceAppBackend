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
  loginAdmin, getWishList, saveAddress, userCart, emptyCart, getUserCart, applyCoupon, createOrder, getOrders, updateOrderStatus
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
router.get("/get-orders", authMiddleWare, getOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleWare, getWishList);
router.get("/cart", authMiddleWare, getUserCart);
router.post("/cart", authMiddleWare, userCart);
router.get("/:id", authMiddleWare, isAdmin, getSingleUser);
router.delete("/delete", authMiddleWare, emptyCart);
router.put(
  "/order/update-order/:id",
  authMiddleWare,
  isAdmin,
  updateOrderStatus
);
router.post("/cart/applycoupon", authMiddleWare, applyCoupon);
router.post("/cart/cash-order", authMiddleWare, createOrder);


router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);
router.put("/edit-user", authMiddleWare, updateUser);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unBlockUser);

module.exports = router; 
