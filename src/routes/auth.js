import express from "express";
import {
  completeSignup,
  initializeSignup,
  login,
  resendOtp,
  verifySignup,
} from "../controllers/auth.js";
import validateRequest from "../middlewares/validate.js";
import { loginSchema } from "../validations/authValidation.js";
const router = express.Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/signup/initialize", initializeSignup);
router.post("/signup/verify", verifySignup);
router.post("/signup/resend", resendOtp);
router.post("/signup/:uuid/complete", completeSignup);

export default router;
