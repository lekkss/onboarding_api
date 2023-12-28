import express from "express";
import validateRequest from "../middlewares/validate.js";
import { changePassword, getProfile } from "../controllers/profile.js";
import { passwordSchema } from "../validations/userValidation.js";

const router = express.Router();
router.get("/", getProfile);
router.post(
  "/update/password",
  validateRequest(passwordSchema),
  changePassword
);
export default router;
