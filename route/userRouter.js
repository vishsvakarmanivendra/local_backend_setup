import express from "express"
import { signUp,signIn,getUser,update,verifyPhoneNumber } from "../controller/userController.js"
import multer from "multer"
import { signUpUserValidation } from "../validations/userValidation.js"
import { signInValidation } from "../validations/common.js"
const route=express.Router()
const upload = multer({dest:"public/user"})

route.post("/signUp",signUpUserValidation,upload.single("userImage"),signUp)
route.post("/signIn",signInValidation,signIn)
route.get("/getUser",getUser)
route.put("/update",signUpUserValidation,upload.single("userImage"),update)
route.post("/verifyUser",verifyPhoneNumber)

export default route;