const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  console.log("ytr");
  const email = req.body.email;
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
  console.log(email, password);
  const findUser = await User.findOne({ email });
  console.log("R", await findUser.isPasswordMatched(password));
  if (findUser && (await findUser.isPasswordMatched(password))) {
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

const getUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.json(getAllUser);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const getSingleUser = await User.findById(id);
    console.log(getSingleUser);
    
    res.json(getSingleUser); 
  } catch (error) {
    throw new Error(error);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const deleteSingleUser = await User.findByIdAndDelete(id);
    console.log(deleteSingleUser);
    
    res.json(deleteSingleUser); 
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const updateSingleUser = await User.findByIdAndUpdate(id,{
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      mobile:req.body.mobile


    },{new:true});
    console.log(updateSingleUser);
    
    res.json(updateSingleUser); 
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createUser, loginUser, getUsers ,getSingleUser,deleteUser,updateUser};
