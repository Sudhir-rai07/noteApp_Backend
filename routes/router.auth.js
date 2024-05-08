import { Router } from "express";
import { login, logout, signup, userData } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = Router()


router.post("/signup", signup)
router.post("/login", login)
router.get("/getuser", protectRoute, userData)
router.post("/logout", logout)


export default router 