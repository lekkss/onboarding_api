import express from "express";
import { getProfile } from "../controllers/profile.js";

const router = express.Router();
router.get("/", getProfile);
router.post(
  "/update/password",
  validateRequest(passwordSchema),
  changePassword
);
export default router;
