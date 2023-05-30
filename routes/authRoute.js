const express=require("express")
const { createUser, loginUser, getUsers, getSingleUser, deleteUser, updateUser } = require("../controller/userController")
const router=express.Router()


router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/all-users",getUsers)
router.get("/:id",getSingleUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)






module.exports=router