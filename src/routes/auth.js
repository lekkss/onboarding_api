import express from "express";
import {
  completeSignup,
  initializeSignup,
  login,
  resendOtp,
  verifySignup,
} from "../controllers/auth.js";
import validateRequest from "../middlewares/validate.js";
import {
  completeSignupSchema,
  initializeSchema,
  loginSchema,
  resentOtpSchema,
  verifySchema,
} from "../validations/authValidation.js";
const router = express.Router();

router.post("/login", validateRequest(loginSchema), login);
router.post(
  "/signup/initialize",
  validateRequest(initializeSchema),
  initializeSignup
);
router.post("/signup/verify", validateRequest(verifySchema), verifySignup);
router.post("/signup/resend", validateRequest(resentOtpSchema), resendOtp);
router.post(
  "/signup/:uuid/complete",
  validateRequest(completeSignupSchema),
  completeSignup
);

export default router;
