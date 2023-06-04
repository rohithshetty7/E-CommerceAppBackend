const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler") ;

const authMiddleWare = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers.authorization.startsWith("Bearer")) {
     token=req?.headers.authorization.split(" ")[1]
     try {
        if(token){
          const  decoded=jwt.verify(token,process.env.JWT_SECRET);
          console.log("decoded",decoded)
          const user=await  User.findById(decoded.id)
          req.user=user
          next()

        }
     } catch (error) {
    throw new Error("Not Authorised token experied, please login");
        
     }
  } else {
    throw new Error("There is no token attached to the header");
  }
});
const isAdmin=asyncHandler(async(req,res,next)=>{
  console.log("isAdmin",req.user );
  const {email}=req.user;
  const adminUser=await User.findOne({email})
  if(adminUser.role!=="admin"){
    throw new Error("U r not an admin")
  }
else{
  next()
}
})

module.exports={authMiddleWare,isAdmin};

//Get _id of user
//login with _id and copy token 

// get a single User ->pass Bearer token and check authorization
