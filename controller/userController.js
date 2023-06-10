const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendMail = require("./emailCtrl");
const crypto = require("crypto");
// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  console.log("ytr");
  const email = req?.body?.email;
  console.log(email);
  const findUSer = await User.findOne({ email: email });
  console.log(findUSer);

  if (!findUSer) {
    //create new User
    const newUSer = await User.create(req.body);
    res.json(newUSer);
  } else {
    //User already exist
    // res.json({
    // message:"USer already exist",
    // success:false,

    // })
    throw new Error("USer already exist");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const findUser = await User.findOne({ email });
  console.log("findUser._id", findUser._id);
  console.log("RNS", findUser && (await findUser.isPasswordMatched(password)));
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    console.log("refreshToken1", refreshToken);
    const updatedUser = await User.findByIdAndUpdate(
      findUser._id,
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

// const logout = asyncHandler(async (req, res) => {
//   const cookie = req.cookies;
//   if (!cookie.refreshToken) throw new Error("No refrsh token in cookies");
//   const refreshToken = cookie.refreshToken;
//   const user = await User.findOne({ refreshToken });
//   if (!user) {
//     res.clearCookie("refreshToken",{
//       httpOnly:true,
//       secure:true
//     });
//     return res.sendStatus(204) //forbidden
//   }
//    await User.findOneAndUpdate(refreshToken,{refreshToken:""})
//    res.clearCookie("refreshToken",{
//     httpOnly:true,
//     secure:true
//   });
//    res.sendStatus(204) //forbidden

// });
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
  } catch (error) {}
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    // console.log("R",req.user);
    // let { id } = req.params;
    let { _id } = req.user;
    validateMongoDbId(_id);
    // console.log("_id", id);
    // console.log(id);
    const updateSingleUser = await User.findById(
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

const blockUser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    validateMongoDbId(id);
    // console.log("blockUser id",id);
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    // res.json({
    //   message: "User Blocked",
    // });
    res.json({
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
    // res.json({
    //   message:"User un blocked"
    // })
    res.json({
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
    const resetUrl = `Hi Please follow this link to reset
     your password.This link valid till 10 min from here <a href="http://localhost:3001/api/user/forgot-password-token/${token}">Click here</a>`;
    console.log("resetUrl",resetUrl);
     const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Passwor link",
      html: resetUrl,
    };
    sendMail(data);
    res.json(token);
  } catch (error) {
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
  user.passwordResetToken=undefined;
  user.passwordResetExpires=undefined;
  await user.save()
  res.json(user)

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
};
