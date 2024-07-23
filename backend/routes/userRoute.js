import express from "express";

import {
    getUserProfile,
    updateProfileById,
    updateProfilePicture,
    getAllUsers,
    deleteUserById
} from "../controllers/userController.js"

import { authGuard, adminGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", authGuard, getUserProfile);
router.put("/updateProfile/:userId", authGuard, updateProfileById);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.get("/", authGuard, adminGuard, getAllUsers);
router.delete("/:userId", authGuard, adminGuard, deleteUserById);

export default router;