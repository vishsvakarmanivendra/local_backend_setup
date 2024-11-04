import express from "express"
import { getAllCategoriesWithSubcategories } from "../controller/homeController.js"
const router=express.Router()

router.get("/",getAllCategoriesWithSubcategories)

export default router;