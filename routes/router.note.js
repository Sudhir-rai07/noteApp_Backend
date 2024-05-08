import { Router } from "express";
import { addnote, allnotes, deletenote, updatenote } from "../controllers/note.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = Router()

router.post("/addnote", protectRoute,addnote) // Create 
router.get("/allnotes",protectRoute, allnotes) // Read
router.put("/updatenote/:id", protectRoute,updatenote) // Update
router.delete("/deletenote/:id", protectRoute,deletenote) // Delete

export default router