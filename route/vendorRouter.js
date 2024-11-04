import express from "express"
import { getVendor, signIn, signUp, update } from "../controller/vendorController.js"
import multer from "multer"
import { vendorValidationRules } from "../validations/vendorValidation.js"
import { signInValidation } from "../validations/common.js"
const route=express.Router()
const upload = multer({dest:"public/vendor"})

route.post("/signUpVendor",vendorValidationRules,upload.single("profilePhoto"),signUp)
route.post("/signIn",signInValidation,signIn)
route.post("/getUser",getVendor)
route.put("/update",vendorValidationRules,upload.single("profilePhoto"),update)

export default route;