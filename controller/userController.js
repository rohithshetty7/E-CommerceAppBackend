const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/product");
const Cart = require("../models/cartModel");
const Coupon = require("../models/coupan");
const Order = require("../models/orderModel");

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendMail = require("./emailCtrl");
const crypto = require("crypto");
const uniqid = require("uniqid");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  const email = req?.body?.email;
  const findUSer = await User.findOne({ email: email });

  if (!findUSer) {
    //create new User
    const newUSer = await User.create(req.body);
    res.json(newUSer);
  } else {
    throw new Error("USer already exist");
  }
});
//Each time login creating refresh token and updating in DB with validity of 3 days
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updatedUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      email: findUser.email,
      mobile: findUser.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid credetials");
  }
});


const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
console.log("R", email, password);
  const findAdmin = await User.findOne({ email });
console.log("findAdmin", findAdmin);
  console.log("RNS", findAdmin && (await findAdmin.isPasswordMatched(password)));
  if (findAdmin.role !== "admin") throw new Error("Not Authorised")
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    console.log("refreshToken1", refreshToken);
    const updatedUser = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    console.log("updatedUser", updatedUser);
    // res.cookie()
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin.firstname,
      lastname: findAdmin.lastname,
      email: findAdmin.email,
      mobile: findAdmin.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid credetials");
  }
});




const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.json(getAllUser);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  console.log("getSingleUser", id);
  validateMongoDbId(id);
  try {
    const getSingleUser = await User.findById(id);
    console.log("getSingleUser", getSingleUser);

    res.json({ getSingleUser });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    // console.log(id);
    validateMongoDbId(id);
    const deleteSingleUser = await User.findByIdAndDelete(id);
    console.log(deleteSingleUser);

    res.json(deleteSingleUser);
  } catch (error) {
    throw new Error(error);
  }
});
//refreshToken 
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log("cookie", cookie.refreshToken);
  if (!cookie.refreshToken) throw new Error("No refrsh token in cookies");
  const refreshToken = cookie.refreshToken;
  console.log("refreshToken", refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not matche");
  // res.json( user )
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    console.log("decoded", decoded);
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    } else {
      const accessToken = generateToken(user._id);
      res.json({ accessToken });
    }
  });

  try {
  } catch (error) { }
});

//here updating req.user means t.e token of login user  
const updateUser = asyncHandler(async (req, res) => {
  try {
    // console.log("R",req.user);
    // let { id } = req.params;
    let { _id } = req.user;
    validateMongoDbId(_id);
    // console.log("_id", id);
    // console.log(id);
    const updateSingleUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
      },
      { new: true }
    );
    console.log("updateSingleUser", updateSingleUser);

    res.json(updateSingleUser);
  } catch (error) {
    throw new Error(error);
  }
});

//save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  validateMongoDbId(id)
  try {
    const updateUser = await User.findByIdAndUpdate(id, {
      address: req.body.address,

    }, { new: true })
    res.json(updateUser)
  } catch (error) {
    throw new Error(error);
  }
})

//only can admin can block andunblock
const blockUser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params; //id
    validateMongoDbId(id);
    // console.log("blockUser id",id);
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "User Blocked",
      block,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    res.json({
      message: "User un blocked",
      unBlock,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// const updatePassword = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const password = req.body;
//   validateMongoDbId(_id);
//   const user = await User.findById(_id);
//   if (password) {
//     user.password = password;
//     const updatedPassword=await user.save()
//     res.json(updatePassword)
//   }else{
//     res.json(user)
//   }
// });
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forGotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userEmail = await User.findOne({ email });
  if (!userEmail) {
    throw new Error("User not found with this email");
  }
  try {
    const token = await userEmail.createPasswordResetToken();
    await userEmail.save();
    const resetUrl = `Hi, please follow this link to reset your password. This link is valid for 10 minutes: <a href="http://localhost:3001/api/user/forgot-password-token/${token}">Click here</a>`;

    console.log("resetUrl", resetUrl);
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Passwor link",
      html: resetUrl,
    };
    sendMail(data);
    res.json(token);
  } catch (error) {
    console.error("Error in forgot password token generation:", error);
    res.status(500).json({ error: "Internal Server Error" });
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const { hashedToken } = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired Please try again later ");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save()
  res.json(user)

});

const getWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const findUser = await User.findById(id).populate("wishlist")
    res.json(findUser)

  } catch (error) {
    throw new Error(error)
  }
})
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await User.findById(_id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderBy: user._id });
    console.log("Type of alreadyExistCart:", typeof alreadyExistCart);
    if (alreadyExistCart) {
      delete alreadyExistCart
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderBy: _id }).populate("products.product")
    res.json(cart);

  } catch (error) {
    throw new Error(error)

  }


})

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id })
    const cart = await Cart.findOneAndRemove({ orderBy: user._id })
    res.json(cart)

  } catch (error) {
    throw new Error(error)

  }
})

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  console.log("validCoupon", _id);
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  console.log(user)
  let { cartTotal } = await Cart.findOne({
    orderBy: user._id,
  }).populate("products.product");
  console.log("cartTotal", cartTotal);
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderBy: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});
const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  // console.log("_id", _id);
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderBy: _id })
      .populate("products.product")
      .populate("orderBy")
      .exec();
    console.log("userorders", userorders);
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forGotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  emptyCart,
  getUserCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
};
